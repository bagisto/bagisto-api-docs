---
outline: false
examples:
  - id: gql
    title: Create Tax Category
    query: |
      mutation Create($input: createAdminSettingsTaxCategoryInput!) {
        createAdminSettingsTaxCategory(input: $input) { adminSettingsTaxCategory { id _id code name } }
      }
    variables: |
      { "input": { "code": "us-tax", "name": "US Tax", "description": "Standard", "taxrates": [1, 2] } }
    response: |
      { "data": { "createAdminSettingsTaxCategory": { "adminSettingsTaxCategory": { "id": "/api/admin/settings/tax-categories/1", "_id": 1, "code": "us-tax", "name": "US Tax" } } } }
---

# Create Tax Category (GraphQL)
