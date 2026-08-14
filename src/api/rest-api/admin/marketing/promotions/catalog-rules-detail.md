---
outline: false
apiType: rest
examples:
  - id: detail
    title: Catalog Rule Detail
    description: Full payload for a single catalog rule, including conditions, channels, and customer groups.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/catalog-rules/126" \
        -H "Authorization: Bearer <token>"
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

# Catalog Rule Detail

Returns a single catalog rule with its full field set — the data behind the admin
**Marketing → Promotions → Catalog Rules** view screen.

New here? Read the [Catalog Rules overview](/api/rest-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Unlike list rows, the detail endpoint returns `conditions`, `channels`, and
  `customerGroups` — the per-rule targeting and price-filter data.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `name` | string | Rule name |
| `description` | string | Free-text description |
| `startsFrom` | string | Start date (`YYYY-MM-DD`) or `null` |
| `endsTill` | string | End date (`YYYY-MM-DD`) or `null` |
| `status` | int | `0` inactive / `1` active |
| `sortOrder` | int | Priority — lower runs first |
| `conditionType` | int | `1` match all conditions / `0` match any |
| `conditions` | array | Product-attribute filters |
| `endOtherRules` | int | `1` stops lower-priority rules from also applying |
| `actionType` | string | `by_percent`, `by_fixed`, `to_percent`, `to_fixed` |
| `discountAmount` | number | Discount value (capped at 100 for `by_percent`) |
| `channels` | object[] | Channels the rule applies to — each `{ id, code, name }` |
| `customerGroups` | object[] | Customer groups the rule applies to — each `{ id, code, name }` |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
