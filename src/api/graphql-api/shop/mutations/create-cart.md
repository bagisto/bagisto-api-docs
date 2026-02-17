---
outline: false
examples:
  - id: create-cart-simple
    title: Create Simple Cart
    description: Create a new shopping cart session.
    query: |
      mutation createCart {
        createCartToken(input: {}) {
          cartToken {
            id
            _id
            cartToken
            customerId
            channelId
            itemsCount
            subtotal
            baseSubtotal
            discountAmount
            baseDiscountAmount
            taxAmount
            baseTaxAmount
            shippingAmount
            baseShippingAmount
            grandTotal
            baseGrandTotal
            formattedSubtotal
            formattedDiscountAmount
            formattedTaxAmount
            formattedShippingAmount
            formattedGrandTotal
            couponCode
            success
            message
            sessionToken
            isGuest
          }
        }
      }
    variables: |
      {}
    response: |
      {
          "data": {
              "createCartToken": {
                  "cartToken": {
                      "id": "4484",
                      "_id": 4484,
                      "cartToken": "4484",
                      "customerId": 122,
                      "channelId": 1,
                      "itemsCount": 1,
                      "subtotal": 4500,
                      "baseSubtotal": 4500,
                      "discountAmount": 0,
                      "baseDiscountAmount": 0,
                      "taxAmount": 0,
                      "baseTaxAmount": 0,
                      "shippingAmount": 0,
                      "baseShippingAmount": 0,
                      "grandTotal": 4500,
                      "baseGrandTotal": 4500,
                      "formattedSubtotal": "$4,500.00",
                      "formattedDiscountAmount": "$0.00",
                      "formattedTaxAmount": "$0.00",
                      "formattedShippingAmount": "$0.00",
                      "formattedGrandTotal": "$4,500.00",
                      "couponCode": null,
                      "success": true,
                      "message": "Using authenticated customer cart",
                      "sessionToken": null,
                      "isGuest": false
                  }
              }
          }
      }
    commonErrors:
      - error: CART_CREATION_FAILED
        cause: Unable to create cart session
        solution: Try again or check server logs
---

# Create Cart

## About

The `createCart` mutation creates a new shopping cart session for a customer. Use this mutation to:

- Initialize a new shopping cart for checkout flows
- Generate a unique cart token for session tracking
- Start the shopping and checkout process
- Create guest carts without customer authentication
- Reset or recover abandoned carts
- Manage multiple concurrent cart sessions

This mutation returns a unique cart token that identifies the cart session. This token must be used in subsequent cart operations (add items, update, checkout).


## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql-api/shop/mutations/customer-login) to retrieve the token.

 For guest users, no authentication is required. The mutation returns a unique cart token that must be used as the `Authorization` header in subsequent cart operations.

```
Authorization: Bearer <accessToken>
```
 
## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `cartToken` | `String!` | Unique cart session token. Use this in all subsequent cart operations. |
| `id` | `String!` | Unique cart identifier. |
| `message` | `String!` | Success or error message. |
| `success` | `Boolean!` | Indicates if cart creation was successful. |
| `isGuest` | `Boolean!` | Indicates whether the cart is for a guest user (`true`) or an authenticated customer (`false`). |
| `formattedGrandTotal` | `String` | Current cart grand total with currency symbol. |
| `errors` | `[ErrorMessage!]` | Array of validation or processing errors if applicable. |

