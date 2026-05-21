---
outline: false
apiType: rest
examples:
  - id: admin-reorder
    title: Reorder
    description: Build a fresh admin draft cart from a previous order's items. Returns the new cart ID — the admin can then finalise the order in /admin/sales/orders/create.
    query: |
      curl -X POST "https://your-domain.com/api/admin/orders/2392/reorder" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "success": true,
        "message": "Reorder successful. A new draft cart has been created.",
        "cartId": 314
      }
    commonErrors:
      - error: Guest order (422)
        cause: The target order was placed as a guest (`is_guest = 1`)
        solution: Reorder is only supported for customer orders
      - error: Items not saleable (422)
        cause: One or more of the order's products are no longer purchasable (disabled / out of stock / deleted)
        solution: Restore product availability, or remove the item from the original order before reordering
      - error: No permission (422)
        cause: The authenticated admin's role does not include `sales.orders.create`
        solution: Grant the role the `sales.orders.create` permission (or assign a role that has it)
      - error: Disabled in settings (422)
        cause: `Configure → Sales → Order Settings → Reorder → Admin Reorder` is OFF
        solution: Re-enable Admin Reorder in the store settings
      - error: Not Found (404)
        cause: Unknown order ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via /api/admin/login and send the returned token
---

# Reorder

Build a fresh admin draft cart from a previous order's items, ready for the
admin to finalise on the customer's behalf — the same flow as the **Reorder**
button on the admin order-view screen.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{id}/reorder` | POST |

## What it does

Mirrors the monolith admin Reorder action:

1. `Cart::createCart` for the order's customer with `is_active = false` (a
   draft admin cart, separate from the customer's active cart).
2. For each item in the order: `Cart::addProduct($item->product, $item->additional)`.
   Per-item failures are swallowed (best-effort) — the same behaviour the admin
   panel has.
3. Returns the new cart ID. The client can then redirect to the admin's order
   create screen with that cart.

## When it refuses

The endpoint enforces the same 3-check guard the admin panel uses. Each failure
returns **HTTP 422** with the error message in the `detail` field — different
message per failure mode so the client can act on it.

| HTTP | Condition | Message |
|------|-----------|---------|
| 422  | Order was placed as guest (`is_guest = 1`) | `Reorder is not supported for guest orders.` |
| 422  | At least one item's product is no longer purchasable | `One or more items in this order are no longer available for purchase.` |
| 422  | Admin's role lacks `sales.orders.create` | `You do not have permission to create orders.` |
| 422  | `sales.order_settings.reorder.admin` config is off | `Reorder by admin is disabled in store settings.` |

### Sample 422 response

```json
{
    "type": "/errors/422",
    "title": "Bad Request",
    "status": 422,
    "detail": "Reorder is not supported for guest orders."
}
```

There is no request body — the order is identified by the URL.
