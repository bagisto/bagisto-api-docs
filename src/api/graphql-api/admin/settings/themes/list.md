---
outline: false
examples:
  - id: gql
    title: List Theme Customizations
    description: List theme customization blocks for the store, newest first. Each row carries its scalar fields; per-locale content is detail-only.
    query: |
      query AdminSettingsThemes($first: Int) {
        adminSettingsThemes(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              name
              type
              sortOrder
              themeCode
              channelId
              status
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 3
      }
    response: |
      {
        "data": {
          "adminSettingsThemes": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/themes/18",
                  "_id": 18,
                  "name": "Popular Products",
                  "type": "product_carousel",
                  "sortOrder": 2,
                  "themeCode": "default",
                  "channelId": 1,
                  "status": true,
                  "createdAt": "2026-01-13T00:42:18+05:30",
                  "updatedAt": "2026-04-07T17:53:46+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/settings/themes/16",
                  "_id": 16,
                  "name": "Services Content",
                  "type": "services_content",
                  "sortOrder": 12,
                  "themeCode": "default",
                  "channelId": 1,
                  "status": true,
                  "createdAt": "2025-10-03T16:56:04+05:30",
                  "updatedAt": "2026-04-07T17:52:08+05:30"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/admin/settings/themes/15",
                  "_id": 15,
                  "name": "All Products",
                  "type": "product_carousel",
                  "sortOrder": 9,
                  "themeCode": "default",
                  "channelId": 1,
                  "status": true,
                  "createdAt": "2025-10-03T16:10:55+05:30",
                  "updatedAt": "2026-04-07T17:47:19+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "Mg=="
            },
            "totalCount": 11
          }
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by type and channel and sort by name ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminSettingsThemes(
        $first: Int
        $name: String
        $type: String
        $themeCode: String
        $channelId: Int
        $status: Int
        $sort: String
        $order: String
      ) {
        adminSettingsThemes(
          first: $first
          name: $name
          type: $type
          themeCode: $themeCode
          channelId: $channelId
          status: $status
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              name
              type
              sortOrder
              themeCode
              channelId
              status
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "type": "product_carousel",
        "channelId": 1,
        "status": 1,
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminSettingsThemes": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/themes/15",
                  "_id": 15,
                  "name": "All Products",
                  "type": "product_carousel",
                  "sortOrder": 9,
                  "themeCode": "default",
                  "channelId": 1,
                  "status": true,
                  "createdAt": "2025-10-03T16:10:55+05:30",
                  "updatedAt": "2026-04-07T17:47:19+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/settings/themes/18",
                  "_id": 18,
                  "name": "Popular Products",
                  "type": "product_carousel",
                  "sortOrder": 2,
                  "themeCode": "default",
                  "channelId": 1,
                  "status": true,
                  "createdAt": "2026-01-13T00:42:18+05:30",
                  "updatedAt": "2026-04-07T17:53:46+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MQ=="
            },
            "totalCount": 2
          }
        }
      }
---

# List Theme Customizations

List the theme customization blocks configured for the store. Each row carries the block's scalar fields; the per-locale `options` content is returned only by the [Detail](./detail) query.

See the [Themes overview](./) for what each `type` renders and what the fields mean.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsThemes` | QueryCollection | List theme customization blocks (cursor-paginated) |

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Themes datagrid filters.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `name` | `String` | Partial (contains). | `"Banner"` |
| `type` | `String` | Exact. | `"product_carousel"` |
| `themeCode` | `String` | Exact. | `"default"` |
| `channelId` | `Int` | Exact. | `1` |
| `status` | `Int` | Exact — `0` or `1`. | `1` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `name`, `type`, `sort_order`, `theme_code`, `channel_id`, `status` |
| `order` | `String` | `asc`, `desc` |

The per-locale `options` are not included on the listing — query [`adminSettingsTheme(id:)`](./detail) for a single block to read its `translations`.
