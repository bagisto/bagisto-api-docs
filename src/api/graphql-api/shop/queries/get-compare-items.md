---
outline: false
examples:
  - id: get-compare-items-basic
    title: Get All Compare Items
    description: Retrieve paginated compare items for the authenticated customer using cursor-based pagination.
    query: |
      query GetCompareItems($first: Int, $after: String) {
        compareItems(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              product {
                id
                name
                description
              }
              customer {
                id
                email
                firstName
                lastName
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
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "compareItems": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/shop/compare-items/606",
                  "_id": 606,
                  "product": {
                    "id": "/api/shop/products/4",
                    "name": "Laptop Pro 15",
                    "description": "High-performance laptop"
                  },
                  "customer": {
                    "id": "/api/shop/customers/1",
                    "email": "john@example.com",
                    "firstName": "John",
                    "lastName": "Doe"
                  },
                  "createdAt": "2026-02-17T10:30:00+00:00",
                  "updatedAt": "2026-02-17T10:30:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MQ==",
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

  - id: get-compare-items-paginated
    title: Get Compare Items - Next Page
    description: Fetch the next page of compare items using the endCursor from the previous response.
    query: |
      query GetCompareItems($first: Int, $after: String) {
        compareItems(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              product {
                id
                name
              }
              createdAt
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "after": "MQ=="
      }
    response: |
      {
        "data": {
          "compareItems": {
            "edges": [],
            "pageInfo": {
              "endCursor": null,
              "hasNextPage": false
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: The cursor value is invalid or expired
        solution: Use a valid cursor from a previous response's pageInfo
---

# Get Compare Items

## About

The `compareItems` query retrieves a paginated list of products in the authenticated customer's comparison list. Use this query to:

- Display the customer's product comparison list
- Build comparison tables with product details
- Implement pagination for large comparison lists
- Show compare item counts and status

This query uses cursor-based pagination and returns compare items with their associated product and customer data.

## Authentication

This query requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Number of items to return per page. |
| `after` | `String` | Cursor for pagination. Use `endCursor` from previous response. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CompareItemEdge!]` | Array of compare item edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `CompareItem!` | The compare item object. |
| `edges.node.id` | `ID!` | IRI identifier (e.g. `/api/shop/compare-items/606`). |
| `edges.node._id` | `Int!` | Numeric identifier. |
| `edges.node.product` | `Product!` | Associated product with id, name, sku, price, etc. |
| `edges.node.customer` | `Customer!` | Associated customer with id, email, firstName, lastName. |
| `edges.node.createdAt` | `String` | Timestamp when the item was added. |
| `edges.node.updatedAt` | `String` | Timestamp when the item was last updated. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total number of compare items. |
