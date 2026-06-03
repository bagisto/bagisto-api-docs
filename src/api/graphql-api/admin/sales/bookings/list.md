---
outline: false
examples:
  - id: admin-bookings-list-gql
    title: List Bookings (Datagrid)
    description: Cursor-paginated bookings datagrid listing. Returns one slim row per booking line — query the single-booking endpoint for the booking sub-type and the order / order-item summary objects.
    query: |
      query AdminBookings($first: Int, $after: String) {
        adminBookings(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              orderId
              orderIncrementId
              orderItemId
              productId
              productSku
              qty
              from
              to
              fromFormatted
              toFormatted
              createdAt
            }
          }
          pageInfo {
            hasNextPage
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
          "adminBookings": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin_booking_list_dtos/1",
                  "_id": 1,
                  "orderId": 8,
                  "orderIncrementId": "2000000008",
                  "orderItemId": 42,
                  "productId": 99,
                  "productSku": "BK-EVENT-01",
                  "qty": 2,
                  "from": 1716220800,
                  "to": 1716224400,
                  "fromFormatted": "20 May, 2026 12:00PM",
                  "toFormatted": "20 May, 2026 13:00PM",
                  "createdAt": "2026-05-20 10:00:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List Bookings (Datagrid)

GraphQL counterpart of `GET /api/admin/bookings`. Returns a cursor-paginated list of bookings, one slim row per booking line — the same rows shown on the admin **Sales → Bookings** datagrid. Each row is a single booking entry (one ordered booking line), carrying the parent order's number and the booking window.

## Operation

`adminBookings(first, after, id, order_id, qty, product_id, from_from, from_to, to_from, to_to, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/bookings/list) for the full argument table.

## Permission

`sales.bookings.view`

## Fields

Every field below is part of the booking node, so all are valid to query. The **On listing** column tells you which are populated by `adminBookings`: a ✓ field is filled on every row; a **detail** field returns `null` on the listing and is populated when you fetch the booking by id (`adminBooking(id:)`). The example above queries only the ✓ fields, which is what you normally want for a datagrid.

The booking window is exposed two ways: `from` / `to` are raw **unix timestamps** (integers) for programmatic use, and `fromFormatted` / `toFormatted` are the same instants pre-rendered as human-readable `d M, Y H:iA` strings (e.g. `"20 May, 2026 12:00PM"`). For booking sub-types with no time window (some appointment/table setups) all four can be `null`.

| Field | Type | On listing | Description |
|-------|------|:---------:|-------------|
| `id` | `ID` | ✓ | Resource identifier (IRI form). |
| `_id` | `Int` | ✓ | Numeric booking id — use this to fetch the full booking. |
| `orderId` | `Int` | ✓ | Id of the order this booking belongs to. |
| `orderIncrementId` | `String` | ✓ | Human-facing number of the parent order. |
| `orderItemId` | `Int` | ✓ | Id of the order line item this booking was created from. |
| `productId` | `Int` | ✓ | Id of the booked product. |
| `productSku` | `String` | ✓ | SKU of the booked product. |
| `qty` | `Int` | ✓ | Quantity booked on this line. |
| `from` | `Int` | ✓ | Start of the booking window as a **unix timestamp** (null for non-time-based bookings). |
| `to` | `Int` | ✓ | End of the booking window as a **unix timestamp** (null for non-time-based bookings). |
| `fromFormatted` | `String` | ✓ | `from` pre-rendered as a `d M, Y H:iA` string (e.g. `"20 May, 2026 12:00PM"`). |
| `toFormatted` | `String` | ✓ | `to` pre-rendered as a `d M, Y H:iA` string. |
| `createdAt` | `String` | ✓ | When the parent order was created. |
| `productName` | `String` | detail | Product name as ordered. Resolved only on the single-booking endpoint. |
| `bookingType` | `String` | detail | Booking sub-type — one of `default`, `appointment`, `event`, `rental`, `table`. |
| `bookingProductEventTicketId` | `Int` | detail | Linked event-ticket id (set only when `bookingType` is `event`). |
| `order` | `Object` | detail | Summary of the parent order — see [Booking Detail](/api/graphql-api/admin/sales/bookings/detail). |
| `orderItem` | `Object` | detail | Summary of the parent order line item — see [Booking Detail](/api/graphql-api/admin/sales/bookings/detail). |

## Listing vs. full record

The listing is a **slim datagrid** — it returns the ✓ columns above for fast paginated browsing. The **detail** fields are not "empty data"; they exist on the booking record, but resolving the booking sub-type and the embedded `order` / `orderItem` summaries for every row of a large list would be expensive, so the listing leaves them out. Fetch them by id with the single-booking query — see [Booking Detail](/api/graphql-api/admin/sales/bookings/detail). Typical flow: list with `adminBookings`, read `_id` from the row you want, then fetch the full record.
