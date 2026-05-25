---
outline: false
examples:
  - id: gql
    title: Delete Tax Category
    query: |
      mutation Delete($input: deleteAdminSettingsTaxCategoryInput!) {
        deleteAdminSettingsTaxCategory(input: $input) { adminSettingsTaxCategory { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/tax-categories/1" } }
    response: |
      { "data": { "deleteAdminSettingsTaxCategory": { "adminSettingsTaxCategory": null } } }
---

# Delete Tax Category (GraphQL)

::: warning Guard
Refuses if tax rates still attached.
:::
