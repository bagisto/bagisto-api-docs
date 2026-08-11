---
outline: false
---

# Attribute

The Attribute menu exposes the product attributes the store uses — things like colour, size, brand — and their options. A client uses it to build filter controls on a product-listing page and to render attribute-driven selectors (for example, the colour / size pickers on a configurable product).

## Choosing a query

Three queries read the same data at different scopes:

- **One attribute** — `attribute(id:)` returns a single attribute together with its own options, in order. This is what a colour or size picker needs.
- **Every attribute** — `attributes` pages through the whole catalog. It takes no filter argument, so narrow the result in the client.
- **Every option** — `attributeOptions` pages through option values across all attributes at once. Nodes carry no attribute reference, so it suits building a lookup table rather than filling one control.

For a category's filter sidebar, none of these is the right tool — [Category Attribute Filters](/api/graphql-api/shop/queries/get-category-attribute-filters) returns only the attributes marked filterable for that category, with the price range attached.

## Reading the values

Two things catch clients out across all three queries. The boolean-looking fields — `isFilterable`, `isConfigurable`, `valuePerLocale` and the rest — are the **strings** `"1"` and `"0"`, so a truthiness test on `"0"` gives the wrong answer. And `adminName` is an internal label that is never translated; the shopper-facing text is `translation.name` on an attribute and `translation.label` on an option.

When filtering products, the key is the attribute's `code` and the value is the option's `_id`.

## Operations

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List attributes | [`attributes`](/api/graphql-api/shop/queries/get-attributes) | Cursor-paginated list of every attribute, each with its options and translations. |
| View one attribute | [`attribute`](/api/graphql-api/shop/queries/get-attribute) | A single attribute by IRI or numeric ID, with its own options. |
| List attribute options | [`attributeOptions`](/api/graphql-api/shop/queries/get-attribute-options) | Option values across every attribute, unscoped. |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
