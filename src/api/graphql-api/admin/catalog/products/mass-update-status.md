---
outline: false
examples:
  - id: admin-catalog-product-mass-update-status
    title: Mass Update Catalog Product Status
    description: GraphQL counterpart of POST /api/admin/catalog/products/mass-update-status. Fires catalog.product.update.{before,after} per ID.
    query: |
      mutation MassUpdateStatus($input: createAdminCatalogProductMassUpdateStatusInput!) {
        createAdminCatalogProductMassUpdateStatus(input: $input) {
          adminCatalogProductMassUpdateStatus {
            _id
            updated
            message
          }
        }
      }
    variables: |
      {
        "input": { "indices": [12, 18], "value": 1 }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProductMassUpdateStatus": {
            "adminCatalogProductMassUpdateStatus": {
              "_id": 1,
              "updated": [12, 18],
              "message": "Products status updated successfully."
            }
          }
        }
      }
---

# Catalog Products — Mass Update Status

Equivalent to [`POST /api/admin/catalog/products/mass-update-status`](/api/rest-api/admin/catalog/products/mass-update-status).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProductMassUpdateStatus` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Iterable | Yes | Non-empty list of product ids. |
| `value` | Int | Yes | `0` disabled, `1` enabled. No other value is accepted. |

## Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | Int | Always `1`. This is an action result, not a record — ignore it. |
| `updated` | Iterable | The ids the call attempted to update. |
| `message` | String | Translated confirmation. |

Select `_id`, not `id`. This is a routeless action result, so its `id` is not a queryable path.

## Behaviour

Each id fires the same events as a single-product update, so search reindexing and cache flushing still run per product. That makes a large batch meaningfully slower than the row count suggests.

The status flip is the only change — nothing else on the product is touched, and there is no partial-failure report beyond the returned `updated` list.

## Errors

| Message | Cause |
|---------|-------|
| `The indices field is required and must be a non-empty array.` | Missing or empty `indices` |
| `The value field is required and must be 0 or 1.` | `value` missing or outside `0`/`1` |
| `You do not have permission to manage products.` | Token lacks `catalog.products.edit` |
