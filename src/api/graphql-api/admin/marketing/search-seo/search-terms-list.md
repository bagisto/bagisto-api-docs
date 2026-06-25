---
outline: false
examples:
  - id: list
    title: List Search Terms
    description: Cursor-paginated list of every recorded search term.
    query: |
      query AdminMarketingSearchTerms($first: Int) {
        adminMarketingSearchTerms(first: $first) {
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
              term
              results
              uses
              redirectUrl
              locale
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
          "adminMarketingSearchTerms": {
            "totalCount": 42,
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
                  "id": "/api/admin/marketing/search-terms/106",
                  "_id": 106,
                  "term": "Coastal Breeze QA",
                  "results": 1,
                  "uses": 3,
                  "redirectUrl": "https://example.com/qa",
                  "locale": "en",
                  "createdAt": "2026-06-03T13:14:05+05:30",
                  "updatedAt": "2026-06-17T12:14:07+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Search Terms (filtered)
    description: Filter by term and channel, sorted by popularity (most-searched first).
    query: |
      query AdminMarketingSearchTerms(
        $first: Int
        $term: String
        $channelId: Int
        $locale: String
        $sort: String
        $order: String
      ) {
        adminMarketingSearchTerms(
          first: $first
          term: $term
          channelId: $channelId
          locale: $locale
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
              term
              results
              uses
              redirectUrl
              locale
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "term": "Coastal",
        "channelId": 1,
        "locale": "en",
        "sort": "uses",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "adminMarketingSearchTerms": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/search-terms/106",
                  "_id": 106,
                  "term": "Coastal Breeze QA",
                  "results": 1,
                  "uses": 3,
                  "redirectUrl": "https://example.com/qa",
                  "locale": "en",
                  "createdAt": "2026-06-03T13:14:05+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Search Terms

Lists every search term shoppers have entered on the storefront — the data behind
the admin **Marketing → Search & SEO → Search Terms** datagrid.

::: tip
New here? Read the [Search Terms overview](/api/graphql-api/admin/marketing/search-seo/search-terms/) for what a search term records and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingSearchTerms` | Query | Cursor-paginated list of all search terms |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the flat field set shown in the example. `results` and
  `uses` are recorded automatically by storefront search and are read-only.
- The `channel` object is **detail-only** — it resolves on the
  [detail](/api/graphql-api/admin/marketing/search-seo/search-terms-detail) query
  and is `null` on list rows.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `term` | Search phrase — partial match |
| `channelId` | Channel id — exact match |
| `locale` | Locale code (e.g. `en`) — exact match |
| `sort`, `order` | Sort field (`id`, `term`, `uses`, `results`) + `asc` / `desc` (default `id desc`). Sort by `uses desc` for the most-searched terms. |
