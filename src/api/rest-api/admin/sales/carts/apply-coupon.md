---
outline: false
apiType: rest
examples:
  - id: admin-cart-apply-coupon
    title: Apply a Coupon
    description: Apply a cart-rule coupon code to the draft cart and recollect totals. Mirrors the monolith status codes — 404 for unknown / inactive, 422 if the same coupon is already applied.
    query: |
      curl -X POST "https://your-domain.com/api/admin/carts/314/coupon" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "code": "WELCOME10" }'
    variables: |
      { "code": "WELCOME10" }
    response: |
      {
        "id": 314,
        "couponCode": "WELCOME10",
        "discountAmount": 10,
        "grandTotal": 90,
        "success": true,
        "message": "Coupon applied."
      }
    commonErrors:
      - error: Bad Request (400)
        cause: code missing
        solution: Send a code value
      - error: Not Found (404)
        cause: Coupon does not exist or its rule is inactive
        solution: Verify the code and that the cart rule is enabled
      - error: Unprocessable Entity (422)
        cause: The same coupon is already applied to this cart
        solution: Remove first (DELETE /api/admin/carts/{id}/coupon) if you want to re-apply
---

# Apply a Coupon

Apply a cart-rule coupon to the draft cart.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}/coupon` | POST |
