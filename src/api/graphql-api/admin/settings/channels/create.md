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
      { "input": { "code": "us", "name": "US Store", "hostname": "us.example.com", "locales": [1], "currencies": [1], "inventory_sources": [1], "default_locale_id": 1, "base_currency_id": 1, "root_category_id": 1 } }
    response: |
      { "data": { "createAdminSettingsChannel": { "adminSettingsChannel": { "id": "/api/admin/settings/channels/2", "_id": 2, "code": "us", "name": "US Store", "hostname": "us.example.com" } } } }
---

# Create Channel (GraphQL)

::: warning Logo / favicon upload deferred
Multipart binary upload not yet supported via the API.
:::
