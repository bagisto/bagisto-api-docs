# Interactive Playground Guide

Bagisto ships **Swagger UI** for the REST API — every endpoint listed with its parameters, request body, and response schema, and a **Try it out** button that fires the real call. It is the fastest way to check a payload before writing client code.

## Two playgrounds, one per surface

The shop and admin APIs are documented separately, because they authenticate differently and share no endpoints.

| Playground | URL | Endpoints |
|---|---|---|
| Shop | `https://your-domain.com/api/shop` | 162 operations — catalog, cart, checkout, customer account |
| Admin | `https://your-domain.com/api/admin` | 329 operations — orders, catalog management, customers, settings |

`https://your-domain.com/api` lists both and links to each.

## Authenticating

The two surfaces need different credentials, and Swagger UI surfaces them in different places — this is the part that trips people up.

### Shop — the storefront key is a per-operation field

Every shop operation declares `X-STOREFRONT-KEY` as a **header parameter**, so it appears as an editable field in that operation's **Try it out** form. It is not in the **Authorize** dialog, which offers only the Bearer token.

If the store sets `API_PLAYGROUND_AUTO_INJECT_STOREFRONT_KEY=true`, the page injects its configured key into every request and you can ignore the field — the banner at the top of the page tells you which mode you are in. With auto-inject off, paste your key into the `X-STOREFRONT-KEY` field on each operation you try, or requests come back `401 missing_key`.

For customer-scoped endpoints, add the Bearer through **Authorize**: the `token` from login, or a cart token to act as a guest.

Note that the shop page only persists what you entered across reloads when auto-inject is on. Otherwise a refresh clears it.

### Admin — Bearer only

Admin operations take no storefront key at all. Click **Authorize**, paste the Integration token in `<id>|<token>` form, and it applies to every request. The admin page **persists** authorization, so the token survives a reload.

## Trying a request

1. Open the surface you need and use the **filter** box at the top to find an endpoint by path or tag.
2. Expand the operation — parameters, request body schema, and every documented response are listed.
3. Click **Try it out**, fill the fields, and **Execute**.
4. Swagger shows the response body, status, headers, and the equivalent **curl** command, which is the quickest way to move a working call into a terminal or a script.

The server selector at the top is preset to the surface you opened (`/api/shop` or `/api/admin`); leave it alone unless you are pointing at a different host.

## The raw OpenAPI spec

Each surface publishes its own machine-readable spec:

| Surface | Spec URL |
|---|---|
| Shop | `https://your-domain.com/api/shop/docs` |
| Admin | `https://your-domain.com/api/admin/docs` |

Import either into Postman, Insomnia, or a client generator to get a full request collection without hand-writing anything. Both are plain OpenAPI 3 JSON.

To generate the same files offline — no running server needed — use the export command, which also writes the GraphQL SDL:

```bash
php artisan bagisto-api-platform:export-schema
```

## Reading errors

REST signals failure with the status code, and Swagger UI shows it alongside the body.

| Status | Body | What it means |
|---|---|---|
| `401` | `{"error": "missing_key"}` | No `X-STOREFRONT-KEY` — fill the field or enable auto-inject |
| `401` | `Invalid or expired token` | The Bearer in **Authorize** is wrong, expired, or is the legacy `apiToken` |
| `403` | `{"error": "invalid_key"}` | The storefront key is unknown, deactivated, or expired |
| `403` | Problem-details body | Authenticated, but not allowed — an admin token missing the permission, or a customer's record that is not theirs |
| `422` | Validation details | The request reached the endpoint and was rejected — read the field errors |
| `429` | `{"error": "rate_limit_exceeded"}` | Rate limit hit; `retry_after` is in seconds. See [Rate Limiting](/api/rate-limiting) |

A `401` that says `missing_key` is about the storefront key; one that mentions a token is about the Bearer. They are separate credentials, and shop endpoints often need both.

## Getting more from the page

- **Filter by tag, not just path.** Endpoints are grouped the way the admin panel is (`Admin Sales: Orders`, `Admin Catalog: Products`), so filtering by menu name finds a whole feature at once.
- **Read the response schema before the example.** Examples show one shape; the schema lists every field the endpoint can return, including the ones that are null in the sample.
- **Copy the curl, not the URL.** The generated curl carries the headers you configured, which is what makes it reproducible outside the browser.
- **Watch the paging headers.** Collection responses carry `X-Total-Count`, `X-Page`, `X-Per-Page`, and `X-Total-Pages`; Swagger shows them under the response body. See [Pagination](/api/pagination).

## Prefer GraphQL?

The same store serves a GraphQL schema with its own in-browser editor — see the [GraphQL Playground Guide](/api/graphql-api/playground).

## Related Documentation

- [Authentication](/api/rest-api/authentication) — the credential model
- [Integration Guides](/api/integrations) — client code once the request works
- [Status Codes](/api/errors) — the full status and error-body reference
- [Pagination](/api/pagination) — page, per_page, and the response headers
