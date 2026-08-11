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
                _id
                sku
                type
                name
                description
                shortDescription
                price
                formattedPrice
                minimumPrice
                formattedMinimumPrice
                maximumPrice
                formattedMaximumPrice
                guestCheckout
                locale
                channel
                reviews {
                  edges {
                    node {
                      name
                      id
                      title
                      rating
                    }
                  }
                  totalCount
                }
              }
              customer {
                id
                firstName
                lastName
                gender
                dateOfBirth
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
                "cursor": "MA==",
                "node": {
                  "id": "/api/shop/compare_items/36",
                  "_id": 36,
                  "product": {
                    "id": "/api/shop/products/2495",
                    "_id": 2495,
                    "sku": "IVORY-OVERCOAT-001",
                    "type": "configurable",
                    "name": "Ivory Frost Classic Overcoat",
                    "description": "The Ivory Frost Classic Overcoat blends modern simplicity with timeless winter design. Crafted in a smooth, insulating fabric, it offers dependable warmth while maintaining a lightweight, structured feel.",
                    "shortDescription": "A sleek ivory overcoat with a tailored fit and soft warmth, designed to elevate everyday winter styling with minimal effort.",
                    "price": "0",
                    "formattedPrice": "$0.00",
                    "minimumPrice": "500",
                    "formattedMinimumPrice": "$500.00",
                    "maximumPrice": "500",
                    "formattedMaximumPrice": "$500.00",
                    "guestCheckout": "1",
                    "locale": null,
                    "channel": null,
                    "reviews": {
                      "edges": [
                        {
                          "node": {
                            "name": "Gerson Rivera",
                            "id": "/api/shop/reviews/7",
                            "title": "Royal Sofa",
                            "rating": 5
                          }
                        }
                      ],
                      "totalCount": 1
                    }
                  },
                  "customer": {
                    "id": "/api/shop/customers/122",
                    "firstName": "John",
                    "lastName": "Doe",
                    "gender": "Male",
                    "dateOfBirth": "1990-01-15"
                  },
                  "createdAt": "2026-04-06T18:47:53+05:30",
                  "updatedAt": "2026-04-06T18:47:53+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/shop/compare_items/37",
                  "_id": 37,
                  "product": {
                    "id": "/api/shop/products/2500",
                    "_id": 2500,
                    "sku": "MINT-BLAZER-001",
                    "type": "configurable",
                    "name": "Mint Axis Unisex Tailored Blazer",
                    "description": "The Mint Axis Unisex Tailored Blazer is built for those who lead with style, not trends. Featuring a structured yet comfortable silhouette, this blazer balances precision tailoring with a contemporary mint tone.",
                    "shortDescription": "A modern mint blazer with a sharp tailored fit, designed for confident, gender-neutral styling and effortless statement wear.",
                    "price": "0",
                    "formattedPrice": "$0.00",
                    "minimumPrice": "544",
                    "formattedMinimumPrice": "$544.00",
                    "maximumPrice": "544",
                    "formattedMaximumPrice": "$544.00",
                    "guestCheckout": "1",
                    "locale": null,
                    "channel": null,
                    "reviews": {
                      "edges": [],
                      "totalCount": 0
                    }
                  },
                  "customer": {
                    "id": "/api/shop/customers/122",
                    "firstName": "John",
                    "lastName": "Doe",
                    "gender": "Male",
                    "dateOfBirth": "1990-01-15"
                  },
                  "createdAt": "2026-04-06T18:47:53+05:30",
                  "updatedAt": "2026-04-06T18:47:53+05:30"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 2
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
                _id
                sku
                type
                name
                price
                formattedPrice
                minimumPrice
                formattedMinimumPrice
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
| `edges.node.id` | `ID!` | IRI identifier (e.g. `/api/shop/compare_items/606`). |
| `edges.node._id` | `Int!` | Numeric identifier. |
| `edges.node.product` | `Product!` | Associated product with id, name, sku, price, etc. |
| `edges.node.product.reviews` | `ReviewCollection!` | Customer reviews left on the product. |
| `edges.node.product.reviews.edges` | `[ReviewEdge!]!` | Review edges. |
| `edges.node.product.reviews.edges.node.id` | `ID!` | Review IRI identifier. |
| `edges.node.product.reviews.edges.node.name` | `String` | Reviewer's name. |
| `edges.node.product.reviews.edges.node.title` | `String` | Review title. |
| `edges.node.product.reviews.edges.node.rating` | `Int!` | Rating value given by the customer (1–5). |
| `edges.node.product.reviews.totalCount` | `Int!` | Total number of reviews on this product. |
| `edges.node.customer` | `Customer!` | Associated customer with id, email, firstName, lastName. |
| `edges.node.createdAt` | `String` | Timestamp when the item was added. |
| `edges.node.updatedAt` | `String` | Timestamp when the item was last updated. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total number of compare items. |
