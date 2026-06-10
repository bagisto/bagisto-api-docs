---
outline: false
examples:
  - id: admin-customer-reviews-list-gql
    title: List Customer Reviews
    query: |
      query AdminCustomerReviews($first: Int, $status: String) {
        adminCustomerReviews(first: $first, status: $status) {
          edges { cursor node { id _id title rating status productSku customerName createdAt } }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      { "first": 10, "status": "pending" }
    response: |
      { "data": { "adminCustomerReviews": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/customers/reviews/9", "_id": 9, "title": "Great product!", "rating": 5, "status": "pending", "productSku": "SP-001", "customerName": "Jane Doe", "createdAt": "2026-05-25 09:00:00" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Customer Reviews (GraphQL)

Args: `status`, `rating`, `product_id`, `customer_id`, `created_at_from/to`, `sort`, `order` + cursor `first`/`after`.
