---
outline: false
---

# Locales

The Locales menu exposes the languages the storefront is published in. A client uses it to discover which locales are available — and the details of each one (code, name, text direction, logo) — so it can let a shopper switch language or render content in the right reading direction.

## When you use it

Call the list to populate a language switcher, then use the single-locale query to read one locale's full details by id. Each locale carries its `code` (e.g. `en`), display `name`, and `direction` (`ltr` or `rtl`) so the UI can lay out text correctly.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Locales](/api/graphql-api/shop/locales/queries/locales) | `locales` query |
| [Single Locale](/api/graphql-api/shop/locales/queries/single-locale) | `locale(id:)` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
