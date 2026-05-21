---
outline: false
examples:
  - id: admin-cart-remove-coupon
    title: Remove Applied Coupon
    description: Remove the currently-applied coupon from the draft cart. Idempotent.
    query: |
      mutation RemoveCoupon($input: removeCouponAdminCartInput!) {
        removeCouponAdminCart(input: $input) {
          adminCart { id _id }
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
            "adminCart": { "id": "/api/admin/carts/314", "_id": 314 }
          }
        }
      }
---

# Remove Applied Coupon

GraphQL counterpart of `DELETE /api/admin/carts/{id}/coupon`. Mutation field is
`removeCouponAdminCart`.

## Operation

| Operation | Type |
|-----------|------|
| `removeCouponAdminCart(input: removeCouponAdminCartInput!)` | Mutation |
