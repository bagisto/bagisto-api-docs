---
outline: false
examples:
  - id: admin-refund-preview
    title: Refund Preview
    description: Compute refund totals (subtotal, discount, tax, shipping, grandTotal) without saving anything.
    query: |
      mutation RefundPreview($input: previewAdminRefundInput!) {
        previewAdminRefund(input: $input) {
          adminRefund {
            id
            subtotal
            formattedSubtotal
            tax
            formattedTax
            shipping
            formattedShipping
            grandTotal
            formattedGrandTotal
          }
        }
      }
    variables: |
      {
        "input": {
          "orderId": 2392,
          "items": [ { "orderItemId": 42, "quantity": 1 } ],
          "shipping": 0,
          "adjustmentRefund": 0,
          "adjustmentFee": 0
        }
      }
    response: |
      {
        "data": {
          "previewAdminRefund": {
            "adminRefund": {
              "id": "/api/refund-totals-summaries/2392",
              "subtotal": 29.99,
              "formattedSubtotal": "$29.99",
              "tax": 3.0,
              "formattedTax": "$3.00",
              "shipping": 0.0,
              "formattedShipping": "$0.00",
              "grandTotal": 32.99,
              "formattedGrandTotal": "$32.99"
            }
          }
        }
      }
---

# Refund Preview

Computes refund totals (subtotal, discount, tax, shipping, grandTotal, plus
pre-formatted variants) for a hypothetical refund body without saving anything.
Same body shape as Create Refund — useful for live-updating the
"Total Refund" widget in the admin refund form.

## Operation

| Operation | Type |
|-----------|------|
| `previewAdminRefund` | Mutation |

Eligibility gates fire here too — if the order cannot be refunded at all
(closed / fraud / no permission / nothing-to-refund), preview rejects with the
same error messages as Create Refund.
