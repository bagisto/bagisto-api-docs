---
outline: false
examples:
  - id: admin-customers-list-gql
    title: List Customers (Datagrid)
    description: Cursor pagination. Detail-only fields are null on listing.
    query: |
      query AdminCustomers($first: Int, $after: String, $customer_group_id: Int) {
        adminCustomers(first: $first, after: $after, customer_group_id: $customer_group_id) {
          edges {
            cursor
            node { id _id firstName lastName email phone customerGroupId customerGroupName status createdAt }
          }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      { "first": 10, "customer_group_id": 2 }
    response: |
      { "data": { "adminCustomers": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/customers/14", "_id": 14, "firstName": "Jane", "lastName": "Doe", "email": "jane@example.com", "phone": "+15551234567", "customerGroupId": 2, "customerGroupName": "Wholesale", "status": 1, "createdAt": "2026-05-20 12:00:00" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Customers (Datagrid)

GraphQL counterpart of `GET /api/admin/customers`. Args: `name`, `email`, `phone`, `customer_group_id`, `status`, `channel_id`, `sort`, `order` + cursor `first`/`after`.
