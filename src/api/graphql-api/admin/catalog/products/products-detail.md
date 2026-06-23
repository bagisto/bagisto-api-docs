---
outline: false
examples:
  - id: admin-catalog-product-detail
    title: Catalog Product Detail — type-aware (GraphQL)
    description: Fetch a single catalog product by IRI. Every nested block is a field-selectable Relay connection (edges { node }) — images, videos, categories, inventories, customerGroupPrices, translations, channels, attributeValues, and the type-specific blocks (superAttributes/variants, bundleOptions, linkedProducts, downloadableLinks/downloadableSamples, customizableOptions). Type-specific connections are empty on non-matching types. The full computed attributes field set and bookingProduct are REST-only — over GraphQL use the attributeValues connection.
    query: |
      query AdminCatalogProduct($id: ID!) {
        adminCatalogProduct(id: $id) {
          id
          _id
          sku
          name
          type
          status
          price
          formattedPrice
          specialPrice
          formattedSpecialPrice
          specialPriceFrom
          specialPriceTo
          quantity
          baseImageUrl
          imagesCount
          categoryId
          categoryName
          channel
          locale
          attributeFamilyId
          attributeFamilyName
          urlKey
          visibleIndividually
          shortDescription
          description
          metaTitle
          metaDescription
          metaKeywords
          weight
          taxCategoryId
          manageStock
          inStock
          featured
          new
          createdAt
          updatedAt
          translations {
            edges {
              node {
                _id
                locale
                name
                description
                shortDescription
                urlKey
                metaTitle
                metaDescription
                metaKeywords
              }
            }
          }
          images {
            edges {
              node {
                _id
                type
                path
                url
                position
              }
            }
          }
          videos {
            edges {
              node {
                _id
                type
                path
                url
                position
              }
            }
          }
          categories {
            edges {
              node {
                _id
                name
                slug
              }
            }
          }
          inventories {
            edges {
              node {
                _id
                sourceId
                sourceCode
                qty
              }
            }
          }
          customerGroupPrices {
            edges {
              node {
                _id
                customerGroupId
                qty
                valueType
                value
                uniqueId
              }
            }
          }
          channels {
            edges {
              node {
                _id
                code
                name
              }
            }
          }
          attributeValues {
            edges {
              node {
                _id
                attributeId
                code
                adminName
                type
                isRequired
                groupCode
                value
              }
            }
          }
          superAttributes {
            edges {
              node {
                _id
                code
                type
                adminName
                options {
                  edges {
                    node {
                      _id
                      adminName
                      swatchValue
                      sortOrder
                    }
                  }
                }
              }
            }
          }
          variants {
            edges {
              node {
                _id
                sku
                name
                price
                formattedPrice
                quantity
                inStock
                attributeValues {
                  edges {
                    node {
                      code
                      adminName
                      value
                    }
                  }
                }
              }
            }
          }
          bundleOptions {
            edges {
              node {
                _id
                label
                type
                position
                isRequired
                products {
                  edges {
                    node {
                      _id
                      productId
                      sku
                      name
                      qty
                      isDefault
                      sortOrder
                    }
                  }
                }
              }
            }
          }
          linkedProducts {
            edges {
              node {
                _id
                associatedProductId
                sku
                name
                qty
                sortOrder
              }
            }
          }
          downloadableLinks {
            edges {
              node {
                _id
                sortOrder
                downloads
                price
                formattedPrice
                type
                file
                fileUrl
                sampleFile
                sampleFileUrl
                sampleType
                translations {
                  edges {
                    node {
                      _id
                      locale
                      title
                    }
                  }
                }
              }
            }
          }
          downloadableSamples {
            edges {
              node {
                _id
                sortOrder
                type
                file
                fileUrl
                translations {
                  edges {
                    node {
                      _id
                      locale
                      title
                    }
                  }
                }
              }
            }
          }
          customizableOptions {
            edges {
              node {
                _id
                type
                isRequired
                sortOrder
                maxCharacters
                supportedFileExtensions
                translations {
                  edges {
                    node {
                      _id
                      locale
                      label
                    }
                  }
                }
                prices {
                  edges {
                    node {
                      _id
                      label
                      price
                      sortOrder
                    }
                  }
                }
              }
            }
          }
          relatedProducts {
            edges {
              node {
                _id
                sku
                type
                name
              }
            }
          }
          upSells {
            edges {
              node {
                _id
                sku
                type
                name
              }
            }
          }
          crossSells {
            edges {
              node {
                _id
                sku
                type
                name
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/catalog/products/42"
      }
    response: |
      {
        "data": {
          "adminCatalogProduct": {
            "id": "/api/admin/catalog/products/42",
            "_id": 42,
            "sku": "SP-001",
            "name": "Classic Watch",
            "type": "simple",
            "status": "1",
            "price": "99.9900",
            "formattedPrice": "$99.99",
            "specialPrice": null,
            "formattedSpecialPrice": null,
            "specialPriceFrom": null,
            "specialPriceTo": null,
            "quantity": "42",
            "baseImageUrl": "http://localhost:8000/storage/product/42/image.webp",
            "imagesCount": "3",
            "categoryId": "5",
            "categoryName": "Accessories",
            "channel": "default",
            "locale": "en",
            "attributeFamilyId": 1,
            "attributeFamilyName": "Default",
            "urlKey": "classic-watch",
            "visibleIndividually": "1",
            "shortDescription": "A premium timepiece.",
            "description": "Full HTML description.",
            "metaTitle": null,
            "metaDescription": null,
            "metaKeywords": null,
            "weight": "0.5",
            "taxCategoryId": null,
            "manageStock": "1",
            "inStock": "1",
            "featured": "0",
            "new": "1",
            "createdAt": "2026-01-12 08:15:00",
            "updatedAt": "2026-04-30 14:20:09",
            "translations": {
              "edges": [
                { "node": { "_id": 91, "locale": "en", "name": "Classic Watch", "description": "Full HTML description.", "shortDescription": "A premium timepiece.", "urlKey": "classic-watch", "metaTitle": null, "metaDescription": null, "metaKeywords": null } }
              ]
            },
            "images": {
              "edges": [
                { "node": { "_id": 1, "type": "image", "path": "product/42/img1.webp", "url": "http://localhost/storage/product/42/img1.webp", "position": 1 } }
              ]
            },
            "videos": { "edges": [] },
            "categories": {
              "edges": [
                { "node": { "_id": 5, "name": "Accessories", "slug": "accessories" } }
              ]
            },
            "inventories": {
              "edges": [
                { "node": { "_id": 12, "sourceId": 1, "sourceCode": "default", "qty": 42 } }
              ]
            },
            "customerGroupPrices": { "edges": [] },
            "channels": {
              "edges": [
                { "node": { "_id": 1, "code": "default", "name": "Default Channel" } }
              ]
            },
            "attributeValues": {
              "edges": [
                { "node": { "_id": 1001, "attributeId": 8, "code": "status", "adminName": "Status", "type": "boolean", "isRequired": true, "groupCode": "settings", "value": "1" } },
                { "node": { "_id": 1002, "attributeId": 11, "code": "price", "adminName": "Price", "type": "price", "isRequired": true, "groupCode": "price", "value": "99.9900" } }
              ]
            },
            "superAttributes": { "edges": [] },
            "variants": { "edges": [] },
            "bundleOptions": { "edges": [] },
            "linkedProducts": { "edges": [] },
            "downloadableLinks": { "edges": [] },
            "downloadableSamples": { "edges": [] },
            "customizableOptions": { "edges": [] },
            "relatedProducts": { "edges": [] },
            "upSells": { "edges": [] },
            "crossSells": { "edges": [] }
          }
        }
      }
---

# Catalog Product — Detail (GraphQL)

GraphQL item query that returns a single catalog product by its IRI. Every nested
block is a **field-selectable Relay connection** — sub-select exactly the fields
you need with `edges { node { … } }`.

## Operation

| Operation | Type |
|-----------|------|
| `adminCatalogProduct` | Query (item) |

::: tip Overview
See the [Products overview](/api/graphql-api/admin/catalog/products/) for how this
menu works, product types, and the create/update flow.
:::

## Authentication

All admin endpoints require an admin Bearer token — see
[Authentication](/api/graphql-api/admin/authentication).

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | API Platform IRI of the product (e.g. `"/api/admin/catalog/products/42"`) |

## Response shape

- **Top-level scalars** (`sku`, `name`, `type`, `price`, `formattedPrice`, `quantity`,
  `inStock`, `status`, `weight`, `urlKey`, `meta*`, `created/updated`, …) are always
  returned. Eloquent stringifies numeric/boolean scalars over GraphQL, so `status`
  comes back as `"1"`, `inStock` as `"1"`, etc. — cast client-side.
- **Connections** — every nested block is a connection you sub-select with
  `{ edges { node { … } } }`:

| Connection | Node fields | Present for |
|------------|-------------|-------------|
| `images` | `_id`, `type`, `path`, `url`, `position` | all |
| `videos` | `_id`, `type`, `path`, `url`, `position` | all |
| `categories` | `_id`, `name`, `slug` | all |
| `inventories` | `_id`, `sourceId`, `sourceCode`, `qty` | all |
| `customerGroupPrices` | `_id`, `customerGroupId`, `qty`, `valueType`, `value`, `uniqueId` | all |
| `translations` | `_id`, `locale`, `name`, `description`, `shortDescription`, `urlKey`, `metaTitle`, `metaDescription`, `metaKeywords` | all |
| `channels` | `_id`, `code`, `name` | all (the product's **assigned** channels) |
| `attributeValues` | `_id`, `attributeId`, `code`, `adminName`, `type`, `isRequired`, `groupCode`, `value` | all (the stored EAV values) |
| `superAttributes` | `_id`, `code`, `type`, `adminName`, `options { edges { node { _id adminName swatchValue sortOrder } } }` | `configurable` |
| `variants` | `_id`, `sku`, `name`, `price`, `formattedPrice`, `quantity`, `inStock`, `attributeValues { edges { node { code adminName value } } }` | `configurable` |
| `bundleOptions` | `_id`, `label`, `type`, `position`, `isRequired`, `products { edges { node { _id productId sku name qty isDefault sortOrder } } }` | `bundle` |
| `linkedProducts` | `_id`, `associatedProductId`, `sku`, `name`, `qty`, `sortOrder` | `grouped` |
| `downloadableLinks` | `_id`, `sortOrder`, `downloads`, `price`, `formattedPrice`, `type`, `file`, `fileUrl`, `sampleFile`, `sampleFileUrl`, `sampleType`, `translations { edges { node { _id locale title } } }` | `downloadable` |
| `downloadableSamples` | `_id`, `sortOrder`, `type`, `file`, `fileUrl`, `translations { edges { node { _id locale title } } }` | `downloadable` |
| `customizableOptions` | `_id`, `type`, `isRequired`, `sortOrder`, `maxCharacters`, `supportedFileExtensions`, `translations { edges { node { _id locale label } } }`, `prices { edges { node { _id label price sortOrder } } }` | all |
| `relatedProducts` / `upSells` / `crossSells` | `_id`, `sku`, `type`, `name` | all |

Type-specific connections (`superAttributes`/`variants`, `bundleOptions`,
`linkedProducts`, `downloadableLinks`/`downloadableSamples`) return **empty edges**
on non-matching types — switch on `type` to know which to read.

::: warning attributes and bookingProduct are REST-only
The full computed **`attributes`** block (the admin edit-screen field set, with
*empty* family fields shown) and the **`bookingProduct`** block are returned only by
the REST endpoint `GET /api/admin/catalog/products/{id}`. Over GraphQL, query the
**`attributeValues`** connection for the product's stored attribute values (one node
per set value; empty fields are not included), and read booking products via REST.
:::

## Notes

- **Connections, not bare JSON (changed).** Nested data is now field-selectable —
  query `images { edges { node { url } } }`, not bare `images`. This matches the
  storefront/Shopify shape; pick only the fields you need.
- **`id` argument is the IRI.** Construct it as `"/api/admin/catalog/products/{_id}"`
  from a listing's `_id`, or pass a listing edge's `id` directly.
- **REST is the flat counterpart.** `GET /api/admin/catalog/products/{id}` returns the
  same data with every nested block as a flat inline array/object (plus the full
  `attributes` and `bookingProduct` blocks).
- **Mutations don't return connections.** `createAdminCatalogProduct` /
  `updateAdminCatalogProduct` return the product's scalars; re-query
  `adminCatalogProduct` for the connections.
