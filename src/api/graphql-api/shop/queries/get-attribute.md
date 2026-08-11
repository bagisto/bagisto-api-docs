---
outline: false
examples:
  - id: get-attribute-basic
    title: Get Attribute - Basic
    description: Retrieve basic attribute information by ID.
    query: |
      query getAttributeByID($id: ID!){
        attribute(id: $id) {
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
        }
      }
    variables: |
      {
        "id": "/api/shop/attributes/23"
      }
    response: |
      {
        "data": {
          "attribute": {
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
            "validations": "{  }"
          }
        }
      }
    commonErrors:
      - error: Variable \"$id\" of required type \"ID!\" was not provided.
        cause: Attribute ID parameter is required
        solution: Provide a valid attribute ID in format /api/shop/attributes/{id}
      - error: Invalid ID format. Expected IRI format like \"/api/shop/attributes/1\" or numeric ID
        cause: Attribute ID is not valid
        solution: Verify the attribute ID is correct format
      - error: Attribute not found
        cause: Attribute ID does not exist
        solution: Verify the attribute ID is correct
       
  - id: get-attribute-with-details
    title: Get Attribute with Full Details
    description: Retrieve attribute with all configuration flags and metadata.
    query: |
      query getAttributeByID($id: ID!){
          attribute(id: $id) {
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
                      startCursor
                    hasNextPage
                    hasPreviousPage
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
            translations {
              edges {
                node {
                  id
                  _id
                  attributeId
                  locale
                  name
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
        }
    variables: |
      {
        "id": "/api/shop/attributes/23"
      }
    response: |
      {
        "data": {
            "attribute": {
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
                "validations": "{  }",
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
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
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
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "MQ=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/3",
                                "_id": 3,
                                "adminName": "Yellow",
                                "sortOrder": 2,
                                "swatchValue": "#f6fa00",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/3",
                                    "_id": 3,
                                    "attributeOptionId": "3",
                                    "locale": "en",
                                    "label": "Yellow"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/86",
                                                "_id": 86,
                                                "attributeOptionId": "3",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/3",
                                                "_id": 3,
                                                "attributeOptionId": "3",
                                                "locale": "en",
                                                "label": "Yellow"
                                            }
                                        }
                                    ],
                                    "pageInfo": {
                                        "endCursor": "MQ==",
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "Mg=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/4",
                                "_id": 4,
                                "adminName": "Black",
                                "sortOrder": 3,
                                "swatchValue": "#000000",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/4",
                                    "_id": 4,
                                    "attributeOptionId": "4",
                                    "locale": "en",
                                    "label": "Black"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/87",
                                                "_id": 87,
                                                "attributeOptionId": "4",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/4",
                                                "_id": 4,
                                                "attributeOptionId": "4",
                                                "locale": "en",
                                                "label": "Black"
                                            }
                                        }
                                    ],
                                    "pageInfo": {
                                        "endCursor": "MQ==",
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "Mw=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/5",
                                "_id": 5,
                                "adminName": "White",
                                "sortOrder": 4,
                                "swatchValue": "#ffffff",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/5",
                                    "_id": 5,
                                    "attributeOptionId": "5",
                                    "locale": "en",
                                    "label": "White"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/88",
                                                "_id": 88,
                                                "attributeOptionId": "5",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/5",
                                                "_id": 5,
                                                "attributeOptionId": "5",
                                                "locale": "en",
                                                "label": "White"
                                            }
                                        }
                                    ],
                                    "pageInfo": {
                                        "endCursor": "MQ==",
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "NA=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/39",
                                "_id": 39,
                                "adminName": "Orange",
                                "sortOrder": 5,
                                "swatchValue": "#ff6600",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/39",
                                    "_id": 39,
                                    "attributeOptionId": "39",
                                    "locale": "en",
                                    "label": "Orange"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/89",
                                                "_id": 89,
                                                "attributeOptionId": "39",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/39",
                                                "_id": 39,
                                                "attributeOptionId": "39",
                                                "locale": "en",
                                                "label": "Orange"
                                            }
                                        }
                                    ],
                                    "pageInfo": {
                                        "endCursor": "MQ==",
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "NQ=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/41",
                                "_id": 41,
                                "adminName": "Blue",
                                "sortOrder": 6,
                                "swatchValue": "#0000ff",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/41",
                                    "_id": 41,
                                    "attributeOptionId": "41",
                                    "locale": "en",
                                    "label": "Blue"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/90",
                                                "_id": 90,
                                                "attributeOptionId": "41",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/41",
                                                "_id": 41,
                                                "attributeOptionId": "41",
                                                "locale": "en",
                                                "label": "Blue"
                                            }
                                        }
                                    ],
                                    "pageInfo": {
                                        "endCursor": "MQ==",
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "Ng=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/42",
                                "_id": 42,
                                "adminName": "Pink",
                                "sortOrder": 7,
                                "swatchValue": "#e33d94",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/42",
                                    "_id": 42,
                                    "attributeOptionId": "42",
                                    "locale": "en",
                                    "label": "Pink"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/91",
                                                "_id": 91,
                                                "attributeOptionId": "42",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/42",
                                                "_id": 42,
                                                "attributeOptionId": "42",
                                                "locale": "en",
                                                "label": "Pink"
                                            }
                                        }
                                    ],
                                    "pageInfo": {
                                        "endCursor": "MQ==",
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "Nw=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/43",
                                "_id": 43,
                                "adminName": "Purple",
                                "sortOrder": 8,
                                "swatchValue": "#6611bb",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/43",
                                    "_id": 43,
                                    "attributeOptionId": "43",
                                    "locale": "en",
                                    "label": "Purple"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/92",
                                                "_id": 92,
                                                "attributeOptionId": "43",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/43",
                                                "_id": 43,
                                                "attributeOptionId": "43",
                                                "locale": "en",
                                                "label": "Purple"
                                            }
                                        }
                                    ],
                                    "pageInfo": {
                                        "endCursor": "MQ==",
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "OA=="
                        },
                        {
                            "node": {
                                "id": "/api/shop/attribute-options/46",
                                "_id": 46,
                                "adminName": "Grey",
                                "sortOrder": 9,
                                "swatchValue": "#949494",
                                "swatchValueUrl": null,
                                "translation": {
                                    "id": "/api/attribute_option_translations/46",
                                    "_id": 46,
                                    "attributeOptionId": "46",
                                    "locale": "en",
                                    "label": "Grey"
                                },
                                "translations": {
                                    "edges": [
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/93",
                                                "_id": 93,
                                                "attributeOptionId": "46",
                                                "locale": "ar",
                                                "label": ""
                                            }
                                        },
                                        {
                                            "node": {
                                                "id": "/api/attribute_option_translations/46",
                                                "_id": 46,
                                                "attributeOptionId": "46",
                                                "locale": "en",
                                                "label": "Grey"
                                            }
                                        }
                                    ],
                                    "pageInfo": {
                                        "endCursor": "MQ==",
                                        "startCursor": "MA==",
                                        "hasNextPage": false,
                                        "hasPreviousPage": false
                                    },
                                    "totalCount": 2
                                }
                            },
                            "cursor": "OQ=="
                        }
                    ],
                    "pageInfo": {
                        "endCursor": "OQ==",
                        "startCursor": "MA==",
                        "hasNextPage": true,
                        "hasPreviousPage": false
                    },
                    "totalCount": 12
                },
                "translations": {
                    "edges": [
                        {
                            "node": {
                                "id": "/api/attribute_translations/52",
                                "_id": 52,
                                "attributeId": "23",
                                "locale": "ar",
                                "name": ""
                            },
                            "cursor": "MA=="
                        },
                        {
                            "node": {
                                "id": "/api/attribute_translations/23",
                                "_id": 23,
                                "attributeId": "23",
                                "locale": "en",
                                "name": "Color"
                            },
                            "cursor": "MQ=="
                        }
                    ],
                    "pageInfo": {
                        "endCursor": "MQ==",
                        "startCursor": "MA==",
                        "hasNextPage": false,
                        "hasPreviousPage": false
                    },
                    "totalCount": 2
                }
            }
        }
    commonErrors:
      - error: INVALID_FIELD
        cause: Requested field does not exist
        solution: Check available attribute fields in schema
---

# Get Attribute

## About

The `attribute` query returns one product attribute with its configuration, its selectable options, and its per-locale names. Use it to:

- Read one attribute's option list to render a colour, size, or brand control
- Check how an attribute behaves before using it — whether it is filterable, whether it drives configurable variants, whether its value varies per locale or channel
- Read the swatch data behind a colour or image picker
- Fetch an attribute's label in every locale a store supports

Use [Attributes](/api/graphql-api/shop/queries/get-attributes) to list them, or [Category Attribute Filters](/api/graphql-api/shop/queries/get-category-attribute-filters) to get only the attributes that belong on a given category's filter sidebar.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | Identifies the attribute. Accepts the IRI form (`/api/shop/attributes/23`) or a plain numeric ID (`"23"`). |

An ID that is neither form is rejected as an invalid format, and an ID that resolves to no attribute returns `data.attribute` as `null` with an entry in `errors`.

## Possible Returns

The `is*` and `valuePer*` flags come back as the **strings** `"1"` / `"0"`, not as GraphQL booleans.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style identifier (`/api/shop/attributes/23`). |
| `_id` | `Int!` | Numeric attribute ID. |
| `code` | `String!` | Machine-readable code — `color`, `size`, `brand`, `sku`. This is the key you pass to a product filter. |
| `adminName` | `String!` | Admin-facing name. Use `translation` for the shopper-facing label. |
| `type` | `String!` | Input type — `text`, `textarea`, `select`, `multiselect`, `boolean`, `date`, `datetime`, `price`, `image`, `file`, `checkbox`. Decides which control to render. |
| `swatchType` | `String` | `color`, `image`, `text`, or `null`. When `color`, render each option's `swatchValue`; when `image`, render `swatchValueUrl`. |
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
| `validation` | `String` | Validation rule applied to the value, e.g. `decimal`, `numeric`, `email`. |
| `validations` | `String` | Additional validation metadata. |
| `regex` | `String` | Regular expression the value must match, when configured. |
| `columnName` | `String` | Underlying storage column, when applicable. |
| `enableWysiwyg` | `String!` | `"1"` when the admin editor uses a rich-text field. |
| `createdAt` | `String` | ISO 8601 creation timestamp. |
| `updatedAt` | `String` | ISO 8601 timestamp of the last change. |
| `options` | `AttributeOptionCursorConnection` | Selectable values. Empty for free-text and price attributes. |
| `translation` | `AttributeTranslation` | The attribute's name in the current locale. |
| `translations` | `AttributeTranslationCursorConnection` | The attribute's name in every locale. |

### Option Fields

Each node in the `options` connection:

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
| `locale` | `String!` | Locale code this translation belongs to. |
| `attributeId` | `String!` | Parent attribute ID, on an attribute translation. |
| `attributeOptionId` | `String!` | Parent option ID, on an option translation. |
| `name` | `String` | Attribute name in that locale. |
| `label` | `String` | Option label in that locale. |

## Use Cases

### 1. Rendering a colour swatch picker

Read `swatchType` to decide how to draw each option, then read the options themselves.

```graphql
query colourPicker {
  attribute(id: "/api/shop/attributes/23") {
    code
    swatchType
    options(first: 50) {
      edges {
        node {
          _id
          adminName
          swatchValue
          swatchValueUrl
          translation {
            label
          }
        }
      }
      totalCount
    }
  }
}
```

Render `swatchValue` as a colour chip when `swatchType` is `color`, and `swatchValueUrl` as an image when it is `image`. Show `translation.label` rather than `adminName`, which is an internal name.

### 2. Turning a selection into a product filter

An option's `_id` is the value the product listing expects, keyed by the attribute's `code`:

```json
{
  "filter": "{"color": "3"}"
}
```

Pass that to [List Products](/api/graphql-api/shop/queries/get-products). Comma-separate several option IDs to match any of them.

### 3. Building a language switcher for attribute labels

Read `translations` on the attribute and on each option to cache every locale in one request, instead of re-querying per language.

## Best Practices

1. **Filter by `code`, select by `_id`** — the product filter key is the attribute's `code` and the value is the option's `_id`; neither the IRI nor `adminName` works there
2. **Display `translation.label`, never `adminName`** — `adminName` is the internal admin label and is not translated
3. **Compare the flags against strings** — `isFilterable` and its siblings return `"1"` / `"0"`, so a truthiness test on the string `"0"` reports the wrong answer in most languages
4. **Read `swatchType` before rendering options** — it decides whether an option carries a colour, an image URL, or neither
5. **Page the `options` connection on large attributes** — a brand list runs to hundreds of options, and the connection defaults to 10 per page
6. **Prefer [Category Attribute Filters](/api/graphql-api/shop/queries/get-category-attribute-filters) for a filter sidebar** — it returns only the attributes marked filterable for that category, already scoped

## Error Scenarios

| Scenario | Cause |
|----------|-------|
| Attribute not found | The ID resolves to no attribute. `data.attribute` is `null` with an entry in `errors`. |
| Invalid ID format | The ID is neither an IRI nor numeric. |
| Missing ID | The `id` argument was omitted. GraphQL rejects the document before the query runs. |

## Related Resources

- [Attributes](/api/graphql-api/shop/queries/get-attributes) - List every attribute
- [Attribute Options](/api/graphql-api/shop/queries/get-attribute-options) - List option values across attributes
- [Category Attribute Filters](/api/graphql-api/shop/queries/get-category-attribute-filters) - Filterable attributes for one category
- [List Products](/api/graphql-api/shop/queries/get-products) - Apply an attribute filter
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
