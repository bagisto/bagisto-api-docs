---
outline: false
---

# REST ↔ GraphQL mapping

REST and GraphQL expose the **same** Bagisto data and behaviour with different syntax. This section is the single reference for translating one to the other — most integration friction comes from mixing the two forms (for example sending a `?parent_id=` shape into the GraphQL `categories` field, which has no such argument).

Read it **REST-first**: find the REST endpoint you know, then read across to its GraphQL equivalent.

## The two shapes

| | REST | GraphQL |
|---|---|---|
| Endpoint | one URL per operation (`GET /api/shop/products`) | one field per operation (`products`), all on `POST /api/graphql` |
| Filters | query string — `?category_id=&price=&new=1` | a JSON **string** in `filter:` — `filter: "{\"category_id\":\"22\"}"` |
| Sort | `?sort=price-asc` | `sortKey: "PRICE", reverse: false` |
| Pagination | `?page=2&per_page=30` + `X-Total-Count` headers | `first`/`after` cursor + `pageInfo` (Relay connection) |
| Record id | numeric `id` | `id` is an **IRI** string; `_id` is the numeric id — see [Identifiers](/api/graphql-api/identifiers) |
| Auth | `X-STOREFRONT-KEY` + `Authorization: Bearer` | same headers |

Any key outside the reserved set is treated as a filterable attribute on **both** transports — REST reserves `query, sort, order, page, per_page, locale, channel, filter`; GraphQL reserves `query, sortKey, reverse, first, after, filter`.

## Shop mapping by area

| Area | What it covers |
|---|---|
| [Catalog](/api/rest-graphql-mapping/shop/catalog) | Products, categories, attributes — filters, sort, pagination (the biggest source of REST↔GraphQL confusion) |
| [Cart & Checkout](/api/rest-graphql-mapping/shop/cart-checkout) | Cart tokens, cart items, coupons, addresses, shipping/payment methods, place order |
| [Customer Account](/api/rest-graphql-mapping/shop/customer-account) | Profile, addresses, orders, wishlist, compare, downloadable, reviews, returns (RMA), EU withdrawal, GDPR |
| [Auth & Context](/api/rest-graphql-mapping/shop/auth-context) | Storefront key, customer/guest Bearer, `token` vs `apiToken`, locale/currency/channel headers |

::: tip Admin mapping
This section currently covers the **Shop** surface. Admin REST ↔ GraphQL mapping is tracked separately.
:::
