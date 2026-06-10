---
outline: false
examples:
  - id: admin-customer-review-detail-gql
    title: Customer Review Detail
    query: |
      query AdminCustomerReview($id: ID!) {
        adminCustomerReview(id: $id) { id _id title comment rating status productSku customerName customerEmail images createdAt }
      }
    variables: |
      { "id": "/api/admin/customers/reviews/9" }
    response: |
      { "data": { "adminCustomerReview": { "id": "/api/admin/customers/reviews/9", "_id": 9, "title": "Great product!", "comment": "Loved it.", "rating": 5, "status": "pending", "productSku": "SP-001", "customerName": "Jane Doe", "customerEmail": "jane@example.com", "images": [{ "id": 3, "path": "reviews/9/photo.jpg", "url": "https://your-domain.com/storage/reviews/9/photo.jpg" }], "createdAt": "2026-05-25 09:00:00" } } }
---

# Customer Review Detail (GraphQL)
