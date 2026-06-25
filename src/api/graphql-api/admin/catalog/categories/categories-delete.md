---
outline: false
examples:
  - id: admin-catalog-category-delete
    title: Delete Category
    description: Delete a category. Refused for the root category or any category referenced as a channel root. The payload returns a snapshot of the deleted record.
    query: |
      mutation DeleteCategory($input: deleteAdminCategoryInput!) {
        deleteAdminCategory(input: $input) {
          adminCategory {
            id
            _id
            name
            slug
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/categories/7"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminCategory": {
            "adminCategory": {
              "id": "/api/admin/catalog/categories/7",
              "_id": 7,
              "name": "Watches",
              "slug": "watches"
            }
          }
        }
      }
---

# Category — Delete (GraphQL)

Deletes a category. The only input field is `id` (the category IRI). The mutation is **refused** for the root category and for any category referenced as a channel's root category — those return an error and the record is kept. The payload returns a snapshot of the deleted record's scalar fields.

::: tip
See the [Categories overview](/api/graphql-api/admin/catalog/categories/) for how the menu works.
:::

## Errors

| Condition | Message |
|-----------|---------|
| Root category or a channel root category | `Root and channel-root categories cannot be deleted.` |
| Unknown id | `Category not found.` |

For bulk deletion, use [`createAdminCategoryMassDelete`](/api/graphql-api/admin/catalog/categories/categories-mass-delete).

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
