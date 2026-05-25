---
outline: false
apiType: rest
examples:
  - id: admin-marketing-catalog-rule-update
    title: Update Catalog Rule
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/catalog-rules/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Summer 15% off", "discount_amount": 15, "channels": [1], "customer_groups": [1] }'
    response: |
      { "id": 1, "name": "Summer 15% off", "discountAmount": 15 }
---

# Update Catalog Rule

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules/{id}` | PUT |

Re-syncs `channels` + `customer_groups` pivots to the supplied lists.

Permission: `marketing.promotions.catalog_rules.edit`.
