---
outline: false
examples:
  - id: gql
    title: Update Currency
    query: |
      mutation Update($input: updateAdminSettingsCurrencyInput!) {
        updateAdminSettingsCurrency(input: $input) { adminSettingsCurrency { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/currencies/2", "name": "Euro (EU)" } }
    response: |
      { "data": { "updateAdminSettingsCurrency": { "adminSettingsCurrency": { "id": "/api/admin/settings/currencies/2", "_id": 2, "name": "Euro (EU)" } } } }
---

# Update Currency (GraphQL)

`code` is immutable. Permission: `settings.currencies.edit`.
