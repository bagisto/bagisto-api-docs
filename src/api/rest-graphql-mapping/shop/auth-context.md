---
outline: false
---

# Auth & Context mapping

Authentication and the locale/currency/channel context are **identical** across REST and GraphQL — same headers, same tokens. Only the catalog filter/sort syntax differs (see [Catalog](/api/rest-graphql-mapping/shop/catalog)).

## Authentication headers

| Concept | REST | GraphQL |
|---|---|---|
| Storefront key | `X-STOREFRONT-KEY` header | `X-STOREFRONT-KEY` header (same) |
| Customer / guest-cart Bearer | `Authorization: Bearer <token>` | `Authorization: Bearer <token>` (same) |
| GraphQL endpoint | — | `POST /api/graphql` (shop) |

- **Which login field is the Bearer:** use `token` (format `<id>|<secret>`) — **never** `apiToken`. `apiToken` is a legacy field; sending it returns `Unauthenticated`.
- **Guest vs customer:** a guest cart/checkout call sends the **cart token** as the Bearer; a logged-in call sends the **customer token**. Both use the same `Authorization: Bearer` header.
- Credential lifetimes and the "no refresh token" rule: [Authentication](/api/authentication#credential-lifetimes).

## Context headers

| Concept | REST | GraphQL |
|---|---|---|
| Locale | `X-LOCALE` header (or `?locale=` on catalog) | `X-LOCALE` header |
| Currency | `X-CURRENCY` header | `X-CURRENCY` header |
| Channel | `X-CHANNEL` header (or `?channel=` on catalog) | `X-CHANNEL` header |

Omitting a context header (or passing an unknown value) falls back to the channel default. Discover valid values from [Locales](/api/rest-api/shop/locales/get-locales) and [Channels](/api/rest-api/shop/channels/get-channels) (a channel lists its allowed currencies and locales) — **not** the Countries endpoint (countries are for address forms).

## Response-shape differences

| | REST | GraphQL |
|---|---|---|
| Collection wrapper | flat JSON array + `X-Total-Count` / `X-Page` headers | Relay connection — `edges { node }` + `pageInfo` |
| Record id | numeric `id` | `id` is an **IRI** string; `_id` is the numeric id — [Identifiers](/api/graphql-api/identifiers) |
| Money fields | numeric | may serialise as strings — render the `formatted*` fields either way |
| Action results | JSON body with `success` / `message` | select the payload's **value field** (`cartId`, `orderId`, `success`) — not `id` |
