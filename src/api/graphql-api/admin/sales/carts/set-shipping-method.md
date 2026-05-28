---
outline: false
examples:
  - id: admin-cart-set-shipping-method
    title: Set Shipping Method
    description: Save the chosen shipping method on the draft cart.
    query: |
      mutation SetShipping($input: setShippingMethodAdminCartInput!) {
        setShippingMethodAdminCart(input: $input) {
          adminCart { id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": 314,
          "shippingMethod": "flatrate_flatrate"
        }
      }
    response: |
      {
        "data": {
          "setShippingMethodAdminCart": {
            "adminCart": { "id": "/api/admin/carts/314" }
          }
        }
      }
---

# Set Shipping Method

::: tip Prerequisites
The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `setShippingMethodAdminCart(input)` | Mutation | Save the chosen shipping method on the draft cart |

`input.id` is the resource IRI; `cartId` is the integer id (both are accepted
because GraphQL inputs use `id` reserved as the resource IRI).

## Errors

| Cause | Notes |
|-------|-------|
| 409 — addresses missing | Save addresses first via `saveAddressAdminCart` |
| 400 — shippingMethod missing | Input must include `shippingMethod` |
| 403 — active storefront cart | Only draft carts can be modified |
| Unauthenticated | Missing admin Bearer token |
