---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-mass-delete
    title: Mass Delete Cart Rules
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [3, 5] }'
    response: |
      { "deleted": [3, 5], "message": "Cart rules deleted." }
---

# Mass Delete Cart Rules

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/mass-delete` | POST |

Non-existent IDs silently skipped.

Permission: `marketing.promotions.cart_rules.delete`.
