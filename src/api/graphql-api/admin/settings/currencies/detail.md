---
outline: false
examples:
  - id: gql
    title: Currency Detail
    query: |
      query AdminCurrency($id: ID!) { adminSettingsCurrency(id: $id) { id _id code name symbol } }
    variables: |
      { "id": "/api/admin/settings/currencies/1" }
    response: |
      { "data": { "adminSettingsCurrency": { "id": "/api/admin/settings/currencies/1", "_id": 1, "code": "USD", "name": "US Dollar", "symbol": "$" } } }
---

# Currency Detail (GraphQL)
