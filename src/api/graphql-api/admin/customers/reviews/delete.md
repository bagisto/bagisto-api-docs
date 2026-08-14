---
outline: false
examples:
  - id: admin-customer-review-delete-gql
    title: Delete Review
    description: The delete response returns a snapshot of the removed review.
    query: |
      mutation Delete($input: deleteAdminCustomerReviewInput!) {
        deleteAdminCustomerReview(input: $input) {
          adminCustomerReview {
            id
            _id
            status
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/customers/reviews/21"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminCustomerReview": {
            "adminCustomerReview": {
              "id": "/api/admin/customers/reviews/21",
              "_id": 21,
              "status": "approved"
            }
          }
        }
      }
---

# Delete Review (GraphQL)

Deletes a review. The mutation returns a snapshot of the record that was removed.

Permission: `customers.reviews.delete`.

The example uses an illustrative `id`. Replace it with a review that exists in your store — use [`adminCustomerReviews`](./list.md) to discover valid ids.

See the [Reviews overview](/api/graphql-api/admin/customers/reviews/) for how moderation works.
