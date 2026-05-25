---
outline: false
apiType: rest
examples:
  - id: admin-cancel-order
    title: Cancel Order
    description: Cancel every cancellable item on an order. Returns the updated `OrderDetail` so the client can refresh the order-view screen without a follow-up GET.
    query: |
      curl -X POST "https://your-domain.com/api/admin/orders/2392/cancel" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 2392,
        "incrementId": "1000002392",
        "status": "canceled",
        "grandTotal": 149.99,
        "items": [
          { "id": 42, "sku": "WS-12-S", "qtyOrdered": 1, "qtyCanceled": 1 }
        ]
      }
    commonErrors:
      - error: Closed (422)
        cause: Order is already closed
        solution: Closed orders cannot be canceled — pick a different action
      - error: Fraud (422)
        cause: Order is flagged as fraud
        solution: Resolve the fraud flag before retrying
      - error: Nothing to cancel (422)
        cause: Every item has already been invoiced / shipped / canceled
        solution: No further cancellation is possible on this order
      - error: No permission (422)
        cause: Admin's role lacks `sales.orders.cancel`
        solution: Grant the role the `sales.orders.cancel` permission
      - error: Not Found (404)
        cause: Unknown order ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Cancel Order

Cancels every cancellable item on an order. Mirrors the **Cancel** button on the
admin order-view screen — same eligibility gates, same `OrderRepository::cancel`
call. The response is the full updated `OrderDetail`, so the client can refresh
the screen without a follow-up GET.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{id}/cancel` | POST |

The request body is empty — the order is identified by the URL.

## Errors

The endpoint enforces the same 4-check guard the admin panel uses via the shared
`AdminOrderActionGuard`. Each failure returns **HTTP 422** with the matching
message:

| Condition | Lang key | Message |
|-----------|----------|---------|
| Order is `closed` | `bagistoapi::app.admin.order.actions.cancel.closed` | Closed orders cannot be canceled. |
| Order is `fraud`  | `bagistoapi::app.admin.order.actions.cancel.fraud`  | Fraud orders cannot be canceled. |
| No item has `qty_to_cancel > 0` | `bagistoapi::app.admin.order.actions.cancel.nothing-to-cancel` | There is nothing to cancel on this order. |
| Admin role lacks `sales.orders.cancel` | `bagistoapi::app.admin.order.actions.cancel.no-permission` | You do not have permission to cancel orders. |

### Sample 422 response

```json
{
    "type": "/errors/422",
    "title": "Bad Request",
    "status": 422,
    "detail": "There is nothing to cancel on this order."
}
```
