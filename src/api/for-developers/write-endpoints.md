---
outline: false
---

# Write Endpoints

A write takes an **input DTO**, runs through a **processor**, and returns a result. The same processor serves the REST `Post` and the GraphQL mutation.

Continuing the `Webkul\ProductQuestion` module, this page adds "ask a question":

```
packages/Webkul/ProductQuestion/src/Api/
├── Shop/Dto/AskQuestionInput.php           # what the caller may send
├── Shop/Dto/QuestionResult.php             # what comes back
└── Shop/State/ProductQuestionProcessor.php # the write path
```

## The input DTO

A plain class listing the fields a caller may set. Nothing outside it can be written, which is the point.

```php
namespace Webkul\ProductQuestion\Api\Shop\Dto;

use Symfony\Component\Serializer\Annotation\Groups;

class AskQuestionInput
{
    #[Groups(['mutation'])]
    public ?int $product_id = null;

    #[Groups(['mutation'])]
    public ?string $question = null;

    public function __construct(?int $product_id = null, ?string $question = null)
    {
        $this->product_id = $product_id;
        $this->question = $question;
    }
}
```

Snake_case properties again — a client sends `productId` and it lands on `$product_id`.

## Declaring the operations

Point the REST `Post` and the GraphQL `Mutation` at the same input and the same processor:

```php
new Post(
    uriTemplate: '/product-questions',
    input: AskQuestionInput::class,
    processor: ProductQuestionProcessor::class,
    denormalizationContext: ['allow_extra_attributes' => true, 'groups' => ['mutation']],
    openapi: new Operation(
        tags: ['Product Questions'],
        summary: 'Ask a question about a product',
        description: 'Submits a question for moderation. Requires the storefront key and a customer Bearer token.',
        requestBody: new RequestBody(
            required: true,
            content: new \ArrayObject(['application/json' => [
                'schema' => [
                    'type' => 'object',
                    'required' => ['productId', 'question'],
                    'properties' => [
                        'productId' => ['type' => 'integer', 'example' => 12],
                        'question'  => ['type' => 'string', 'example' => 'Does this ship with a charger?'],
                    ],
                ],
                'example' => ['productId' => 12, 'question' => 'Does this ship with a charger?'],
            ]]),
        ),
    ),
),
```

```php
new Mutation(
    name: 'create',
    input: AskQuestionInput::class,
    output: QuestionResult::class,
    processor: ProductQuestionProcessor::class,
    denormalizationContext: ['allow_extra_attributes' => true, 'groups' => ['mutation']],
),
```

`name: 'create'` on a resource whose `shortName` is `ProductQuestion` produces the field `createProductQuestion`. The host composes it as `{name}{ShortName}` — you never write the field name yourself.

## The processor

```php
namespace Webkul\ProductQuestion\Api\Shop\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Webkul\BagistoApi\Exception\InvalidInputException;
use Webkul\ProductQuestion\Api\Shop\Dto\AskQuestionInput;
use Webkul\ProductQuestion\Api\Shop\Dto\QuestionResult;
use Webkul\ProductQuestion\Api\Support\QuestionContext;
use Webkul\ProductQuestion\Repositories\ProductQuestionRepository;

class ProductQuestionProcessor implements ProcessorInterface
{
    public function __construct(
        protected QuestionContext $questionContext,
        protected ProductQuestionRepository $questionRepository,
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): QuestionResult
    {
        if (! $data instanceof AskQuestionInput) {
            throw new InvalidInputException(__('productquestion::app.api.errors.invalid-input'));
        }

        if (empty($data->product_id) || trim((string) $data->question) === '') {
            throw new InvalidInputException(__('productquestion::app.api.errors.question-required'));
        }

        // Authorise before the first write.
        $customer = $this->questionContext->customer();
        $product  = $this->questionContext->visibleProduct($data->product_id);

        $question = $this->questionRepository->create([
            'product_id'  => $product->id,
            'customer_id' => $customer->id,
            'question'    => $data->question,
            'status'      => 'pending',
        ]);

        return $this->result($question);
    }

    private function result(object $question): QuestionResult
    {
        $result = new QuestionResult;
        $result->id = (int) $question->id;
        $result->status = $question->status;
        $result->created_at = $question->created_at?->toIso8601String();
        $result->message = __('productquestion::app.api.question-submitted');

        return $result;
    }
}
```

Four habits worth keeping:

- **Type-check `$data` first.** The processor is reachable from both transports; an unexpected type should fail loudly rather than half-write.
- **Validate, then authorise, then write.** The ownership or visibility check belongs before the first `create()`, never after.
- **Throw, do not return an error shape.** The host's exceptions carry the status and serialise into GraphQL `errors[]`. Returning something like `['error' => 'not allowed']` sends it as a normal `200` payload, so every client treats the failure as a success.
- **Fire the same events your module's other write paths fire.** If an admin controller in your module dispatches `productquestion.question.create.before` and `productquestion.question.create.after`, the API processor must dispatch them too — otherwise a record created through the API skips every listener that a record created in the admin panel triggers: notifications, indexing, cache invalidation. The core processors do this around each repository call:

```php
Event::dispatch('productquestion.question.create.before', $data);

$question = $this->questionRepository->create($payload);

Event::dispatch('productquestion.question.create.after', $question);
```

## Returning a result

Return an object the operation declares — a result DTO is the usual choice for an action:

```php
namespace Webkul\ProductQuestion\Api\Shop\Dto;

use Symfony\Component\Serializer\Annotation\Groups;

class QuestionResult
{
    #[Groups(['mutation'])]
    public ?int $id = null;

    #[Groups(['mutation'])]
    public ?string $status = null;

    #[Groups(['mutation'])]
    public ?string $created_at = null;

    #[Groups(['mutation'])]
    public ?string $message = null;
}
```

Never return a bare `stdClass`. An object the operation does not declare serialises to an empty payload — the request succeeds and the client receives `{}`.

## File uploads are REST-only

A binary cannot travel in a JSON GraphQL request, so an upload endpoint is declared REST-only and the GraphQL mutation, if you declare one at all, exists to point callers at the REST route.

On the REST operation, take the request over yourself — there is no DTO to deserialise a file into:

```php
new Post(
    uriTemplate: '/product-questions/{id}/attachments',
    inputFormats: ['multipart' => ['multipart/form-data']],
    processor: QuestionAttachmentProcessor::class,
    status: 201,
    deserialize: false,   // no input DTO — read the request yourself
    read: false,          // nothing to load before the write
    validate: false,      // you validate the file in the processor
    openapi: new Operation(
        tags: ['Product Questions'],
        summary: 'Attach an image to a question',
        description: 'Send as multipart/form-data with `image` containing the file (jpeg, png, webp).',
    ),
),
```

The processor then reads the upload directly and validates it before storing:

```php
$file = request()->file('image');

if (! $file) {
    throw new InvalidInputException(__('productquestion::app.api.errors.image-required'));
}

if (! in_array($file->getClientOriginalExtension(), ['jpeg', 'jpg', 'png', 'webp'], true)) {
    throw new InvalidInputException(__('productquestion::app.api.errors.image-type'), 422);
}

$path = $file->store("product-questions/{$id}", 'public');
```

Validate the extension **and** the mime type, and never trust the client-supplied filename when building a path.

If you want the field to appear in the GraphQL schema so its absence is explicit rather than mysterious, declare the mutation and have the processor reject it with a message naming the REST route. That is what the core image endpoints do.

## Assigning results in camelCase

Result properties follow the same [snake_case rule](/api/for-developers/conventions#property-names) as every other resource. That leaves one wrinkle on the write path: processors often build the result with camelCase assignments, which do not land on a snake_case property. Add the host's trait and they do:

```php
use Webkul\BagistoApi\Admin\Dto\Concerns\AcceptsCamelCaseWrites;

class QuestionResult
{
    use AcceptsCamelCaseWrites;

    public ?int $question_id = null;    // $result->questionId = 7  →  lands on question_id
    public ?string $created_at = null;
}
```

Without it, `$result->questionId = 7` quietly creates a **new** dynamic property and the declared one stays null — so the field is empty on both transports, not just GraphQL. The alternative is to assign the snake_case names directly and skip the trait.

## Try it

```bash
curl -X POST "https://your-domain.com/api/shop/product-questions" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer 3627|DfkAK11F8qdqtaFVJPvBxlJyNbCSMNl8TFWhWm4G" \
  -d '{"productId": 12, "question": "Does this ship with a charger?"}'
```

```graphql
mutation {
  createProductQuestion(input: { productId: 12, question: "Does this ship with a charger?" }) {
    questionResult {
      id
      status
      createdAt
      message
    }
  }
}
```

Note the GraphQL payload wrapper: the mutation returns an object named after the declared output type in lowerCamelCase, and your fields are selected inside it.
