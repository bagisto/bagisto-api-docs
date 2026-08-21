# Testing & Debugging

How to exercise the Bagisto API by hand and work out why a call failed. Almost everything here applies to **both transports** — the tools are the same, and only the way each one reports failure differs.

## The one difference that matters

REST puts the verdict in the **HTTP status**. GraphQL answers `200` almost always and puts the verdict in a top-level **`errors` array**.

```json
{
  "errors": [
    { "message": "Cannot query field \"nam\" on type \"Product\"." }
  ],
  "data": null
}
```

A client — or a test — that checks only `response.ok` will record that as a success. Whatever tool you use below, assert on `errors` for GraphQL and on the status for REST.

## In-browser playgrounds

Both surfaces ship an interactive editor, and they are the fastest way to confirm a payload before writing code.

| Transport | Shop | Admin |
|---|---|---|
| REST (Swagger UI) | `/api/shop` | `/api/admin` |
| GraphQL (GraphiQL) | `/api/graphiql` | `/api/admin/graphiql` |

Full walkthroughs: [REST Playground Guide](/api/rest-api/playground) and [GraphQL Playground Guide](/api/graphql-api/playground).

The machine-readable schemas live alongside them — `/api/shop/docs` and `/api/admin/docs` return OpenAPI JSON, and GraphQL introspection works without any credential. `php artisan bagisto-api-platform:export-schema` writes all four to files for Postman or a code generator without a running server.

## Testing with cURL

The most reliable method for scripts and CI.

```bash
# REST — public read
curl -X GET "https://your-domain.com/api/shop/products?per_page=5" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"

# REST — authenticated
curl -X GET "https://your-domain.com/api/shop/customer-addresses" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer 3627|DfkAK11F8qdqtaFVJPvBxlJyNbCSMNl8TFWhWm4G"

# GraphQL — same credentials, one endpoint
curl -X POST "https://your-domain.com/api/graphql" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"query":"{ products(first: 2) { edges { node { _id sku name } } } }"}'
```

Three flags worth knowing: `-i` prints the response headers (where REST reports paging), `-w "\n%{http_code} %{time_total}s\n"` prints the status and duration, and piping to `python3 -m json.tool` pretty-prints the body.

**Capture a token in one step** and reuse it:

```bash
TOKEN=$(curl -s -X POST "https://your-domain.com/api/shop/customer/login" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"email":"customer@example.com","password":"your-password"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
```

Use `token` from that response, never `apiToken` — the second is a legacy field and is rejected as a Bearer.

## Postman and Insomnia

Rather than building requests by hand, import the OpenAPI spec — you get every endpoint, its parameters, and its body schema in one step:

1. Fetch `https://your-domain.com/api/shop/docs` (or `/api/admin/docs`), or generate the file with `bagisto-api-platform:export-schema`.
2. Import it — Postman: **Import → File/Link**; Insomnia: **Import From → URL**.
3. Create an environment with the values you will reuse:

```
base_url      https://your-domain.com
storefront_key pk_storefront_xxxxxxxxxxxxx
token          <the token from login>
```

4. Set the collection-level headers to `X-STOREFRONT-KEY: {{storefront_key}}` and `Authorization: Bearer {{token}}` so every request inherits them.

For GraphQL, point a POST request at `{{base_url}}/api/graphql` and use the client's GraphQL body mode — both Postman and Insomnia will pull the schema for autocomplete once the storefront key header is set.

## Browser DevTools

For a storefront or admin app you are building, the Network tab answers most questions faster than any client:

- **Filter by Fetch/XHR** and select the failing call.
- **Headers** — confirm `X-STOREFRONT-KEY` and `Authorization` actually left the browser. A missing header is the single most common cause of a `401`.
- **Response** — for GraphQL, look for `errors` even on a green `200` row.
- **Timing** — separates a slow server from a slow render.
- **Copy → Copy as cURL** reproduces the exact request in a terminal, which is the quickest way to hand a bug to someone else.

## Debugging checklist

**`401` on every request**

- REST body says `missing_key` — the `X-STOREFRONT-KEY` header never arrived. Check the spelling: hyphens, and `KEY` not `API`.
- Body mentions a token — the Bearer is wrong, expired, or is `apiToken` instead of `token`.
- Admin routes take the Integration token **only**; sending a storefront key there changes nothing.

**`403`**

- `invalid_key` — the storefront key exists but is deactivated, expired, or blocked by its IP allowlist.
- Otherwise it is permissions: an admin token missing an ACL key, or a customer touching another customer's record.

**`422`**

The request reached the endpoint and was rejected. Read the field errors; they name the exact input.

**`429`**

Rate limited. `retry_after` is in seconds, and for a storefront key the window is an **hour** — see [Rate Limiting](/api/rate-limiting).

**GraphQL `Cannot query field …`**

The field does not exist on that type. Check the Docs panel in GraphiQL rather than guessing; validation happens before execution, so nothing ran.

**Empty or `null` fields with no error**

Usually the wrong identifier form. GraphQL nodes expose both `id` (an IRI string) and `_id` (numeric) — see [Identifiers](/api/graphql-api/identifiers).

**Slow whole-spec pages**

If `/api/shop`, `/api/admin`, or GraphQL introspection hangs, check `APP_DEBUG`. With it on, metadata is held in a per-request cache and the whole-spec pages rebuild every resource on each load, which can exceed the request limit. Individual endpoints are unaffected in either mode. Set `APP_DEBUG=false` and reload.

## Measuring performance

```bash
# Single request timing
curl -o /dev/null -s -w "status %{http_code}  total %{time_total}s  ttfb %{time_starttransfer}s\n" \
  "https://your-domain.com/api/shop/products" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"

# Sustained load — mind the rate limit before you run this
ab -n 100 -c 10 -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  "https://your-domain.com/api/shop/products"
```

Two things to control for. Load-testing a rate-limited key measures the limiter, not the API — use an unlimited key or stay under the cap. And run `php artisan bagisto-api-platform:optimize` first: on a store whose route and metadata caches were just cleared, the first requests pay a rebuild that is not representative.

## Writing automated tests

Whatever the framework, the assertions differ by transport:

```javascript
// REST — assert the status, then the body
const res = await fetch(`${BASE}/api/shop/products`, { headers });
expect(res.status).toBe(200);

// GraphQL — a 200 is not a pass
const res = await fetch(`${BASE}/api/graphql`, { method: 'POST', headers, body });
const json = await res.json();
expect(json.errors).toBeUndefined();
expect(json.data.products.edges.length).toBeGreaterThan(0);
```

Point tests at a store you can reset. Several endpoints write real records — registration, contact-us, newsletter, and cart creation all succeed with nothing but a storefront key — so a suite run against production leaves data behind.

## Related Documentation

- [Status Codes](/api/errors) — every status and error-body shape
- [Authentication](/api/authentication) — which credential each surface needs
- [Rate Limiting](/api/rate-limiting) — limits, headers, and back-off
- [Integration Guides](/api/integrations) — client code for your language
