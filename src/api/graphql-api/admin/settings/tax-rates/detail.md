---
outline: false
examples:
  - id: gql
    title: Tax Rate Detail
    query: |
      query A($id: ID!) { adminSettingsTaxRate(id: $id) { id _id identifier taxRate country state isZip zipCode zipFrom zipTo } }
    variables: |
      { "id": "/api/admin/settings/tax-rates/1" }
    response: |
      { "data": { "adminSettingsTaxRate": { "id": "/api/admin/settings/tax-rates/1", "_id": 1, "identifier": "us-il-7", "taxRate": 7.25, "country": "US", "state": "IL", "isZip": false, "zipCode": "62704", "zipFrom": null, "zipTo": null } } }
---

# Tax Rate Detail (GraphQL)
