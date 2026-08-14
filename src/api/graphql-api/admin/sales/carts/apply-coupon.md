---
outline: false
examples:
  - id: admin-cart-apply-coupon
    title: Apply a Coupon
    description: Apply a cart-rule coupon code to the draft cart. Returns errors[] on unknown/inactive coupon (404 equivalent) or already-applied (422 equivalent).
    query: |
      mutation ApplyCoupon($input: applyCouponAdminCartInput!) {
        applyCouponAdminCart(input: $input) {
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
          "cartId": "314",
          "code": "WELCOME10"
        }
      }
    response: |
      {
        "data": {
          "applyCouponAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Coupon applied."
            }
          }
        }
      }
---

# Apply a Coupon

GraphQL counterpart of `POST /api/admin/carts/{id}/coupon`. Mutation field is
`applyCouponAdminCart`.

### Select cart fields, not `id`

This mutation returns the updated cart — select `itemsCount`, `grandTotal`, `formattedGrandTotal`, `success`, `message`, etc. Do **not** select `id` (or `_id`): this is an action result with no addressable record, so the auto-generated IRI field is `null` and selecting it errors out the whole payload.

**Prerequisites** — The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.

## Operation

| Operation | Type |
|-----------|------|
| `applyCouponAdminCart(input: applyCouponAdminCartInput!)` | Mutation |
