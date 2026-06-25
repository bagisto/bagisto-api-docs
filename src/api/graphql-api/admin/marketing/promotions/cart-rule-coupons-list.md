---
outline: false
examples:
  - id: list
    title: List Cart Rule Coupons
    description: Cursor-paginated list of every coupon belonging to one cart rule.
    query: |
      query AdminMarketingCartRuleCoupons(
        $cartRuleId: Int!
        $first: Int
      ) {
        adminMarketingCartRuleCoupons(
          cartRuleId: $cartRuleId
          first: $first
        ) {
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
              cartRuleId
              code
              usageLimit
              usagePerCustomer
              timesUsed
              type
              isPrimary
              expiredAt
              createdAt
              updatedAt
            }
          }
        }
      }
    variables: |
      {
        "cartRuleId": 47,
        "first": 10
      }
    response: |
      {
        "data": {
          "adminMarketingCartRuleCoupons": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/marketing/cart-rules/47/coupons/22",
                  "_id": 22,
                  "cartRuleId": 47,
                  "code": "QALIVE99",
                  "usageLimit": 0,
                  "usagePerCustomer": 0,
                  "timesUsed": 0,
                  "type": 0,
                  "isPrimary": true,
                  "expiredAt": "2026-12-31",
                  "createdAt": "2026-06-09T13:48:29+05:30",
                  "updatedAt": "2026-06-09T13:48:29+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Cart Rule Coupons

Lists every coupon code attached to one cart rule — the coupon table on the admin
**Marketing → Promotions → Cart Rules → Coupons** screen.

::: tip
New here? Read the [Cart Rule Coupons overview](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons/) for what a coupon does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingCartRuleCoupons` | Query | Cursor-paginated list of one cart rule's coupons |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- This is a **sub-resource** of a cart rule — `cartRuleId` is required and scopes
  the list to that rule. Coupons from other rules never appear in the result.
- An unknown `cartRuleId` returns a `404` error.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.

## Arguments

| Argument | Type | Required | Notes |
|----------|------|----------|-------|
| `cartRuleId` | Int | Yes | Parent cart-rule id; scopes the list |
| `first` | Int | No | Page size |
| `after` | String | No | Cursor (`endCursor` from the previous page) |
