---
outline: false
examples:
  - id: delete-product-simple
    title: Delete Product
    description: Delete a product from the system.
    query: |
      # This page documents a legacy Shop GraphQL stub; the actual Admin API
      # query is `deleteAdminCatalogProduct`. See: ./catalog/products/delete.md
    variables: |
      {}
    response: |
      {}

---

# Delete Product

## About

The `deleteProduct` mutation removes a product from your store catalog. Use this mutation to:

- Remove discontinued or unwanted products
- Clean up test/draft products
- Manage product lifecycle
- Delete products via API integrations
- Bulk remove products from external feeds
- Maintain accurate product catalogs

This mutation performs validation checks (e.g., product has no active orders) before deletion to maintain data integrity.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | The product ID to delete. |
| `force` | `Boolean` | Force deletion even if product has related data. Default: `false` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `message` | `String!` | Success or error message. |
| `success` | `Boolean!` | Indicates successful deletion. |
| `deletedProductId` | `ID` | ID of deleted product. |
| `errors` | `[ErrorMessage!]` | Validation errors if deletion failed. |
| `warnings` | `[String!]` | Warnings about related data (e.g., orphaned reviews). |

