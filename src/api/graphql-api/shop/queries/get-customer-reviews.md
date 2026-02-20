---
outline: false
examples:
  - id: get-customer-reviews-basic
    title: Get Customer Reviews - Basic
    description: Retrieve all product reviews submitted by the authenticated customer with pagination.
    query: |
      query getCustomerReviews($first: Int, $after: String) {
        customerReviews(first: $first, after: $after) {
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
              product {
                id
                _id
                sku
                type
              }
              customer {
                id
                _id
              }
              createdAt
              updatedAt
            }
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "customerReviews": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/shop/customer-reviews/1",
                  "_id": 1,
                  "title": "Great product",
                  "comment": "Really enjoyed using this product.",
                  "rating": 5,
                  "status": "approved",
                  "name": "John",
                  "product": {
                    "id": "/api/shop/products/2",
                    "_id": 2,
                    "sku": "PROD-002",
                    "type": "simple"
                  },
                  "customer": {
                    "id": "/api/shop/customers/1",
                    "_id": 1
                  },
                  "createdAt": "2026-02-18T10:30:00+00:00",
                  "updatedAt": "2026-02-18T10:30:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "MA==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100

  - id: get-customer-reviews-status
    title: Get Customer Reviews - Filter by Status
    description: Retrieve customer reviews filtered by approval status.
    query: |
      query getApprovedReviews($first: Int, $status: String) {
        customerReviews(first: $first, status: $status) {
          edges {
            node {
              _id
              title
              rating
              status
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "status": "approved"
      }
    response: |
      {
        "data": {
          "customerReviews": {
            "edges": [
              {
                "node": {
                  "_id": 1,
                  "title": "Great product",
                  "rating": 5,
                  "status": "approved"
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: invalid-status
        cause: Invalid status value provided
        solution: Use one of pending, approved, or rejected

  - id: get-customer-reviews-rating
    title: Get Customer Reviews - Filter by Rating
    description: Retrieve customer reviews filtered by star rating.
    query: |
      query get5StarReviews($first: Int, $rating: Int) {
        customerReviews(first: $first, rating: $rating) {
          edges {
            node {
              _id
              title
              rating
              status
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "rating": 5
      }
    response: |
      {
        "data": {
          "customerReviews": {
            "edges": [
              {
                "node": {
                  "_id": 1,
                  "title": "Great product",
                  "rating": 5,
                  "status": "approved"
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use a rating between 1 and 5

  - id: get-customer-reviews-combined
    title: Get Customer Reviews - Combined Filters
    description: Retrieve customer reviews filtered by both status and rating.
    query: |
      query getApproved5StarReviews($first: Int, $status: String, $rating: Int) {
        customerReviews(first: $first, status: $status, rating: $rating) {
          edges {
            node {
              _id
              title
              comment
              rating
              status
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "status": "approved",
        "rating": 5
      }
    response: |
      {
        "data": {
          "customerReviews": {
            "edges": [
              {
                "node": {
                  "_id": 1,
                  "title": "Great product",
                  "comment": "Really enjoyed using this product.",
                  "rating": 5,
                  "status": "approved"
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

  - id: get-customer-reviews-pagination
    title: Get Customer Reviews - Pagination
    description: Paginate through customer reviews using cursor-based pagination.
    query: |
      query getNextPage($first: Int, $after: String) {
        customerReviews(first: $first, after: $after) {
          edges {
            cursor
            node {
              _id
              title
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    variables: |
      {
        "first": 5,
        "after": "MQ=="
      }
    response: |
      {
        "data": {
          "customerReviews": {
            "edges": [],
            "pageInfo": {
              "endCursor": null,
              "hasNextPage": false
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: The cursor value is invalid or expired
        solution: Use a valid cursor from a previous response's pageInfo

---

# Get Customer Reviews

## About

The `customerReviews` query retrieves a paginated list of product reviews submitted by the authenticated customer. This is a **read-only, customer-scoped** resource — customers can only see their own reviews. Use this query to:

- Display the customer's review history in their account dashboard
- Show pending reviews awaiting approval
- Filter reviews by status or star rating
- Build review management UI for customers
- Implement pagination for customers with many reviews

This query uses cursor-based pagination and returns reviews with their associated product and customer data.

## Authentication

This query requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
X-STOREFRONT-KEY: <storefrontKey>
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of items to return (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Cursor for forward pagination. Use `endCursor` from previous response. |
| `last` | `Int` | ❌ No | Number of items for backward pagination. Max: 100. |
| `before` | `String` | ❌ No | Cursor for backward pagination. Use `startCursor` from previous response. |
| `status` | `String` | ❌ No | Filter by review status: `pending`, `approved`, or `rejected`. |
| `rating` | `Int` | ❌ No | Filter by star rating (1–5). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CustomerReviewEdge!]` | Array of review edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `CustomerReview!` | The customer review object. |
| `edges.node.id` | `ID!` | IRI identifier (e.g. `/api/shop/customer-reviews/1`). |
| `edges.node._id` | `Int!` | Numeric database ID. |
| `edges.node.title` | `String!` | Review title. |
| `edges.node.comment` | `String!` | Review body text. |
| `edges.node.rating` | `Int!` | Star rating (1–5). |
| `edges.node.status` | `String!` | Review status: `pending`, `approved`, or `rejected`. |
| `edges.node.name` | `String!` | Reviewer display name. |
| `edges.node.product` | `Product!` | Associated product with id, _id, sku, type. |
| `edges.node.customer` | `Customer!` | Customer who wrote the review with id, _id. |
| `edges.node.createdAt` | `DateTime!` | ISO 8601 creation timestamp. |
| `edges.node.updatedAt` | `DateTime!` | ISO 8601 last update timestamp. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total reviews matching filters. |

## Filter Parameters

| Parameter | Type | Values | Description |
|-----------|------|--------|-------------|
| `status` | String | `pending`, `approved`, `rejected` | Filter by review approval status |
| `rating` | Int | `1`–`5` | Filter by star rating |

## Pagination Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `first` | Int | Return the first N items |
| `last` | Int | Return the last N items |
| `after` | String | Cursor — return items after this cursor |
| `before` | String | Cursor — return items before this cursor |

## Use Cases

### 1. Customer Review History
Fetch all reviews a customer has submitted to display in their account dashboard.

### 2. Pending Reviews
Filter by `status: "pending"` to show the customer which reviews are still awaiting approval.

### 3. Top-Rated Reviews
Filter by `rating: 5` to highlight the customer's highest-rated reviews.

### 4. Review Status Tracking
Combine status and rating filters to help customers manage and track their reviews.

## Best Practices

1. **Use Pagination** — Always implement pagination for better performance, especially for active reviewers
2. **Show Status** — Display the review status so customers know which reviews are live
3. **Cache Results** — Cache review lists as they change infrequently
4. **Handle Empty States** — Provide helpful UI when the customer has no reviews
5. **Filter by Status** — Allow customers to filter by pending/approved/rejected for easy management

## Related Resources

- [Get Single Customer Review](/api/graphql-api/shop/queries/get-customer-review) — Query individual customer review details
- [Get Product Reviews](/api/graphql-api/shop/queries/get-product-reviews) — Query all product reviews
- [Create Product Review](/api/graphql-api/shop/mutations/create-product-review) — Submit a new product review
- [Pagination Guide](/api/graphql-api/pagination) — Cursor pagination documentation
