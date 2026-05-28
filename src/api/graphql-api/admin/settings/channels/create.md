---
outline: false
examples:
  - id: gql
    title: Create Channel
    query: |
      mutation Create($input: createAdminSettingsChannelInput!) {
        createAdminSettingsChannel(input: $input) { adminSettingsChannel { id _id code name hostname } }
      }
    variables: |
      { "input": { "code": "us", "name": "US Store", "hostname": "us.example.com", "locales": [1], "currencies": [1], "inventorySources": [1], "defaultLocaleId": 1, "baseCurrencyId": 1, "rootCategoryId": 1 } }
    response: |
      { "data": { "createAdminSettingsChannel": { "adminSettingsChannel": { "id": "/api/admin/settings/channels/2", "_id": 2, "code": "us", "name": "US Store", "hostname": "us.example.com" } } } }
---

# Create Channel (GraphQL)

::: warning Logo / favicon upload deferred
Multipart binary upload not yet supported via the API.
:::
