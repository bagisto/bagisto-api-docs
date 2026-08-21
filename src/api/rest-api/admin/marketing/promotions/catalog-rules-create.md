---
outline: false
apiType: rest
examples:
  - id: create
    title: Create Catalog Rule
    description: Create a catalog rule that reduces price by a percentage for a channel and customer group.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/catalog-rules" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Summer Collection 10% Off",
          "description": "Sitewide 10% off the summer collection",
          "starts_from": null,
          "ends_till": null,
          "status": 1,
          "sort_order": 0,
          "condition_type": 1,
          "conditions": [],
          "end_other_rules": 0,
          "action_type": "by_percent",
          "discount_amount": 10,
          "channels": [1],
          "customer_groups": [2]
        }'
    variables: |
      {}
    response: |
      {
        "id": 126,
        "name": "Summer Collection 10% Off",
        "description": "Sitewide 10% off the summer collection",
        "startsFrom": null,
        "endsTill": null,
        "status": 1,
        "sortOrder": 0,
        "conditionType": 1,
        "conditions": [],
        "endOtherRules": 0,
        "actionType": "by_percent",
        "discountAmount": 10,
        "channels": [
          {
            "id": 1,
            "code": "default",
            "name": "Default"
          }
        ],
        "customerGroups": [
          {
            "id": 2,
            "code": "general",
            "name": "General"
          }
        ],
        "createdAt": "2026-06-17T12:13:15+05:30",
        "updatedAt": "2026-06-17T12:13:15+05:30"
      }
---

# Create Catalog Rule

Creates a catalog rule — the **Create Rule** action on the admin **Marketing →
Promotions → Catalog Rules** screen. Saving recomputes affected product prices in
the background, so a new rule may take a moment to show on the storefront.

New here? Read the [Catalog Rules overview](/api/rest-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules` | POST |

## Details

- Requires an admin Bearer token and the `marketing.promotions.catalog_rules.create`
  permission.
- Returns the full rule payload, including the resolved `conditions`, `channels`,
  and `customerGroups`.
- In the response, `channels` and `customerGroups` are **arrays of objects**
  (each `{ id, code, name }`) — even though the request sends them as plain id
  arrays.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Rule name |
| `description` | string | no | Free-text description |
| `starts_from` | string | no | Start date (`YYYY-MM-DD`) or `null` |
| `ends_till` | string | no | End date (`YYYY-MM-DD`) or `null`; must be `>= starts_from` |
| `status` | int | no | `0` inactive / `1` active |
| `sort_order` | int | no | Priority — lower runs first |
| `condition_type` | int | no | `1` match all conditions / `0` match any |
| `conditions` | array | no | Product-attribute filters |
| `end_other_rules` | int | no | `1` stops lower-priority rules from also applying |
| `action_type` | string | yes | `by_percent`, `by_fixed`, `to_percent`, `to_fixed` |
| `discount_amount` | number | yes | Discount value; capped at `100` when `action_type` is `by_percent` |
| `channels` | int[] | yes | Non-empty list of channel ids |
| `customer_groups` | int[] | yes | Non-empty list of customer-group ids |
