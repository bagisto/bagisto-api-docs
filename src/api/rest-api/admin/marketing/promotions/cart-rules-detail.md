---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-detail
    title: Cart Rule Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/cart-rules/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "10% off summer", "status": 1, "couponType": 1, "actionType": "by_percent", "discountAmount": 10, "channels": [1], "customerGroups": [1, 2, 3], "conditions": [] }
---

# Cart Rule Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{id}` | GET |
