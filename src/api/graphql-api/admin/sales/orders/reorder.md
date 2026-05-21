---
outline: false
examples:
  - id: admin-reorder
    title: Reorder
    description: Build a fresh admin draft cart from a previous order's items. Returns the new cart ID.
    query: |
      mutation createAdminReorder($input: createAdminReorderInput!) {
        createAdminReorder(input: $input) {
          adminReorder {
            success
            message
            cartId
          }
        }
      }
    variables: |
      {
          "input": { "orderId": "/api/admin/orders/2392" }
      }
    response: |
      {
        "data": {
          "createAdminReorder": {
            "adminReorder": {
              "success": true,
              "message": "Reorder successful. A new draft cart has been created.",
              "cartId": 314
            }
          }
        }
      }
---

# Reorder

Build a fresh admin draft cart from a previous order's items — the same flow as
the **Reorder** button on the admin order-view screen.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminReorder` | Mutation | Create a draft cart from a past order |

## Input

| Field | Type | Notes |
|-------|------|-------|
| `orderId` | `ID!` | The order's resource IRI — `"/api/admin/orders/{id}"`. |

> **Why `orderId`, not `id`?** API Platform GraphQL reserves `id` as the
> resource IRI, so a mutation input field named `id` collides. We use
> `orderId` for the order reference.

## Behaviour

Mirrors the monolith admin Reorder action:

1. `Cart::createCart` for the order's customer with `is_active = false`
   (a draft admin cart, not the customer's active one).
2. Re-adds every item via `Cart::addProduct($item->product, $item->additional)`.
   Per-item failures are swallowed.
3. Returns `success`, `message`, and the new `cartId`.

## Errors

The mutation enforces the same 3-check guard as the admin panel. Each failure
returns the `errors[]` array (the `data.createAdminReorder` payload is `null`)
with a distinct message per failure mode:

| Condition | `errors[0].message` |
|-----------|---------------------|
| Order was placed as guest (`is_guest = 1`) | `Reorder is not supported for guest orders.` |
| At least one item's product is no longer purchasable | `One or more items in this order are no longer available for purchase.` |
| Admin's role lacks `sales.orders.create` | `You do not have permission to create orders.` |
| `sales.order_settings.reorder.admin` config is off | `Reorder by admin is disabled in store settings.` |

### Sample error response

```json
{
  "errors": [
    {
      "message": "Reorder is not supported for guest orders.",
      "extensions": { "category": "invalid_input" }
    }
  ],
  "data": { "createAdminReorder": null }
}
```
