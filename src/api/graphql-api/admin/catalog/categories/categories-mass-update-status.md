---
outline: false
examples:
  - id: admin-catalog-category-mass-update-status
    title: Mass Update Category Status
    description: Bulk-flip status (enabled/disabled) on a batch of categories. Mirrors POST /api/admin/catalog/categories/mass-update-status.
    query: |
      mutation MassUpdateCategoryStatus($input: createAdminCategoryMassUpdateStatusInput!) {
        createAdminCategoryMassUpdateStatus(input: $input) {
          adminCategoryMassUpdateStatus { id updated message }
        }
      }
    variables: |
      {
        "input": { "indices": [12, 18], "value": 1 }
      }
    response: |
      {
        "data": {
          "createAdminCategoryMassUpdateStatus": {
            "adminCategoryMassUpdateStatus": {
              "id": "/api/admin/category_mass_update_statuses/1",
              "updated": [12, 18],
              "message": "Categories status updated successfully."
            }
          }
        }
      }
---

# Category — Mass Update Status

Bulk-flips the status of a batch of categories. Equivalent to
[`POST /api/admin/catalog/categories/mass-update-status`](/api/rest-api/admin/catalog/categories/categories-mass-update-status).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminCategoryMassUpdateStatus` | Mutation | Enable or disable a batch of categories |

## Input

| Field | Type | Notes |
|-------|------|-------|
| `indices` | `[Int!]!` | Category ids to update |
| `value` | `Int!` | `0` to disable, `1` to enable |
