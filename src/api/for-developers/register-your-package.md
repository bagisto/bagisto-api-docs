---
outline: false
---

# Register Your Package

The host discovers your endpoints from two things: a **directory** it scans for `#[ApiResource]` classes, and **tagged bindings** for the classes that serve them. Both go in your package's service provider.

## Installing the module

A module that adds endpoints installs exactly like any other Bagisto package — **composer, with no manual step**. There is nothing extra to wire because the API package is already installed and running; your module only registers classes into it.

```bash
composer require webkul/product-question
php artisan bagisto-api-platform:optimize
```

Laravel's package auto-discovery registers the service provider, provided your `composer.json` declares it:

```json
{
    "name": "webkul/product-question",
    "type": "laravel-package",
    "autoload": {
        "psr-4": { "Webkul\\ProductQuestion\\": "src/" }
    },
    "extra": {
        "laravel": {
            "providers": ["Webkul\\ProductQuestion\\Providers\\ProductQuestionServiceProvider"]
        }
    }
}
```

Whether to depend on the API package is a real choice:

| Your module | composer.json | Behaviour without the API package |
|---|---|---|
| Is only useful with the API | `"require": { "bagisto/bagisto-api": "^2.4" }` | Cannot be installed without it |
| Adds endpoints to an existing feature | `"suggest": { "bagisto/bagisto-api": "…" }` | Installs and works; endpoints are simply absent |

The second is the safer default for a module that also has admin screens or a storefront UI — and it is why the registration method below opens with an `interface_exists` guard.

**Developing in-repo?** Bagisto's root `composer.json` declares a path repository for `packages/*/*`, so a package at `packages/Webkul/ProductQuestion` is installable the same way, symlinked:

```bash
composer require webkul/product-question:@dev
```

**Two things not to do.** Do not add `api-platform/*` to your own `require` — the host pins those versions, and a second constraint produces a resolution conflict or a mixed version set that breaks the metadata build. Do not remove `api-platform/laravel` from the root `dont-discover`; the API package registers API Platform itself, and letting Laravel discover it too registers it twice.

Listing the provider in `bootstrap/providers.php` is optional. Bagisto lists its first-party packages there, but auto-discovery is enough for a module.

## Where the API code lives

Your module sits beside the core packages, with the same layout every Bagisto package uses. Keep the API layer in its own `Api/` folder, split by surface — `Shop/` for storefront endpoints, `Admin/` for back-office ones:

```
packages/Webkul/ProductQuestion/
├── composer.json
└── src/
    ├── Api/
    │   ├── Shop/
    │   │   ├── Resources/     # #[ApiResource] with routePrefix: '/api/shop'
    │   │   ├── State/         # Providers (read) and Processors (write)
    │   │   ├── Resolver/      # GraphQL item resolvers, when needed
    │   │   └── Dto/           # Mutation inputs and result objects
    │   ├── Admin/
    │   │   ├── Resources/     # #[ApiResource] with routePrefix: '/api/admin'
    │   │   ├── State/
    │   │   ├── Resolver/
    │   │   └── Dto/
    │   └── Support/           # Guards and lookups shared by both surfaces
    ├── Config/
    │   └── acl.php            # permission keys your admin endpoints check
    ├── Providers/
    ├── Repositories/
    └── Resources/lang/
```

This mirrors the API package itself, which keeps storefront resources in `src/Models/` and admin resources in `src/Admin/Models/`. A module with only storefront endpoints can drop the `Admin/` half and flatten `Shop/` away; the two-folder split earns its place as soon as both surfaces exist.

### The `Admin` segment is not just tidiness

The host compiles **two separate GraphQL schemas** — one for `/api/graphql`, one for `/api/admin/graphql` — and it decides which one a resource belongs to by looking for an **`\Admin\` segment in the resource's namespace**. Nothing else is consulted: not `routePrefix`, not the class name.

```php
namespace Webkul\ProductQuestion\Api\Admin\Resources;   // → admin schema
namespace Webkul\ProductQuestion\Api\Shop\Resources;    // → shop schema
```

Put an admin resource in a namespace without that segment and its REST route still works, because REST routing follows `routePrefix` — but the GraphQL field is compiled into the **storefront** schema, where it is missing from `/api/admin/graphql` and exposed to anyone holding a storefront key. Keeping admin classes under an `Api\Admin\` namespace is what keeps the two schemas apart.

### Both resource folders must be registered

Only directories you list are scanned, so a module with both surfaces registers both:

```php
config([
    'api-platform.resources' => array_merge(
        config('api-platform.resources', []),
        [
            dirname(__DIR__).'/Api/Shop/Resources',
            dirname(__DIR__).'/Api/Admin/Resources',
        ],
    ),
]);
```

Everything outside those folders is ordinary code the host resolves through the container.

### Admin endpoints need an ACL key

An admin endpoint gated with `$this->authorizedAdmin('catalog.product_questions.view')` is checking a permission key against the token's scope and the owner's role. That key has to exist in the admin ACL config, or **no role can ever be granted it** — every `permission_type=custom` token is refused with a 403 that looks like a bug in your endpoint.

Declare the keys in `src/Config/acl.php`:

```php
return [
    [
        'key'   => 'catalog.product_questions',
        'name'  => 'productquestion::app.acl.title',
        'route' => 'admin.catalog.product_questions.index',
        'sort'  => 5,
    ], [
        'key'   => 'catalog.product_questions.edit',
        'name'  => 'productquestion::app.acl.edit',
        'route' => 'admin.catalog.product_questions.edit',
        'sort'  => 2,
    ],
];
```

and merge them in your service provider's `boot()`:

```php
config(['acl' => array_merge((array) config('acl', []), require __DIR__.'/../Config/acl.php')]);
```

The keys then appear in **Settings → Roles**, where an admin can grant them. Use the key exactly as written when you call `authorizedAdmin()` — a typo is indistinguishable from a missing permission at runtime.

## The registration method

Call this from your service provider's `register()`:

```php
protected function registerApiState(): void
{
    // The module must keep working when the API package is absent.
    if (! interface_exists(ProviderInterface::class)) {
        return;
    }

    config([
        'api-platform.resources' => array_merge(
            config('api-platform.resources', []),
            [
                dirname(__DIR__).'/Api/Shop/Resources',
                dirname(__DIR__).'/Api/Admin/Resources',
            ],
        ),
    ]);

    foreach ([
        ProductQuestionProvider::class,
        ProductQuestionListProvider::class,
        AdminProductQuestionProvider::class,
    ] as $provider) {
        $this->app->tag($provider, ProviderInterface::class);
    }

    foreach ([
        ProductQuestionProcessor::class,
        AdminProductQuestionProcessor::class,
    ] as $processor) {
        $this->app->tag($processor, ProcessorInterface::class);
    }

    foreach ([
        ProductQuestionResolver::class,
    ] as $resolver) {
        $this->app->tag($resolver, QueryItemResolverInterface::class);
    }
}
```

Imports:

```php
use ApiPlatform\GraphQl\Resolver\QueryItemResolverInterface;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\State\ProviderInterface;
```

## Three things that decide whether it works

**The `interface_exists` guard is not optional.** Your module may be installed on a store without the API package. Without the guard, `register()` fatals on a missing interface and takes the whole store down. With it, the module simply ships no endpoints.

**An untagged class is silently ignored.** This is the single most common failure. A `provider:` or `processor:` referenced by an operation but never tagged does not error — API Platform falls back to its default Eloquent state handling, so your endpoint returns a 404, or worse, plausible-looking data your code never produced. If an endpoint behaves as though your class is not running, check the tag first.

**Config, not a published file.** Merging into `api-platform.resources` at runtime means the host's own config files stay untouched, so a host upgrade never overwrites your registration and an integrator never has to edit a vendor file.

## Rebuild the caches

Resource discovery is cached. A newly added resource does not appear until you clear it:

```bash
php artisan bagisto-api-platform:optimize
```

While iterating, clear instead of rebuild — `php artisan optimize:clear` — so each edit is picked up immediately, then run `optimize` once when you are done. Responses are slower with the caches cleared; that is expected and is not something to debug.

## Verify the host sees you

```bash
# Both resource directories are registered
php artisan tinker --execute="print_r(config('api-platform.resources'));"

# Your routes exist, per surface
php artisan route:list --path=api/shop  | grep product-questions
php artisan route:list --path=api/admin | grep product-questions
```

```bash
# Your GraphQL fields landed on the right schema — admin fields must NOT appear here
curl -s -X POST https://your-domain.com/api/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ __schema { queryType { fields { name } } } }"}' | grep -i productQuestion
```

If a directory is listed but no routes appear, the resource class is the problem — check that `#[ApiResource]` is present and that the class sits directly in the scanned folder, not in a subfolder of it. If an admin field shows up in the shop schema above, its namespace is missing the `Admin` segment.
