---
outline: false
apiType: rest
---

# Locales

The Locales menu lists the languages the storefront is published in. A locale carries its language code, display name, text direction (`ltr` / `rtl`) and an optional logo. Use it to build a language switcher, to know which `locale` codes you may pass on catalog and content requests, and to render right-to-left layouts correctly.

## When a Client Uses This

Call the list once on app start to populate a language picker. The `code` you read here is the value you send as the `X-Locale` header (or the `locale` query parameter) on every localised request — catalog, categories, CMS pages, attributes.

## What a Locale Row Carries

| Field | Why it matters |
|-------|----------------|
| `code` | The value `X-Locale` expects. The numeric `id` is not accepted as a locale. |
| `name` | Display label for a language switcher. |
| `direction` | `ltr` or `rtl`. This exists so a client can flip its layout without hardcoding a list of right-to-left languages. |
| `logoPath` / `logoUrl` | Optional flag or badge image, `null` when the store set none. |
| `createdAt` / `updatedAt` | `null` on locales installed with the store — normal, not an error. |

## Locale Resolution on Other Endpoints

Sending an unknown or disabled `X-Locale` is not an error: the request falls back to the channel's default locale and returns content in that language instead. Content endpoints report which locale actually answered — a CMS page's `translation.locale`, a category's `translation.locale` — so read that back rather than assuming the requested code was honoured.

Locales are configured per channel, so the set enabled on one storefront may differ from another. This endpoint lists every locale the store has, not just the ones the current channel enables; the channel's own set is on its [channel](/api/rest-api/shop/channels/get-channels) record.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get All Locales](/api/rest-api/shop/locales/get-locales) | `GET /api/shop/locales` | Paginated list of every available locale. |
| [Get Single Locale](/api/rest-api/shop/locales/get-single-locale) | `GET /api/shop/locales/{id}` | A single locale by id. |

The list is static reference data — cache it and refresh only when the store adds a language.

All Locale endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
