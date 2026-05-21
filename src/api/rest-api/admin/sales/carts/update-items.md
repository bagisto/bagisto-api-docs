---
outline: false
apiType: rest
examples:
  - id: admin-cart-update-items
    title: Update Cart Item Quantities
    description: Bulk-update line-item quantities. `qty` is a map of cart_item_id → new quantity, mirroring the monolith admin shape.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/carts/314/items" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "qty": { "6711": 3 } }'
    variables: |
      { "qty": { "6711": 3 } }
    response: |
      {
        "id": 314,
        "itemsQty": 3,
        "grandTotal": 300,
        "items": [ /* updated rows */ ],
        "success": true,
        "message": "Cart items updated."
      }
    commonErrors:
      - error: Bad Request (400)
        cause: qty missing or not an object
        solution: Send qty as `{ "<cartItemId>": <newQty> }`
---

# Update Cart Item Quantities

Bulk-update line-item quantities on a draft cart.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}/items` | PUT |

Body: `{ "qty": { "<cartItemId>": <newQty>, ... } }`. Quantities of `0` remove
the line (delegated to `Cart::updateItems`).
