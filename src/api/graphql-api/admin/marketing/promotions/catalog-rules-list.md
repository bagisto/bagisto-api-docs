---
outline: false
examples:
  - id: list
    title: List Catalog Rules
    description: Cursor-paginated list of every catalog rule.
    query: |
      query AdminMarketingCatalogRules($first: Int) {
        adminMarketingCatalogRules(first: $first) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              _id
              name
              description
              startsFrom
              endsTill
              status
              sortOrder
              conditionType
              endOtherRules
              actionType
              discountAmount
              createdAt
              updatedAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminMarketingCatalogRules": {
            "totalCount": 38,
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "OQ=="
            },
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/marketing/catalog-rules/126",
                  "_id": 126,
                  "name": "Summer Collection 10% Off",
                  "description": "Sitewide 10% off the summer collection",
                  "startsFrom": null,
                  "endsTill": null,
                  "status": 1,
                  "sortOrder": 0,
                  "conditionType": 1,
                  "endOtherRules": 0,
                  "actionType": "by_percent",
                  "discountAmount": 10,
                  "createdAt": "2026-06-17T12:13:15+05:30",
                  "updatedAt": "2026-06-17T12:13:15+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Catalog Rules (filtered)
    description: Filter by status and name, sorted by priority.
    query: |
      query AdminMarketingCatalogRules(
        $first: Int
        $status: Int
        $name: String
        $sort: String
        $order: String
      ) {
        adminMarketingCatalogRules(
          first: $first
          status: $status
          name: $name
          sort: $sort
          order: $order
        ) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              _id
              name
              status
              sortOrder
              actionType
              discountAmount
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "status": 1,
        "name": "Summer",
        "sort": "sort_order",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingCatalogRules": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/catalog-rules/126",
                  "_id": 126,
                  "name": "Summer Collection 10% Off",
                  "status": 1,
                  "sortOrder": 0,
                  "actionType": "by_percent",
                  "discountAmount": 10,
                  "createdAt": "2026-06-17T12:13:15+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Catalog Rules

Lists every catalog rule in the store — the data behind the admin **Marketing →
Promotions → Catalog Rules** datagrid.

::: tip
New here? Read the [Catalog Rules overview](/api/graphql-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingCatalogRules` | Query | Cursor-paginated list of all catalog rules |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the flat rule fields shown in the example. The heavier
  `conditions`, `channels`, and `customerGroups` resolve **only** on the
  [detail](/api/graphql-api/admin/marketing/promotions/catalog-rules-detail)
  query — they are `null` on list rows.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `id` | Single id or comma-separated list (e.g. `1,4,9`) |
| `name` | Name — partial match |
| `status` | `0` (inactive) / `1` (active) |
| `sort_order` | Priority — exact match |
| `starts_from_from`, `starts_from_to` | Start-date range (ISO 8601) |
| `ends_till_from`, `ends_till_to` | End-date range (ISO 8601) |
| `sort`, `order` | Sort field (`id`, `name`, `sort_order`) + `asc` / `desc` (default `id desc`) |
