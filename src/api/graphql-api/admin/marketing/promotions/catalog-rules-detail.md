---
outline: false
examples:
  - id: detail
    title: Catalog Rule Detail
    description: Full payload for a single catalog rule, including conditions, channels, and customer groups.
    query: |
      query AdminMarketingCatalogRule($id: ID!) {
        adminMarketingCatalogRule(id: $id) {
          id
          _id
          name
          description
          startsFrom
          endsTill
          status
          sortOrder
          conditionType
          conditions
          endOtherRules
          actionType
          discountAmount
          channels {
            edges {
              node {
                id
                _id
                code
                name
              }
            }
          }
          customerGroups {
            edges {
              node {
                id
                _id
                code
                name
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/marketing/catalog-rules/126"
      }
    response: |
      {
        "data": {
          "adminMarketingCatalogRule": {
            "id": "/api/admin/marketing/catalog-rules/126",
            "_id": 126,
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
            "channels": {
              "edges": [
                {
                  "node": {
                    "id": "/api/admin_marketing_catalog_rule_channel_refs/1",
                    "_id": 1,
                    "code": "default",
                    "name": "Default"
                  }
                }
              ]
            },
            "customerGroups": {
              "edges": [
                {
                  "node": {
                    "id": "/api/admin_marketing_catalog_rule_customer_group_refs/2",
                    "_id": 2,
                    "code": "general",
                    "name": "General"
                  }
                }
              ]
            },
            "createdAt": "2026-06-17T12:13:15+05:30",
            "updatedAt": "2026-06-17T12:13:15+05:30"
          }
        }
      }
---

# Catalog Rule Detail

Returns a single catalog rule with its full field set — the data behind the admin
**Marketing → Promotions → Catalog Rules** view screen.

::: tip
New here? Read the [Catalog Rules overview](/api/graphql-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingCatalogRule` | Query | Fetch one catalog rule by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the rule's IRI (e.g. `/api/admin/marketing/catalog-rules/126`) as the `id`
  argument; `_id` in the response is the numeric id.
- Unlike list rows, the detail query resolves `conditions`, `channels`, and
  `customerGroups` — the per-rule targeting and price-filter data.
- `channels` and `customerGroups` are **connections** — sub-select
  `{ edges { node { id _id code name } } }`. Each node is the channel /
  customer-group it targets.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The rule's IRI |
| `_id` | Int | Numeric id |
| `name` | String | Rule name |
| `description` | String | Free-text description |
| `startsFrom` | String | Start date (`YYYY-MM-DD`) or `null` |
| `endsTill` | String | End date (`YYYY-MM-DD`) or `null` |
| `status` | Int | `0` inactive / `1` active |
| `sortOrder` | Int | Priority — lower runs first |
| `conditionType` | Int | `1` match all conditions / `0` match any |
| `conditions` | Array | Product-attribute filters |
| `endOtherRules` | Int | `1` stops lower-priority rules from also applying |
| `actionType` | String | `by_percent`, `by_fixed`, `to_percent`, `to_fixed` |
| `discountAmount` | Float | Discount value (capped at 100 for `by_percent`) |
| `channels` | Connection | Channels the rule applies to — `edges { node { id _id code name } }` |
| `customerGroups` | Connection | Customer groups the rule applies to — `edges { node { id _id code name } }` |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
