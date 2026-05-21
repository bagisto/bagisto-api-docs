---
outline: false
apiType: rest
examples:
  - id: admin-cart-remove-item
    title: Remove a Cart Item
    description: Remove a single line item from the draft cart. Body carries the cartItemId.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/carts/314/items" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "cartItemId": 6711 }'
    variables: |
      { "cartItemId": 6711 }
    response: |
      {
        "id": 314,
        "itemsCount": 0,
        "items": [],
        "success": true,
        "message": "Item removed from cart."
      }
    commonErrors:
      - error: Bad Request (400)
        cause: cartItemId missing
        solution: Send `{ cartItemId }` in the request body
---

# Remove a Cart Item

Removes a single line item from the draft cart. The endpoint returns the
**full updated cart** (HTTP 200), not 204 — the client can reuse it without a
follow-up GET.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}/items` | DELETE |
