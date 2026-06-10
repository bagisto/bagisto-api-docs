---
outline: false
examples:
  - id: gql
    title: Tax Category Detail
    query: |
      query A($id: ID!) { adminSettingsTaxCategory(id: $id) { id _id code name description taxRates } }
    variables: |
      { "id": "/api/admin/settings/tax-categories/1" }
    response: |
      { "data": { "adminSettingsTaxCategory": { "id": "/api/admin/settings/tax-categories/1", "_id": 1, "code": "us-tax", "name": "US Tax", "description": "Standard", "taxRates": [1, 2] } } }
---

# Tax Category Detail (GraphQL)
