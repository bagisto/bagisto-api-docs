---
outline: false
examples:
  - id: get-categories-basic
    title: Get Categories - Basic
    description: Retrieve categories with pagination using first and after arguments.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              position
              status
              translation {
                name
                slug
                urlPath
              }
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
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "categories": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/categories/1",
                  "_id": 1,
                  "position": 1,
                  "status": "0",
                  "translation": {
                    "name": "Root",
                    "slug": "root",
                    "urlPath": ""
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/8",
                  "_id": 8,
                  "position": 2,
                  "status": "1",
                  "translation": {
                    "name": "Electronics",
                    "slug": "electronics",
                    "urlPath": "electronics"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/19",
                  "_id": 19,
                  "position": 7,
                  "status": "1",
                  "translation": {
                    "name": "Plastic Sofa",
                    "slug": "plastic-sofa",
                    "urlPath": ""
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/20",
                  "_id": 20,
                  "position": 6,
                  "status": "1",
                  "translation": {
                    "name": "Wooden Sofa",
                    "slug": "wooden-sofa",
                    "urlPath": ""
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/21",
                  "_id": 21,
                  "position": 5,
                  "status": "1",
                  "translation": {
                    "name": "Leather Sofa",
                    "slug": "leather-sofa",
                    "urlPath": ""
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/22",
                  "_id": 22,
                  "position": 4,
                  "status": "1",
                  "translation": {
                    "name": "Fashion",
                    "slug": "fashion",
                    "urlPath": ""
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/23",
                  "_id": 23,
                  "position": 3,
                  "status": "1",
                  "translation": {
                    "name": "Furniture",
                    "slug": "furniture",
                    "urlPath": ""
                  }
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "Ng=="
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_FIRST_VALUE
        cause: First argument exceeds maximum allowed value or is negative
        solution: Use first value between 1 and 100
      - error: INVALID_CURSOR
        cause: Pagination cursor is invalid
        solution: Use cursor values from previous response

  - id: get-categories-complete
    title: Get Categories - Complete Details
    description: Retrieve categories with all fields including logos, banners, translations, and children.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              position
              status
              logoPath
              displayMode
              _lft
              _rgt
              additional
              bannerPath
              createdAt
              updatedAt
              url
              logoUrl
              bannerUrl
              filterableAttributes {
                edges {
                  node {
                    id
                    _id
                    code
                    adminName
                    type
                  }
                }
              }
              translation {
                name
                slug
                urlPath
              }
              children(first: 100) {
                edges {
                  node {
                    id
                    _id
                    position
                    status
                    translation {
                      name
                      slug
                      urlPath
                    }
                  }
                }
              }
              translations(first: 1) {
                edges {
                  node {
                    id
                    _id
                    categoryId
                    name
                    slug
                    urlPath
                    description
                    metaTitle
                    metaDescription
                    metaKeywords
                    localeId
                    locale
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
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "categories": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/categories/1",
                  "_id": 1,
                  "position": 1,
                  "status": "0",
                  "logoPath": null,
                  "displayMode": "products_and_description",
                  "_lft": "1",
                  "_rgt": "26",
                  "additional": null,
                  "bannerPath": null,
                  "createdAt": "2024-04-16T16:14:16+05:30",
                  "updatedAt": "2025-08-28T19:13:57+05:30",
                  "url": "https://api-demo.bagisto.com/root",
                  "logoUrl": null,
                  "bannerUrl": null,
                  "filterableAttributes": {
                    "edges": []
                  },
                  "translation": {
                    "name": "Root",
                    "slug": "root",
                    "urlPath": ""
                  },
                  "children": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/categories/8",
                          "_id": 8,
                          "position": 2,
                          "status": "1",
                          "translation": {
                            "name": "Electronics",
                            "slug": "electronics",
                            "urlPath": "electronics"
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/categories/22",
                          "_id": 22,
                          "position": 4,
                          "status": "1",
                          "translation": {
                            "name": "Fashion",
                            "slug": "fashion",
                            "urlPath": ""
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/categories/23",
                          "_id": 23,
                          "position": 3,
                          "status": "1",
                          "translation": {
                            "name": "Furniture",
                            "slug": "furniture",
                            "urlPath": ""
                          }
                        }
                      }
                    ]
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/category_translations/1",
                          "_id": 1,
                          "categoryId": "1",
                          "name": "Root",
                          "slug": "root",
                          "urlPath": "",
                          "description": "Root",
                          "metaTitle": "",
                          "metaDescription": "",
                          "metaKeywords": "",
                          "localeId": null,
                          "locale": "en"
                        },
                        "cursor": "MA=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "startCursor": "MA==",
                      "hasNextPage": true,
                      "hasPreviousPage": false
                    },
                    "totalCount": 5
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/8",
                  "_id": 8,
                  "position": 2,
                  "status": "1",
                  "logoPath": "category/8/Vk59z6w128ExCrY3lwlSYWhVrYenucFhTuick0VD.webp",
                  "displayMode": "products_and_description",
                  "_lft": "14",
                  "_rgt": "15",
                  "additional": null,
                  "bannerPath": null,
                  "createdAt": "2024-04-19T13:36:12+05:30",
                  "updatedAt": "2026-01-02T19:23:45+05:30",
                  "url": "https://api-demo.bagisto.com/electronics",
                  "logoUrl": "https://api-demo.bagisto.com/storage/category/8/Vk59z6w128ExCrY3lwlSYWhVrYenucFhTuick0VD.webp",
                  "bannerUrl": null,
                  "filterableAttributes": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attributes/1",
                          "_id": 1,
                          "code": "color",
                          "adminName": "Color",
                          "type": "select"
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/attributes/2",
                          "_id": 2,
                          "code": "size",
                          "adminName": "Size",
                          "type": "select"
                        }
                      }
                    ]
                  },
                  "translation": {
                    "name": "Electronics",
                    "slug": "electronics",
                    "urlPath": "electronics"
                  },
                  "children": {
                    "edges": []
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/category_translations/60",
                          "_id": 60,
                          "categoryId": "8",
                          "name": "Electronics",
                          "slug": "electronics",
                          "urlPath": "electronics",
                          "description": "<p>Discover a wide range of cutting-edge electronics, from smartphones and laptops to home appliances and gadgets.</p>",
                          "metaTitle": "Electronics",
                          "metaDescription": "",
                          "metaKeywords": "electronics, electronics-keyboard",
                          "localeId": "1",
                          "locale": "en"
                        },
                        "cursor": "MA=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "startCursor": "MA==",
                      "hasNextPage": true,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/22",
                  "_id": 22,
                  "position": 4,
                  "status": "1",
                  "logoPath": "category/22/MDbnYET88gzG1ipz3ClxiKSO2wOybEzESa0o0jHc.webp",
                  "displayMode": "products_and_description",
                  "_lft": "16",
                  "_rgt": "17",
                  "additional": null,
                  "bannerPath": null,
                  "createdAt": "2025-08-28T18:52:22+05:30",
                  "updatedAt": "2026-01-02T19:24:08+05:30",
                  "url": "https://api-demo.bagisto.com/fashion",
                  "logoUrl": "https://api-demo.bagisto.com/storage/category/22/MDbnYET88gzG1ipz3ClxiKSO2wOybEzESa0o0jHc.webp",
                  "bannerUrl": null,
                  "filterableAttributes": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attributes/1",
                          "_id": 1,
                          "code": "color",
                          "adminName": "Color",
                          "type": "select"
                        }
                      }
                    ]
                  },
                  "translation": {
                    "name": "Fashion",
                    "slug": "fashion",
                    "urlPath": ""
                  },
                  "children": {
                    "edges": []
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/category_translations/186",
                          "_id": 186,
                          "categoryId": "22",
                          "name": "Fashion",
                          "slug": "fashion",
                          "urlPath": "",
                          "description": "<p>Explore the latest trends in fashion with our curated collection of clothing, accessories, and footwear.</p>",
                          "metaTitle": "",
                          "metaDescription": "",
                          "metaKeywords": "",
                          "localeId": "1",
                          "locale": "en"
                        },
                        "cursor": "MA=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "startCursor": "MA==",
                      "hasNextPage": true,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/categories/23",
                  "_id": 23,
                  "position": 3,
                  "status": "1",
                  "logoPath": "category/23/GuIZOJY3oW09ku4zqxIfKvtXho9gOnq4eCl0HmOW.webp",
                  "displayMode": "products_and_description",
                  "_lft": "18",
                  "_rgt": "25",
                  "additional": null,
                  "bannerPath": null,
                  "createdAt": "2025-09-03T12:43:50+05:30",
                  "updatedAt": "2025-09-03T18:26:45+05:30",
                  "url": "https://api-demo.bagisto.com/furniture",
                  "logoUrl": "https://api-demo.bagisto.com/storage/category/23/GuIZOJY3oW09ku4zqxIfKvtXho9gOnq4eCl0HmOW.webp",
                  "bannerUrl": null,
                  "filterableAttributes": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/attributes/3",
                          "_id": 3,
                          "code": "material",
                          "adminName": "Material",
                          "type": "select"
                        }
                      }
                    ]
                  },
                  "translation": {
                    "name": "Furniture",
                    "slug": "furniture",
                    "urlPath": ""
                  },
                  "children": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/categories/19",
                          "_id": 19,
                          "position": 7,
                          "status": "1",
                          "translation": {
                            "name": "Plastic Sofa",
                            "slug": "plastic-sofa",
                            "urlPath": ""
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/categories/20",
                          "_id": 20,
                          "position": 6,
                          "status": "1",
                          "translation": {
                            "name": "Wooden Sofa",
                            "slug": "wooden-sofa",
                            "urlPath": ""
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/categories/21",
                          "_id": 21,
                          "position": 5,
                          "status": "1",
                          "translation": {
                            "name": "Leather Sofa",
                            "slug": "leather-sofa",
                            "urlPath": ""
                          }
                        }
                      }
                    ]
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/category_translations/195",
                          "_id": 195,
                          "categoryId": "23",
                          "name": "Furniture",
                          "slug": "furniture",
                          "urlPath": "",
                          "description": "<p>Discover our wide range of furniture designed to bring comfort, style, and functionality to every corner of your home.</p>",
                          "metaTitle": "",
                          "metaDescription": "",
                          "metaKeywords": "",
                          "localeId": "1",
                          "locale": "en"
                        },
                        "cursor": "MA=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MA==",
                      "startCursor": "MA==",
                      "hasNextPage": true,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                }
              }
            ],
            "pageInfo": {
              "endCursor": "Ng==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 7
          }
        }
      }
    commonErrors:
      - error: INVALID_FIRST_VALUE
        cause: First argument value is out of bounds
        solution: Use first value between 1 and 100
      - error: INVALID_CURSOR
        cause: Cursor format is invalid or expired
        solution: Use cursor values from the previous response

  - id: get-categories-with-pagination
    title: Get Categories with Cursor Pagination
    description: Paginate through categories using cursor-based pagination for optimal performance.
    query: |
      query getCategories($first: Int, $after: String, $last: Int, $before: String) {
        categories(first: $first, after: $after, last: $last, before: $before) {
          edges {
            node {
              id
              _id
              position
              translation {
                name
                slug
              }
              status
              children {
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
        "first": 5,
        "after": null
      }
    response: |
      {
        "data": {
          "categories": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/categories/1",
                  "_id": 1,
                  "position": 1,
                  "translation": {
                    "name": "Root",
                    "slug": "root"
                  },
                  "status": "0",
                  "children": {
                    "totalCount": 3
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/8",
                  "_id": 8,
                  "position": 2,
                  "translation": {
                    "name": "Electronics",
                    "slug": "electronics"
                  },
                  "status": "1",
                  "children": {
                    "totalCount": 0
                  }
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/19",
                  "_id": 19,
                  "position": 7,
                  "translation": {
                    "name": "Plastic Sofa",
                    "slug": "plastic-sofa"
                  },
                  "status": "1",
                  "children": {
                    "totalCount": 0
                  }
                },
                "cursor": "Mg=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/20",
                  "_id": 20,
                  "position": 6,
                  "translation": {
                    "name": "Wooden Sofa",
                    "slug": "wooden-sofa"
                  },
                  "status": "1",
                  "children": {
                    "totalCount": 0
                  }
                },
                "cursor": "Mw=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/21",
                  "_id": 21,
                  "position": 5,
                  "translation": {
                    "name": "Leather Sofa",
                    "slug": "leather-sofa"
                  },
                  "status": "1",
                  "children": {
                    "totalCount": 0
                  }
                },
                "cursor": "NA=="
              }
            ],
            "pageInfo": {
              "endCursor": "NA==",
              "startCursor": "MA==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 7
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: Pagination cursor is invalid
        solution: Use cursor from previous response pageInfo
      - error: INVALID_PAGINATION_PARAMS
        cause: Using both forward and backward pagination
        solution: Use either (first, after) or (last, before), not both

  - id: get-categories-with-children
    title: Get Categories with Child Categories
    description: Retrieve categories along with their child categories for hierarchical display.
    query: |
      query getCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              position
              translation {
                name
                slug
              }
              children(first: 50) {
                edges {
                  node {
                    id
                    _id
                    position
                    translation {
                      name
                      slug
                    }
                  }
                }
                totalCount
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
    variables: |
      {
        "first": 5,
        "after": null
      }
    response: |
      {
        "data": {
          "categories": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/categories/1",
                  "_id": 1,
                  "position": 1,
                  "translation": {
                    "name": "Root",
                    "slug": "root"
                  },
                  "children": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/categories/8",
                          "_id": 8,
                          "position": 2,
                          "translation": {
                            "name": "Electronics",
                            "slug": "electronics"
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/categories/22",
                          "_id": 22,
                          "position": 4,
                          "translation": {
                            "name": "Fashion",
                            "slug": "fashion"
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/categories/23",
                          "_id": 23,
                          "position": 3,
                          "translation": {
                            "name": "Furniture",
                            "slug": "furniture"
                          }
                        }
                      }
                    ],
                    "totalCount": 3
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/8",
                  "_id": 8,
                  "position": 2,
                  "translation": {
                    "name": "Electronics",
                    "slug": "electronics"
                  },
                  "children": {
                    "edges": [],
                    "totalCount": 0
                  }
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/19",
                  "_id": 19,
                  "position": 7,
                  "translation": {
                    "name": "Plastic Sofa",
                    "slug": "plastic-sofa"
                  },
                  "children": {
                    "edges": [],
                    "totalCount": 0
                  }
                },
                "cursor": "Mg=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/20",
                  "_id": 20,
                  "position": 6,
                  "translation": {
                    "name": "Wooden Sofa",
                    "slug": "wooden-sofa"
                  },
                  "children": {
                    "edges": [],
                    "totalCount": 0
                  }
                },
                "cursor": "Mw=="
              },
              {
                "node": {
                  "id": "/api/shop/categories/21",
                  "_id": 21,
                  "position": 5,
                  "translation": {
                    "name": "Leather Sofa",
                    "slug": "leather-sofa"
                  },
                  "children": {
                    "edges": [],
                    "totalCount": 0
                  }
                },
                "cursor": "NA=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "NA=="
            },
            "totalCount": 7
          }
        }
      }
    commonErrors:
      - error: INVALID_FIRST_VALUE
        cause: First value exceeds maximum
        solution: Use value between 1 and 100
---

# Categories

## About

The `categories` query retrieves the complete list of product categories with full details including translations, media assets, and hierarchy information. Use this query to:

- Build category navigation menus and sidebars
- Display breadcrumb paths for product browsing
- Implement category-based product filtering
- Create category landing pages and collections
- Sync category structure with external systems
- Display category metadata (images, descriptions, logos, banners)
- Support multi-language category content
- Show category hierarchy with children counts

This query supports full pagination with cursor-based navigation and includes complete SEO metadata and display settings for each category.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of categories to return (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Pagination cursor for forward navigation. Use with `first`. |
| `last` | `Int` | ❌ No | Number of categories for backward pagination. Max: 100. |
| `before` | `String` | ❌ No | Pagination cursor for backward navigation. Use with `last`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique category API identifier. |
| `_id` | `Int!` | Numeric category ID. |
| `position` | `Int` | Display position among siblings. |
| `logoPath` | `String` | File path to category logo. |
| `logoUrl` | `String` | Full URL to category logo image. |
| `bannerPath` | `String` | File path to category banner. |
| `bannerUrl` | `String` | Full URL to category banner image. |
| `status` | `Int` | Category status (0 = inactive, 1 = active). |
| `displayMode` | `String` | Display mode: `products_only`, `category_and_products`, `products_and_description`. |
| `_lft` | `Int` | Left value for nested set tree structure. |
| `_rgt` | `Int` | Right value for nested set tree structure. |
| `additional` | `String` | Additional metadata (JSON format). |
| `translation` | `CategoryTranslation!` | Default locale translation. |
| `translation.id` | `ID!` | Translation identifier. |
| `translation._id` | `Int!` | Numeric translation ID. |
| `translation.categoryId` | `Int!` | Associated category ID. |
| `translation.name` | `String!` | Category name in current language. |
| `translation.slug` | `String!` | URL slug for the category. |
| `translation.urlPath` | `String!` | Full URL path including hierarchy. |
| `translation.description` | `String` | Category description text. |
| `translation.metaTitle` | `String` | SEO meta title tag. |
| `translation.metaDescription` | `String` | SEO meta description. |
| `translation.metaKeywords` | `String` | SEO keywords. |
| `translation.localeId` | `Int` | Locale identifier. |
| `translation.locale` | `String!` | Language locale code (e.g., 'en', 'ar', 'fr'). |
| `translations` | `CategoryTranslationCollection!` | All available translations. |
| `translations.edges` | `[Edge!]!` | Translation edges with cursors. |
| `translations.pageInfo` | `PageInfo!` | Pagination info for translations. |
| `translations.totalCount` | `Int!` | Total translations for this category. |
| `createdAt` | `DateTime!` | Category creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `url` | `String` | Full category URL. |
| `filterableAttributes` | `AttributeCollection!` | Attributes configured for filtering in this category. |
| `filterableAttributes.edges` | `[Edge!]!` | Attribute edges. |
| `filterableAttributes.edges.node.id` | `ID!` | Attribute API identifier. |
| `filterableAttributes.edges.node._id` | `Int!` | Numeric attribute ID. |
| `filterableAttributes.edges.node.code` | `String!` | Attribute code (e.g., `color`, `size`). |
| `filterableAttributes.edges.node.adminName` | `String!` | Attribute label shown in admin panel. |
| `filterableAttributes.edges.node.type` | `String!` | Attribute input type (e.g., `select`, `multiselect`, `boolean`). |
| `children` | `CategoryCollection!` | Child categories. |
| `children.edges` | `[Edge!]!` | Child category edges. |
| `children.totalCount` | `Int!` | Total child categories. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total categories matching filters. |

## Use Cases

### 1. Main Navigation Menu
Use the "Optimized for Navigation" example for rendering dropdown category menus.

### 2. Multi-Language Support
Use the "With All Translations" example to display categories in multiple languages.

### 3. Category Listing Page
Use the "Complete Details" example for full category information with images.

### 4. Pagination
Use the "With Cursor Pagination" example for handling large category lists.

## Best Practices

1. **Request Only Needed Fields** - Minimize data transfer by selecting only required fields
2. **Use Pagination** - Always use pagination for better performance with many categories
3. **Cache Results** - Categories change infrequently, cache the full list
4. **Filter by Status** - Only fetch active categories by default
5. **Include SEO Data** - Always fetch meta tags for search engine optimization
6. **Use Translations** - Fetch translations for multi-language support

## Related Resources

- [Tree Categories](/api/graphql-api/shop/queries/tree-categories) - Hierarchical category tree for navigation
- [Get Products](/api/graphql-api/shop/queries/get-products) - Query products within a category
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources


