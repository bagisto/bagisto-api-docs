---
outline: false
examples:
  - id: get-category-by-id-basic
    title: Get Category by ID - Basic
    description: Retrieve basic information for a single category by its ID.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
          id
          _id
          position
          status
          translation {
            name
            slug
            urlPath
            description
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/categories/23"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/23",
            "_id": 23,
            "position": 3,
            "status": "1",
            "translation": {
              "name": "Furniture",
              "slug": "furniture",
              "urlPath": "",
              "description": "<p>Discover our wide range of <strong>furniture designed to bring comfort, style, and functionality</strong> to every corner of your home. From elegant sofas and sturdy wooden tables to cozy beds and smart storage solutions, each piece is crafted with quality and care to suit your lifestyle.</p>"
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Category ID parameter is missing
        solution: Provide the category ID as a required parameter
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/categories/1" or numeric ID
        solution: Use either numeric ID (1) or IRI format (/api/shop/categories/1)
      - error: not-found
        cause: Category with given ID does not exist
        solution: Verify the category ID is correct and the category is active

  - id: get-category-by-numeric-id
    title: Get Category by Numeric ID
    description: Retrieve category using numeric ID format instead of IRI.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
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
    variables: |
      {
        "id": 23
      }
    response: |
      {
        "data": {
          "category": {
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
      }
    commonErrors:
      - error: id-required
        cause: Category ID parameter is missing
        solution: Provide the category ID as a required parameter
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/categories/1" or numeric ID
        solution: Use either numeric ID (1) or IRI format (/api/shop/categories/1)
      - error: not-found
        cause: Category with given ID does not exist
        solution: Verify the category ID is correct and the category is active

  - id: get-category-complete
    title: Get Category - Complete Details
    description: Retrieve complete category information including logos, banners, translations, and children.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
          id
          _id
          position
          logoPath
          logoUrl
          status
          displayMode
          _lft
          _rgt
          additional
          bannerPath
          bannerUrl
          translation {
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
          translations {
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
          createdAt
          updatedAt
          url
          children {
            edges {
              node {
                id
                _id
                position
                logoUrl
                status
                translation {
                  name
                  slug
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
              startCursor
              hasPreviousPage
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/categories/23"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/23",
            "_id": 23,
            "position": 3,
            "logoPath": "category/23/GuIZOJY3oW09ku4zqxIfKvtXho9gOnq4eCl0HmOW.webp",
            "logoUrl": "https://api-demo.bagisto.com/storage/category/23/GuIZOJY3oW09ku4zqxIfKvtXho9gOnq4eCl0HmOW.webp",
            "status": "1",
            "displayMode": "products_and_description",
            "_lft": "18",
            "_rgt": "25",
            "additional": null,
            "bannerPath": null,
            "bannerUrl": null,
            "translation": {
              "id": "/api/shop/category_translations/195",
              "_id": 195,
              "categoryId": "23",
              "name": "Furniture",
              "slug": "furniture",
              "urlPath": "",
              "description": "<p>Discover our wide range of <strong>furniture designed to bring comfort, style, and functionality</strong> to every corner of your home.</p>",
              "metaTitle": "",
              "metaDescription": "",
              "metaKeywords": "",
              "localeId": "1",
              "locale": "en"
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
                    "description": "<p>Discover our wide range of <strong>furniture designed to bring comfort, style, and functionality</strong> to every corner of your home.</p>",
                    "metaTitle": "",
                    "metaDescription": "",
                    "metaKeywords": "",
                    "localeId": "1",
                    "locale": "en"
                  },
                  "cursor": "MA=="
                },
                {
                  "node": {
                    "id": "/api/shop/category_translations/204",
                    "_id": 204,
                    "categoryId": "23",
                    "name": "الأثاث",
                    "slug": "الأثاث",
                    "urlPath": "",
                    "description": "<p>اكتشف مجموعتنا الواسعة من الأثاث المصمم ليمنح كل زاوية في منزلك الراحة، والأناقة، والعملية.</p>",
                    "metaTitle": "",
                    "metaDescription": "",
                    "metaKeywords": "",
                    "localeId": null,
                    "locale": "AR"
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
            },
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
                },
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
            "createdAt": "2025-09-03T12:43:50+05:30",
            "updatedAt": "2025-09-03T18:26:45+05:30",
            "url": "https://api-demo.bagisto.com/furniture",
            "children": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/categories/19",
                    "_id": 19,
                    "position": 7,
                    "logoUrl": "https://api-demo.bagisto.com/storage/category/19/pmfWVVuhj7VK4dXFZG1ZlBeaUPwLrE4Ua99oer9l.webp",
                    "status": "1",
                    "translation": {
                      "name": "Plastic Sofa",
                      "slug": "plastic-sofa"
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/categories/20",
                    "_id": 20,
                    "position": 6,
                    "logoUrl": "https://api-demo.bagisto.com/storage/category/20/WO71UuFFtbSRbjZVr7QUbNuMZM4PRSIAjHSLqUUY.webp",
                    "status": "1",
                    "translation": {
                      "name": "Wooden Sofa",
                      "slug": "wooden-sofa"
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/categories/21",
                    "_id": 21,
                    "position": 5,
                    "logoUrl": "https://api-demo.bagisto.com/storage/category/21/Q8Z5RUYiBwPVKVkJNJ0XOfWitDiqP7admksTYxKm.webp",
                    "status": "1",
                    "translation": {
                      "name": "Leather Sofa",
                      "slug": "leather-sofa"
                    }
                  }
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "Mg==",
                "startCursor": "MA==",
                "hasPreviousPage": false
              },
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Category ID parameter is missing
        solution: Provide the category ID as a required parameter
      - error: not-found
        cause: Category with given ID does not exist
        solution: Verify the category ID is correct and the category is active

  - id: get-category-with-seo
    title: Get Category with SEO Data
    description: Retrieve category with complete SEO metadata for search engine optimization.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
          id
          _id
          url
          translation {
            name
            slug
            urlPath
            description
            metaTitle
            metaDescription
            metaKeywords
          }
          translations {
            edges {
              node {
                name
                slug
                metaTitle
                metaDescription
                metaKeywords
                locale
              }
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/categories/23"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/23",
            "_id": 23,
            "url": "https://api-demo.bagisto.com/furniture",
            "translation": {
              "name": "Furniture",
              "slug": "furniture",
              "urlPath": "",
              "description": "<p>Discover our wide range of <strong>furniture designed to bring comfort, style, and functionality</strong> to every corner of your home. From elegant sofas and sturdy wooden tables to cozy beds and smart storage solutions, each piece is crafted with quality and care to suit your lifestyle.</p>",
              "metaTitle": "",
              "metaDescription": "",
              "metaKeywords": ""
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "name": "Furniture",
                    "slug": "furniture",
                    "metaTitle": "",
                    "metaDescription": "",
                    "metaKeywords": "",
                    "locale": "en"
                  }
                },
                {
                  "node": {
                    "name": "الأثاث",
                    "slug": "الأثاث",
                    "metaTitle": "",
                    "metaDescription": "",
                    "metaKeywords": "",
                    "locale": "AR"
                  }
                }
              ],
              "totalCount": 2
            }
          }
        }
      }
    commonErrors:
      - error: MISSING_SEO_DATA
        cause: Category has no SEO metadata
        solution: Add SEO information in admin panel

  - id: get-category-display-settings
    title: Get Category Display Settings
    description: Retrieve category display configuration including mode, logos, and banners.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
          id
          _id
          position
          logoPath
          logoUrl
          bannerPath
          bannerUrl
          displayMode
          status
          _lft
          _rgt
          translation {
            name
            slug
            description
          }
          children {
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/categories/23"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/23",
            "_id": 23,
            "position": 3,
            "logoPath": "category/23/GuIZOJY3oW09ku4zqxIfKvtXho9gOnq4eCl0HmOW.webp",
            "logoUrl": "https://api-demo.bagisto.com/storage/category/23/GuIZOJY3oW09ku4zqxIfKvtXho9gOnq4eCl0HmOW.webp",
            "bannerPath": null,
            "bannerUrl": null,
            "displayMode": "products_and_description",
            "status": "1",
            "_lft": "18",
            "_rgt": "25",
            "translation": {
              "name": "Furniture",
              "slug": "furniture",
              "description": "<p>Discover our wide range of <strong>furniture designed to bring comfort, style, and functionality</strong> to every corner of your home. From elegant sofas and sturdy wooden tables to cozy beds and smart storage solutions, each piece is crafted with quality and care to suit your lifestyle.</p>"
            },
            "children": {
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_DISPLAY_MODE
        cause: Display mode value is not supported
        solution: Use products_only, category_and_products, or products_and_description

  - id: get-category-with-children
    title: Get Category with All Children
    description: Retrieve category with complete information about all child categories.
    query: |
      query getCategoryByID($id: ID!) {
        category(id: $id) {
          id
          _id
          translation {
            name
            slug
          }
          url
          children {
            edges {
              node {
                id
                _id
                position
                translation {
                  name
                  slug
                }
                logoUrl
                status
                children {
                  totalCount
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/categories/23"
      }
    response: |
      {
        "data": {
          "category": {
            "id": "/api/shop/categories/23",
            "_id": 23,
            "translation": {
              "name": "Furniture",
              "slug": "furniture"
            },
            "url": "https://api-demo.bagisto.com/furniture",
            "children": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/categories/19",
                    "_id": 19,
                    "position": 7,
                    "translation": {
                      "name": "Plastic Sofa",
                      "slug": "plastic-sofa"
                    },
                    "logoUrl": "https://api-demo.bagisto.com/storage/category/19/pmfWVVuhj7VK4dXFZG1ZlBeaUPwLrE4Ua99oer9l.webp",
                    "status": "1",
                    "children": {
                      "totalCount": 0
                    }
                  }
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
                    "logoUrl": "https://api-demo.bagisto.com/storage/category/20/WO71UuFFtbSRbjZVr7QUbNuMZM4PRSIAjHSLqUUY.webp",
                    "status": "1",
                    "children": {
                      "totalCount": 0
                    }
                  }
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
                    "logoUrl": "https://api-demo.bagisto.com/storage/category/21/Q8Z5RUYiBwPVKVkJNJ0XOfWitDiqP7admksTYxKm.webp",
                    "status": "1",
                    "children": {
                      "totalCount": 0
                    }
                  }
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "endCursor": "Mg=="
              },
              "totalCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: NO_CHILDREN
        cause: Category has no child categories
        solution: This is normal for leaf categories

---

# Get Category

## About

The `category` query retrieves detailed information about a single category by its ID. Use this query to:

- Display category detail pages with complete information
- Show category images, descriptions, and SEO metadata
- Retrieve display settings and configuration options
- Build breadcrumb navigation
- Get category hierarchy information
- Access all translations for multi-language support
- Display category children and sub-categories
- Render category-specific layouts and content

This query returns comprehensive category data including logos, banners, all translations, display modes, and child category information.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | Category ID. Supports two formats: numeric ID (e.g., `1`) or IRI format (e.g., `/api/shop/categories/1`). Required. |

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
| `translations.edges.node` | `CategoryTranslation!` | Individual translation. |
| `translations.edges.cursor` | `String!` | Pagination cursor for this translation. |
| `translations.pageInfo` | `PageInfo!` | Pagination info for translations. |
| `translations.pageInfo.hasNextPage` | `Boolean!` | More translations available. |
| `translations.pageInfo.hasPreviousPage` | `Boolean!` | Previous translations available. |
| `translations.pageInfo.startCursor` | `String` | First translation cursor. |
| `translations.pageInfo.endCursor` | `String` | Last translation cursor. |
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
| `children.edges.node` | `Category!` | Individual child category. |
| `children.pageInfo` | `PageInfo!` | Pagination info for children. |
| `children.totalCount` | `Int!` | Total child categories. |

## Display Modes

| Mode | Description |
|------|-------------|
| `products_only` | Show only products, no category description. |
| `category_and_products` | Show category and products together. |
| `products_and_description` | Show products with category description. |

## Use Cases

### 1. Category Detail Page
Use the "Complete Details" example to display a full category page with all information.

### 2. SEO Optimization
Use the "With SEO Data" example to get all metadata for search engines.

### 3. Category Display Settings
Use the "Display Settings" example to configure how the category should be rendered.

### 4. Category Hierarchy
Use the "With All Children" example to show subcategories.

## Best Practices

1. **Cache Category Data** - Categories change infrequently, cache the response
2. **Include All Translations** - Fetch all translations for multi-language support
3. **Use Correct ID Format** - Use `/api/shop/categories/{id}` format when available
4. **Optimize Field Selection** - Request only fields your UI needs
5. **Include SEO Data** - Always fetch meta tags for optimization
6. **Check Status** - Verify category is active before displaying

## Related Resources

- [Categories](/api/graphql-api/shop/queries/categories) - Get all categories with pagination
- [Tree Categories](/api/graphql-api/shop/queries/tree-categories) - Get hierarchical category tree
- [Get Products](/api/graphql-api/shop/queries/get-products) - Query products within a category
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
