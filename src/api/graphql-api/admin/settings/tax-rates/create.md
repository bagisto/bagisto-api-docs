---
outline: false
examples:
  - id: gql
    title: Create Tax Rate
    query: |
      mutation Create($input: createAdminSettingsTaxRateInput!) {
        createAdminSettingsTaxRate(input: $input) { adminSettingsTaxRate { id _id identifier taxRate } }
      }
    variables: |
      { "input": { "identifier": "us-il-7", "taxRate": 7.25, "country": "US", "state": "IL", "isZip": false, "zipCode": "62704" } }
    response: |
      { "data": { "createAdminSettingsTaxRate": { "adminSettingsTaxRate": { "id": "/api/admin/settings/tax-rates/1", "_id": 1, "identifier": "us-il-7", "taxRate": 7.25 } } } }
---

# Create Tax Rate (GraphQL)

Pass `zip_code` when `is_zip=false`; pass `zip_from` + `zip_to` when `is_zip=true`.
