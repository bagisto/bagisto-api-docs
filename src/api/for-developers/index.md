---
outline: false
---

# For Developers

Everything so far describes the API as a consumer sees it. This section is the other side: **how to add your own endpoints to it** from your own Bagisto package.

The API package is the host. It owns authentication, rate limiting, pagination, error shapes, the Swagger and GraphiQL playgrounds, and the schema. A module — product Q&A, a loyalty scheme, a marketplace — does not build any of that again. It registers a few classes, and its endpoints appear inside the same surface, with the same credentials and the same response conventions as the core ones.

## What you get for free

Register a resource and these already apply, with no work on your side:

- **Both transports from one declaration.** A class that declares REST operations and GraphQL operations serves `/api/shop/...` and `POST /api/graphql` from the same code.
- **The existing credentials.** Your shop endpoints accept the storefront key and the customer Bearer; your admin endpoints accept the Integration token. You never issue a token.
- **The playgrounds and the schema.** Your endpoints show up in Swagger UI, in GraphiQL's Docs panel, and in the exported OpenAPI/SDL files.
- **The shared conventions.** Pagination, the `{ data, meta }` admin envelope, rate-limit headers, and the error bodies documented under [Status Codes](/api/errors).

## What you write

Four kinds of class, and most endpoints need only the first two:

| Piece | Job |
|---|---|
| **Resource** | A class carrying `#[ApiResource]` — declares the endpoints, the URL, the fields, and the OpenAPI docs. Either a plain class you fill in, or a subclass of an existing model |
| **Provider** | The read path — fetches and returns the resource |
| **Processor** | The write path — validates, persists, returns the result |
| **Resolver** | Only for a GraphQL item query that takes custom arguments |

Then one method in your service provider tells the host where they are.

## What the host gives you to build on

Two kinds of reuse. The first applies to every module; the second only if you are adding admin endpoints.

### Errors, in every module

Throw one of the host's five exceptions and it becomes the right HTTP status on REST and an entry in `errors[]` on GraphQL. You never format an error response yourself.

```php
use Webkul\BagistoApi\Exception\ResourceNotFoundException;

throw new ResourceNotFoundException(__('productquestion::app.api.errors.not-found'));  // → 404
```

The others are `AuthenticationException` (401), `AuthorizationException` (403), `InvalidInputException` (400, or any status you pass — this is how you return a 422) and `OperationFailedException` (500). All live in `Webkul\BagistoApi\Exception`. [Full table](/api/for-developers/conventions#errors).

### Admin listings, if you build them

An admin listing has to authenticate the token, page, sort, and wrap the rows in `{ data, meta }`. Two base classes in `Webkul\BagistoApi\Admin\State\Concerns` do all of that, leaving you the parts only your module knows:

```php
class AdminProductQuestionProvider extends AbstractAdminCollectionProvider
{
    protected function getSortable(): array { … }   // allowed sort columns; first is the default
    protected function buildQuery(array $args) { … } // your base query
    protected function applyFilters($query, array $args): void { … }
    protected function applySort($query, array $args): void { … }
    protected function mapRow(object $row): object { … } // DB row → your resource
}
```

`AbstractAdminItemProvider` is the detail equivalent — you implement `getNotFoundLangKey()`, `findEntity()` and `mapToDto()`.

Two more from the same namespace:

- **`ChecksAdminPermission`** — a trait. `$this->authorizedAdmin('catalog.product_questions.view')` returns the admin or throws 403, honouring both the token's own scope and the owner's role.
- **`AdminAuthHelper::resolveAdmin()`** (in `Webkul\BagistoApi\Admin\Helper`) — the admin behind the Bearer token, when you need it outside those base classes.

Storefront endpoints need none of this for auth: `Auth::guard('sanctum')->user()` returns the customer the host already authenticated, or `null` for a guest.

Everything else inside the API package is internal. If it is not on this page, do not extend or copy it — it can change in a patch release.

## The example used throughout

The pages that follow build one module, `Webkul\ProductQuestion` — customer questions and answers on a product page. It is deliberately ordinary, and it covers the four shapes almost every module needs:

| Endpoint | Shape it demonstrates |
|---|---|
| `GET /api/shop/product-questions?product_id=` | A public collection with filters — storefront key only, no token |
| `GET /api/shop/product-questions/{id}` | A read keyed by a path parameter |
| `POST /api/shop/product-questions` | A write with an input DTO, requiring a customer |
| `GET /api/admin/product-questions` | An admin listing — separate surface, its own namespace, built on the host's abstract provider |

Substitute your own nouns; the wiring does not change.

## Read in this order

1. **[Register Your Package](/api/for-developers/register-your-package)** — the service-provider wiring that makes the host see your classes.
2. **[Build an Endpoint](/api/for-developers/build-an-endpoint)** — resource, provider, and the REST + GraphQL declarations.
3. **[Write Endpoints](/api/for-developers/write-endpoints)** — input DTOs, processors, and mutations.
4. **[Conventions](/api/for-developers/conventions)** — auth, errors, naming, and the traps that cost the most time.
5. **[Test & Ship](/api/for-developers/test-and-ship)** — proving both transports work, and publishing your schema.

Building a **client** rather than an endpoint? You want [Integration Guides](/api/integrations) instead.
