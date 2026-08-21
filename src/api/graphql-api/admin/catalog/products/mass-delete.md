---
outline: false
examples:
  - id: admin-catalog-product-mass-delete
    title: Mass Delete Catalog Products
    description: Deletes a batch of products in one call. Ids that do not exist are skipped without an error, and `deleted` lists only the ones actually removed.
    query: |
      mutation MassDeleteProducts($input: createAdminCatalogProductMassDeleteInput!) {
        createAdminCatalogProductMassDelete(input: $input) {
          adminCatalogProductMassDelete {
            _id
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": { "indices": [12, 18] }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProductMassDelete": {
            "adminCatalogProductMassDelete": {
              "_id": 1,
              "deleted": [12, 18],
              "message": "Products deleted successfully."
            }
          }
        }
      }
---

# Catalog Products — Mass Delete

Equivalent to [`POST /api/admin/catalog/products/mass-delete`](/api/rest-api/admin/catalog/products/mass-delete).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProductMassDelete` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Iterable | Yes | Non-empty list of product ids. |

## Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | Int | Always `1`. This is an action result, not a record — ignore it. |
| `deleted` | Iterable | The ids that were actually removed. |
| `message` | String | Translated confirmation. |

**`deleted` is not an echo of `indices`.** Ids that do not exist are dropped silently, so sending `[1403, 999999]` returns `deleted: [1403]`. Compare the two lists to find out what was skipped — nothing else reports it.

Select `_id`, not `id`. This is a routeless action result, so its `id` is not a queryable path.

## Behaviour

- **Best effort, no transaction.** The batch does not roll back if one id fails partway through; ids processed before the failure stay deleted.
- **Configurable variants cascade** with their parent, so a parent id can remove more rows than you listed.
- **Order history is unaffected** — order items keep their product snapshot.

## Errors

| Message | Cause |
|---------|-------|
| `The indices field is required and must be a non-empty array.` | Missing or empty `indices` |
| `You do not have permission to manage products.` | Token lacks `catalog.products.delete` |
