---
outline: false
examples:
  - id: gql
    title: Delete Tax Rate
    query: |
      mutation Delete($input: deleteAdminSettingsTaxRateInput!) {
        deleteAdminSettingsTaxRate(input: $input) { adminSettingsTaxRate { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/tax-rates/1" } }
    response: |
      { "data": { "deleteAdminSettingsTaxRate": { "adminSettingsTaxRate": null } } }
---

# Delete Tax Rate (GraphQL)
