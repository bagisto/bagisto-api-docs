---
outline: false
examples:
  - id: get-compare-item-by-id
    title: Get Single Compare Item
    description: Retrieve a specific compare item by its IRI.
    query: |
      query GetCompareItem($id: ID!) {
        compareItem(id: $id) {
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
    variables: |
      {
        "id": "/api/shop/compare_items/37"
      }
    response: |
      {
        "data": {
          "compareItem": {
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
                "edges": [
                  {
                    "node": {
                      "name": "Gerson Rivera",
                      "id": "/api/shop/reviews/8",
                      "title": "Velvet sofa",
                      "rating": 4
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
        }
      }
    commonErrors:
      - error: ITEM_NOT_FOUND
        cause: Compare item ID does not exist or does not belong to the customer
        solution: Use a valid compare item IRI from the compareItems collection query
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
---

# Get Compare Item

## About

The `compareItem` query retrieves a single compare item by its IRI identifier. Use this query to:

- Fetch detailed information about a specific compare item
- Display product comparison details on a detail page
- Verify a product exists in the customer's comparison list

## Authentication

This query requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | The IRI of the compare item (e.g. `/api/shop/compare_items/606`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI identifier (e.g. `/api/shop/compare_items/606`). |
| `_id` | `Int!` | Numeric identifier. |
| `product` | `Product!` | Associated product with id, name, sku, price, description, etc. |
| `product.reviews` | `ReviewCollection!` | Customer reviews left on the product. |
| `product.reviews.edges` | `[ReviewEdge!]!` | Review edges. |
| `product.reviews.edges.node.id` | `ID!` | Review IRI identifier. |
| `product.reviews.edges.node.name` | `String` | Reviewer's name. |
| `product.reviews.edges.node.title` | `String` | Review title. |
| `product.reviews.edges.node.rating` | `Int!` | Rating value given by the customer (1–5). |
| `product.reviews.totalCount` | `Int!` | Total number of reviews on this product. |
| `customer` | `Customer!` | Associated customer with id, email, firstName, lastName. |
| `createdAt` | `String` | Timestamp when the item was added. |
| `updatedAt` | `String` | Timestamp when the item was last updated. |
