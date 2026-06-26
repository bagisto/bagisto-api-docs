---
outline: false
---

# Attribute

The Attribute menu exposes the product attributes the store uses — things like colour, size, brand — and their options. A client uses it to build filter controls on a product-listing page and to render attribute-driven selectors (for example, the colour / size pickers on a configurable product).

## When you use it

List the attributes to discover which ones are filterable, fetch a single attribute by id for its details, and read an attribute's options (for example, all the colour values) to populate a dropdown or swatch picker.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Attributes](/api/graphql-api/shop/queries/get-attributes) | `attributes` query |
| [Single Attribute](/api/graphql-api/shop/queries/get-attribute) | `attribute(id:)` query |
| [Attribute Options](/api/graphql-api/shop/queries/get-attribute-options) | `attributeOptions` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
