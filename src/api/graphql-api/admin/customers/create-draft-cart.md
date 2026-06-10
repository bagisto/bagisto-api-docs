---
outline: false
examples:
  - id: admin-create-draft-cart
    title: Create Draft Cart
    description: Bootstrap an empty admin draft cart for a customer (Create-Order entry).
    query: |
      mutation CreateAdminDraftCart($input: createAdminDraftCartInput!) {
        createAdminDraftCart(input: $input) {
          adminDraftCart {
            cartId
            customerId
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "customerId": 19
        }
      }
    response: |
      {
        "data": {
          "createAdminDraftCart": {
            "adminDraftCart": {
              "cartId": 412,
              "customerId": 19,
              "success": true,
              "message": "Draft cart created."
            }
          }
        }
      }
---

# Create Draft Cart

Customer-nested Create-Order entry point. Creates an empty admin draft cart
(`is_active = 0`) for the customer and returns its **`cartId`** — the integer
handle you pass to every cart-keyed write mutation
(`addItemAdminCart`, `saveAddressAdminCart`, `setShippingMethodAdminCart`,
`setPaymentMethodAdminCart`, `createAdminPlaceOrder`) as their `cartId` input.

::: warning Select `cartId`, not `id`
This is an action mutation — its result is not an addressable record, so the
auto-generated `id` (IRI) field has no value and selecting it returns
`Internal server error`. Select the result fields instead: **`cartId`**,
`customerId`, `success`, `message`.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminDraftCart(input: createAdminDraftCartInput!)` | Mutation | Bootstrap a fresh draft cart for a customer |

## Input

| Field | Type | Notes |
|-------|------|-------|
| `customerId` | `Int!` | The customer the order is being created for. |

Distinct from `createAdminReorder` (which seeds the cart from an existing
order's items).

## Errors

| GraphQL `errors[]` cause | Notes |
|--------------------------|-------|
| Customer not found | Returned for an unknown / `0` `customerId` |
| Unauthenticated | Missing admin Bearer token |
| Draft cart could not be created | Bubbles up the underlying error message |
