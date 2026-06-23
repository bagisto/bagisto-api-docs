---
outline: false
examples:
  - id: gql-single-zip
    title: Create Tax Rate (single zip)
    query: |
      mutation CreateAdminSettingsTaxRate($input: createAdminSettingsTaxRateInput!) {
        createAdminSettingsTaxRate(input: $input) {
          adminSettingsTaxRate {
            id
            _id
            identifier
            isZip
            zipCode
            zipFrom
            zipTo
            state
            country
            taxRate
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "identifier": "docs-gql-demo-9281",
          "taxRate": 7.25,
          "country": "US",
          "state": "IL",
          "isZip": false,
          "zipCode": "62704"
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsTaxRate": {
            "adminSettingsTaxRate": {
              "id": "/api/admin/settings/tax-rates/69",
              "_id": 69,
              "identifier": "docs-gql-demo-9281",
              "isZip": false,
              "zipCode": "62704",
              "zipFrom": null,
              "zipTo": null,
              "state": "IL",
              "country": "US",
              "taxRate": 7.25,
              "createdAt": "2026-06-19T17:39:25+05:30",
              "updatedAt": "2026-06-19T17:39:25+05:30"
            }
          }
        }
      }
  - id: gql-zip-range
    title: Create Tax Rate (zip range)
    query: |
      mutation CreateAdminSettingsTaxRate($input: createAdminSettingsTaxRateInput!) {
        createAdminSettingsTaxRate(input: $input) {
          adminSettingsTaxRate {
            id
            _id
            identifier
            isZip
            zipCode
            zipFrom
            zipTo
            state
            country
            taxRate
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "identifier": "docs-gql-zip-7710",
          "taxRate": 5,
          "country": "GB",
          "state": "",
          "isZip": true,
          "zipFrom": "10000",
          "zipTo": "19999"
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsTaxRate": {
            "adminSettingsTaxRate": {
              "id": "/api/admin/settings/tax-rates/70",
              "_id": 70,
              "identifier": "docs-gql-zip-7710",
              "isZip": true,
              "zipCode": null,
              "zipFrom": "10000",
              "zipTo": "19999",
              "state": "",
              "country": "GB",
              "taxRate": 5,
              "createdAt": "2026-06-19T17:39:55+05:30",
              "updatedAt": "2026-06-19T17:39:55+05:30"
            }
          }
        }
      }
---

# Create Tax Rate

Creates a new tax rate. The `identifier` must be unique, `country` is a two-letter ISO code, and `taxRate` is a percentage between 0 and 100.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsTaxRate(input:)` | Mutation | Create a tax rate |

## Conditional zip rules

The zip fields you must supply depend on `isZip`:

| `isZip` | Required zip fields | Targets |
|---------|---------------------|---------|
| `false` | `zipCode` | A single zip code |
| `true` | `zipFrom` **and** `zipTo` | A zip-code range |

Supplying `isZip: true` without `zipFrom`/`zipTo`, or `isZip: false` without `zipCode`, is rejected with a validation error.
