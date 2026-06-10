---
outline: false
examples:
  - id: gql
    title: Update Tax Category
    query: |
      mutation Update($input: updateAdminSettingsTaxCategoryInput!) {
        updateAdminSettingsTaxCategory(input: $input) { adminSettingsTaxCategory { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/tax-categories/1", "code": "us-tax", "name": "US Sales Tax", "description": "Updated", "taxrates": [1, 2, 3] } }
    response: |
      { "data": { "updateAdminSettingsTaxCategory": { "adminSettingsTaxCategory": { "id": "/api/admin/settings/tax-categories/1", "_id": 1, "name": "US Sales Tax" } } } }
---

# Update Tax Category (GraphQL)

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a tax category that exists in your store — use the [`adminSettingsTaxCategories`](./list.md) query to discover valid ids.
:::
