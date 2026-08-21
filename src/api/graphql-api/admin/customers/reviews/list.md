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
  - id: admin-customer-reviews-list-filtered
    title: Filtered + Sorted
    description: Pending five-star reviews for one product within a date range, sorted by rating descending. Filter args, sorting and pagination all combine in one query (multiple filters narrow the result — logical AND).
    query: |
      query AdminCustomerReviews(
        $first: Int
        $status: String
        $rating: Int
        $product_id: Int
        $created_at_from: String
        $created_at_to: String
        $sort: String
        $order: String
      ) {
        adminCustomerReviews(
          first: $first
          status: $status
          rating: $rating
          product_id: $product_id
          created_at_from: $created_at_from
          created_at_to: $created_at_to
          sort: $sort
          order: $order
        ) {
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
        "status": "pending",
        "rating": 5,
        "product_id": 2358,
        "created_at_from": "2026-06-01",
        "created_at_to": "2026-06-30",
        "sort": "rating",
        "order": "desc"
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

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Reviews datagrid filters.

| Argument | Type | Match |
|----------|------|-------|
| `status` | `String` | `pending`, `approved` or `disapproved`. |
| `rating` | `Int` | Exact rating value (`1`–`5`). |
| `product_id` | `Int` | Exact reviewed-product id. |
| `customer_id` | `Int` | Exact review-author id. |
| `created_at_from` | `String` | Reviewed on ≥ (date bound, e.g. `"2026-06-01"`). |
| `created_at_to` | `String` | Reviewed on ≤ (date bound). |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `rating`, `created_at` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

See the [Reviews overview](/api/graphql-api/admin/customers/reviews/) for how moderation works.
