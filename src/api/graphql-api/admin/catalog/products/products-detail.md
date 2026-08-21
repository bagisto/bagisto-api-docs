---
outline: false
examples:
  - id: admin-catalog-product-detail
    title: Catalog Product Detail — type-aware (GraphQL)
    description: Fetch a single catalog product by IRI. Every nested block is a field-selectable Relay connection, so sub-select only what you need. Type-specific connections come back with empty edges on non-matching types. The example selects every field the query resolves; `attributes`, `bookingProduct`, and `warnings` are REST-only and omitted.
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
            "manageStock": null,
            "inStock": "1",
            "featured": "",
            "new": "1",
            "createdAt": "2026-01-12T08:15:00+05:30",
            "updatedAt": "2026-04-30T14:20:09+05:30",
            "translations": {
              "edges": [
                { "node": { "_id": 91, "locale": "en", "name": "Classic Watch", "description": "Full HTML description.", "shortDescription": "A premium timepiece.", "urlKey": "classic-watch", "metaTitle": null, "metaDescription": null, "metaKeywords": null } }
              ]
            },
            "images": {
              "edges": [
                { "node": { "_id": 1, "type": "images", "path": "product/42/img1.webp", "url": "http://localhost/storage/product/42/img1.webp", "position": 1 } }
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
                { "node": { "_id": 12, "sourceId": "1", "sourceCode": "default", "qty": 42 } }
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
                { "node": { "_id": 1001, "attributeId": 8, "code": "status", "adminName": "Status", "type": "boolean", "isRequired": "1", "groupCode": "settings", "value": "1" } },
                { "node": { "_id": 1002, "attributeId": 11, "code": "price", "adminName": "Price", "type": "price", "isRequired": "1", "groupCode": "price", "value": "99.9900" } }
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

For product types, the two-step create flow, and the per-product sub-resources, see the [Products overview](/api/graphql-api/admin/catalog/products/).

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | API Platform IRI of the product (e.g. `"/api/admin/catalog/products/42"`) |

## Response Shape

Top-level scalars carry the same values as the listing, so the traps are the same:

- **Booleans arrive as `"1"` or the empty string `""`**, never `true`/`false`. `status`, `visibleIndividually`, `featured`, `new`, and `inStock` are all typed String, so `status === "0"` never matches and `featured === false` never matches. Compare against `"1"`, or coerce.
- **Numbers arrive as strings.** `price`, `quantity`, `imagesCount`, `weight`, and `categoryId` are String; only `_id` and `attributeFamilyId` are Int.
- **`taxCategoryId` and `manageStock` are frequently `null`** even on the detail query — they resolve only when the product actually carries that attribute value.
- **Timestamps are ISO 8601 with offset**, `2026-01-12T08:15:00+05:30`.

Every nested block is a connection you sub-select with `{ edges { node { … } } }`:

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

Type-specific connections (`superAttributes` / `variants`, `bundleOptions`, `linkedProducts`, `downloadableLinks` / `downloadableSamples`) return **empty edges** on non-matching types — switch on `type` to know which to read. Selecting all of them regardless is safe.

Two connection details worth knowing:

- **An image node's `type` is the string `"images"`**, plural, not `"image"` — it names the storage folder, not the media kind. Video nodes carry `"videos"` for the same reason.
- **`channels` lists only the product's assigned channels**, not every channel in the store. The REST detail's `channels` block instead lists every channel with an `assigned` flag, so the two are not interchangeable.

### Configurable Option Lists

A configurable exposes its option data twice, and the two answer different questions:

- **`superAttributes { edges { node { options { edges { node } } } } }`** — every option the attribute defines, whether or not a variant uses it. This is the set to render in a picker.
- **`variants { edges { node { attributeValues { edges { node { code adminName value } } } } } }`** — the option value actually chosen for each existing variant.

### Fields That Are REST-Only

Three fields exist in the schema but always resolve `null` over GraphQL — `attributes`, `bookingProduct`, and `warnings`. They are returned only by `GET /api/admin/catalog/products/{id}`.

- **`attributes`** is the admin edit-screen field set, including family fields the product has *not* filled in. The GraphQL equivalent is the `attributeValues` connection, which carries one node per **stored** value — an unset field simply has no node, so you cannot tell "empty" from "not in this family" without the REST block.
- **`bookingProduct`** carries the booking sub-type, slots, and tickets. There is no GraphQL equivalent; read booking configuration over REST.
- **`warnings`** is populated only on the update response, never on a read.

## Errors

An unknown or deleted id returns HTTP `200` with `"Product not found."` in the GraphQL `errors[]` array and `null` in `data.adminCatalogProduct`.

## Working With This Query

- **The `id` argument is the IRI**, not the numeric id. Build it as `/api/admin/catalog/products/{_id}` from a listing row's `_id`, or pass a listing edge's `id` straight through.
- **REST is the flat counterpart.** `GET /api/admin/catalog/products/{id}` returns the same data with every nested block as an inline array, and adds `attributes`, `bookingProduct`, and the full `superAttributes[].options`.
