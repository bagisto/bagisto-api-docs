---
outline: false
examples:
  - id: gql
    title: Create Currency
    query: |
      mutation Create($input: createAdminSettingsCurrencyInput!) {
        createAdminSettingsCurrency(input: $input) { adminSettingsCurrency { id _id code name } }
      }
    variables: |
      { "input": { "code": "EUR", "name": "Euro", "symbol": "€" } }
    response: |
      { "data": { "createAdminSettingsCurrency": { "adminSettingsCurrency": { "id": "/api/admin/settings/currencies/2", "_id": 2, "code": "EUR", "name": "Euro" } } } }
---

# Create Currency (GraphQL)

Permission: `settings.currencies.create`.
