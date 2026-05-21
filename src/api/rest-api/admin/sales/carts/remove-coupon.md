---
outline: false
apiType: rest
examples:
  - id: admin-cart-remove-coupon
    title: Remove Applied Coupon
    description: Remove the currently-applied coupon (if any) from the draft cart and recollect totals. Idempotent.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/carts/314/coupon" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 314,
        "couponCode": null,
        "discountAmount": 0,
        "grandTotal": 100,
        "success": true,
        "message": "Coupon removed."
      }
    commonErrors:
      - error: Not Found (404)
        cause: Unknown cart ID
        solution: Verify the cart ID
---

# Remove Applied Coupon

Remove the currently-applied coupon from the draft cart. Safe to call when no
coupon is applied — the underlying facade is a no-op in that case.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}/coupon` | DELETE |
