---
outline: false
examples:
  - id: admin-place-order
    title: Place Order
    description: Finalise a fully prepared draft cart into a real order.
    query: |
      mutation PlaceOrder($input: createAdminPlaceOrderInput!) {
        createAdminPlaceOrder(input: $input) {
          adminPlaceOrder {
            orderId
            incrementId
            customerId
            grandTotal
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "cartId": 314
        }
      }
    response: |
      {
        "data": {
          "createAdminPlaceOrder": {
            "adminPlaceOrder": {
              "orderId": 1284,
              "incrementId": "1284",
              "customerId": 19,
              "grandTotal": 110,
              "success": true,
              "message": "Order placed successfully."
            }
          }
        }
      }
---

# Place Order

Finalises a fully prepared draft cart into a real order — the same flow as the
admin Create-Order screen's place-order step. Items, addresses, shipping and
payment must already be set on the draft cart.

### Select result fields, not `id`

Select `orderId` (the new order's id), `incrementId`, `customerId`, `grandTotal`,
`success`, `message`. Do **not** select `id` (or `_id`): this is an action result
with no addressable record, so the auto-generated IRI field is `null` and
selecting it errors out the whole payload.

**Prerequisites** — The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminPlaceOrder(input)` | Mutation | Finalise a draft cart into an order |

## Sequence (errors[])

Each missing step surfaces as a distinct GraphQL error (REST counterpart in
parentheses):

- Cart empty (409)
- Cart total below the store's minimum order amount (422)
- Addresses missing (409)
- Shipping method missing (409)
- Payment method missing (409)
- Payment method not in `[cashondelivery, moneytransfer]` (422)
