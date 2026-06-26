---
outline: false
---

# Country

The Country menu exposes the countries and their states/regions the store recognises. A client uses it to populate country and state dropdowns on address forms — at registration, in the address book, and during checkout.

## When you use it

List the countries to fill a country dropdown, fetch a single country by code for its details, and read a country's states (or one state) to fill the dependent state / region dropdown once a country is chosen.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Countries](/api/graphql-api/shop/queries/get-countries) | `countries` query |
| [Single Country](/api/graphql-api/shop/queries/get-country) | `country(id:)` query |
| [Country States](/api/graphql-api/shop/queries/get-country-states) | `countryStates` query |
| [Country State](/api/graphql-api/shop/queries/get-country-state) | `countryState(id:)` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
