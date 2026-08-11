---
outline: false
examples:
  - id: list-returnable-items
    title: List Returnable Items
    description: List the return-eligible items of one of the authenticated customer's orders, with the quantity caps the store enforces.
    query: |
      query ReturnableItems($orderId: Int!) {
        returnableItems(orderId: $orderId) {
          orderItemId
          productId
          sku
          name
          type
          urlKey
          price
          baseImageUrl
          qtyOrdered
          currentQuantity
          forReturnQuantity
          forCancelQuantity
          rmaQuantity
          rmaReturnPeriod
        }
      }
    variables: |
      {
        "orderId": 45
      }
    response: |
      {
        "data": {
          "returnableItems": [
            {
              "orderItemId": 78,
              "productId": 1,
              "sku": "COASTALBREEZEMENSHOODIE",
              "name": "Coastal Breeze Men's Blue Zipper Hoodie",
              "type": "simple",
              "urlKey": "coastal-breeze-mens-blue-zipper-hoodie",
              "price": 100,
              "baseImageUrl": "https://example.com/storage/product/1/hoodie.webp",
              "qtyOrdered": 2,
              "currentQuantity": 2,
              "forReturnQuantity": 2,
              "forCancelQuantity": 0,
              "rmaQuantity": 0,
              "rmaReturnPeriod": 30
            }
          ]
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The order does not exist or is not owned by the authenticated customer
        solution: Only order IDs belonging to the logged-in customer can be queried
---

# List Returnable Items

## About

The `returnableItems` query lists the items of one of the customer's orders that are **still eligible for return** — within their return window and not already fully returned or canceled. Each row carries the trusted quantity caps the store enforces when a return is raised (`forReturnQuantity`, `forCancelQuantity`, `currentQuantity`), so a client can present the correct maximum. Use these rows to pick the `orderItemId` and quantity for [`createCustomerReturn`](/api/graphql-api/shop/returns/mutations/create-return).

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `orderId` | `Int!` | ✅ Yes | Id of the order to list returnable items for. Must belong to the authenticated customer. |
| `first` | `Int` | ❌ No | Number of items to return (forward pagination). |
| `after` | `String` | ❌ No | Cursor for forward pagination. Use `endCursor` from a previous response. |

## Possible Returns

The query returns a plain list of items, not a cursor connection — there is no `edges`, `pageInfo`, or `totalCount` to select, and no pagination arguments. Every eligible item on the order comes back in one response.

| Field | Type | Description |
|-------|------|-------------|
| `orderItemId` | `Int!` | Id of the order item — use this when raising a return. |
| `productId` | `Int!` | Id of the product. |
| `sku` | `String!` | Product SKU. |
| `name` | `String!` | Product name. |
| `type` | `String!` | Product type, e.g. `simple`. |
| `urlKey` | `String!` | Product URL key. |
| `price` | `Float!` | Item price. |
| `baseImageUrl` | `String` | URL of the product's base image. |
| `qtyOrdered` | `Int!` | Quantity originally ordered. |
| `currentQuantity` | `Int!` | Quantity currently eligible to act on. |
| `forReturnQuantity` | `Int!` | Maximum units that can be returned. |
| `forCancelQuantity` | `Int!` | Maximum units that can be canceled. |
| `rmaQuantity` | `Int!` | Units already placed into a return. |
| `rmaReturnPeriod` | `Int!` | Return window in days. |

## Related Resources

- [List Return Reasons](/api/graphql-api/shop/returns/queries/list-return-reasons)
- [Raise a Return](/api/graphql-api/shop/returns/mutations/create-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
