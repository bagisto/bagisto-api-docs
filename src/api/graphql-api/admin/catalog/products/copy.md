---
outline: false
examples:
  - id: admin-catalog-product-copy
    title: Copy a Catalog Product
    description: Duplicates an existing product across all sub-resources. Refuses configurable variants.
    query: |
      mutation CopyProduct($input: createAdminCatalogProductCopyInput!) {
        createAdminCatalogProductCopy(input: $input) {
          adminCatalogProductCopy { id sourceId sku type name success message }
        }
      }
    variables: |
      {
        "input": { "sourceId": 12 }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProductCopy": {
            "adminCatalogProductCopy": {
              "_id": 43,
              "sourceId": 12,
              "sku": "temporary-sku-c90a67",
              "type": "simple",
              "name": "Copy Of Classic Watch",
              "success": true,
              "message": "Product copied successfully."
            }
          }
        }
      }
---

# Catalog Product — Copy

Equivalent to [`POST /api/admin/catalog/products/{sourceId}/copy`](/api/rest-api/admin/catalog/products/copy).

The example uses an illustrative id. Replace it with a product that exists in your store — [`adminCatalogProducts`](/api/graphql-api/admin/catalog/products) lists valid ids.

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProductCopy` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `sourceId` | Int | Yes | Id of the product to duplicate. |

## Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | Int | Id of the newly created copy. |
| `sourceId` | Int | Id of the product that was copied. |
| `sku` | String | Generated SKU, always `temporary-sku-<hex>` — it does not derive from the source SKU. |
| `type` | String | Product type, matching the source. |
| `name` | String | Source name prefixed with `Copy Of `. |
| `success` | Boolean | Always `true` on success. |
| `message` | String | Translated confirmation. |

Select `_id`, not `id`. This is an action result with no route of its own, so its `id` resolves to `/api/admin/admin_catalog_product_copies/<id>`, which is not a queryable path.

## What Gets Copied

Attribute values, images, categories, inventories, and customer-group prices all carry over, as do the type-specific structures — a configurable's variants, a bundle's options, a grouped product's links.

Two things do not: the SKU and URL key are regenerated, and the copy is created **disabled** (`status: "0"`) with a `null` `urlKey`, so it is never live by accident. Give it a real SKU, name, and URL key through [Update](/api/graphql-api/admin/catalog/products/update) before enabling it.

The payload is a summary, not a product — re-query [`adminCatalogProduct`](/api/graphql-api/admin/catalog/products/products-detail) with the returned `_id` to read the copy.

## Errors

Passing a configurable **variant** id fails with `Variants of configurable products cannot be copied. Copy the parent configurable product instead.` in `errors[]`. Copying the parent brings its variants along, which is what you want in nearly every case.

An unknown `sourceId` returns a not-found message in `errors[]`; a token without `catalog.products.create` returns `You do not have permission to manage products.`
