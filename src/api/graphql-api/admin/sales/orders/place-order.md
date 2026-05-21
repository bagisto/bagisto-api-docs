---
outline: false
examples:
  - id: admin-place-order
    title: Place Order
    description: Finalise a fully prepared draft cart into a real order.
    query: |
      mutation PlaceOrder($input: createAdminPlaceOrderInput!) {
        createAdminPlaceOrder(input: $input) {
          adminPlaceOrder { id }
        }
      }
    variables: |
      {
        "input": { "cartId": 314 }
      }
    response: |
      {
        "data": {
          "createAdminPlaceOrder": {
            "adminPlaceOrder": { "id": "/api/admin/place-orders/1284" }
          }
        }
      }
---

# Place Order

Mirrors the Bagisto admin monolith `OrderController::store` flow. Items,
addresses, shipping and payment must already be set on the draft cart.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminPlaceOrder(input)` | Mutation | Finalise a draft cart into an order |

## Sequence (errors[])

Each missing step surfaces as a distinct GraphQL error (REST counterpart in
parentheses):

- Cart empty (409)
- Addresses missing (409)
- Shipping method missing (409)
- Payment method missing (409)
- Payment method not in `[cashondelivery, moneytransfer]` (422)
