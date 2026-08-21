---
outline: false
examples:
  - id: admin-catalog-category-mass-delete
    title: Mass Delete Categories
    description: Bulk-delete a batch of categories. The whole batch is validated up front — if any id is non-deletable (root or a channel root), nothing is deleted.
    query: |
      mutation MassDeleteCategories($input: createAdminCategoryMassDeleteInput!) {
        createAdminCategoryMassDelete(input: $input) {
          adminCategoryMassDelete {
            _id
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [12, 18]
        }
      }
    response: |
      {
        "data": {
          "createAdminCategoryMassDelete": {
            "adminCategoryMassDelete": {
              "_id": 1,
              "deleted": [12, 18],
              "message": "Categories deleted successfully."
            }
          }
        }
      }
---

# Category — Mass Delete (GraphQL)

Deletes several categories in one call. `indices` is the list of category ids to delete. The whole batch is **pre-validated**: if any id is the root category or a channel root, the entire batch is rejected with an error and nothing is deleted. Ids that don't exist are silently skipped and do not appear in `deleted`. `deleted` is the list of ids actually removed.

See the [Categories overview](/api/graphql-api/admin/catalog/categories/) for how this menu works.

## Input

| Field | Type | Notes |
|-------|------|-------|
| `indices` | Iterable | Category ids to delete. Declared nullable in the schema; the API rejects an empty list with `400`. |
