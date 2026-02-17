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
            name
            price
            sku
          }
          customer {
            id
            email
            firstName
          }
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/shop/compare-items/606"
      }
    response: |
      {
        "data": {
          "compareItem": {
            "id": "/api/shop/compare-items/606",
            "_id": 606,
            "product": {
              "id": "/api/shop/products/4",
              "name": "Laptop Pro 15",
              "price": "1299.99",
              "sku": "LP15-2026"
            },
            "customer": {
              "id": "/api/shop/customers/1",
              "email": "john@example.com",
              "firstName": "John"
            },
            "createdAt": "2026-02-17T10:30:00+00:00",
            "updatedAt": "2026-02-17T10:30:00+00:00"
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
| `id` | `ID!` | The IRI of the compare item (e.g. `/api/shop/compare-items/606`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI identifier (e.g. `/api/shop/compare-items/606`). |
| `_id` | `Int!` | Numeric identifier. |
| `product` | `Product!` | Associated product with id, name, sku, price, description, etc. |
| `customer` | `Customer!` | Associated customer with id, email, firstName, lastName. |
| `createdAt` | `String` | Timestamp when the item was added. |
| `updatedAt` | `String` | Timestamp when the item was last updated. |
