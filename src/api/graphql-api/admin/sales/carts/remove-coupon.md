---
outline: false
examples:
  - id: admin-cart-remove-coupon
    title: Remove Applied Coupon
    description: Remove the currently-applied coupon from the draft cart. Idempotent.
    query: |
      mutation RemoveCoupon($input: removeCouponAdminCartInput!) {
        removeCouponAdminCart(input: $input) {
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
          "cartId": "314"
        }
      }
    response: |
      {
        "data": {
          "removeCouponAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Coupon removed."
            }
          }
        }
      }
---

# Remove Applied Coupon

GraphQL counterpart of `DELETE /api/admin/carts/{id}/coupon`. Mutation field is
`removeCouponAdminCart`.

### Select cart fields, not `id`

This mutation returns the updated cart — select `itemsCount`, `grandTotal`, `formattedGrandTotal`, `success`, `message`, etc. Do **not** select `id` (or `_id`): this is an action result with no addressable record, so the auto-generated IRI field is `null` and selecting it errors out the whole payload.

**Prerequisites** — The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.

## Operation

| Operation | Type |
|-----------|------|
| `removeCouponAdminCart(input: removeCouponAdminCartInput!)` | Mutation |
