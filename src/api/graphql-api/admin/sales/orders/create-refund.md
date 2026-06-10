---
outline: false
examples:
  - id: admin-create-refund
    title: Create Refund
    description: Refund one or more order items, with optional shipping refund and adjustment fee/refund.
    query: |
      mutation CreateRefund($input: createAdminRefundInput!) {
        createAdminRefund(input: $input) {
          adminRefund { id }
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
          "createAdminRefund": {
            "adminRefund": { "id": "/api/admin/refunds/22" }
          }
        }
      }
---

# Create Refund

Refunds one or more order items, with an optional shipping refund and an
adjustment fee/refund. The same eligibility checks as the admin Refund screen
apply (the order must not be closed or marked fraud, and each item's requested
quantity must be ≤ its still-refundable quantity, `qty_to_refund`). The refund
totals are computed from the items + shipping + adjustments, and the total
cannot exceed the order's remaining refundable balance.

After the mutation, fetch the full refund via `adminRefund(id:)` or the REST
`GET /api/admin/refunds/{id}` endpoint.

::: tip Prerequisites
The example item quantities must be ≤ each item's `qty_to_refund`. Already-refunded quantities are rejected with *"We found an invalid quantity to refund items."* — fetch the order detail to see the current per-item refundable qty before submitting.
:::

## Operation

| Operation | Type |
|-----------|------|
| `createAdminRefund` | Mutation |

## Errors

| Condition | Lang key | Message |
|-----------|----------|---------|
| Order `closed` | `bagistoapi::app.admin.order.actions.refund.closed` | Closed orders cannot be refunded. |
| Order `fraud`  | `bagistoapi::app.admin.order.actions.refund.fraud`  | Fraud orders cannot be refunded. |
| Nothing to refund | `bagistoapi::app.admin.order.actions.refund.nothing-to-refund` | There is nothing left to refund on this order. |
| No permission | `bagistoapi::app.admin.order.actions.refund.no-permission` | You do not have permission to create refunds. |
| Qty exceeds available | `bagistoapi::app.admin.order.actions.refund.qty-exceeds` | Requested quantity (`:requested`) exceeds available quantity (`:available`) for SKU `:sku`. |
| Amount zero | `bagistoapi::app.admin.order.actions.refund.amount-zero` | The computed refund amount is zero. Adjust quantity, shipping or adjustment values. |
| Amount exceeds maximum | `bagistoapi::app.admin.order.actions.refund.amount-exceeds-max` | The refund amount (`:amount`) exceeds the maximum refundable amount (`:max`). |
| Save failed | `bagistoapi::app.admin.order.actions.refund.failed` | Could not create the refund. |
