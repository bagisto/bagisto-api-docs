---
outline: false
examples:
  - id: admin-customer-review-update-gql
    title: Update Review Status
    query: |
      mutation Update($input: updateAdminCustomerReviewInput!) {
        updateAdminCustomerReview(input: $input) { adminCustomerReview { id _id status } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/reviews/9", "status": "approved" } }
    response: |
      { "data": { "updateAdminCustomerReview": { "adminCustomerReview": { "id": "/api/admin/customers/reviews/9", "_id": 9, "status": "approved" } } } }
---

# Update Review Status (GraphQL)

Status-only. Permission: `customers.reviews.edit`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a review that exists in your store — use the [`adminCustomerReviews`](./list.md) query to discover valid ids.
:::
