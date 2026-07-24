---
outline: false
examples:
  - id: get-category-attribute-filters-basic
    title: Get Category Attribute Filters - Basic
    description: Fetch the filters available on a category, with the price range for the slider.
    query: |
      query getCategoryAttributeFilters($categorySlug: String, $first: Int) {
        categoryAttributeFilters(categorySlug: $categorySlug, first: $first) {
          edges {
            node {
              _id
              code
              adminName
              type
              swatchType
              position
              minPrice
              maxPrice
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {
        "categorySlug": "mens",
        "first": 3
      }
    response: |
      {
        "data": {
          "categoryAttributeFilters": {
            "edges": [
              {
                "node": {
                  "_id": 11,
                  "code": "price",
                  "adminName": "Price",
                  "type": "price",
                  "swatchType": null,
                  "position": 13,
                  "minPrice": "24.99",
                  "maxPrice": "299.99"
                }
              },
              {
                "node": {
                  "_id": 23,
                  "code": "color",
                  "adminName": "Color",
                  "type": "select",
                  "swatchType": null,
                  "position": 26,
                  "minPrice": "24.99",
                  "maxPrice": "299.99"
                }
              },
              {
                "node": {
                  "_id": 24,
                  "code": "size",
                  "adminName": "Size",
                  "type": "select",
                  "swatchType": null,
                  "position": 27,
                  "minPrice": "24.99",
                  "maxPrice": "299.99"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "Mg=="
            }
          }
        }
      }
  - id: get-category-attribute-filters-with-options
    title: Get Category Attribute Filters - With Options & Swatches
    description: Fetch each filter together with its selectable options and swatch data, ready to render a facet sidebar.
    query: |
      query getCategoryAttributeFilters($categorySlug: String, $first: Int) {
        categoryAttributeFilters(categorySlug: $categorySlug, first: $first) {
          edges {
            node {
              _id
              code
              adminName
              type
              swatchType
              position
              minPrice
              maxPrice
              options {
                edges {
                  node {
                    _id
                    adminName
                    sortOrder
                    swatchValue
                    swatchValueUrl
                  }
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "categorySlug": "mens",
        "first": 2
      }
    response: |
      {
        "data": {
          "categoryAttributeFilters": {
            "edges": [
              {
                "node": {
                  "_id": 11,
                  "code": "price",
                  "adminName": "Price",
                  "type": "price",
                  "swatchType": null,
                  "position": 13,
                  "minPrice": "24.99",
                  "maxPrice": "299.99",
                  "options": {
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "_id": 23,
                  "code": "color",
                  "adminName": "Color",
                  "type": "select",
                  "swatchType": null,
                  "position": 26,
                  "minPrice": "24.99",
                  "maxPrice": "299.99",
                  "options": {
                    "edges": [
                      {
                        "node": {
                          "_id": 1,
                          "adminName": "Red",
                          "sortOrder": 1,
                          "swatchValue": null,
                          "swatchValueUrl": null
                        }
                      },
                      {
                        "node": {
                          "_id": 2,
                          "adminName": "Green",
                          "sortOrder": 2,
                          "swatchValue": null,
                          "swatchValueUrl": null
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
  - id: get-category-attribute-filters-translations
    title: Get Category Attribute Filters - With Translations
    description: Fetch the localized labels for the filter and each of its options.
    query: |
      query getCategoryAttributeFilters($categorySlug: String, $first: Int) {
        categoryAttributeFilters(categorySlug: $categorySlug, first: $first) {
          edges {
            node {
              _id
              code
              adminName
              translations {
                edges {
                  node {
                    locale
                    name
                  }
                }
              }
              options {
                edges {
                  node {
                    _id
                    adminName
                    translations {
                      edges {
                        node {
                          locale
                          label
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "categorySlug": "mens",
        "first": 1
      }
    response: |
      {
        "data": {
          "categoryAttributeFilters": {
            "edges": [
              {
                "node": {
                  "_id": 23,
                  "code": "color",
                  "adminName": "Color",
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "locale": "en",
                          "name": "Color"
                        }
                      }
                    ]
                  },
                  "options": {
                    "edges": [
                      {
                        "node": {
                          "_id": 1,
                          "adminName": "Red",
                          "translations": {
                            "edges": [
                              {
                                "node": {
                                  "locale": "en",
                                  "label": "Red"
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
  - id: get-category-attribute-filters-all
    title: Get Category Attribute Filters - Whole Catalog
    description: Omit categorySlug to get every filterable attribute in the catalog, with the catalog-wide price range.
    query: |
      query getCategoryAttributeFilters($first: Int) {
        categoryAttributeFilters(first: $first) {
          edges {
            node {
              _id
              code
              adminName
              type
              isFilterable
              minPrice
              maxPrice
            }
          }
        }
      }
    variables: |
      {
        "first": 2
      }
    response: |
      {
        "data": {
          "categoryAttributeFilters": {
            "edges": [
              {
                "node": {
                  "_id": 11,
                  "code": "price",
                  "adminName": "Price",
                  "type": "price",
                  "isFilterable": "1",
                  "minPrice": "24.99",
                  "maxPrice": "299.99"
                }
              },
              {
                "node": {
                  "_id": 23,
                  "code": "color",
                  "adminName": "Color",
                  "type": "select",
                  "isFilterable": "1",
                  "minPrice": "24.99",
                  "maxPrice": "299.99"
                }
              }
            ]
          }
        }
      }
---

# Get Category Attribute Filters

## About

The `categoryAttributeFilters` query returns the filters a shopper can apply on a category listing — the attribute facets the merchant marked filterable for that category, their selectable options, swatch data, localized labels, and the category's price range.

This is the companion to [Get Products](/api/graphql-api/shop/queries/get-products): `categoryAttributeFilters` tells you **which filters exist and what values they accept**, and `products(filter: ...)` applies them.

Use it to:

- Render a filter sidebar or mobile filter drawer without hardcoding facets.
- Bound a price-range slider with real values instead of guessing.
- Render colour and image swatches from the merchant's own swatch configuration.
- Localize filter and option labels.

::: tip Do not build facets from `attributes`
The [Get Attributes](/api/graphql-api/shop/queries/get-attributes) query lists **every** attribute in the catalog, filterable or not, and is not category-aware. `categoryAttributeFilters` returns only what belongs on that category's filter UI.
:::

## Authentication

Public query — no customer token required. It still needs the storefront key like every shop call; see [Authentication](/api/graphql-api/shop/authentication).

If a customer **is** authenticated, `minPrice` / `maxPrice` are calculated against that customer's customer group, so group-specific pricing is reflected in the slider. Guests get the guest-group range.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `categorySlug` | `String` | ❌ No | Slug of the category being viewed (e.g. `mens`). Restricts the result to that category's filterable attributes and scopes the price range to its products. Omit to return every filterable attribute in the catalog. |
| `first` | `Int` | ❌ No | Number of filters to return from the start (forward pagination). Defaults to 30. |
| `after` | `String` | ❌ No | Cursor to start after for forward pagination. |
| `last` | `Int` | ❌ No | Number of filters to return from the end (backward pagination). |
| `before` | `String` | ❌ No | Cursor to start before for backward pagination. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CategoryAttributeFilterEdge!]!` | Array of filter edges. |
| `edges.node` | `CategoryAttributeFilter!` | The filter (attribute) object. |
| `edges.cursor` | `String!` | Pagination cursor for this filter. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more filters exist after this page. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether filters exist before this page. |
| `pageInfo.startCursor` | `String` | Cursor of the first filter on this page. |
| `pageInfo.endCursor` | `String` | Cursor of the last filter on this page. |

## CategoryAttributeFilter Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Resource identifier string. Prefer `_id` — this filter has no standalone endpoint to follow. |
| `_id` | `Int!` | Numeric attribute ID. |
| `code` | `String!` | **The filter parameter name.** Send this as the key when filtering products (e.g. `color`). |
| `adminName` | `String!` | Admin-facing attribute name. Use `translations` for the shopper-facing label. |
| `type` | `String!` | Attribute type — `price`, `select`, `multiselect`, `checkbox`, `boolean`, `text`, … Drives which control to render. |
| `swatchType` | `String` | `color`, `image`, `text`, or `null`. When `color`, render each option's `swatchValue` as a colour chip; when `image`, render `swatchValueUrl`. |
| `position` | `Int` | Sort order for the filter list. Render ascending. |
| `minPrice` | `String` | Lowest product price in scope, for the price slider's lower bound. |
| `maxPrice` | `String` | Highest product price in scope, for the price slider's upper bound. |
| `isFilterable` | `String!` | `"1"` when the attribute is filterable. |
| `isComparable` | `String!` | `"1"` when the attribute appears on the compare page. |
| `isConfigurable` | `String!` | `"1"` when the attribute drives configurable-product variants. |
| `isRequired` | `String!` | `"1"` when the attribute is mandatory on the product form. |
| `isUnique` | `String!` | `"1"` when values must be unique across products. |
| `isUserDefined` | `String!` | `"1"` for merchant-created attributes, `"0"` for system attributes. |
| `isVisibleOnFront` | `String!` | `"1"` when the attribute is shown on the product page. |
| `valuePerLocale` | `String!` | `"1"` when the value varies per locale. |
| `valuePerChannel` | `String!` | `"1"` when the value varies per channel. |
| `defaultValue` | `Int` | Default option ID, when the attribute defines one. |
| `validation` | `String` | Validation rule applied to the value (e.g. `decimal`, `email`). |
| `validations` | `String` | Additional validation metadata. |
| `regex` | `String` | Regex the value must match, when configured. |
| `columnName` | `String` | Underlying storage column, when applicable. |
| `enableWysiwyg` | `String!` | `"1"` when the admin editor uses a rich-text field. |
| `createdAt` | `String` | Creation timestamp. |
| `updatedAt` | `String` | Last-updated timestamp. |
| `options` | `AttributeOptionCursorConnection` | Selectable values for this filter. Empty for `price` and free-text attributes. |
| `translation` | `AttributeTranslationFilter` | Label for the current locale — exposes `locale` and `name`. |
| `translations` | `AttributeTranslationFilterCursorConnection` | Labels for every locale. |

::: warning Boolean-ish fields are strings
`isFilterable`, `isComparable`, `isRequired` and the other `is*` / `valuePer*` fields return the **strings** `"1"` / `"0"`, not GraphQL booleans. Compare accordingly.
:::

## Option Fields

Each entry in `options.edges.node`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Option identifier in the form `/api/shop/attribute-options/{id}`. |
| `_id` | `Int!` | **The value to send when filtering.** |
| `adminName` | `String` | Admin-facing option name. Use `translations` for the shopper-facing label. |
| `sortOrder` | `Int` | Display order within the filter. |
| `swatchValue` | `String` | Hex colour for a colour swatch, or the text value. |
| `swatchValueUrl` | `String` | URL of the swatch image, for image swatches. |
| `translation` | `AttributeOptionTranslation` | Label for the current locale — exposes `locale` and `label`. |
| `translations` | `AttributeOptionTranslationCursorConnection` | Labels for every locale. |

## Applying the filters

Take `code` from the filter and `_id` from the chosen option, then pass them to [Get Products](/api/graphql-api/shop/queries/get-products):

```graphql
query getProducts($filter: String) {
  products(first: 12, filter: $filter) {
    edges {
      node {
        id
        name
        formattedPrice
      }
    }
  }
}
```

```json
{
  "filter": "{\"category_id\":\"22\",\"color\":\"1\",\"price\":\"24.99,150\"}"
}
```

The price range uses the `from,to` form and should stay inside the `minPrice`/`maxPrice` bounds returned here.

## REST equivalent

There is no dedicated REST endpoint. The same data is embedded in the category payload — `GET /api/shop/categories/{id}` returns `filterableAttributes` (each with its options and translations) plus the category's `minPrice` and `maxPrice`. See [Get Category](/api/rest-api/shop/categories/get-category).
