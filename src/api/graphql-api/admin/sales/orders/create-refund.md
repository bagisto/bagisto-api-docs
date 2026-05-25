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

Refunds one or more order items, with optional shipping refund and adjustment
fee/refund. Mirrors the monolith `RefundController::store` — runs the shared
`AdminOrderActionGuard.assertCanRefund` checks, validates each item's quantity
against `qty_to_refund`, computes totals via
`RefundRepository::getOrderItemsRefundSummary`, then verifies the refund amount
does not exceed the order's remaining refundable balance before calling
`RefundRepository::create`.

After the mutation, fetch the full refund via `adminRefund(id:)` or the REST
`GET /api/admin/refunds/{id}` endpoint.

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
| Repository failure | `bagistoapi::app.admin.order.actions.refund.failed` | Could not create the refund. |
