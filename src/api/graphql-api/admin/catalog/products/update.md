---
outline: false
examples:
  - id: admin-catalog-product-update
    title: Update a Catalog Product
    description: Free-shape pass-through payload. Sub-resource fields (images / inventories / customerGroupPrices / videos) are stripped — use the dedicated endpoints.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct { id _id sku name status price formattedPrice }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog_products/42",
          "sku": "sp-001",
          "status": 1,
          "price": "99.99",
          "translations": {
            "en": { "name": "Classic Watch", "description": "A premium timepiece." }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog_products/42",
              "_id": 42,
              "sku": "sp-001",
              "name": "Classic Watch",
              "status": 1,
              "price": "99.9900",
              "formattedPrice": "$99.99"
            }
          }
        }
      }
---

# Catalog Product — Update

Equivalent to [`PUT /api/admin/catalog/products/{id}`](/api/rest-api/admin/catalog/products/update).

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a product that exists in your store — use the [`adminCatalogProducts`](./list.md) query to discover valid ids.
:::

## Operation

| Operation | Type |
|-----------|------|
| `updateAdminCatalogProduct` | Mutation |

## Input

Pass the resource IRI as `id`. All other fields are pass-through to the core
`ProductRepository::update`. See the [REST page](/api/rest-api/admin/catalog/products/update)
for the full field table.

::: warning Sub-resources stripped
`images`, `inventories`, `customerGroupPrices`, `videos` are removed from the
payload before update. Use the dedicated mutations
([reorder images](/api/graphql-api/admin/catalog/products/images-reorder),
[update inventories](/api/graphql-api/admin/catalog/products/inventories-update),
[customer-group prices](/api/graphql-api/admin/catalog/products/customer-group-prices-create)).
:::
