---
outline: false
apiType: rest
---

# Attribute

The Attribute menu exposes the catalog's attribute definitions — the named properties products carry (such as colour, size or brand) along with their selectable options and per-locale translations. Use it to build product filters, render variant selectors, and label attribute values in the shopper's language.

## Attributes, options and translations

- **Attributes** are the property definitions themselves (code, type, and flags such as whether they're filterable).
- **Attribute options** are the selectable values for option-type attributes (e.g. the list of colours), used to populate filters and variant pickers.
- **Attribute translations** provide the localised labels for an attribute, so a client can display it in the requested language.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Attributes](/api/rest-api/shop/attributes/get-attributes) | `GET /api/shop/attributes` | List attribute definitions. |
| [Attribute Options](/api/rest-api/shop/attributes/get-attribute-options) | `GET /api/shop/attribute-options` | Selectable options for an attribute. |
| [Attribute Translations](/api/rest-api/shop/attributes/get-attribute-translations) | `GET /api/shop/attribute_translations` | Localised labels for an attribute. |

All Attribute endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
