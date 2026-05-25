---
outline: false
apiType: rest
examples:
  - id: admin-refund-preview
    title: Refund Preview
    description: Computes refund totals (subtotal, discount, tax, shipping, grandTotal) for a hypothetical refund body without saving anything. Same body as Create Refund.
    query: |
      curl -X POST "https://your-domain.com/api/admin/orders/2392/refunds/preview" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "items": [ { "orderItemId": 42, "quantity": 1 } ],
          "shipping": 0,
          "adjustmentRefund": 0,
          "adjustmentFee": 0
        }'
    variables: |
      {
        "items": [ { "orderItemId": 42, "quantity": 1 } ],
        "shipping": 0,
        "adjustmentRefund": 0,
        "adjustmentFee": 0
      }
    response: |
      {
        "orderId": 2392,
        "subtotal": 29.99,
        "formattedSubtotal": "$29.99",
        "discount": 0.0,
        "formattedDiscount": "$0.00",
        "tax": 3.0,
        "formattedTax": "$3.00",
        "shipping": 0.0,
        "formattedShipping": "$0.00",
        "adjustmentRefund": 0.0,
        "adjustmentFee": 0.0,
        "grandTotal": 32.99,
        "formattedGrandTotal": "$32.99"
      }
    commonErrors:
      - error: Closed / Fraud / No permission / Nothing to refund (422)
        cause: Same eligibility gates as Create Refund
        solution: See the Create Refund page for the full list
      - error: Not Found (404)
        cause: Unknown order ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Refund Preview

Computes the refund totals (subtotal, discount, tax, shipping, grandTotal, plus
pre-formatted variants) for a hypothetical refund body **without saving
anything**. Same request body as Create Refund — useful for live-updating the
"Total Refund" widget in the admin refund form.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{orderId}/refunds/preview` | POST |

Eligibility gates fire here too — if the order cannot be refunded at all
(closed / fraud / no permission / nothing-to-refund), preview rejects with the
same 422 messages as Create Refund.
