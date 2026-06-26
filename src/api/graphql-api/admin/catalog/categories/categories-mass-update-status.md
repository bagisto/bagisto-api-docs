---
outline: false
examples:
  - id: admin-catalog-category-mass-update-status
    title: Mass Update Category Status
    description: Bulk-set the status (enabled or disabled) on a batch of categories.
    query: |
      mutation MassUpdateCategoryStatus($input: createAdminCategoryMassUpdateStatusInput!) {
        createAdminCategoryMassUpdateStatus(input: $input) {
          adminCategoryMassUpdateStatus {
            _id
            updated
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [12, 18],
          "value": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminCategoryMassUpdateStatus": {
            "adminCategoryMassUpdateStatus": {
              "_id": 1,
              "updated": [12, 18],
              "message": "Categories status updated successfully."
            }
          }
        }
      }
---

# Category — Mass Update Status (GraphQL)

Sets the same status on several categories in one call. `indices` is the list of category ids; `value` is `1` to enable or `0` to disable them. `updated` is the list of ids whose status was changed.

::: tip
See the [Categories overview](/api/graphql-api/admin/catalog/categories/) for how the menu works.
:::

## Input

| Field | Type | Notes |
|-------|------|-------|
| `indices` | `[Int!]!` | Category ids to update |
| `value` | `Int!` | `0` to disable, `1` to enable |

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
