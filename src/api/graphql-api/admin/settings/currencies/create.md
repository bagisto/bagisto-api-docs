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

::: tip Prerequisites
The example uses currency code `USD` — if that currency already exists in your store, the mutation returns *"The code has already been taken."* Either delete the existing currency first or use a different 3-letter ISO code.
:::
