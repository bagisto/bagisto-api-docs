---
outline: false
examples:
  - id: list
    title: List Cart Rules
    description: Cursor-paginated list of every cart rule.
    query: |
      query AdminMarketingCartRules($first: Int) {
        adminMarketingCartRules(first: $first) {
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
              couponType
              useAutoGeneration
              usagePerCustomer
              usesPerCoupon
              timesUsed
              conditionType
              actionType
              discountAmount
              discountQuantity
              discountStep
              applyToShipping
              freeShipping
              endOtherRules
              usesAttributeConditions
              sortOrder
              couponCode
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
          "adminMarketingCartRules": {
            "totalCount": 24,
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
                  "id": "/api/admin/marketing/cart-rules/47",
                  "_id": 47,
                  "name": "QA Coupon Rule",
                  "description": "qa",
                  "startsFrom": "2026-06-01T00:00:00+05:30",
                  "endsTill": "2026-12-31T00:00:00+05:30",
                  "status": 0,
                  "couponType": 1,
                  "useAutoGeneration": 0,
                  "usagePerCustomer": 0,
                  "usesPerCoupon": 0,
                  "timesUsed": 0,
                  "conditionType": 1,
                  "actionType": "by_percent",
                  "discountAmount": 10,
                  "discountQuantity": 1,
                  "discountStep": "1",
                  "applyToShipping": 0,
                  "freeShipping": 0,
                  "endOtherRules": 0,
                  "usesAttributeConditions": 0,
                  "sortOrder": 0,
                  "couponCode": "QALIVE99",
                  "createdAt": "2026-06-09T13:48:29+05:30",
                  "updatedAt": "2026-06-09T13:48:29+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Cart Rules (filtered)
    description: Filter by status and name, sorted by priority.
    query: |
      query AdminMarketingCartRules(
        $first: Int
        $status: Int
        $name: String
        $sort: String
        $order: String
      ) {
        adminMarketingCartRules(
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
              couponType
              actionType
              discountAmount
              sortOrder
              couponCode
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "status": 0,
        "name": "QA",
        "sort": "sort_order",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingCartRules": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/cart-rules/47",
                  "_id": 47,
                  "name": "QA Coupon Rule",
                  "status": 0,
                  "couponType": 1,
                  "actionType": "by_percent",
                  "discountAmount": 10,
                  "sortOrder": 0,
                  "couponCode": "QALIVE99",
                  "createdAt": "2026-06-09T13:48:29+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Cart Rules

Lists every cart rule in the store — the data behind the admin **Marketing →
Promotions → Cart Rules** datagrid.

::: tip
New here? Read the [Cart Rules overview](/api/graphql-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingCartRules` | Query | Cursor-paginated list of all cart rules |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the flat rule fields shown in the example, including
  `couponCode` (the rule's primary coupon code). The heavier `conditions`,
  `channels`, and `customerGroups` resolve **only** on the
  [detail](/api/graphql-api/admin/marketing/promotions/cart-rules-detail)
  query — they are `null` on list rows.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters, combined with logical AND):

| Argument | Description |
|----------|-------------|
| `id` | Single id or comma-separated list (e.g. `1,4,9`) |
| `name` | Name — partial match |
| `coupon_code` | Primary coupon code — partial match |
| `status` | `0` (inactive) / `1` (active) |
| `coupon_type` | `0` (no coupon) / `1` (specific coupon) |
| `sort_order` | Priority — exact match |
| `starts_from_from`, `starts_from_to` | Start-date range (ISO 8601) |
| `ends_till_from`, `ends_till_to` | End-date range (ISO 8601) |
| `sort`, `order` | Sort field (`id`, `name`, `sort_order`) + `asc` / `desc` (default `id desc`) |
