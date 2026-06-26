---
outline: false
examples:
  - id: gql
    title: Create Currency
    query: |
      mutation Create($input: createAdminSettingsCurrencyInput!) {
        createAdminSettingsCurrency(input: $input) {
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
          "code": "ZWL",
          "name": "Zimbabwe Dollar",
          "symbol": "Z$",
          "decimal": 2,
          "groupSeparator": ",",
          "decimalSeparator": ".",
          "currencyPosition": "left"
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsCurrency": {
            "adminSettingsCurrency": {
              "id": "/api/admin/settings/currencies/103",
              "_id": 103,
              "code": "ZWL",
              "name": "Zimbabwe Dollar",
              "symbol": "Z$",
              "decimal": 2,
              "groupSeparator": ",",
              "decimalSeparator": ".",
              "currencyPosition": "left",
              "createdAt": "2026-06-19T17:38:10+05:30",
              "updatedAt": "2026-06-19T17:38:10+05:30"
            }
          }
        }
      }
---

# Create Currency

Adds a new currency to the store. `code` and `name` are required; the formatting fields (`symbol`, `decimal`, `groupSeparator`, `decimalSeparator`, `currencyPosition`) are optional.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsCurrency(input:)` | Mutation | Create a currency |

## Input fields

| Field | Required | Meaning |
|-------|----------|---------|
| `code` | yes | 3-letter ISO code; stored uppercase; must be unique. |
| `name` | yes | Display name. |
| `symbol` | no | Symbol prefixed/suffixed to amounts (e.g. `$`). |
| `decimal` | no | Number of decimal places. |
| `groupSeparator` | no | Thousands separator (e.g. `,`). |
| `decimalSeparator` | no | Decimal point character (e.g. `.`). |
| `currencyPosition` | no | `left` or `right` — where the symbol sits relative to the amount. |

## Notes

- A duplicate `code` is rejected with *"The code has already been taken."*
- Permission: `settings.currencies.create`.

All currency operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
