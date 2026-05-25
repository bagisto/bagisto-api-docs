---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-update
    title: Update Cart Rule
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/cart-rules/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "15% off summer", "discount_amount": 15 }'
    response: |
      { "id": 1, "name": "15% off summer", "discountAmount": 15 }
---

# Update Cart Rule

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{id}` | PUT |

Permission: `marketing.promotions.cart_rules.edit`.
