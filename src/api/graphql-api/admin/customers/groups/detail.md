---
outline: false
examples:
  - id: admin-customer-group-detail-gql
    title: Customer Group Detail
    query: |
      query AdminCustomerGroup($id: ID!) {
        adminCustomerGroup(id: $id) { id _id code name isUserDefined customersCount }
      }
    variables: |
      { "id": "/api/admin/customers/groups/4" }
    response: |
      { "data": { "adminCustomerGroup": { "id": "/api/admin/customers/groups/4", "_id": 4, "code": "wholesale", "name": "Wholesale", "isUserDefined": 1, "customersCount": 23 } } }
---

# Customer Group Detail (GraphQL)
