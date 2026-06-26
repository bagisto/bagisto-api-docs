---
outline: false
apiType: rest
---

# Locales

The Locales menu lists the languages the storefront is published in. A locale carries its language code, display name, text direction (`ltr` / `rtl`) and an optional logo. Use it to build a language switcher, to know which `locale` codes you may pass on catalog and content requests, and to render right-to-left layouts correctly.

## When a client uses this

Call the list endpoint once on app start to populate a language picker, then fetch a single locale by id when you need its full detail. The `code` you read here is the same value you send as the `locale` query parameter on product, category and other localised requests.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get All Locales](/api/rest-api/shop/locales/get-locales) | `GET /api/shop/locales` | Paginated list of every available locale. |
| [Get Single Locale](/api/rest-api/shop/locales/get-single-locale) | `GET /api/shop/locales/{id}` | A single locale by id. |

All Locale endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
