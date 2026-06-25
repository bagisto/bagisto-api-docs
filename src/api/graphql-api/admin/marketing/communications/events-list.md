---
outline: false
examples:
  - id: list
    title: List Events
    description: Cursor-paginated list of every marketing event.
    query: |
      query AdminMarketingEvents($first: Int) {
        adminMarketingEvents(first: $first) {
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
              date
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
          "adminMarketingEvents": {
            "totalCount": 6,
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
                  "id": "/api/admin/marketing/events/14",
                  "_id": 14,
                  "name": "Holiday Sale Kickoff",
                  "description": "Email blast to all subscribers.",
                  "date": "2026-12-20",
                  "createdAt": "2026-05-28T10:57:24+05:30",
                  "updatedAt": "2026-05-28T10:57:24+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Events (filtered)
    description: Filter by name, sorted by date ascending.
    query: |
      query AdminMarketingEvents(
        $first: Int
        $name: String
        $sort: String
        $order: String
      ) {
        adminMarketingEvents(
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
              description
              date
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "name": "Holiday",
        "sort": "date",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingEvents": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/events/14",
                  "_id": 14,
                  "name": "Holiday Sale Kickoff",
                  "description": "Email blast to all subscribers.",
                  "date": "2026-12-20",
                  "createdAt": "2026-05-28T10:57:24+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Events

Lists every marketing event in the store — the data behind the admin
**Marketing → Communications → Events** datagrid.

::: tip
New here? Read the [Events overview](/api/graphql-api/admin/marketing/communications/events/) for what an event does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingEvents` | Query | Cursor-paginated list of all marketing events |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the full event field set — events have no detail-only
  fields.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `name` | Name — partial match |
| `date_from`, `date_to` | Event-date range (`YYYY-MM-DD`) |
| `sort`, `order` | Sort field (`id`, `name`, `date`) + `asc` / `desc` (default `id desc`) |
