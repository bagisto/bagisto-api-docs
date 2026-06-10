---
outline: false
examples:
  - id: admin-catalog-category-mass-delete
    title: Mass Delete Categories
    description: Bulk-delete a batch of categories. Whole-batch validation — if any id is non-deletable (root, channel root), no row is touched. Mirrors POST /api/admin/catalog/categories/mass-delete.
    query: |
      mutation MassDeleteCategories($input: createAdminCategoryMassDeleteInput!) {
        createAdminCategoryMassDelete(input: $input) {
          adminCategoryMassDelete { id deleted message }
        }
      }
    variables: |
      {
        "input": { "indices": [12, 18] }
      }
    response: |
      {
        "data": {
          "createAdminCategoryMassDelete": {
            "adminCategoryMassDelete": {
              "id": "/api/admin/category_mass_deletes/1",
              "deleted": [12, 18],
              "message": "Categories deleted successfully."
            }
          }
        }
      }
---

# Category — Mass Delete

Bulk-deletes a batch of categories. Equivalent to
[`POST /api/admin/catalog/categories/mass-delete`](/api/rest-api/admin/catalog/categories/categories-mass-delete).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminCategoryMassDelete` | Mutation | Delete multiple categories at once |

## Input

| Field | Type | Notes |
|-------|------|-------|
| `indices` | `[Int!]!` | Category ids to delete |

## Notes

- **All-or-nothing.** Any non-deletable id (root, channel root) rejects the entire batch with `errors[]` carrying `Root and channel-root categories cannot be deleted.`
- Unknown ids are silently skipped — they do not appear in `deleted`.
