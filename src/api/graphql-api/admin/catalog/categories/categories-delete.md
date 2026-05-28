---
outline: false
examples:
  - id: admin-catalog-category-delete
    title: Delete Category
    description: Refused for the root category or any category referenced as a channel root. Mirrors DELETE /api/admin/catalog/categories/{id}.
    query: |
      mutation DeleteCategory($input: deleteAdminCategoryInput!) {
        deleteAdminCategory(input: $input) {
          adminCategory { id }
        }
      }
    variables: |
      {
        "input": { "id": "/api/admin/categories/7" }
      }
    response: |
      {
        "data": {
          "deleteAdminCategory": {
            "adminCategory": { "id": "/api/admin/categories/7" }
          }
        }
      }
---

# Category — Delete

Deletes a category. Equivalent to
[`DELETE /api/admin/catalog/categories/{id}`](/api/rest-api/admin/catalog/categories/categories-delete).

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a category that exists in your store — use the [`adminCatalogCategories`](./categories-listing.md) query to discover valid ids.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminCategory` | Mutation | Delete a category |

## Errors

| Condition | Message |
|-----------|---------|
| Root category (`id=1`) or a channel `root_category_id` | `Root and channel-root categories cannot be deleted.` |
| Unknown id | `Category not found.` |

For bulk deletion, use [`createAdminCategoryMassDelete`](/api/graphql-api/admin/catalog/categories/categories-mass-delete).
