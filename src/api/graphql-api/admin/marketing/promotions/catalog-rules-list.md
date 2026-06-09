---
outline: false
examples:
  - id: gql
    title: List Catalog Rules
    query: |
      query AdminMarketingCatalogRules($first: Int) {
        adminMarketingCatalogRules(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              name
              status
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
      { "data": { "adminMarketingCatalogRules": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/marketing/catalog-rules/1", "_id": 1, "name": "Summer 10% off", "status": 1, "actionType": "by_percent", "discountAmount": 10 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Catalog Rules (GraphQL)

Query: `adminMarketingCatalogRules` (cursor pagination).

Args (plus standard `first`, `after`):

| Arg | Notes |
|-----|-------|
| `id` | Single id or comma-separated list. |
| `name` | Partial match. |
| `status` | `0`/`1`. |
| `sort_order` | Priority, exact match. |
| `starts_from_from` / `starts_from_to` | Start-date range (ISO 8601). |
| `ends_till_from` / `ends_till_to` | End-date range (ISO 8601). |
| `sort`, `order` | `id`/`name`/`sort_order`, `asc`/`desc`. |
