---
outline: false
---

# Authentication (GraphQL)

The full authentication model — public access, customer login, guest checkout, and admin — lives on the central [Authentication](/api/authentication) page. This page is the **GraphQL-specific** quickref: the endpoints, the headers, and the exact operations.

## Endpoints

| Surface | Endpoint | Headers |
|---------|----------|---------|
| Shop | `POST /api/graphql` | `X-STOREFRONT-KEY` (always) + `Authorization: Bearer <token>` for customer actions |
| Admin | `POST /api/admin/graphql` | `Authorization: Bearer <id>\|<token>` only (no storefront key) |

The shop and admin GraphQL endpoints are separate. Never send an admin token to `/api/graphql` or a storefront key to `/api/admin/graphql`.

## Public access

The `X-STOREFRONT-KEY` alone gives read-only access to public data (products, categories, CMS):

```bash
curl -X POST "https://your-domain.com/api/graphql" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"query":"query { products(first: 10) { edges { node { id name } } } }"}'
```

## Customer login — get a token

```graphql
mutation {
  createCustomerLogin(input: { email: "john@example.com", password: "SecurePass@123" }) {
    customerLogin {
      token
      success
      message
    }
  }
}
```

Send `token` (format `<id>|<secret>`) as `Authorization: Bearer <token>` on every authenticated request. Use `token`, **not** `apiToken` (a legacy field that is not a Bearer). There is no refresh token — on a `401`, log in again. Full field reference on the [Customer Login](/api/graphql-api/shop/mutations/customer-login) page.

## Guest — act without login

A guest can build a cart and place an order using a **cart token** as the Bearer:

```graphql
mutation {
  createCartToken(input: {}) {
    cartToken
  }
}
```

Send the returned `cartToken` as `Authorization: Bearer <cartToken>` alongside the `X-STOREFRONT-KEY` on cart and checkout calls. See the [Cart](/api/workflows/shop/cart) and [Checkout](/api/workflows/shop/checkout) workflows.

## Admin

Admin clients use a pre-issued **Integration token** (no login) sent as `Authorization: Bearer <id>|<token>` to `/api/admin/graphql`. See [Admin Authentication](/api/graphql-api/admin/authentication) for the token model, permissions, IP allowlist, expiry, and rate limits.

## Related

- [Authentication](/api/authentication) — the full model (public / customer / guest / admin)
- [Status Codes](/api/errors) — how failures are reported (including `401`)
- [Identifiers](/api/graphql-api/identifiers) — `id` vs `_id` vs IRI
