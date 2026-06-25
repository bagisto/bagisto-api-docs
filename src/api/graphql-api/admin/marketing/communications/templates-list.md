---
outline: false
examples:
  - id: list
    title: List Email Templates
    description: Cursor-paginated list of every email template.
    query: |
      query AdminMarketingTemplates($first: Int) {
        adminMarketingTemplates(first: $first) {
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
              status
              content
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
          "adminMarketingTemplates": {
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
                  "id": "/api/admin/marketing/templates/21",
                  "_id": 21,
                  "name": "Welcome Email",
                  "status": "active",
                  "content": "<p>Welcome to our store!</p>",
                  "createdAt": "2026-05-28T10:57:33+05:30",
                  "updatedAt": "2026-05-28T10:57:33+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Email Templates (filtered)
    description: Filter by status and name, sorted by name.
    query: |
      query AdminMarketingTemplates(
        $first: Int
        $status: String
        $name: String
        $sort: String
        $order: String
      ) {
        adminMarketingTemplates(
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
              content
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "status": "active",
        "name": "Welcome",
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingTemplates": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/templates/21",
                  "_id": 21,
                  "name": "Welcome Email",
                  "status": "active",
                  "content": "<p>Welcome to our store!</p>",
                  "createdAt": "2026-05-28T10:57:33+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Email Templates

Lists every email template in the store — the data behind the admin
**Marketing → Communications → Email Templates** datagrid.

::: tip
New here? Read the [Email Templates overview](/api/graphql-api/admin/marketing/communications/templates/) for what an email template does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingTemplates` | Query | Cursor-paginated list of all email templates |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the full template field set, including the raw HTML
  `content`.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `name` | Name — partial match |
| `status` | `active` / `inactive` / `draft` |
| `sort`, `order` | Sort field (`id`, `name`) + `asc` / `desc` (default `id desc`) |
