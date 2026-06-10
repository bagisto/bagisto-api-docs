---
outline: false
examples:
  - id: gql
    title: List Tax Rates
    query: |
      query A($first: Int) { adminSettingsTaxRates(first: $first) { edges { cursor node { id _id identifier taxRate country state isZip zipCode } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsTaxRates": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/tax-rates/1", "_id": 1, "identifier": "us-il-7", "taxRate": 7.25, "country": "US", "state": "IL", "isZip": false, "zipCode": "62704" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Tax Rates (GraphQL)
