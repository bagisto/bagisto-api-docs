---
outline: false
examples:
  - id: gql
    title: List Cart Rules
    query: |
      query AdminMarketingCartRules($first: Int) {
        adminMarketingCartRules(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              name
              status
              couponType
              couponCode
              actionType
              discountAmount
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingCartRules": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/marketing/cart-rules/1", "_id": 1, "name": "10% off summer", "status": 1, "couponType": 1, "couponCode": "SUMMER10", "actionType": "by_percent", "discountAmount": 10 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Cart Rules (GraphQL)

Query: `adminMarketingCartRules` (cursor pagination).

Each row carries `couponCode` — the rule's primary coupon code (`null` when the rule has no coupon).

Args (plus standard `first`, `after`):

| Arg | Notes |
|-----|-------|
| `id` | Single id or comma-separated list. |
| `name` | Partial match. |
| `status` | `0`/`1`. |
| `coupon_type` | `1`/`2`. |
| `coupon_code` | Partial match on the primary coupon code. |
| `sort_order` | Priority, exact match. |
| `starts_from_from` / `starts_from_to` | Start-date range (ISO 8601). |
| `ends_till_from` / `ends_till_to` | End-date range (ISO 8601). |
| `sort`, `order` | `id`/`name`/`sort_order`, `asc`/`desc`. |
