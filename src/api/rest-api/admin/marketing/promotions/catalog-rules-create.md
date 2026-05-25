---
outline: false
apiType: rest
examples:
  - id: admin-marketing-catalog-rule-create
    title: Create Catalog Rule
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/catalog-rules" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Summer 10% off", "description": "Sitewide 10% off summer collection", "starts_from": "2026-06-01", "ends_till": "2026-08-31", "status": 1, "sort_order": 0, "condition_type": 1, "conditions": [], "end_other_rules": 0, "action_type": "by_percent", "discount_amount": 10, "channels": [1], "customer_groups": [1, 2] }'
    response: |
      { "id": 1, "name": "Summer 10% off", "actionType": "by_percent", "discountAmount": 10, "channels": [1], "customerGroups": [1, 2] }
---

# Create Catalog Rule

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | |
| `description` | string | no | |
| `starts_from` | string | no | YYYY-MM-DD. |
| `ends_till` | string | no | |
| `status` | int | no | 0/1. |
| `sort_order` | int | no | |
| `condition_type` | int | no | |
| `conditions` | array | no | |
| `end_other_rules` | int | no | |
| `action_type` | string | yes | `by_percent`, `by_fixed`, etc. |
| `discount_amount` | number | yes | |
| `channels` | int[] | yes | |
| `customer_groups` | int[] | yes | |

Permission: `marketing.promotions.catalog_rules.create`.
