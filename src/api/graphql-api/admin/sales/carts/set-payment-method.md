---
outline: false
examples:
  - id: admin-cart-set-payment-method
    title: Set Payment Method
    description: Save the chosen payment method on the draft cart.
    query: |
      mutation SetPayment($input: setPaymentMethodAdminCartInput!) {
        setPaymentMethodAdminCart(input: $input) {
          adminCart { id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": 314,
          "method": "cashondelivery"
        }
      }
    response: |
      {
        "data": {
          "setPaymentMethodAdminCart": {
            "adminCart": { "id": "/api/admin/carts/314" }
          }
        }
      }
---

# Set Payment Method

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `setPaymentMethodAdminCart(input)` | Mutation | Save the chosen payment method on the draft cart |

## Errors

| Cause | Notes |
|-------|-------|
| 409 — shipping missing | Select a shipping method first |
| 400 — method missing | Input must include `method` |
| 403 — active storefront cart | Only draft carts can be modified |
| Unauthenticated | Missing admin Bearer token |
