---
outline: false
examples:
  - id: admin-cancel-order
    title: Cancel Order
    description: Cancel every cancellable item on an order. Returns the updated `OrderDetail`.
    query: |
      mutation CancelOrder($input: createAdminCancelOrderInput!) {
        createAdminCancelOrder(input: $input) {
          adminCancelOrder { id }
        }
      }
    variables: |
      {
        "input": { "orderId": 2392 }
      }
    response: |
      {
        "data": {
          "createAdminCancelOrder": {
            "adminCancelOrder": { "id": "/api/admin/cancel-orders/2392" }
          }
        }
      }
---

# Cancel Order

Cancels every cancellable item on an order. Mirrors the **Cancel** button on the
admin order-view screen — same eligibility gates as REST, same
`OrderRepository::cancel` call. The mutation output is the updated `OrderDetail`
shape (use the REST `GET /api/admin/orders/{id}` endpoint to refetch the full
detail payload if needed).

::: tip Prerequisites
The example targets an order with cancellable items. If your order has no items with `qty_to_cancel > 0` (already canceled / fully shipped / closed / fraud) the mutation returns an `errors[]` entry like *"There is nothing to cancel on this order."* — pick an order in `pending` or `processing` state.
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
| No item has `qty_to_cancel > 0` | `bagistoapi::app.admin.order.actions.cancel.nothing-to-cancel` | There is nothing to cancel on this order. |
| Admin role lacks `sales.orders.cancel` | `bagistoapi::app.admin.order.actions.cancel.no-permission` | You do not have permission to cancel orders. |
