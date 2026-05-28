---
outline: false
examples:
  - id: admin-cart-apply-coupon
    title: Apply a Coupon
    description: Apply a cart-rule coupon code to the draft cart. Returns errors[] on unknown/inactive coupon (404 equivalent) or already-applied (422 equivalent).
    query: |
      mutation ApplyCoupon($input: applyCouponAdminCartInput!) {
        applyCouponAdminCart(input: $input) {
          adminCart { id _id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": "314",
          "code": "WELCOME10"
        }
      }
    response: |
      {
        "data": {
          "applyCouponAdminCart": {
            "adminCart": { "id": "/api/admin/carts/314", "_id": 314 }
          }
        }
      }
---

# Apply a Coupon

GraphQL counterpart of `POST /api/admin/carts/{id}/coupon`. Mutation field is
`applyCouponAdminCart`.

::: tip Prerequisites
The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.
:::

## Operation

| Operation | Type |
|-----------|------|
| `applyCouponAdminCart(input: applyCouponAdminCartInput!)` | Mutation |
