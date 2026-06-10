---
outline: false
examples:
  - id: gql
    title: Update Tax Rate
    query: |
      mutation Update($input: updateAdminSettingsTaxRateInput!) {
        updateAdminSettingsTaxRate(input: $input) { adminSettingsTaxRate { id _id taxRate } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/tax-rates/1", "taxRate": 7.5 } }
    response: |
      { "data": { "updateAdminSettingsTaxRate": { "adminSettingsTaxRate": { "id": "/api/admin/settings/tax-rates/1", "_id": 1, "taxRate": 7.5 } } } }
---

# Update Tax Rate (GraphQL)
