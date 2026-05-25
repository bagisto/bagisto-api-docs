---
outline: false
examples:
  - id: admin-customer-detail-gql
    title: Customer Detail
    description: Eager-loads group + counters.
    query: |
      query AdminCustomer($id: ID!) {
        adminCustomer(id: $id) {
          id _id firstName lastName email phone customerGroupId customerGroupName status totalAddresses totalOrders totalAmountSpent createdAt
        }
      }
    variables: |
      { "id": "/api/admin/customers/14" }
    response: |
      { "data": { "adminCustomer": { "id": "/api/admin/customers/14", "_id": 14, "firstName": "Jane", "lastName": "Doe", "email": "jane@example.com", "phone": "+15551234567", "customerGroupId": 2, "customerGroupName": "Wholesale", "status": 1, "totalAddresses": 2, "totalOrders": 5, "totalAmountSpent": 489.5, "createdAt": "2026-05-20 12:00:00" } } }
---

# Customer Detail

GraphQL counterpart of `GET /api/admin/customers/{id}`.
