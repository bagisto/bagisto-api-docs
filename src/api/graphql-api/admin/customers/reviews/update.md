---
outline: false
examples:
  - id: admin-customer-review-update-gql
    title: Update Review Status
    description: Only the status field is editable. The response carries the updated scalars and the nested product/customer.
    query: |
      mutation Update($input: updateAdminCustomerReviewInput!) {
        updateAdminCustomerReview(input: $input) {
          adminCustomerReview {
            id
            _id
            title
            comment
            rating
            status
            name
            createdAt
            updatedAt
            product {
              id
              name
              sku
            }
            customer {
              id
              name
              email
            }
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/customers/reviews/21",
          "status": "approved"
        }
      }
    response: |
      {
        "data": {
          "updateAdminCustomerReview": {
            "adminCustomerReview": {
              "id": "/api/admin/customers/reviews/21",
              "_id": 21,
              "title": "Great product",
              "comment": "Exactly as described.",
              "rating": 5,
              "status": "approved",
              "name": "Jane Doe",
              "createdAt": "2026-06-01 08:00:00",
              "updatedAt": "2026-06-24 10:15:00",
              "product": {
                "id": 2358,
                "name": "Classic Watch Hand",
                "sku": "SP-001"
              },
              "customer": {
                "id": 14,
                "name": "Jane Doe",
                "email": "jane@example.com"
              }
            }
          }
        }
      }
---

# Update Review Status (GraphQL)

Updates a review's moderation status. Only the `status` field is editable (reviews originate from the storefront); allowed values are `pending`, `approved` and `disapproved`.

The mutation response returns the review's scalars plus the nested `product` and `customer`. The `images` connection is not resolved on the mutation payload — re-query the [detail](./detail.md) to read the attached images.

Permission: `customers.reviews.edit`.

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with a review that exists in your store — use [`adminCustomerReviews`](./list.md) to discover valid ids.
:::

::: tip
See the [Reviews overview](/api/graphql-api/admin/customers/reviews/) for how moderation works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
