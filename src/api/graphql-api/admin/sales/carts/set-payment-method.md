---
outline: false
examples:
  - id: admin-cart-set-payment-method
    title: Set Payment Method
    description: Save the chosen payment method on the draft cart.
    query: |
      mutation SetPayment($input: setPaymentMethodAdminCartInput!) {
        setPaymentMethodAdminCart(input: $input) {
          adminCart {
            itemsCount
            grandTotal
            formattedGrandTotal
            success
            message
          }
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
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Payment method saved."
            }
          }
        }
      }
---

# Set Payment Method

::: warning Select cart fields, not `id`
This mutation returns the updated cart — select `itemsCount`, `grandTotal`, `formattedGrandTotal`, `success`, `message`, etc. Do **not** select `id` (or `_id`): this is an action result with no addressable record, so the auto-generated IRI field is `null` and selecting it errors out the whole payload.
:::

::: tip Prerequisites
The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.
:::

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
