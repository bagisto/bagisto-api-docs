---
outline: false
examples:
  - id: admin-inventory-sources-list-gql
    title: List Inventory Sources
    description: Cursor-paginated list of inventory sources. Every column is populated on each row.
    query: |
      query AdminSettingsInventorySources($first: Int, $after: String) {
        adminSettingsInventorySources(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              description
              contactName
              contactEmail
              contactNumber
              contactFax
              country
              state
              city
              street
              postcode
              priority
              latitude
              longitude
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
        "first": 10
      }
    response: |
      {
        "data": {
          "adminSettingsInventorySources": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/inventory-sources/59",
                  "_id": 59,
                  "code": "warehouse-west",
                  "name": "West Coast Warehouse",
                  "description": "Secondary fulfillment hub",
                  "contactName": "Ops Team",
                  "contactEmail": "ops.west@example.com",
                  "contactNumber": "+15553334444",
                  "contactFax": "+15553335555",
                  "country": "US",
                  "state": "CA",
                  "city": "Oakland",
                  "street": "500 Harbor Blvd",
                  "postcode": "94607",
                  "priority": 3,
                  "latitude": null,
                  "longitude": null,
                  "status": 1,
                  "createdAt": "2026-06-19T17:39:22+05:30",
                  "updatedAt": "2026-06-19T17:39:22+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/settings/inventory-sources/1",
                  "_id": 1,
                  "code": "default",
                  "name": "Default",
                  "description": null,
                  "contactName": "Detroit Warehouse",
                  "contactEmail": "warehouse@example.com",
                  "contactNumber": "1234567899",
                  "contactFax": null,
                  "country": "US",
                  "state": "MI",
                  "city": "Detroit",
                  "street": "12th Street",
                  "postcode": "48127",
                  "priority": 0,
                  "latitude": null,
                  "longitude": null,
                  "status": 1,
                  "createdAt": null,
                  "updatedAt": null
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
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by code and status, then sort by name ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminSettingsInventorySources(
        $first: Int
        $code: String
        $name: String
        $status: Int
        $country: String
        $sort: String
        $order: String
      ) {
        adminSettingsInventorySources(
          first: $first
          code: $code
          name: $name
          status: $status
          country: $country
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
              contactName
              contactEmail
              contactNumber
              contactFax
              country
              state
              city
              street
              postcode
              priority
              latitude
              longitude
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
        "code": "warehouse",
        "status": 1,
        "country": "US",
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminSettingsInventorySources": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/inventory-sources/59",
                  "_id": 59,
                  "code": "warehouse-west",
                  "name": "West Coast Warehouse",
                  "description": "Secondary fulfillment hub",
                  "contactName": "Ops Team",
                  "contactEmail": "ops.west@example.com",
                  "contactNumber": "+15553334444",
                  "contactFax": "+15553335555",
                  "country": "US",
                  "state": "CA",
                  "city": "Oakland",
                  "street": "500 Harbor Blvd",
                  "postcode": "94607",
                  "priority": 3,
                  "latitude": null,
                  "longitude": null,
                  "status": 1,
                  "createdAt": "2026-06-19T17:39:22+05:30",
                  "updatedAt": "2026-06-19T17:39:22+05:30"
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

# List Inventory Sources

Returns a cursor-paginated list of inventory sources. Every column is populated on each row, so you can select whichever fields you need without a follow-up call.

For what an inventory source is, field meanings, and the delete guards, see the [Inventory Sources overview](/api/graphql-api/admin/settings/inventory-sources/).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsInventorySources` | QueryCollection (cursor) | List inventory sources |

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Inventory Sources datagrid filters.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `code` | `String` | Partial (contains). | `"warehouse"` |
| `name` | `String` | Partial (contains). | `"West"` |
| `status` | `Int` | Exact — `0` (inactive) or `1` (active). | `1` |
| `country` | `String` | Exact — 2-letter country code. | `"US"` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `code`, `name`, `priority`, `status` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

## Notes

- Pass `first` (and `after: <cursor>`) to page through results. The connection exposes `pageInfo` and `totalCount`.
- `status` is `0` (inactive) or `1` (active); only active sources are available for fulfilment.
- `latitude` / `longitude` are `null` when the source has no geo-coordinates configured.
- Seeded core sources (such as the `default` source) may have `null` `createdAt` / `updatedAt`.

Requires `settings.inventory_sources` view access.
