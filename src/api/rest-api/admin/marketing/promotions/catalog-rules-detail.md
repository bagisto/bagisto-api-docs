---
outline: false
apiType: rest
examples:
  - id: admin-marketing-catalog-rule-detail
    title: Catalog Rule Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/catalog-rules/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "Summer 10% off", "description": "Sitewide 10% off summer collection", "startsFrom": "2026-06-01", "endsTill": "2026-08-31", "status": 1, "sortOrder": 0, "conditionType": 1, "conditions": [], "endOtherRules": 0, "actionType": "by_percent", "discountAmount": 10, "channels": [1], "customerGroups": [1, 2] }
---

# Catalog Rule Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules/{id}` | GET |
