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
---

# List Theme Customizations

List the theme customization blocks configured for the store. Each row carries the block's scalar fields; the per-locale `options` content is returned only by the [Detail](./detail) query.

::: tip
See the [Themes overview](./) for what each `type` renders and what the fields mean.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsThemes` | QueryCollection | List theme customization blocks (cursor-paginated) |

Use `first` / `after` to page through results. The per-locale `options` are not included on the listing — query [`adminSettingsTheme(id:)`](./detail) for a single block to read its `translations`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
