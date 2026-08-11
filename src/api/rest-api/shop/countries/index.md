---
outline: false
apiType: rest
---

# Country and State

The Country and State menu provides the reference data behind address forms — the list of countries the store accepts and the states / regions within each country. Use it to populate country and state dropdowns at registration, address creation and checkout.

## Countries and States

- **Countries** returns the full country list — 254 rows, each with its `code`, `name`, and its states inlined under `states`.
- **Country states** returns state and region rows. The states for one country are already inside that country's row, so this endpoint is only needed when you want state records on their own.

## Reading the States of One Country

There are two paths, and only one of them filters:

| Path | Behaviour |
|------|-----------|
| `GET /api/shop/countries/{countryId}/states` | Returns just that country's states. |
| `GET /api/shop/country-states` | The whole 586-row collection, paginated. **It takes no filter** — `?country_id=`, `?countryCode=` and the like are accepted by the URL and ignored, so every call returns the same first page. |

For an address form, the simplest route is to read the country list once: each row already carries its `states`, so a country/state picker needs a single request rather than one per country.

## Paging Through the Full Lists

Both collections default to 10 rows per page and cap at 50, with totals in the `X-Total-Count`, `X-Page`, `X-Per-Page`, and `X-Total-Pages` headers. Left at the default, the country list takes 26 requests to walk — raise `per_page` to 50 and cache the result, since this is static reference data that only changes when the store's country set is edited.

## Localisation

Country and state names follow the request locale through `X-Locale`; each row also carries a `translations` array holding every stored language, so a multilingual client can cache them all in one pass. Match a shopper's saved address on `code`, never on the display name — the name changes with the locale, the code does not.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Countries](/api/rest-api/shop/countries/get-countries) | `GET /api/shop/countries` | List the available countries. |
| [Country States](/api/rest-api/shop/countries/get-country-states) | `GET /api/shop/country-states` | Flat, unfiltered collection of state rows. |

These codes are what the rest of the API expects: address create and update, and the checkout address step, all store `country` and `state` as codes taken from here.

All Country and State endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
