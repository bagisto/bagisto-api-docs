---
outline: false
examples:
  - id: gql
    title: List Channels
    description: List every channel (storefront) configured in the store, with cursor pagination.
    query: |
      query AdminSettingsChannels($first: Int) {
        adminSettingsChannels(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              description
              hostname
              theme
              timezone
              defaultLocaleId
              baseCurrencyId
              rootCategoryId
              isMaintenanceOn
              maintenanceModeText
              allowedIps
              logo
              logoUrl
              favicon
              faviconUrl
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
        "first": 10
      }
    response: |
      {
        "data": {
          "adminSettingsChannels": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/channels/1",
                  "_id": 1,
                  "code": "default",
                  "name": "Default Store",
                  "description": "",
                  "hostname": "https://store.example.com",
                  "theme": "default",
                  "timezone": null,
                  "defaultLocaleId": 1,
                  "baseCurrencyId": 1,
                  "rootCategoryId": 1,
                  "isMaintenanceOn": false,
                  "maintenanceModeText": "Maintenance Mode",
                  "allowedIps": ["192.168.45.51"],
                  "logo": null,
                  "logoUrl": null,
                  "favicon": null,
                  "faviconUrl": null,
                  "createdAt": null,
                  "updatedAt": "2026-04-08T17:23:40+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by code, name and hostname, then sort by name ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminSettingsChannels(
        $first: Int
        $code: String
        $name: String
        $hostname: String
        $sort: String
        $order: String
      ) {
        adminSettingsChannels(
          first: $first
          code: $code
          name: $name
          hostname: $hostname
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              description
              hostname
              theme
              timezone
              defaultLocaleId
              baseCurrencyId
              rootCategoryId
              isMaintenanceOn
              maintenanceModeText
              allowedIps
              logo
              logoUrl
              favicon
              faviconUrl
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
        "code": "default",
        "name": "Store",
        "hostname": "example.com",
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminSettingsChannels": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/channels/1",
                  "_id": 1,
                  "code": "default",
                  "name": "Default Store",
                  "description": "",
                  "hostname": "https://store.example.com",
                  "theme": "default",
                  "timezone": null,
                  "defaultLocaleId": 1,
                  "baseCurrencyId": 1,
                  "rootCategoryId": 1,
                  "isMaintenanceOn": false,
                  "maintenanceModeText": "Maintenance Mode",
                  "allowedIps": ["192.168.45.51"],
                  "logo": null,
                  "logoUrl": null,
                  "favicon": null,
                  "faviconUrl": null,
                  "createdAt": null,
                  "updatedAt": "2026-04-08T17:23:40+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List Channels

Returns every channel (storefront) configured in the store, ordered newest-first, with cursor pagination.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsChannels` | QueryCollection | List all channels |

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Channels datagrid filters.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `code` | `String` | Partial (contains), on the channel code. | `"default"` |
| `name` | `String` | Partial (contains), on the channel's translated name. | `"Store"` |
| `hostname` | `String` | Partial (contains), on the channel hostname. | `"example.com"` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `code`, `name` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

## Notes

- Listing rows are **slim**: the detail-only **connections** — `locales`, `currencies`, `inventorySources`, and `translations` — come back empty here, so don't sub-select them on the listing. Fetch a single channel with [`adminSettingsChannel`](./detail) to get them populated.
- Page through results with the standard cursor arguments (`first`, `after`); read `pageInfo` and `totalCount` to drive paging.
