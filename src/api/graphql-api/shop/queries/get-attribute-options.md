---
outline: false
examples:
  - id: get-attribute-options-basic
    title: Get Attribute Options - Basic
    description: Retrieve basic attribute options with pagination.
    query: |
      query getAttributeOptions($first: Int) {
        attributeOptions(first: $first) {
          edges {
            node {
              id
              _id
              adminName
              sortOrder
              swatchValue
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
        "first": 10
      }
    response: |
      {
        "data": {
          "attributeOptions": {
            "edges": [
              {
                "node": {
                  "id": "/api/admin/attribute_options/1",
                  "_id": 1,
                  "adminName": "Red",
                  "sortOrder": 0,
                  "swatchValue": "#e10e0e"
                }
              },
              {
                "node": {
                  "id": "/api/shop/attribute-options/2",
                  "_id": 2,
                  "adminName": "Green",
                  "sortOrder": 1,
                  "swatchValue": "#155616"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MQ=="
            }
          }
        }
      }
  - id: get-attribute-options-with-translations
    title: Get Attribute Options with Translations
    description: Retrieve attribute options with all available translations for multi-language support.
    query: |
      query getAttributeOptionsWithTranslations($first: Int) {
        attributeOptions(first: $first) {
          edges {
            node {
              id
              adminName
              sortOrder
              translations(first: 10) {
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
    variables: |
      {
        "first": 5
      }
    response: |
      {
        "data": {
          "attributeOptions": {
            "edges": [
              {
                "node": {
                  "id": "/api/admin/attribute_options/1",
                  "adminName": "Red",
                  "sortOrder": 0,
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "locale": "en",
                          "label": "Red"
                        }
                      },
                      {
                        "node": {
                          "locale": "ar",
                          "label": "أحمر"
                        }
                      },
                      {
                        "node": {
                          "locale": "fr",
                          "label": "Rouge"
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
    commonErrors:
      - error: NO_TRANSLATIONS
        cause: Attribute option has no translations
        solution: Check if translations are configured for this option

  - id: get-attribute-options-with-swatches
    title: Get Attribute Options with Swatches
    description: Retrieve attribute options with color or image swatch information.
    query: |
      query getSwatchOptions($first: Int) {
        attributeOptions(first: $first) {
          edges {
            node {
              id
              adminName
              swatchValue
              swatchValueUrl
              translation {
                locale
                label
              }
            }
          }
        }
      }
    variables: |
      {
        "first": 20
      }
    response: |
      {
        "data": {
          "attributeOptions": {
            "edges": [
              {
                "node": {
                  "id": "/api/admin/attribute_options/10",
                  "adminName": "Pattern1",
                  "swatchValue": null,
                  "swatchValueUrl": "https://api-demo.bagisto.com/storage/swatches/pattern1.png",
                  "translation": {
                    "locale": "en",
                    "label": "Pattern 1"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/admin/attribute_options/11",
                  "adminName": "Pattern2",
                  "swatchValue": null,
                  "swatchValueUrl": "https://api-demo.bagisto.com/storage/swatches/pattern2.png",
                  "translation": {
                    "locale": "en",
                    "label": "Pattern 2"
                  }
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: INVALID_SWATCH_URL
        cause: Swatch image URL is invalid
        solution: Verify the swatch image exists and URL is correct

  - id: get-attribute-option-by-id
    title: Get Single Attribute Option Detail by Option ID
    description: Retrieve complete details of a single attribute option including all translations and swatch information.
    query: |
      query getAttributeOptionByID ($id: ID!) {
        attributeOption (id: $id) {
          id
          _id
          adminName
          sortOrder
          swatchValue
          swatchValueUrl
          translation {
            id
            _id
            attributeOptionId
            locale
            label
          }
          translations {
            edges {
              node {
                id
                _id
                attributeOptionId
                locale
                label
              }
            }
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/attribute_options/1"
      }
    response: |
      {
        "data": {
          "attributeOption": {
            "id": "/api/admin/attribute_options/1",
            "_id": 1,
            "attributeId": 23,
            "adminName": "Red",
            "sortOrder": 0,
            "swatchValue": "#e10e0e",
            "swatchValueUrl": null,
            "translation": {
              "id": "/api/shop/attribute-option-translations/1",
              "_id": 1,
              "attributeOptionId": 1,
              "locale": "en",
              "label": "Red"
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/attribute-option-translations/1",
                    "_id": 1,
                    "attributeOptionId": 1,
                    "locale": "en",
                    "label": "Red"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-option-translations/2",
                    "_id": 2,
                    "attributeOptionId": 1,
                    "locale": "ar",
                    "label": "أحمر"
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-option-translations/3",
                    "_id": 3,
                    "attributeOptionId": 1,
                    "locale": "fr",
                    "label": "Rouge"
                  }
                }
              ],
              "pageInfo": {
                "endCursor": "Mw==",
                "startCursor": "MA==",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: OPTION_NOT_FOUND
        cause: Attribute option with given ID does not exist
        solution: Verify the option ID is correct
      - error: INVALID_OPTION_ID
        cause: Option ID format is invalid
        solution: Use a valid option ID from the system

  - id: get-attribute-options-pagination
    title: Get Attribute Options - Pagination
    description: Paginate through large sets of attribute options using cursors.
    query: |
      query getAttributeOptionsPaginated(
        $first: Int
        $after: String
      ) {
        attributeOptions(
          first: $first
          after: $after
        ) {
          edges {
            node {
              id
              adminName
              sortOrder
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
            hasPreviousPage
            startCursor
          }
        }
      }
    variables: |
      {
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "attributeOptions": {
            "edges": [
              {
                "node": {
                  "id": "/api/admin/attribute_options/1",
                  "adminName": "Red",
                  "sortOrder": 0
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/attribute-options/2",
                  "adminName": "Green",
                  "sortOrder": 1
                },
                "cursor": "MQ=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MQ==",
              "hasPreviousPage": false,
              "startCursor": "MA=="
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: Pagination cursor format is invalid
        solution: Use cursor values returned from previous requests

  - id: get-attribute-options-via-attribute
    title: Get Attribute Options via Attribute
    description: Retrieve attribute options as a nested resource within an attribute query.
    query: |
      query getAttribute($id: ID!, $first: Int) {
        attribute(id: $id) {
          id
          code
          adminName    
          options(first: $first) {
            edges {
              node {
                id
                adminName
                sortOrder
                swatchValue
                translation {
                  locale
                  label
                }
              }
              cursor
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }

    variables: |
      {
        "id": "/api/shop/attributes/23",
        "first": 10
      }
    response: |
      {
        "data": {
          "attribute": {
            "id": "/api/shop/attributes/23",
            "code": "color",
            "adminName": "Color",
            "options": {
              "edges": [
                {
                  "node": {
                    "id": "/api/admin/attribute_options/1",
                    "adminName": "Red",
                    "sortOrder": 0,
                    "swatchValue": "#e10e0e",
                    "translation": {
                      "locale": "en",
                      "label": "Red"
                  }
                  },
                  "cursor": "MA=="
                },
                {
                  "node": {
                    "id": "/api/shop/attribute-options/2",
                    "adminName": "Green",
                    "sortOrder": 1,
                    "swatchValue": "#155616",
                    "translation": {
                      "locale": "en",
                      "label": "Green"
                    }
                  },
                  "cursor": "MQ=="
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "MQ=="
              }
            }
          }
        }
      }
    commonErrors:
      - error: ATTRIBUTE_NOT_FOUND
        cause: Attribute ID does not exist
        solution: Verify the attribute ID is correct

  - id: get-color-options-for-display
    title: Get Color Options for Display
    description: Get color attribute options optimized for product display with minimal fields.
    query: |
      query getColorOptions {
        attributeOptions(first: 50) {
          edges {
            node {
              adminName
              swatchValue
              translation {
                label
              }
            }
          }
        }
      }
    variables: |
      {
        
      }
    response: |
      {
        "data": {
          "attributeOptions": {
            "edges": [
              {
                "node": {
                  "adminName": "Red",
                  "swatchValue": "#e10e0e",
                  "translation": {
                    "label": "Red"
                  }
                }
              },
              {
                "node": {
                  "adminName": "Green",
                  "swatchValue": "#155616",
                  "translation": {
                    "label": "Green"
                  }
                }
              },
              {
                "node": {
                  "adminName": "Blue",
                  "swatchValue": "#0000ff",
                  "translation": {
                    "label": "Blue"
                  }
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: ATTRIBUTE_NOT_FOUND
        cause: Color attribute does not exist
        solution: Ensure color attribute ID is configured correctly
---

# Get Attribute Options

## About

The `attributeOptions` query returns attribute option values — the individual entries behind a select, multiselect, or checkbox attribute, such as *Red*, *Green*, *Large*.

The query is **not scoped to an attribute**. It pages through every option in the catalog, so `Red` from Colour and `Large` from Size arrive in the same list with nothing on a node to say which attribute it belongs to. To read the options of one attribute, query that attribute instead and select its `options` connection — see [Get Attribute](/api/graphql-api/shop/queries/get-attribute).

Use this query when a client wants the whole option set at once, typically to build a lookup table of option ID to label that it can reuse across screens.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of options to return from the start (forward pagination). Default: `10` |
| `after` | `String` | ❌ No | Cursor to start after for forward pagination. |
| `last` | `Int` | ❌ No | Number of options to return from the end (backward pagination). Default: `10` |
| `before` | `String` | ❌ No | Cursor to start before for backward pagination. |

There is no argument to filter by attribute, by swatch type, or by label.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[AttributeOptionEdge]` | Option edges for the current page. |
| `edges.node` | `AttributeOption` | A single option — fields below. |
| `edges.cursor` | `String!` | Cursor for this option, used as `after` on the next request. |
| `pageInfo` | `AttributeOptionPageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean` | Whether more options follow the current page. |
| `pageInfo.hasPreviousPage` | `Boolean` | Whether options precede the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first option on the page. |
| `pageInfo.endCursor` | `String` | Cursor of the last option on the page. |
| `totalCount` | `Int!` | Total options across every attribute in the catalog. |

### AttributeOption Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style identifier (`/api/shop/attribute-options/{id}`). |
| `_id` | `Int!` | Numeric option ID. **This is the value to send when filtering products.** |
| `adminName` | `String` | Admin-facing option name. Use `translation` for the shopper-facing label. |
| `sortOrder` | `Int` | Display order within the option's own attribute. |
| `swatchValue` | `String` | Hex colour for a colour swatch, or the text value. `null` when the attribute uses no swatch. |
| `swatchValueUrl` | `String` | URL of the swatch image, for image swatches. |
| `translation` | `AttributeOptionTranslation` | The option's label in the current locale. |
| `translations` | `AttributeOptionTranslationCursorConnection` | The option's label in every locale. |

### Translation Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style translation identifier. |
| `_id` | `Int!` | Numeric translation ID. |
| `attributeOptionId` | `String!` | ID of the option this translation belongs to. |
| `locale` | `String!` | Locale code, e.g. `en`, `ar`. |
| `label` | `String` | Translated label for the option. |

## Use Cases

### 1. Caching an option-ID lookup table

A client that renders filters and product attribute values keeps hitting the same option IDs. Page the full set once and cache it:

```graphql
query optionLookup($after: String) {
  attributeOptions(first: 100, after: $after) {
    edges {
      node {
        _id
        adminName
        swatchValue
        translation {
          label
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
```

Repeat with the returned `endCursor` while `hasNextPage` is true.

### 2. Resolving an option ID that came back on a product

A product's `attributeValues` carry option IDs rather than labels. A cached lookup built from this query turns those IDs into text without a request per product.

### 3. Reading the options of one attribute

This query cannot do it — use [Get Attribute](/api/graphql-api/shop/queries/get-attribute) and select its `options` connection, which returns only that attribute's values in their configured order.

## Best Practices

1. **Do not use this to populate one attribute's control** — the result spans every attribute and carries no attribute reference, so a colour picker built from it would list sizes too; query the attribute directly instead
2. **Page with `first` and `after`** — the default page is 10 options, which is smaller than most single attributes
3. **Never pass a made-up cursor** — an `after` value that did not come from a previous response fails the request outright rather than returning an empty page
4. **Show `translation.label`, not `adminName`** — `adminName` is the internal admin label and is never translated
5. **Cache the result** — options change only when a merchant edits an attribute, so the whole set caches well and saves a request per screen

## Error Scenarios

| Scenario | Cause |
|----------|-------|
| Invalid cursor | The `after` or `before` value is not a cursor returned by a previous response. |

## Related Resources

- [Get Attribute](/api/graphql-api/shop/queries/get-attribute) - One attribute with its own options
- [Attributes](/api/graphql-api/shop/queries/get-attributes) - List every attribute
- [Category Attribute Filters](/api/graphql-api/shop/queries/get-category-attribute-filters) - Filterable attributes for one category
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
