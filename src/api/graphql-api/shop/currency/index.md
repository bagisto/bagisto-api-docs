---
outline: false
---

# Currency

The Currency menu exposes the currencies the store supports. A client uses it to build a currency switcher and to read a currency's formatting details (code, symbol, decimal and separator settings) so prices render correctly.

## When you use it

List the currencies to populate a currency switcher, then fetch a single currency by id for its full formatting details.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Currencies](/api/graphql-api/shop/queries/get-currencies) | `currencies` query |
| [Single Currency](/api/graphql-api/shop/queries/get-currency) | `currency(id:)` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
