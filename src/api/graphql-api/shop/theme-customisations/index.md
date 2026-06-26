---
outline: false
---

# Theme Customisations

The Theme Customisations menu exposes the configurable storefront content blocks the store owner has set up — image carousels, static content snippets, product carousels, footer link sets, and similar. A client uses it to render the same homepage / landing content the store has configured, without hard-coding it.

## When you use it

Fetch the list to discover every active content block for the current channel and locale, then render each block according to its `type`. The single query returns one block's details by id.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Theme Customisations](/api/graphql-api/shop/queries/theme-customisations) | `themeCustomizations` query |
| [Single Theme Customisation](/api/graphql-api/shop/queries/single-theme-customisation) | `themeCustomization(id:)` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
