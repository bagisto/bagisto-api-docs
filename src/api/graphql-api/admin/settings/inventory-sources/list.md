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
---

# List Inventory Sources

Returns a cursor-paginated list of inventory sources. Every column is populated on each row, so you can select whichever fields you need without a follow-up call.

::: tip How this menu works
For what an inventory source is, field meanings, and the delete guards, see the [Inventory Sources overview](/api/graphql-api/admin/settings/inventory-sources/).
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsInventorySources(first, after, code, name, status, country, sort, order)` | QueryCollection (cursor) | List inventory sources |

Filters `code` / `name` (partial match), `status` (`0`/`1`) and `country` (exact) narrow the result; supplying several narrows further (logical AND). `sort` accepts `id` (default, descending), `code`, `name`, `priority`, `status`.

Requires `settings.inventory_sources` view access. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
