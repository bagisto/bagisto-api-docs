---
outline: false
apiType: rest
---

# Country and State

The Country and State menu provides the reference data behind address forms — the list of countries the store accepts and the states / regions within each country. Use it to populate country and state dropdowns at registration, address creation and checkout.

## Countries and states

- **Countries** returns the full country list.
- **Country states** returns the states / regions for a country, so a client can show the correct state options once a country is chosen.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Countries](/api/rest-api/shop/countries/get-countries) | `GET /api/shop/countries` | List the available countries. |
| [Country States](/api/rest-api/shop/countries/get-country-states) | `GET /api/shop/country-states` | States / regions for a country. |

All Country and State endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
