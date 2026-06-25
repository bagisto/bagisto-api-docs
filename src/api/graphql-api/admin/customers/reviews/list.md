---
outline: false
examples:
  - id: admin-customer-reviews-list-gql
    title: List Customer Reviews
    description: Cursor pagination. The reviewed product and review author are nested objects. Images resolve only on the detail query.
    query: |
      query AdminCustomerReviews($first: Int, $status: String) {
        adminCustomerReviews(first: $first, status: $status) {
          edges {
            cursor
            node {
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
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "status": "pending"
      }
    response: |
      {
        "data": {
          "adminCustomerReviews": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/reviews/21",
                  "_id": 21,
                  "title": "Great product",
                  "comment": "Exactly as described.",
                  "rating": 5,
                  "status": "pending",
                  "name": "Jane Doe",
                  "createdAt": "2026-06-01 08:00:00",
                  "updatedAt": "2026-06-20 14:30:00",
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
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List Customer Reviews (GraphQL)

Returns the paginated review-moderation list. The reviewed product is a nested `product` object (`id` / `name` / `sku`) and the author is a nested `customer` object (`id` / `name` / `email`). Attached `images` resolve only on the [detail query](./detail.md), not on the listing.

Filter args: `status`, `rating`, `product_id`, `customer_id`, `created_at_from`, `created_at_to`, `sort`, `order`, plus cursor `first` / `after`.

::: tip
See the [Reviews overview](/api/graphql-api/admin/customers/reviews/) for how moderation works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
