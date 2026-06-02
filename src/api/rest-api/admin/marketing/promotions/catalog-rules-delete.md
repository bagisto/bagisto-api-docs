---
outline: false
apiType: rest
examples:
  - id: admin-marketing-catalog-rule-delete
    title: Delete Catalog Rule
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/catalog-rules/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Catalog rule deleted." }
---

# Delete Catalog Rule

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules/{id}` | DELETE |

Permission: `marketing.promotions.catalog_rules.delete`.
