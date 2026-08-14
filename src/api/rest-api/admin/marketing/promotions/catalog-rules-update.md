---
outline: false
apiType: rest
examples:
  - id: update
    title: Update Catalog Rule
    description: Update a catalog rule's name and discount. Update is a partial merge — send only the fields you change.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/catalog-rules/126" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Summer Collection 15% Off",
          "discount_amount": 15
        }'
    variables: |
      {}
    response: |
      {
        "id": 126,
        "name": "Summer Collection 15% Off",
        "description": "Sitewide 10% off the summer collection",
        "startsFrom": null,
        "endsTill": null,
        "status": 1,
        "sortOrder": 0,
        "conditionType": 1,
        "conditions": [],
        "endOtherRules": 0,
        "actionType": "by_percent",
        "discountAmount": 15,
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
        "updatedAt": "2026-06-17T12:20:42+05:30"
      }
---

# Update Catalog Rule

Updates an existing catalog rule — the **Edit Rule** action on the admin
**Marketing → Promotions → Catalog Rules** screen. Saving recomputes affected
product prices in the background.

New here? Read the [Catalog Rules overview](/api/rest-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules/{id}` | PUT |

## Details

- Requires an admin Bearer token and the `marketing.promotions.catalog_rules.edit`
  permission.
- The update is a **partial merge** — send only the fields you want to change;
  omitted fields keep their existing values.
- When `channels` or `customer_groups` is supplied, that list **replaces** the
  rule's current channels / customer groups. Omit them to leave the existing sets
  untouched. They are sent as plain id arrays.
- Returns the full updated rule payload. In the response, `channels` and
  `customerGroups` are **arrays of objects** (each `{ id, code, name }`).

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | no | Rule name |
| `description` | string | no | Free-text description |
| `starts_from` | string | no | Start date (`YYYY-MM-DD`) or `null` |
| `ends_till` | string | no | End date (`YYYY-MM-DD`) or `null`; must be `>= starts_from` |
| `status` | int | no | `0` inactive / `1` active |
| `sort_order` | int | no | Priority — lower runs first |
| `condition_type` | int | no | `1` match all conditions / `0` match any |
| `conditions` | array | no | Product-attribute filters |
| `end_other_rules` | int | no | `1` stops lower-priority rules from also applying |
| `action_type` | string | no | `by_percent`, `by_fixed`, `to_percent`, `to_fixed` |
| `discount_amount` | number | no | Discount value; capped at `100` when `action_type` is `by_percent` |
| `channels` | int[] | no | Replaces the rule's channels when supplied |
| `customer_groups` | int[] | no | Replaces the rule's customer groups when supplied |
