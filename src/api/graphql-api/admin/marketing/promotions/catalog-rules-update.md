---
outline: false
examples:
  - id: update
    title: Update Catalog Rule
    description: Update a catalog rule's name and discount. Update is a partial merge — send only the fields you change.
    query: |
      mutation UpdateAdminMarketingCatalogRule(
        $input: updateAdminMarketingCatalogRuleInput!
      ) {
        updateAdminMarketingCatalogRule(input: $input) {
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
          "id": "/api/admin/marketing/catalog-rules/126",
          "name": "Summer Collection 15% Off",
          "discountAmount": 15
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingCatalogRule": {
            "adminMarketingCatalogRule": {
              "id": "/api/admin/marketing/catalog-rules/126",
              "_id": 126,
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
              "createdAt": "2026-06-17T12:13:15+05:30",
              "updatedAt": "2026-06-17T12:20:42+05:30"
            }
          }
        }
      }
---

# Update Catalog Rule

Updates an existing catalog rule — the **Edit Rule** action on the admin
**Marketing → Promotions → Catalog Rules** screen. Saving recomputes affected
product prices in the background.

::: tip
New here? Read the [Catalog Rules overview](/api/graphql-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingCatalogRule` | Mutation | Update a catalog rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.catalog_rules.edit`
  permission.
- Pass the rule's IRI as `id`. The update is a **partial merge** — send only the
  fields you want to change; omitted fields keep their existing values.
- When `channels` or `customerGroups` is supplied, that list **replaces** the
  rule's current channels / customer groups. Omit them to leave the existing sets
  untouched. They are sent as plain id arrays (e.g. `[1]`).
- The mutation returns the rule's scalar fields plus `conditions`.
- `channels` and `customerGroups` are **connections** and do **not** resolve on a
  mutation payload — query the [detail](/api/graphql-api/admin/marketing/promotions/catalog-rules-detail)
  query (`adminMarketingCatalogRule`) afterwards to read them back.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The rule's IRI |
| `name` | String | No | Rule name |
| `description` | String | No | Free-text description |
| `startsFrom` | String | No | Start date (`YYYY-MM-DD`) or `null` |
| `endsTill` | String | No | End date (`YYYY-MM-DD`) or `null`; must be `>= startsFrom` |
| `status` | Int | No | `0` inactive / `1` active |
| `sortOrder` | Int | No | Priority — lower runs first |
| `conditionType` | Int | No | `1` match all conditions / `0` match any |
| `conditions` | Array | No | Product-attribute filters |
| `endOtherRules` | Int | No | `1` stops lower-priority rules from also applying |
| `actionType` | String | No | `by_percent`, `by_fixed`, `to_percent`, `to_fixed` |
| `discountAmount` | Float | No | Discount value; capped at `100` when `actionType` is `by_percent` |
| `channels` | Array | No | Replaces the rule's channels when supplied |
| `customerGroups` | Array | No | Replaces the rule's customer groups when supplied |
