---
outline: false
examples:
  - id: get-product-by-id
    title: Get Product by ID
    description: Retrieve product information using the product ID.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
        }
      }
    variables: |
      {
        "id": "1"
      }
    response: |
      {
        "data": {
          "product": {
            "id": "1",
            "name": "Product Name",
            "sku": "PROD-001",
            "urlKey": "product-name",
            "price": 99.99
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
      - error: INVALID_ID
        cause: Invalid ID format
        solution: Use valid numeric or string ID
  - id: get-product-by-sku
    title: Get Product by SKU
    description: Retrieve product using the product SKU (Stock Keeping Unit).
    query: |
      query getProduct($sku: String!) {
        product(sku: $sku) {
          id
          name
          sku
          urlKey
          price
        }
      }
    variables: |
      {
        "sku": "COASTALBREEZEMENSHOODIE"
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/1",
            "name": "Coastal Breeze Men's Blue Zipper Hoodie",
            "sku": "COASTALBREEZEMENSHOODIE",
            "urlKey": "coastal-breeze-mens-blue-zipper-hoodie",
            "price": "100"
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: SKU does not exist
        solution: Check product SKU spelling
  - id: get-product-with-variants
    title: Get Product with Variants
    description: Retrieve product including variant options.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          variants {
            edges {
              node {
                id
                name
                sku
                price
                attributeValues {
                  edges {
                    node {
                      value
                      attribute {
                        code
                        adminName
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
        "id": "1"
      }
    response: |
      {
        "data": {
          "product": {
            "id": "1",
            "name": "T-Shirt",
            "sku": "TSHIRT-001",
            "urlKey": "t-shirt",
            "price": 29.99,
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/products/8",
                    "name": "OmniHeat Men's Solid Hooded Puffer Jacket-Blue-Yellow-M",
                    "sku": "SP-005",
                    "price": "14",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "SP-001",
                            "attribute": {
                              "code": "sku",
                              "adminName": "SKU"
                            }
                          }
                        },
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: NO_VARIANTS
        cause: Product has no variants
        solution: Use simple product query
  - id: get-product-details-full
    title: Get Full Product Details
    description: Retrieve complete product information including attributes, images, descriptions, and pricing.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          description
          shortDescription
          price
          specialPrice
          images {
            edges {
              node {
                id
                publicPath
                position
              }
            }
          }
          attributeValues {
            edges {
              node {
                value
                attribute {
                  code
                  adminName
                }
              }
            }
          }
          variants {
            edges {
              node {
                id
                name
                sku
                price
                attributeValues {
                  edges {
                    node {
                      value
                      attribute {
                        code
                        adminName
                      }
                    }
                  }
                }
              }
            }
          }
          categories {
            edges {
              node {
                id
                translation {
                  name
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "1"
      }
    response: |
      {
        "data": {
          "product": {
            "id": "1",
            "name": "Premium Wireless Headphones",
            "sku": "HEADPHONES-001",
            "urlKey": "premium-wireless-headphones",
            "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life",
            "shortDescription": "Premium wireless headphones with active noise cancellation",
            "price": 199.99,
            "specialPrice": 149.99,
            "images": {
              "edges": [
                {
                  "node": {
                    "id": "/api/admin/images/7",
                    "publicPath": "http://127.0.0.1:8000/storage/product/7/L79gIVq7SdiKK2Xk7MHVHdEZgAb32TedY764iZr4.webp",
                    "position": "1"
                  }
                },
                {
                  "node": {
                    "id": "/api/admin/images/8",
                    "publicPath": "http://127.0.0.1:8000/storage/product/7/sW5mmHIh07PJJefnSLC8jwtvx0BpjnWVhVUYonVs.webp",
                    "position": "2"
                  }
                },
                {
                  "node": {
                    "id": "/api/admin/images/9",
                    "publicPath": "http://127.0.0.1:8000/storage/product/7/4Br5gcMadRVhsIAli3Q8qLKvBabRA9aPXQhL7dI1.webp",
                    "position": "3"
                  }
                }
              ]
            },
            "attributes": [
              {
                "code": "color",
                "value": "Black"
              },
              {
                "code": "brand",
                "value": "Premium Audio"
              }
            ],
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/products/8",
                    "name": "OmniHeat Men's Solid Hooded Puffer Jacket-Blue-Yellow-M",
                    "sku": "SP-005",
                    "price": "14",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "SP-001",
                            "attribute": {
                              "code": "sku",
                              "adminName": "SKU"
                            }
                          }
                        },
                      ]
                    }
                  }
                },
              ]
            },
            "categories": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/categories/3",
                    "translation": {
                      "name": "Winter Wear"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID is correct
---

# Single Product

## About

The `product` query retrieves a single product by its unique identifier, SKU, or URL key. Use this query to:

- Fetch individual products for detail pages
- Look up products by different identifier types (ID, SKU, URL)
- Display complete product information including images, variants, and attributes
- Show product pricing, descriptions, and SEO metadata
- Retrieve inventory and availability status
- Build product-specific API integrations
- Generate product detail pages with all metadata

This query supports multiple lookup methods (ID, SKU, or URL key) and can return minimal data for previews or comprehensive data for full product detail pages, making it flexible for various use cases.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID` | Product's unique system identifier. Use this for direct lookups. |
| `sku` | `String` | Stock Keeping Unit. Alternative identifier for product lookup. |
| `urlKey` | `String` | URL-friendly product slug. Alternative lookup method. |
| `include_variants` | `Boolean` | Include product variants (colors, sizes, options). Default: `false` |
| `include_images` | `Boolean` | Include product images. Default: `false` |
| `include_attributes` | `Boolean` | Include custom product attributes. Default: `true` |
| `image_resolution` | `String` | Image quality: `thumbnail`, `medium`, `large`, `original`. Default: `large` |
| `include_recommendations` | `Boolean` | Include related and recommended products. Default: `false` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique product identifier. |
| `name` | `String!` | Product display name. |
| `sku` | `String!` | Stock Keeping Unit for inventory tracking. |
| `urlKey` | `String!` | URL-friendly product slug for SEO. |
| `type` | `String!` | Product type (simple, configurable, grouped, bundle). |
| `description` | `String` | Full product description with formatting. |
| `shortDescription` | `String` | Brief product summary. |
| `price` | `Float!` | Base product price. |
| `specialPrice` | `Float` | Promotional/discounted price if applicable. |
| `taxClass` | `String` | Tax classification for the product. |
| `images` | `[ProductImage!]` | Array of product images with URLs and metadata. |
| `images.url` | `String!` | Image URL. |
| `images.altText` | `String` | Image alt text for accessibility. |
| `images.position` | `Int` | Image order in gallery. |
| `images.width` | `Int` | Image width in pixels. |
| `images.height` | `Int` | Image height in pixels. |
| `attributes` | `[ProductAttribute!]` | Custom product attributes and values. |
| `variants` | `[ProductVariant!]` | Product variants (colors, sizes, options). |
| `variants.sku` | `String!` | Variant SKU. |
| `variants.price` | `Float!` | Variant-specific price. |
| `inventory` | `InventoryInfo!` | Stock availability information. |
| `inventory.stock` | `Int!` | Current stock quantity. |
| `inventory.status` | `String!` | Stock status (in_stock, out_of_stock, low_stock). |
| `categories` | `[Category!]!` | Categories this product belongs to. |
| `tags` | `[String!]` | Product tags and labels. |
| `seo` | `ProductSEO!` | SEO metadata. |
| `status` | `String!` | Product status (active, draft, inactive). |
| `visibility` | `String!` | Visibility status (visible, not visible, search only). |
| `createdAt` | `DateTime!` | Product creation date. |
| `updatedAt` | `DateTime!` | Last modification date. |

