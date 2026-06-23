---
outline: false
examples:
  - id: admin-cancel-order
    title: Cancel Order
    description: Cancel every cancellable item on an order. Returns the updated order summary.
    query: |
      mutation CancelOrder($input: createAdminCancelOrderInput!) {
        createAdminCancelOrder(input: $input) {
          adminCancelOrder {
            id
            orderId
            incrementId
            status
            statusLabel
            grandTotal
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "orderId": 2392
        }
      }
    response: |
      {
        "data": {
          "createAdminCancelOrder": {
            "adminCancelOrder": {
              "id": "/api/admin/admin_cancel_orders/2392",
              "orderId": 2392,
              "incrementId": "2392",
              "status": "canceled",
              "statusLabel": "Canceled",
              "grandTotal": 219,
              "success": true,
              "message": "Order canceled successfully."
            }
          }
        }
      }
---

# Cancel Order

Cancels every cancellable item on an order. This is the same action as the
**Cancel** button on the admin order-view screen, with the same eligibility
gates as REST.

::: tip GraphQL returns a summary; REST returns the full detail
The GraphQL mutation returns a slim order **summary** (`orderId`, `incrementId`,
`status`, `statusLabel`, `grandTotal`, `success`, `message`). The REST endpoint
(`POST /api/admin/orders/{id}/cancel`) returns the **full** updated order-detail
payload. Use REST, or re-query `adminOrderDetail`, when you need the complete
order after cancelling.
:::

::: tip Prerequisites
The example targets an order with cancellable items. Only orders that have **not** been invoiced or shipped can be canceled — once an order is invoiced (typically `processing`) it can only be **refunded**, and the mutation returns *"This order has already been invoiced or shipped and can no longer be canceled. You can issue a refund instead."* Pick an order in `pending` state (nothing invoiced yet) to cancel.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminCancelOrder` | Mutation | Cancel an order |

## Errors

Each failure returns the `errors[]` array with one of these messages:

| Condition | Lang key | Message |
|-----------|----------|---------|
| Order is `closed` | `bagistoapi::app.admin.order.actions.cancel.closed` | Closed orders cannot be canceled. |
| Order is `fraud`  | `bagistoapi::app.admin.order.actions.cancel.fraud`  | Fraud orders cannot be canceled. |
| Order has invoiced / shipped items (e.g. `processing`) | `bagistoapi::app.admin.order.actions.cancel.already-processed` | This order has already been invoiced or shipped and can no longer be canceled. You can issue a refund instead. |
| No item has any quantity left to cancel | `bagistoapi::app.admin.order.actions.cancel.nothing-to-cancel` | There is nothing to cancel on this order. |
| Admin role lacks `sales.orders.cancel` | `bagistoapi::app.admin.order.actions.cancel.no-permission` | You do not have permission to cancel orders. |
