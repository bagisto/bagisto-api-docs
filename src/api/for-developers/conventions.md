---
outline: false
---

# Conventions

The rules your endpoints must follow to behave like the rest of the API — and the mistakes that cost the most time to diagnose.

## Authentication

You do not implement authentication. The surface you chose with `routePrefix` decides which credential the host has already enforced by the time your provider runs.

| Prefix | Enforced by the host | Read the caller with |
|---|---|---|
| `/api/shop` | `X-STOREFRONT-KEY` on every request | `Auth::guard('sanctum')->user()` for the customer |
| `/api/admin` | A valid admin Integration Bearer token | `AdminAuthHelper::resolveAdmin()` |

A shop endpoint that needs no customer — a status check, a public lookup — simply never asks for the user. One that does needs its own check, because the storefront key alone does not identify a person:

```php
$customer = Auth::guard('sanctum')->user();

if (! $customer) {
    throw new AuthorizationException(__('productquestion::app.api.errors.unauthenticated'));
}
```

## Ownership is your job

The host authenticates. It does not know that *this* record belongs to *this* customer — only your module does. Every endpoint keyed by an id a client supplies must prove ownership before returning or writing anything, or you have built a way to read other people's data by guessing numbers.

Put it in one place and reuse it:

```php
class QuestionContext
{
    public function ownedQuestion(int|string|null $id): object
    {
        if (! $id) {
            throw new ResourceNotFoundException(__('productquestion::app.api.errors.id-required'));
        }

        $customer = $this->customer();
        $question = $this->questionRepository->find((int) $id);

        if (! $question || (int) $question->customer_id !== (int) $customer->id) {
            throw new ResourceNotFoundException(__('productquestion::app.api.errors.not-found'));
        }

        return $question;
    }
}
```

Return **not found** rather than forbidden for a record that exists but is not the caller's — a distinct 403 tells an attacker the id is real.

## Errors

Throw one of the host's exceptions. Each carries its status on REST and lands in the GraphQL `errors` array, so you never format an error response yourself.

| Exception | REST status | Use for |
|---|---|---|
| `AuthenticationException` | 401 | No credential |
| `AuthorizationException` | 403 | Authenticated, but not allowed |
| `InvalidInputException` | 400, or the status you pass | Missing or invalid input, business rule violated |
| `ResourceNotFoundException` | 404 | Not found, or not the caller's |
| `OperationFailedException` | 500 | The operation failed for a reason the caller cannot fix |

`InvalidInputException` takes an optional second argument, which is how you return **422** rather than 400 for something that is well-formed but not acceptable:

```php
throw new InvalidInputException(__('productquestion::app.api.errors.already-answered'), 422);
```

Use 400 for a malformed or missing field and 422 for a valid payload the current state rejects — a question already answered, a window that has closed. That is the split the core endpoints use.

The package also ships a `ValidationException`, but it is **mapped to 400**, not 422, and it exists mainly for GraphQL, where it tags the error with a `validation` category. New code should prefer `InvalidInputException` with an explicit status; it behaves predictably on both transports.

All of these live in `Webkul\BagistoApi\Exception`. Each implements the interfaces the host's serializer looks for, which is how one `throw` produces the correct REST status *and* a GraphQL `errors[]` entry — a plain `\Exception` produces a 500 on REST and leaks its message on GraphQL, so never throw one from a provider or processor.

Pass a translated message, not an English string. A key that does not exist renders as the raw key (`productquestion::app.api.errors.not-found`) in the response, which is a defect a consumer will see, so add every key to your package's `Resources/lang/en/app.php` as you use it.

## Naming

Four naming rules, each enforced by a mechanism rather than a style guide. Break one and you get a specific, recognisable symptom.

### Property names

Write `$product_id`, and clients see `productId`. The host installs a name converter that translates in both directions:

- **On the way out**, it turns each property name into camelCase for the response — `product_id` becomes `productId`.
- **On the way in**, it turns a requested field name back into snake_case, so the GraphQL field `productId` is looked up as the property `product_id`.

That second step is why the rule matters. When GraphQL resolves `productId`, it converts the name to `product_id` and reads *that* property off your object. Declare `public ?int $productId` and there is no `product_id` to find, so the field resolves to **null** — no error, no warning, just an empty value in an otherwise correct response.

REST is unaffected, because it walks the object's real properties and converts each name outward. This asymmetry is what makes the bug expensive: the REST test passes, the GraphQL query returns `200`, and only that one field is empty.

```php
public ?int $product_id = null;   // productId — resolves on both transports
public ?int $productId = null;    // productId — REST only; null over GraphQL
```

Single-word properties (`$message`, `$status`) are identical in both cases, which is why a half-converted class looks like it works.

If a provider or processor assigns those properties using camelCase names, add `use AcceptsCamelCaseWrites` to the class — it maps the assignment onto the snake_case property.

### Relation method names

Same converter, same reason. A relation is read by its snake_case property name, so `orderItems()` is never found — Eloquent is asked for `order_items` and returns nothing. A to-many field then fails with **"Unexpected non-iterable value for to-many relation"**, and a to-one silently resolves null.

```php
public function order_items(): HasMany   // exposed as orderItems
```

Single-word relations (`images()`, `answers()`) work either way, for the same reason single-word properties do.

### Type and path names

The GraphQL schema is one document built from every registered resource in the store. Type names are not namespaced by module, so two resources called `Question` — yours and another vendor's — collide, and the schema build fails. That takes down **every** GraphQL operation on the endpoint, not just the two that clashed.

Prefix with the feature or the module: `ProductQuestion`, not `Question`. The same reasoning applies to REST: put your endpoints under a segment of your own (`/product-questions/...`) so they cannot collide with a core path added later.

### Operation tags

The `tags:` in an `openapi` block decides which section your endpoint appears under in Swagger UI. Reuse one tag across a feature's operations (`Product Questions`) and they read as a set; vary the wording and they scatter through an alphabetical list.

## GraphQL field names are derived, not chosen

The host composes each field name from the operation name and the resource's `shortName`:

| Declaration on `ProductQuestion` | Field it produces |
|---|---|
| `Query` | `productQuestion` |
| `QueryCollection` | `productQuestions` |
| `Mutation(name: 'create')` | `createProductQuestion` |
| `Mutation(name: 'delete')` | `deleteProductQuestion` |

So renaming the resource renames the field — a breaking change for clients, even though no endpoint URL moved.

**Never set a custom `name:` on `QueryCollection`.** The auto-derived plural is the one API Platform looks for internally; a custom name makes the lookup fail with "Operation collection_query not found" when the schema is built. Because the schema is built as a unit, that error takes the whole GraphQL endpoint down, not only your query. Custom names on a `Mutation` are fine and expected — that is how `create`, `delete` and action mutations are named.

## One broken resource breaks the whole schema

The GraphQL schema and the OpenAPI document are each compiled from **every** registered resource at once, on the request that first needs them. There is no per-module isolation: if your resource cannot be compiled, the build throws, and the endpoint that triggered it returns a 500 — including for core operations that have nothing to do with your module.

The practical consequence is a debugging rule. When endpoints that worked yesterday start failing right after you add or edit a resource, suspect the new resource before anything else, and confirm by commenting out its registration and clearing the cache.

Two mistakes that fail this way rather than locally:

- **A provider typed `mixed`.** The return type must be `object|array|null`. `mixed` is not a type API Platform can reconcile with an operation's output, and it fatals the metadata build for every resource.
- **A `Delete` operation with no `provider:`.** API Platform has nothing to load the record with, so the route resolves to nothing and returns 404 — this one is local, but it looks like a routing problem and sends people to the wrong file.

## Performance

- **Do the aggregation in the query.** A provider that loads rows and then fetches a relation per row is an N+1 the host cannot see or fix. Eager-load what the response needs, or use correlated subqueries for per-row counts and aggregates — the same fix the core product listing uses.
- **Keep listing rows cheap.** Fields that need an extra query or a computed lookup belong on the detail endpoint; leave them null on the listing. A field that costs one query per row costs `per_page` queries on every page load.
- **Rebuild the caches after changing a resource** — `php artisan bagisto-api-platform:optimize`. Resource metadata and the route table are both cached; a store left with the route cache cleared re-registers every API route on every request, which is slow for the whole application, not only for your endpoints.
