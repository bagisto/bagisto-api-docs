---
outline: false
examples:
  - id: gql
    title: Currency Detail
    query: |
      query AdminCurrency($id: ID!) {
        adminSettingsCurrency(id: $id) {
          id
          _id
          code
          name
          symbol
          decimal
          groupSeparator
          decimalSeparator
          currencyPosition
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/settings/currencies/1"
      }
    response: |
      {
        "data": {
          "adminSettingsCurrency": {
            "id": "/api/admin/settings/currencies/1",
            "_id": 1,
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$",
            "decimal": 2,
            "groupSeparator": ",",
            "decimalSeparator": ".",
            "currencyPosition": null,
            "createdAt": null,
            "updatedAt": null
          }
        }
      }
---

# Currency Detail

Returns a single currency by its IRI id, including its full formatting configuration.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsCurrency(id: ID!)` | Query | Fetch one currency |

## Notes

- `id` is the IRI form (`/api/admin/settings/currencies/{id}`). Use the numeric `_id` when you need the bare id.
- An unknown id returns `null`.
- Use the [`adminSettingsCurrencies`](./list.md) query to discover valid ids.

All currency operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
