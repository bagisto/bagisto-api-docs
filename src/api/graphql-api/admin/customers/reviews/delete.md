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

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a review that exists in your store — use the [`adminCustomerReviews`](./list.md) query to discover valid ids.
:::
