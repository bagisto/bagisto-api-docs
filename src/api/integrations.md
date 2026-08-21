# Integration Guides

Working client code for the Bagisto API in the language you are building in. Both transports are covered — pick one, wire up the client below, then follow the per-language guide for the rest.

## Which transport

Both surfaces expose the same data and the same capabilities. The choice is about how you fetch it, not what you can reach.

| | REST | GraphQL |
|---|---|---|
| Endpoint | `/api/shop/*` — one path per resource | `POST /api/graphql` — one endpoint |
| Fetching a screen | One call per resource; a product page may take several | One call selects exactly the fields the screen needs |
| Filtering & sorting | Query string — `?category_id=&price=&sort=` | A JSON `filter:` string plus `sortKey`/`reverse` |
| Paging | `page` + `per_page`, totals in response headers | Cursor — `first` + `after`, with `pageInfo` |
| Failure signal | The HTTP status code | HTTP `200` with a top-level `errors` array |
| Good fit for | Simple screens, server scripts, quick integrations | Rich screens that would otherwise need several round trips |

Nothing stops you mixing them in one app — the credentials are identical.

## What every request needs

| Surface | Required headers |
|---|---|
| Shop (public) | `X-STOREFRONT-KEY: <key>` |
| Shop (customer or guest cart) | `X-STOREFRONT-KEY` **plus** `Authorization: Bearer <token>` |
| Admin | `Authorization: Bearer <id>\|<token>` only — **no** storefront key |

Two things to get right on the shop side: the Bearer is the `token` from login, **not** the `apiToken` that comes back alongside it, and a guest can act without an account by sending a [cart token](/api/rest-api/shop/cart/create-cart) as the Bearer. Full model on the [Authentication](/api/authentication) page.

## The shape of a client

Every example on the two per-language pages is built the same way: one function that attaches the headers and unwraps the response, then thin calls on top of it. In JavaScript, that is:

::: code-group

```javascript [REST]
const BASE_URL = 'https://your-domain.com/api/shop';
const STOREFRONT_KEY = 'pk_storefront_xxxxxxxxxxxxx';

async function api(path, { method = 'GET', body, token } = {}) {
  const headers = { 'X-STOREFRONT-KEY': STOREFRONT_KEY };
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // REST signals failure with the status code.
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const products = await api('/products?per_page=20&sort=name-asc');
```

```javascript [GraphQL]
const API_URL = 'https://your-domain.com/api/graphql';
const STOREFRONT_KEY = 'pk_storefront_xxxxxxxxxxxxx';

async function gql(query, variables = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    'X-STOREFRONT-KEY': STOREFRONT_KEY,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  // GraphQL returns 200 even on failure — the reason is in errors[].
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

const { products } = await gql(`
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges { node { id _id name sku } }
      pageInfo { hasNextPage endCursor }
    }
  }
`, { first: 20 });
```

:::

The difference that catches people out is the error check. A failed GraphQL request still returns HTTP `200`, so a client that only inspects the status code will treat an error as success and hand `null` fields to the UI.

## Your language

Each guide carries a client, a login call, and an authenticated call, ready to paste.

| Language | REST | GraphQL |
|---|---|---|
| JavaScript / Node.js | [Fetch, Axios, Next.js](/api/rest-api/integrations#javascript-node-js) | [Fetch, Apollo, graphql-request, Next.js](/api/graphql-api/integrations#javascript-node-js) |
| Python | [requests, Django](/api/rest-api/integrations#python) | [requests, gql](/api/graphql-api/integrations#python) |
| PHP | [cURL, Laravel HTTP client](/api/rest-api/integrations#php) | [cURL, Laravel HTTP client](/api/graphql-api/integrations#php) |
| Ruby | [Net::HTTP](/api/rest-api/integrations#ruby) | [Net::HTTP](/api/graphql-api/integrations#ruby) |
| Go | [net/http](/api/rest-api/integrations#go) | [net/http](/api/graphql-api/integrations#go) |
| Java | [OkHttp](/api/rest-api/integrations#java) | [OkHttp](/api/graphql-api/integrations#java) |
| cURL | [Shell examples](/api/rest-api/integrations#curl) | [Shell examples](/api/graphql-api/integrations#curl) |

All examples target the **Shop** API. For a back-office integration the calls are the same shape with a different credential — see [Admin Authentication](/api/rest-api/admin/authentication).

## Before you ship

- **Handle `401` by getting a new credential.** There is no refresh token anywhere in the API: re-login for a customer token, regenerate an admin token, rotate a storefront key.
- **Treat the storefront key as public.** It ships in browser and mobile bundles, and it permits the storefront's open writes (contact form, newsletter, registration, cart creation), so protect those forms on your side.
- **Page properly.** REST caps `per_page` at 50 and reports totals in headers; GraphQL pages with cursors until `pageInfo.hasNextPage` is false. See [Pagination](/api/pagination).
- **Back off on `429`.** The storefront key's limit is applied per hour, so a retry loop can wait a long time — see [Rate Limiting](/api/rate-limiting).
- **Store `_id`, pass `id` back.** GraphQL nodes carry both; only the numeric one is stable for your database and for REST URLs. See [Identifiers](/api/graphql-api/identifiers).

## Related Documentation

- [Authentication](/api/authentication) — which credential for which surface
- [Status Codes](/api/errors) — HTTP statuses and the error body shape
- [Pagination](/api/pagination) — both paging models
- [Workflows](/api/workflows/) — ordered, end-to-end call sequences
