---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-delete
    title: Delete Cart Rule
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/cart-rules/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Cart rule deleted." }
---

# Delete Cart Rule

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{id}` | DELETE |

Permission: `marketing.promotions.cart_rules.delete`.
