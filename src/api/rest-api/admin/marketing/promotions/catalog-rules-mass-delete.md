---
outline: false
apiType: rest
examples:
  - id: admin-marketing-catalog-rule-mass-delete
    title: Mass Delete Catalog Rules
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/catalog-rules/mass-delete" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 18] }'
    response: |
      { "deleted": [12, 18], "message": "Catalog rules deleted." }
---

# Mass Delete Catalog Rules

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules/mass-delete` | POST |

Non-existent IDs are silently skipped. Empty `indices` → 422.

Permission: `marketing.promotions.catalog_rules.delete`.
