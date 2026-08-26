---
outline: false
---

# Build an Endpoint

One resource class declares the endpoint on both transports; one provider fetches the data. This page builds a read endpoint end to end — a single product question, addressed by its id.

Files added to the module:

```
packages/Webkul/ProductQuestion/src/Api/
├── Shop/Resources/ProductQuestion.php        # the endpoint declaration
├── Shop/State/ProductQuestionProvider.php    # the read path
├── Shop/Resolver/ProductQuestionResolver.php # GraphQL item query
└── Support/QuestionContext.php               # shared lookups and guards
```

## The resource

A resource is a plain class. The attribute declares the endpoints; the properties declare the fields.

```php
namespace Webkul\ProductQuestion\Api\Shop\Resources;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\Response;
use Symfony\Component\Serializer\Annotation\Groups;
use Webkul\ProductQuestion\Api\Shop\Resolver\ProductQuestionResolver;
use Webkul\ProductQuestion\Api\Shop\State\ProductQuestionProvider;

#[ApiResource(
    routePrefix: '/api/shop',
    shortName: 'ProductQuestion',
    operations: [
        new Get(
            uriTemplate: '/product-questions/{id}',
            provider: ProductQuestionProvider::class,
            openapi: new Operation(
                tags: ['Product Questions'],
                summary: 'Get a single product question',
                description: 'Returns one approved question with its answer, if answered. Public — the storefront key is the only credential required.',
                responses: [
                    '200' => new Response(
                        description: 'The question.',
                        content: new \ArrayObject(['application/json' => ['example' => [
                            'id' => 41,
                            'productId' => 12,
                            'customerName' => 'Jane S.',
                            'question' => 'Does this ship with a charger?',
                            'answer' => 'Yes, a 45W charger is included.',
                            'status' => 'approved',
                            'createdAt' => '2026-08-05T12:50:20+05:30',
                        ]]]),
                    ),
                    '404' => new Response(description: 'No approved question with that id.'),
                ],
            ),
        ),
    ],
    graphQlOperations: [
        new Query(
            resolver: ProductQuestionResolver::class,
            args: [
                'id' => ['type' => 'Int!', 'description' => 'ID of the question'],
            ],
        ),
    ],
)]
class ProductQuestion
{
    #[ApiProperty(identifier: true, writable: false)]
    #[Groups(['query'])]
    public ?int $id = null;

    #[ApiProperty(writable: false)]
    #[Groups(['query'])]
    public ?int $product_id = null;

    #[ApiProperty(writable: false)]
    #[Groups(['query'])]
    public ?string $customer_name = null;

    #[ApiProperty(writable: false)]
    #[Groups(['query'])]
    public ?string $question = null;

    #[ApiProperty(writable: false)]
    #[Groups(['query'])]
    public ?string $answer = null;

    #[ApiProperty(writable: false)]
    #[Groups(['query'])]
    public ?string $status = null;

    #[ApiProperty(writable: false)]
    #[Groups(['query'])]
    public ?string $created_at = null;
}
```

That single class produces `GET /api/shop/product-questions/{id}` **and** the GraphQL field `productQuestion(id: Int!)`.

### The parts that matter

- **`routePrefix`** picks the surface: `/api/shop` for storefront endpoints, `/api/admin` for back-office ones. It decides which credential the host enforces before your code runs.
- **`shortName`** is the GraphQL type name and the base of the field name. Set it explicitly rather than letting it be derived from the class name.
- **`uriTemplate`** is your REST path. Always declare it — the auto-generated path comes from the class name and is not what you want.
- **Properties are snake_case; clients see camelCase.** `$product_id` is serialised as `productId`. This is not cosmetic: GraphQL resolves a field by converting its name back to snake_case and reading that property, so a camelCase property is never found and the field returns null while REST still works. [Why](/api/for-developers/conventions#property-names).
- **`#[Groups(['query'])]`** marks a field readable. Without it the field is absent from the response.
- **The `openapi` block is your Swagger documentation.** Realistic examples here are what an integrator sees at `/api/shop`.

## The provider

The provider is the read path. It receives the operation and returns the resource.

```php
namespace Webkul\ProductQuestion\Api\Shop\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Webkul\ProductQuestion\Api\Shop\Resources\ProductQuestion;
use Webkul\ProductQuestion\Api\Support\QuestionContext;

class ProductQuestionProvider implements ProviderInterface
{
    public function __construct(
        protected QuestionContext $questionContext,
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?ProductQuestion
    {
        return $this->resolve($uriVariables['id'] ?? $context['args']['id'] ?? null);
    }

    public function resolve(int|string|null $id): ProductQuestion
    {
        $row = $this->questionContext->publicQuestion($id);

        $question = new ProductQuestion;
        $question->id = (int) $row->id;
        $question->product_id = (int) $row->product_id;
        $question->customer_name = $row->customer_name;
        $question->question = $row->question;
        $question->answer = $row->answer;
        $question->status = $row->status;
        $question->created_at = $row->created_at?->toIso8601String();

        return $question;
    }
}
```

**One provider serves both transports.** REST passes the id in `$uriVariables`, GraphQL in `$context['args']` — reading both, as the first line does, is the whole trick. Everything after that is shared, so the two transports cannot drift apart.

Constructor injection works normally: repositories, your own services, anything bound in the container.

## The support class

Lookups and guards that more than one provider needs belong in one place, not copied per endpoint:

```php
namespace Webkul\ProductQuestion\Api\Support;

use Illuminate\Support\Facades\Auth;
use Webkul\BagistoApi\Exception\AuthorizationException;
use Webkul\BagistoApi\Exception\ResourceNotFoundException;
use Webkul\ProductQuestion\Repositories\ProductQuestionRepository;

class QuestionContext
{
    public function __construct(
        protected ProductQuestionRepository $questionRepository,
    ) {}

    /** The authenticated customer, or throw. */
    public function customer(): object
    {
        $customer = Auth::guard('sanctum')->user();

        if (! $customer) {
            throw new AuthorizationException(__('productquestion::app.api.errors.unauthenticated'));
        }

        return $customer;
    }

    /** A question the public may see, or throw. */
    public function publicQuestion(int|string|null $id): object
    {
        if (! $id) {
            throw new ResourceNotFoundException(__('productquestion::app.api.errors.id-required'));
        }

        $question = $this->questionRepository->find((int) $id);

        if (! $question || $question->status !== 'approved') {
            throw new ResourceNotFoundException(__('productquestion::app.api.errors.not-found'));
        }

        return $question;
    }
}
```

Note what the pending-moderation case returns: **not found**, not forbidden. A distinct 403 would confirm the record exists.

## The resolver

A GraphQL **item** query with custom arguments needs a resolver. It is a two-line adapter onto the provider you already wrote:

```php
namespace Webkul\ProductQuestion\Api\Shop\Resolver;

use ApiPlatform\GraphQl\Resolver\QueryItemResolverInterface;
use Webkul\ProductQuestion\Api\Shop\Resources\ProductQuestion;
use Webkul\ProductQuestion\Api\Shop\State\ProductQuestionProvider;

class ProductQuestionResolver implements QueryItemResolverInterface
{
    public function __construct(
        protected ProductQuestionProvider $provider,
    ) {}

    public function __invoke(?object $item, array $context): ProductQuestion
    {
        return $this->provider->resolve($context['args']['id'] ?? null);
    }
}
```

A **collection** query needs no resolver — point `QueryCollection` straight at your provider and declare the arguments with `args:`.

## Exposing an existing model

The resource above is a plain class the provider fills in by hand, which suits a computed or assembled payload. When the endpoint is really "this table, over the API", there is a shorter route: **extend the model and decorate the subclass**. That is what the API package does for the core entities, and it is available to your module for anything — a core model, or a model your own module already ships.

```php
namespace Webkul\ProductQuestion\Api\Shop\Resources;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ApiResource(
    routePrefix: '/api/shop',
    shortName: 'ProductQuestion',
    normalizationContext: ['skip_null_values' => false],
    operations: [
        new Get(provider: ProductQuestionProvider::class),
        new GetCollection(provider: ProductQuestionListProvider::class),
    ],
)]
class ProductQuestion extends \Webkul\ProductQuestion\Models\Question
{
    #[ApiProperty(identifier: true, writable: false)]
    public function getId(): int
    {
        return $this->id;
    }

    #[ApiProperty(writable: false, description: 'The product the question is about')]
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
```

The subclass inherits the table, casts, fillables and scopes, so none of that is restated. What you add is the API layer: the `#[ApiResource]` attribute, an identifier, and the relations you want exposed.

Three rules make the difference between this working and quietly not:

**Never modify the model you extend.** The subclass is additive and lives in your package. A core model edited in place is lost on the next upgrade, and it changes behaviour for the storefront and admin panel as well as the API.

**Point relations at API resource classes, not core ones.** A relation is only exposed if its related class is itself an `#[ApiResource]`. `belongsTo(Product::class)` above means the *API's* `Product` resource — importing the core `Webkul\Product\Models\Product` instead leaves the field missing from the response with no error to explain it.

**A relation you redeclare must also override the core method.** Multi-word method names normalise to the same property, so `filterableAttributes()` on the core model and `filterable_attributes()` on yours collapse into one field — and the core one wins, so your version never runs. Override the inherited name and delegate:

```php
public function filterable_attributes(): BelongsToMany
{
    return $this->belongsToMany(Attribute::class, 'category_filterable_attributes');
}

/** Overrides the core relation of the same name so the API's Attribute resource is the related class. */
public function filterableAttributes(): BelongsToMany
{
    return $this->filterable_attributes();
}
```

**When to prefer a plain class instead.** Extending the model ties the response shape to the table. If the payload is assembled from several sources, computed, or deliberately different from the columns, the plain-class-plus-provider form from the start of this page keeps the two free to diverge.

## Collections

For a list, add a `GetCollection` and a `QueryCollection` to the same resource and have the provider return an array:

```php
new GetCollection(
    uriTemplate: '/product-questions',
    provider: ProductQuestionListProvider::class,
    paginationEnabled: false,
    openapi: new Operation(
        tags: ['Product Questions'],
        summary: 'Approved questions for a product',
        parameters: [
            new Parameter(name: 'product_id', in: 'query', required: true, schema: ['type' => 'integer']),
            new Parameter(name: 'limit', in: 'query', required: false, schema: ['type' => 'integer']),
            new Parameter(name: 'answered', in: 'query', required: false, schema: ['type' => 'boolean']),
        ],
    ),
),
```

```php
new QueryCollection(
    provider: ProductQuestionListProvider::class,
    args: [
        'productId' => ['type' => 'Int!'],
        'limit'     => ['type' => 'Int'],
        'answered'  => ['type' => 'Boolean'],
    ],
),
```

Custom GraphQL arguments must be declared in `args:`. An undeclared argument is not passed through and ignored — the query is rejected during validation with `Unknown argument "productId" on field "productQuestions"`, before your provider runs. If a filter seems to have no effect, check that it is declared here rather than debugging the provider.

Set `paginationEnabled: false` when the provider pages itself; otherwise return an `ApiPlatform\Laravel\Eloquent\Paginator` and the host handles paging and the response headers.

## The admin side

Admin endpoints are the same three pieces — resource, provider, optional resolver — with three differences: they live under `Api/Admin/`, the resource declares `routePrefix: '/api/admin'`, and the listing extends a base class instead of implementing `ProviderInterface` directly.

The namespace is what routes the GraphQL field to `/api/admin/graphql`, so the `Admin` segment is required, not decorative — see [Register Your Package](/api/for-developers/register-your-package#the-admin-segment-is-not-just-tidiness).

```php
namespace Webkul\ProductQuestion\Api\Admin\Resources;

#[ApiResource(
    routePrefix: '/api/admin',
    shortName: 'AdminProductQuestion',
    operations: [
        new GetCollection(
            uriTemplate: '/product-questions',
            provider: AdminProductQuestionCollectionProvider::class,
            openapi: new Operation(tags: ['Admin Catalog: Product Questions'], summary: 'Moderation queue'),
        ),
    ],
    graphQlOperations: [
        new QueryCollection(provider: AdminProductQuestionCollectionProvider::class),
    ],
)]
class AdminProductQuestion { /* … */ }
```

An admin listing should not reimplement auth, paging, sorting and the `{ data, meta }` envelope. Extend `AbstractAdminCollectionProvider` and implement five methods:

```php
namespace Webkul\ProductQuestion\Api\Admin\State;

use Webkul\BagistoApi\Admin\State\Concerns\AbstractAdminCollectionProvider;
use Webkul\BagistoApi\Admin\State\Concerns\ChecksAdminPermission;

class AdminProductQuestionCollectionProvider extends AbstractAdminCollectionProvider
{
    use ChecksAdminPermission;

    protected function getSortable(): array
    {
        return ['id', 'created_at', 'status'];   // first entry is the default sort
    }

    protected function buildQuery(array $args)
    {
        $this->authorizedAdmin('catalog.product_questions.view');

        return DB::table('product_questions')->select('product_questions.*');
    }

    protected function applyFilters($query, array $args): void
    {
        if (! empty($args['status'])) {
            $query->where('status', $args['status']);
        }
    }

    protected function applySort($query, array $args): void
    {
        [$column, $direction] = $this->resolveSort($args);

        $query->orderBy($column, $direction);
    }

    protected function mapRow(object $row): object
    {
        // …map to your resource
    }
}
```

`AbstractAdminItemProvider` is the detail equivalent — implement `getNotFoundLangKey()`, `findEntity()` and `mapToDto()`.

## Try it

```bash
curl "https://your-domain.com/api/shop/product-questions/41" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"
```

```graphql
{
  productQuestion(id: 41) {
    id
    productId
    customerName
    question
    answer
    status
    createdAt
  }
}
```

Both should return the same data. If REST works and GraphQL does not, the resolver is missing or untagged; if GraphQL works and REST returns 404, check `uriTemplate` and rebuild the route cache.
