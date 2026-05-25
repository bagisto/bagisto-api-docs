---
outline: false
examples:
  - id: admin-customer-review-delete-gql
    title: Delete Review
    query: |
      mutation Delete($input: deleteAdminCustomerReviewInput!) {
        deleteAdminCustomerReview(input: $input) { adminCustomerReview { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/reviews/9" } }
    response: |
      { "data": { "deleteAdminCustomerReview": { "adminCustomerReview": null } } }
---

# Delete Review (GraphQL)

Permission: `customers.reviews.delete`.
