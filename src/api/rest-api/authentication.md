---
outline: false
---

# Authentication (REST)

The full authentication model — public access, customer login, guest checkout, and admin — lives on the central [Authentication](/api/authentication) page. This page is the **REST-specific** quickref: the base URLs, the headers, and the exact calls.

## Base URLs

| Surface | Base | Headers |
|---------|------|---------|
| Shop | `/api/shop/*` | `X-STOREFRONT-KEY` (always) + `Authorization: Bearer <token>` for customer actions |
| Admin | `/api/admin/*` | `Authorization: Bearer <id>\|<token>` only (no storefront key) |

## Public access

The `X-STOREFRONT-KEY` alone gives read-only access to public data (products, categories, CMS):

```bash
curl -X GET "https://your-domain.com/api/shop/products" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"
```

## Customer login — get a token

```bash
curl -X POST "https://your-domain.com/api/shop/customer/login" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"email":"john@example.com","password":"SecurePass@123"}'
```

The response returns `token` (format `<id>|<secret>`) — send it as `Authorization: Bearer <token>` on every authenticated request. Use `token`, **not** `apiToken` (a legacy field that is not a Bearer). There is no refresh token — on a `401`, log in again. Full field reference on the [Customer Login](/api/rest-api/shop/customers/customer-login) page.

## Guest — act without login

A guest can build a cart and place an order using a **cart token** as the Bearer: create a cart to obtain the token — [Create Cart](/api/rest-api/shop/cart/create-cart) — then send it as `Authorization: Bearer <cartToken>` alongside the `X-STOREFRONT-KEY` on cart and checkout calls. See the [Cart](/api/workflows/shop/cart) and [Checkout](/api/workflows/shop/checkout) workflows.

## Admin

Admin clients use a pre-issued **Integration token** (no login) sent as `Authorization: Bearer <id>|<token>` to `/api/admin/*`. See [Admin Authentication](/api/rest-api/admin/authentication) for the token model, permissions, IP allowlist, expiry, and rate limits.

## Related

- [Authentication](/api/authentication) — the full model (public / customer / guest / admin)
- [Status Codes](/api/errors) — how failures are reported (including `401`)
- [Pagination](/api/pagination) · [Sorting](/api/sorting)
