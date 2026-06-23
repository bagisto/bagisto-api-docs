---
outline: false
examples:
  - id: gql
    title: Update Currency
    query: |
      mutation Update($input: updateAdminSettingsCurrencyInput!) {
        updateAdminSettingsCurrency(input: $input) {
          adminSettingsCurrency {
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
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/currencies/103",
          "name": "Zimbabwe Dollar (RTGS)",
          "symbol": "ZWL$",
          "currencyPosition": "right"
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsCurrency": {
            "adminSettingsCurrency": {
              "id": "/api/admin/settings/currencies/103",
              "_id": 103,
              "code": "ZWL",
              "name": "Zimbabwe Dollar (RTGS)",
              "symbol": "ZWL$",
              "decimal": 2,
              "groupSeparator": ",",
              "decimalSeparator": ".",
              "currencyPosition": "right",
              "createdAt": "2026-06-19T17:38:10+05:30",
              "updatedAt": "2026-06-19T17:38:36+05:30"
            }
          }
        }
      }
---

# Update Currency

Updates an existing currency's name and formatting. Send only the fields you want to change.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsCurrency(input:)` | Mutation | Update a currency |

## Input fields

| Field | Required | Meaning |
|-------|----------|---------|
| `id` | yes | IRI of the currency to update. |
| `name` | no | Display name. |
| `symbol` | no | Currency symbol. |
| `decimal` | no | Number of decimal places. |
| `groupSeparator` | no | Thousands separator. |
| `decimalSeparator` | no | Decimal point character. |
| `currencyPosition` | no | `left` or `right`. |

## Notes

- **`code` is immutable.** It is not part of the update input type at all — attempting to send a `code` field is rejected by the schema (*"Field code is not defined by type updateAdminSettingsCurrencyInput"*). The `code` in the response is unchanged.
- Use the [`adminSettingsCurrencies`](./list.md) query to discover a valid `id`.
- Permission: `settings.currencies.edit`.

All currency operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
