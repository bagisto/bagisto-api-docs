---
outline: false
examples:
  - id: list
    title: List Search Synonyms
    description: Cursor-paginated list of every search synonym group.
    query: |
      query AdminMarketingSearchSynonyms($first: Int) {
        adminMarketingSearchSynonyms(first: $first) {
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
              terms
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
          "adminMarketingSearchSynonyms": {
            "totalCount": 4,
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "Mw=="
            },
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/marketing/search-synonyms/19",
                  "_id": 19,
                  "name": "shirt-group",
                  "terms": "shirt,tshirt,tee",
                  "createdAt": "2026-05-28T10:57:59+05:30",
                  "updatedAt": "2026-05-28T10:57:59+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Search Synonyms (filtered)
    description: Filter by name, sorted alphabetically.
    query: |
      query AdminMarketingSearchSynonyms(
        $first: Int
        $name: String
        $sort: String
        $order: String
      ) {
        adminMarketingSearchSynonyms(
          first: $first
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
              terms
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "name": "shirt",
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingSearchSynonyms": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/search-synonyms/19",
                  "_id": 19,
                  "name": "shirt-group",
                  "terms": "shirt,tshirt,tee",
                  "createdAt": "2026-05-28T10:57:59+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Search Synonyms

Lists every search synonym group in the store — the data behind the admin
**Marketing → Search & SEO → Search Synonyms** datagrid.

::: tip
New here? Read the [Search Synonyms overview](/api/graphql-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingSearchSynonyms` | Query | Cursor-paginated list of all search synonym groups |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the full synonym fields shown in the example — there are no
  detail-only fields, so list rows and the detail query return the same shape.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `name` | Name — partial match |
| `terms` | Terms — partial match |
| `sort`, `order` | Sort field (`id`, `name`) + `asc` / `desc` (default `id desc`) |
