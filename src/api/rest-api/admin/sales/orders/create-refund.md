---
outline: false
apiType: rest
examples:
  - id: admin-create-refund
    title: Create Refund
    description: Refund one or more order items, with optional shipping refund and adjustment fee/refund. Quantity is validated against `qty_to_refund`, and the computed total is checked against the maximum refundable amount before saving.
    query: |
      curl -X POST "https://your-domain.com/api/admin/orders/2392/refunds" \
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
      - error: Closed (422)
        cause: Order is already closed
        solution: Closed orders cannot be refunded
      - error: Fraud (422)
        cause: Order is flagged as fraud
        solution: Resolve the fraud flag before refunding
      - error: Nothing to refund (422)
        cause: No item has `qty_to_refund > 0` and no outstanding balance remains
        solution: Nothing further can be refunded on this order
      - error: No permission (422)
        cause: Admin role lacks `sales.refunds.create`
        solution: Grant the role the `sales.refunds.create` permission
      - error: Quantity exceeds (422)
        cause: Requested quantity for an SKU is greater than `qty_to_refund`
        solution: Lower the quantity to at most `qty_to_refund`
      - error: Amount zero (422)
        cause: Computed refund total resolves to zero
        solution: Adjust quantity, shipping, or adjustment-refund values
      - error: Amount exceeds maximum (422)
        cause: Computed refund total exceeds the order's remaining refundable amount
        solution: Lower quantities or adjustment-refund value
      - error: Not Found (404)
        cause: Unknown order ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Create Refund

Refunds one or more order items, with optional shipping refund and adjustment
fee/refund. Mirrors the monolith `RefundController::store` flow — runs the
shared `AdminOrderActionGuard.assertCanRefund` checks, validates each item's
quantity against `qty_to_refund`, computes totals via
`RefundRepository::getOrderItemsRefundSummary`, then verifies the refund
amount does not exceed the order's remaining refundable balance before
calling `RefundRepository::create`.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{orderId}/refunds` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `items` | array of `{ orderItemId, quantity }` | yes | Items to refund. |
| `shipping` | float | no (default `0`) | Original shipping to refund (base currency). |
| `adjustmentRefund` | float | no (default `0`) | Positive adjustment added to the refund total. |
| `adjustmentFee` | float | no (default `0`) | Fee subtracted from the refund total. |

## Errors

| HTTP | Lang key | Message |
|------|----------|---------|
| 422  | `bagistoapi::app.admin.order.actions.refund.closed` | Closed orders cannot be refunded. |
| 422  | `bagistoapi::app.admin.order.actions.refund.fraud` | Fraud orders cannot be refunded. |
| 422  | `bagistoapi::app.admin.order.actions.refund.nothing-to-refund` | There is nothing left to refund on this order. |
| 422  | `bagistoapi::app.admin.order.actions.refund.no-permission` | You do not have permission to create refunds. |
| 422  | `bagistoapi::app.admin.order.actions.refund.qty-exceeds` | Requested quantity (`:requested`) exceeds available quantity (`:available`) for SKU `:sku`. |
| 422  | `bagistoapi::app.admin.order.actions.refund.amount-zero` | The computed refund amount is zero. Adjust quantity, shipping or adjustment values. |
| 422  | `bagistoapi::app.admin.order.actions.refund.amount-exceeds-max` | The refund amount (`:amount`) exceeds the maximum refundable amount (`:max`). |
| 422  | `bagistoapi::app.admin.order.actions.refund.failed` | Could not create the refund. |

> Tip: use **Refund Preview** (`POST /api/admin/orders/{orderId}/refunds/preview`)
> to validate the computed totals without saving.
