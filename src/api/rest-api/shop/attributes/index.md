---
outline: false
apiType: rest
---

# Attribute

The Attribute menu exposes the catalog's attribute definitions — the named properties products carry (such as colour, size or brand) along with their selectable options and per-locale translations. Use it to build product filters, render variant selectors, and label attribute values in the shopper's language.

## Attributes, Options and Translations

- **Attributes** are the property definitions — `code`, `type`, and the flags that decide how each behaves.
- **Attribute options** are the selectable values of option-type attributes, such as the list of colours.
- **Attribute translations** hold the localised label for an attribute, keyed by locale.

An attribute row already **inlines its own `options`**, each with their translations. A filter UI or variant picker therefore needs one call, not one per attribute.

## The Flags That Matter to a Client

| Flag | What it decides |
|------|-----------------|
| `isFilterable` | Whether the storefront filters on it. Only these belong in a facet list — an attribute existing does not mean the catalog can be narrowed by it. |
| `isConfigurable` | Whether variants are built from it, which is what a variant selector should render. |
| `isVisibleOnFront` | Whether the value belongs on a product page at all. |
| `valuePerLocale` / `valuePerChannel` | Whether the value changes with the request locale or channel — worth knowing before caching one. |
| `type` | `text`, `select`, `multiselect`, `boolean`, `price`, and so on. Decides which input renders and whether `options` is populated. |

## No Filtering on These Endpoints

Neither collection accepts a filter. `?code=color` on the attribute list and `?attribute_id=23` on the options list are both accepted by the URL and ignored — every call returns the same first page. There is also no `/attributes/{id}/options` route.

To work with a single attribute, either fetch it by id at `GET /api/shop/attributes/{id}` and read its inline `options`, or page through the list and match on `code` client-side. The catalog carries roughly 42 attributes, so a full walk at `per_page=50` is a single request.

## How These Feed Product Filtering

The product listing turns any filterable attribute code into a query parameter — `?color=3&size=4,5` — and the values are **option ids**, not labels. That mapping is exactly what this menu provides: read `isFilterable`, take the attribute's `code` for the parameter name, and take `options[].id` for its value. See [Search Products](/api/rest-api/shop/products/search-product).

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Attributes](/api/rest-api/shop/attributes/get-attributes) | `GET /api/shop/attributes` | List attribute definitions. |
| [Attribute Options](/api/rest-api/shop/attributes/get-attribute-options) | `GET /api/shop/attribute-options` | Flat collection of every option row. |
| [Attribute Translations](/api/rest-api/shop/attributes/get-attribute-translations) | `GET /api/shop/attribute_translations` | Localised labels for an attribute. |

All Attribute endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
