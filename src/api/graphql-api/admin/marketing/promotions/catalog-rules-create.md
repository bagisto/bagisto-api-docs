---
outline: false
examples:
  - id: create
    title: Create Catalog Rule
    description: Create a catalog rule that reduces price by a percentage for a channel and customer group.
    query: |
      mutation CreateAdminMarketingCatalogRule(
        $input: createAdminMarketingCatalogRuleInput!
      ) {
        createAdminMarketingCatalogRule(input: $input) {
          adminMarketingCatalogRule {
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
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
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
          "channels": [1],
          "customerGroups": [2]
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingCatalogRule": {
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
              "createdAt": "2026-06-17T12:13:15+05:30",
              "updatedAt": "2026-06-17T12:13:15+05:30"
            }
          }
        }
      }
---

# Create Catalog Rule

Creates a catalog rule — the **Create Rule** action on the admin
**Marketing → Promotions → Catalog Rules** screen. Saving recomputes affected
product prices in the background, so a new rule may take a moment to show on the
storefront.

::: tip
New here? Read the [Catalog Rules overview](/api/graphql-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCatalogRule` | Mutation | Create a catalog rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.catalog_rules.create`
  permission.
- The mutation returns the rule's scalar fields plus `conditions`.
- `channels` and `customerGroups` are **connections** and do **not** resolve on a
  mutation payload — query the [detail](/api/graphql-api/admin/marketing/promotions/catalog-rules-detail)
  query (`adminMarketingCatalogRule`) afterwards to read them back.
- The request still sends `channels` / `customerGroups` as plain id arrays
  (e.g. `[1]`); only the returned shape differs.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | Rule name |
| `description` | String | No | Free-text description |
| `startsFrom` | String | No | Start date (`YYYY-MM-DD`) or `null` |
| `endsTill` | String | No | End date (`YYYY-MM-DD`) or `null`; must be `>= startsFrom` |
| `status` | Int | No | `0` inactive / `1` active |
| `sortOrder` | Int | No | Priority — lower runs first |
| `conditionType` | Int | No | `1` match all conditions / `0` match any |
| `conditions` | Array | No | Product-attribute filters |
| `endOtherRules` | Int | No | `1` stops lower-priority rules from also applying |
| `actionType` | String | Yes | `by_percent`, `by_fixed`, `to_percent`, `to_fixed` |
| `discountAmount` | Float | Yes | Discount value; capped at `100` when `actionType` is `by_percent` |
| `channels` | Array | Yes | Non-empty list of channel ids |
| `customerGroups` | Array | Yes | Non-empty list of customer-group ids |
