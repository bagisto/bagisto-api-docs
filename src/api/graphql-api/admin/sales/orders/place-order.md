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

Finalises a fully prepared draft cart into a real order — the same flow as the
admin Create-Order screen's place-order step. Items, addresses, shipping and
payment must already be set on the draft cart.

::: tip Prerequisites
The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.
:::

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
