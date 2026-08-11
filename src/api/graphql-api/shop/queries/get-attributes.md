---
outline: false
examples:
  - id: get-attributes-basic
    title: Get Attributes - Basic
    description: Retrieve a paginated list of all product attributes with basic information.
    query: |
      query getAllAttributes($first: Int, $after: String) {
        attributes(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              code
              adminName
              type
              swatchType
              position
              isRequired
              isConfigurable
              options {
                edges {
                  node {
                    id
                    adminName
                    swatchValue
                  }
                }
                totalCount
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "attributes": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/attributes/1",
                  "_id": 1,
                  "code": "sku",
                  "adminName": "SKU",
                  "type": "text",
                  "swatchType": null,
                  "position": 1,
                  "isRequired": "1",
                  "isConfigurable": "0",
                  "options": {
                    "edges": [],
                    "totalCount": 0
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/attributes/23",
                  "_id": 23,
                  "code": "color",
                  "adminName": "Color",
                  "type": "select",
                  "swatchType": "color",
                  "position": 26,
                  "isRequired": "0",
                  "isConfigurable": "1",
                  "options": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/1",
                          "adminName": "Red",
                          "swatchValue": "#e10e0e"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/2",
                          "adminName": "Green",
                          "swatchValue": "#155616"
                        }
                      }
                    ],
                    "totalCount": 12
                  }
                },
                "cursor": "MjI="
              }
            ],
            "pageInfo": {
              "endCursor": "Mjk=",
              "hasNextPage": true
            },
            "totalCount": 38
          }
        }
      }
    commonErrors:
      - error: Argument \"first\" must be between 1 and 100
        cause: Pagination limit exceeds maximum allowed
        solution: Use a value between 1 and 100 for first parameter
      - error: Invalid cursor provided
        cause: Provided cursor is invalid or expired
        solution: Use cursors from the pageInfo section of previous responses

  - id: get-attributes-with-options
    title: Get Attributes with Full Options and Translations
    description: Retrieve attributes with complete option details and multi-locale translations.
    query: |
      query getAllAttributes($first: Int) {
        attributes(first: $first) {
          edges {
            node {
              id
              _id
              code
              adminName
              type
              swatchType
              validation
              regex
              position
              isRequired
              isUnique
              isFilterable
              isComparable
              isConfigurable
              isUserDefined
              isVisibleOnFront
              valuePerLocale
              valuePerChannel
              defaultValue
              enableWysiwyg
              createdAt
              updatedAt
              columnName
              validations
              options {
                edges {
                  node {
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
                        hasNextPage
                      }
                      totalCount
                    }
                  }
                  cursor
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
                totalCount
              }
              translations {
                edges {
                  node {
                    id
                    _id
                    attributeId
                    locale
                    name
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
                totalCount
              }
            }
            cursor
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
    variables: |
      {
        "first": 5
      }
    response: |
      {
        "data": {
          "attributes": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/attributes/1",
                  "_id": 1,
                  "code": "sku",
                  "adminName": "SKU",
                  "type": "text",
                  "swatchType": null,
                  "validation": null,
                  "regex": null,
                  "position": 1,
                  "isRequired": "1",
                  "isUnique": "1",
                  "isFilterable": "0",
                  "isComparable": "0",
                  "isConfigurable": "0",
                  "isUserDefined": "0",
                  "isVisibleOnFront": "0",
                  "valuePerLocale": "0",
                  "valuePerChannel": "0",
                  "defaultValue": null,
                  "enableWysiwyg": "0",
                  "createdAt": "2023-11-02T10:30:00+05:30",
                  "updatedAt": "2023-12-06T12:00:00+05:30",
                  "columnName": "text_value",
                  "validations": "{ }",
                  "options": {
                    "edges": [],
                    "pageInfo": {
                      "endCursor": null,
                      "hasNextPage": false
                    },
                    "totalCount": 0
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/attribute_translations/1",
                          "_id": 1,
                          "attributeId": "1",
                          "locale": "en",
                          "name": "SKU"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "hasNextPage": false
                    },
                    "totalCount": 1
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/attributes/23",
                  "_id": 23,
                  "code": "color",
                  "adminName": "Color",
                  "type": "select",
                  "swatchType": "color",
                  "validation": null,
                  "regex": null,
                  "position": 26,
                  "isRequired": "0",
                  "isUnique": "0",
                  "isFilterable": "1",
                  "isComparable": "0",
                  "isConfigurable": "1",
                  "isUserDefined": "1",
                  "isVisibleOnFront": "0",
                  "valuePerLocale": "0",
                  "valuePerChannel": "0",
                  "defaultValue": null,
                  "enableWysiwyg": "0",
                  "createdAt": "2023-11-02T16:40:10+05:30",
                  "updatedAt": "2023-12-06T12:52:51+05:30",
                  "columnName": "integer_value",
                  "validations": "{ }",
                  "options": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/1",
                          "_id": 1,
                          "adminName": "Red",
                          "sortOrder": 0,
                          "swatchValue": "#e10e0e",
                          "swatchValueUrl": null,
                          "translation": {
                            "id": "/api/attribute_option_translations/1",
                            "_id": 1,
                            "attributeOptionId": "1",
                            "locale": "en",
                            "label": "Red"
                          },
                          "translations": {
                            "edges": [
                              {
                                "node": {
                                  "id": "/api/attribute_option_translations/84",
                                  "_id": 84,
                                  "attributeOptionId": "1",
                                  "locale": "ar",
                                  "label": ""
                                }
                              },
                              {
                                "node": {
                                  "id": "/api/attribute_option_translations/1",
                                  "_id": 1,
                                  "attributeOptionId": "1",
                                  "locale": "en",
                                  "label": "Red"
                                }
                              }
                            ],
                            "pageInfo": {
                              "endCursor": "MQ==",
                              "hasNextPage": false
                            },
                            "totalCount": 2
                          }
                        },
                        "cursor": "MA=="
                      },
                      {
                        "node": {
                          "id": "/api/shop/attribute-options/2",
                          "_id": 2,
                          "adminName": "Green",
                          "sortOrder": 1,
                          "swatchValue": "#155616",
                          "swatchValueUrl": null,
                          "translation": {
                            "id": "/api/attribute_option_translations/2",
                            "_id": 2,
                            "attributeOptionId": "2",
                            "locale": "en",
                            "label": "Green"
                          },
                          "translations": {
                            "edges": [
                              {
                                "node": {
                                  "id": "/api/attribute_option_translations/85",
                                  "_id": 85,
                                  "attributeOptionId": "2",
                                  "locale": "ar",
                                  "label": ""
                                }
                              },
                              {
                                "node": {
                                  "id": "/api/attribute_option_translations/2",
                                  "_id": 2,
                                  "attributeOptionId": "2",
                                  "locale": "en",
                                  "label": "Green"
                                }
                              }
                            ],
                            "pageInfo": {
                              "endCursor": "MQ==",
                              "hasNextPage": false
                            },
                            "totalCount": 2
                          }
                        },
                        "cursor": "MQ=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MjE=",
                      "hasNextPage": true
                    },
                    "totalCount": 12
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/attribute_translations/23",
                          "_id": 23,
                          "attributeId": "23",
                          "locale": "en",
                          "name": "Color"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "hasNextPage": false
                    },
                    "totalCount": 1
                  }
                },
                "cursor": "MjI="
              }
            ],
            "pageInfo": {
              "endCursor": "Mjk=",
              "startCursor": "MA==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 38
          }
        }
      }
    commonErrors:
      - error: Argument \"first\" must be between 1 and 100
        cause: Pagination limit exceeds maximum allowed
        solution: Use a value between 1 and 100 for first parameter
      - error: Invalid cursor provided
        cause: Provided cursor is invalid or expired
        solution: Use cursors from the pageInfo section of previous responses

---

# Get Attributes

## About

The `attributes` query returns a cursor-paginated list of every product attribute in the catalog, each with its configuration, its selectable options, and its per-locale names. Use it to:

- Discover which attributes exist and which of them are filterable or configurable
- Cache an attribute-code to option-ID map that a client reuses across screens
- Read swatch settings before rendering colour or image pickers
- Read attribute and option labels in every locale a store supports

The list is not category-aware. To build a filter sidebar for one category, use [Category Attribute Filters](/api/graphql-api/shop/queries/get-category-attribute-filters), which returns only the attributes that belong on that category. To read a single attribute, use [Get Attribute](/api/graphql-api/shop/queries/get-attribute).

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of attributes to return from the start (forward pagination). Default: `10` |
| `after` | `String` | ❌ No | Cursor to start after for forward pagination. Take it from the previous response's `endCursor`. |
| `last` | `Int` | ❌ No | Number of attributes to return from the end (backward pagination). Default: `10` |
| `before` | `String` | ❌ No | Cursor to start before for backward pagination. |

There is no argument to filter the list — by code, by type, or by the filterable flag. Fetch the page and narrow it in the client, or use the category-scoped query instead.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[AttributeEdge]` | Attribute edges for the current page. |
| `edges.node` | `Attribute` | A single attribute — fields below. |
| `edges.cursor` | `String!` | Cursor for this attribute, used as `after` on the next request. |
| `pageInfo` | `AttributePageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean` | Whether more attributes follow the current page. |
| `pageInfo.hasPreviousPage` | `Boolean` | Whether attributes precede the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first attribute on the page. |
| `pageInfo.endCursor` | `String` | Cursor of the last attribute on the page. |
| `totalCount` | `Int!` | Total attributes in the catalog. |

### Attribute Fields

The `is*` and `valuePer*` flags come back as the **strings** `"1"` / `"0"`, not as GraphQL booleans.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style identifier (`/api/shop/attributes/23`). |
| `_id` | `Int!` | Numeric attribute ID. |
| `code` | `String!` | Machine-readable code — `sku`, `color`, `size`. This is the key a product filter expects. |
| `adminName` | `String!` | Admin-facing name. Use `translation` for the shopper-facing label. |
| `type` | `String!` | Input type — see [Attribute Types](#attribute-types). |
| `swatchType` | `String` | Swatch style for this attribute's options, or `null` when it uses none. |
| `position` | `Int` | Sort order among attributes. |
| `isRequired` | `String!` | `"1"` when the attribute is mandatory on the product form. |
| `isUnique` | `String!` | `"1"` when values must be unique across products. |
| `isFilterable` | `String!` | `"1"` when the attribute can drive layered navigation. |
| `isComparable` | `String!` | `"1"` when the attribute appears on the compare page. |
| `isConfigurable` | `String!` | `"1"` when the attribute can define configurable-product variants. |
| `isUserDefined` | `String!` | `"1"` for a merchant-created attribute, `"0"` for a system one. |
| `isVisibleOnFront` | `String!` | `"1"` when the attribute is shown on the product page. |
| `valuePerLocale` | `String!` | `"1"` when the value differs per locale. |
| `valuePerChannel` | `String!` | `"1"` when the value differs per channel. |
| `defaultValue` | `Int` | Default option ID, when the attribute defines one. |
| `validation` | `String` | Validation rule applied to the value, e.g. `decimal`. `null` when none is set. |
| `validations` | `String` | Additional validation metadata as a string, e.g. `{ required: true }`. |
| `regex` | `String` | Regular expression the value must match, when configured. |
| `columnName` | `String` | Underlying storage column, when applicable. |
| `enableWysiwyg` | `String!` | `"1"` when the admin editor uses a rich-text field. |
| `createdAt` | `String` | ISO 8601 creation timestamp. |
| `updatedAt` | `String` | ISO 8601 timestamp of the last change. |
| `options` | `AttributeOptionCursorConnection` | Selectable values. Empty for text, textarea, price, date, and boolean attributes. |
| `translation` | `AttributeTranslation` | The attribute's name in the current locale. |
| `translations` | `AttributeTranslationCursorConnection` | The attribute's name in every locale. |

### Option Fields

Each node in an attribute's `options` connection:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style option identifier. |
| `_id` | `Int!` | Numeric option ID. **This is the value to send when filtering products.** |
| `adminName` | `String` | Admin-facing option name. Use `translation` for the shopper-facing label. |
| `sortOrder` | `Int` | Display order within the attribute. |
| `swatchValue` | `String` | Hex colour for a colour swatch, or the text value. |
| `swatchValueUrl` | `String` | URL of the swatch image, for image swatches. |
| `translation` | `AttributeOptionTranslation` | The option's label in the current locale. |
| `translations` | `AttributeOptionTranslationCursorConnection` | The option's label in every locale. |

### Translation Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style translation identifier. |
| `_id` | `Int!` | Numeric translation ID. |
| `locale` | `String!` | Locale code, e.g. `en`, `ar`. |
| `attributeId` | `String!` | Parent attribute ID, on an attribute translation. |
| `attributeOptionId` | `String!` | Parent option ID, on an option translation. |
| `name` | `String` | Attribute name in that locale. |
| `label` | `String` | Option label in that locale. |

## Attribute Types

| Type | Control | Carries options |
|------|---------|-----------------|
| `text` | Single-line text input | No |
| `textarea` | Multi-line text, optionally rich-text when `enableWysiwyg` is `"1"` | No |
| `select` | Dropdown, one value | Yes |
| `multiselect` | Multiple values | Yes |
| `checkbox` | Multiple values as checkboxes | Yes |
| `boolean` | Yes/No toggle | No |
| `date` / `datetime` | Date picker | No |
| `price` | Decimal amount | No |
| `image` / `file` | Uploaded asset | No |

Only the option-carrying types return anything in their `options` connection; the rest come back empty.

## Use Cases

### 1. Discovering the filterable attributes

There is no filter argument, so page the list and select the ones flagged filterable in the client:

```graphql
query filterableAttributes {
  attributes(first: 100) {
    edges {
      node {
        _id
        code
        adminName
        type
        swatchType
        isFilterable
        translation {
          name
        }
      }
    }
    totalCount
  }
}
```

Keep the nodes whose `isFilterable` equals the string `"1"`.

### 2. Caching an option-ID to label map

Attribute values on a product come back as option IDs. Fetch the attributes with their options once and cache the mapping, rather than resolving labels product by product:

```graphql
query attributeOptionMap {
  attributes(first: 100) {
    edges {
      node {
        code
        options(first: 100) {
          edges {
            node {
              _id
              translation {
                label
              }
            }
          }
        }
      }
    }
  }
}
```

### 3. Paging through the full list

```graphql
query nextAttributes($after: String) {
  attributes(first: 10, after: $after) {
    edges {
      node {
        _id
        code
        adminName
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Repeat with the returned `endCursor` while `hasNextPage` is true.

## Best Practices

1. **Request a large `first` when caching** — the default page is 10 attributes, and a client that wants the whole set otherwise pays several round trips
2. **Compare the flags against strings** — `isFilterable` and its siblings return `"1"` / `"0"`, so testing the raw string for truthiness treats `"0"` as true
3. **Page the nested `options` connection too** — it is a connection in its own right with its own default of 10, so a brand attribute with hundreds of values is silently truncated
4. **Select only the locales you need** — asking for `translations` on both the attribute and every option multiplies the response, while `translation` returns just the current locale
5. **Use the category-scoped query for a filter sidebar** — [Category Attribute Filters](/api/graphql-api/shop/queries/get-category-attribute-filters) returns only what belongs on that category, with the price range attached
6. **Never pass a made-up cursor** — an `after` value that did not come from a previous response fails the request rather than returning an empty page

## Error Scenarios

| Scenario | Cause |
|----------|-------|
| Invalid cursor | The `after` or `before` value is not a cursor returned by a previous response. |

## Related Resources

- [Get Attribute](/api/graphql-api/shop/queries/get-attribute) - One attribute with its options
- [Attribute Options](/api/graphql-api/shop/queries/get-attribute-options) - Option values across every attribute
- [Category Attribute Filters](/api/graphql-api/shop/queries/get-category-attribute-filters) - Filterable attributes for one category
- [List Products](/api/graphql-api/shop/queries/get-products) - Apply an attribute filter
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
