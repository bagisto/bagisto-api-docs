---
outline: false
examples:
  - id: admin-customer-gdpr-list-gql
    title: List GDPR Requests
    query: |
      query AdminGdpr($first: Int, $status: String) {
        adminCustomerGdprRequests(first: $first, status: $status) {
          edges { cursor node { id _id customerId customerName email type status createdAt } }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      { "first": 10, "status": "pending" }
    response: |
      { "data": { "adminCustomerGdprRequests": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/customers/gdpr-requests/1", "_id": 1, "customerId": 14, "customerName": "Jane Doe", "email": "jane@example.com", "type": "delete", "status": "pending", "createdAt": "2026-05-25 08:00:00" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List GDPR Requests (GraphQL)
