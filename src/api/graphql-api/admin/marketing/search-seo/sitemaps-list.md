---
outline: false
examples:
  - id: list
    title: List Sitemaps
    description: Cursor-paginated list of every sitemap definition.
    query: |
      query AdminMarketingSitemaps($first: Int) {
        adminMarketingSitemaps(first: $first) {
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
              fileName
              path
              generatedAt
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
          "adminMarketingSitemaps": {
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
                  "id": "/api/admin/marketing/sitemaps/1",
                  "_id": 1,
                  "fileName": "sitemap.xml",
                  "path": "/",
                  "generatedAt": null,
                  "createdAt": "2026-06-20T10:00:00+05:30",
                  "updatedAt": "2026-06-20T10:00:00+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Sitemaps (filtered)
    description: Filter by file name, sorted ascending.
    query: |
      query AdminMarketingSitemaps(
        $first: Int
        $fileName: String
        $sort: String
        $order: String
      ) {
        adminMarketingSitemaps(
          first: $first
          fileName: $fileName
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
              fileName
              path
              generatedAt
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "fileName": "sitemap",
        "sort": "file_name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingSitemaps": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/sitemaps/1",
                  "_id": 1,
                  "fileName": "sitemap.xml",
                  "path": "/",
                  "generatedAt": null,
                  "createdAt": "2026-06-20T10:00:00+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Sitemaps

Lists every sitemap definition in the store — the data behind the admin
**Marketing → Search & SEO → Sitemaps** datagrid.

New here? Read the [Sitemaps overview](/api/graphql-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingSitemaps` | Query | Cursor-paginated list of all sitemaps |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the flat sitemap fields shown in the example. The
  `indexFile` and `generatedSitemaps` paths resolve **only** on the
  [detail](/api/graphql-api/admin/marketing/search-seo/sitemaps-detail) query —
  they are omitted from list rows.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `fileName` | File name — partial match |
| `sort`, `order` | Sort field (`id`, `file_name`) + `asc` / `desc` (default `id desc`) |
