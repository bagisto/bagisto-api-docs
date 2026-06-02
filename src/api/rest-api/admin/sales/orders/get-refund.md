---
outline: false
apiType: rest
examples:
  - id: admin-get-refund
    title: Get Refund
    description: Fetch a single refund with totals and embedded line items.
    query: |
      curl -X GET "https://your-domain.com/api/admin/refunds/22" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 22,
        "orderId": 2392,
        "state": "refunded",
        "totalQty": 1,
        "orderCurrencyCode": "USD",
        "subTotal": 29.99,
        "formattedSubTotal": "$29.99",
        "grandTotal": 32.99,
        "formattedGrandTotal": "$32.99",
        "shippingAmount": 0.0,
        "formattedShippingAmount": "$0.00",
        "adjustmentRefund": 0.0,
        "formattedAdjustmentRefund": "$0.00",
        "adjustmentFee": 0.0,
        "formattedAdjustmentFee": "$0.00",
        "taxAmount": 3.0,
        "formattedTaxAmount": "$3.00",
        "discountAmount": 0.0,
        "formattedDiscountAmount": "$0.00",
        "createdAt": "2026-05-21 11:48:10",
        "updatedAt": "2026-05-21 11:48:10",
        "items": [
          {
            "id": 701,
            "orderItemId": 42,
            "sku": "WS-12-S",
            "name": "Argus All-Weather Tank-S",
            "qty": 1,
            "total": 29.99,
            "formattedTotal": "$29.99"
          }
        ]
      }
    commonErrors:
      - error: Not Found (404)
        cause: Unknown refund ID
        solution: Verify the refund ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Get Refund

Returns a single refund with totals and embedded line items.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/refunds/{id}` | GET |
