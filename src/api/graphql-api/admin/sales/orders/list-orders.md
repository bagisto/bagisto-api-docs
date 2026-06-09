---
outline: false
examples:
  - id: admin-list-orders
    title: List Orders
    description: Paginated list of all orders across every customer (cursor pagination).
    query: |
      query adminOrders($first: Int) {
        adminOrders(first: $first) {
          totalCount
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              incrementId
              status
              statusLabel
              channelName
              customerEmail
              customerName
              grandTotal
              formattedGrandTotal
              totalQtyOrdered
              createdAt
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
          "adminOrders": {
            "totalCount": 616,
            "pageInfo": { "hasNextPage": true, "endCursor": "OQ==" },
            "edges": [
              {
                "node": {
                  "id": 2392,
                  "incrementId": "2392",
                  "status": "processing",
                  "statusLabel": "Processing",
                  "channelName": "bagisto store",
                  "customerEmail": "admin@example.com",
                  "customerName": "Test User",
                  "grandTotal": 4000,
                  "formattedGrandTotal": "$4,000.00",
                  "totalQtyOrdered": 1,
                  "createdAt": "2026-05-19 13:13:29"
                }
              }
            ]
          }
        }
      }
  - id: admin-list-orders-filtered
    title: List Orders (filtered)
    description: Filter by status, grand-total range and a date preset.
    query: |
      query adminOrders(
        $first: Int
        $status: String
        $grand_total_from: Float
        $grand_total_to: Float
        $date_range: String
      ) {
        adminOrders(
          first: $first
          status: $status
          grand_total_from: $grand_total_from
          grand_total_to: $grand_total_to
          date_range: $date_range
        ) {
          totalCount
          edges {
            node {
              id
              incrementId
              status
              grandTotal
              createdAt
            }
          }
        }
      }
    variables: |
      {
          "first": 10,
          "status": "processing",
          "grand_total_from": 100,
          "grand_total_to": 5000,
          "date_range": "this_month"
      }
    response: |
      {
        "data": {
          "adminOrders": {
            "totalCount": 12,
            "edges": [
              {
                "node": {
                  "id": 2392,
                  "incrementId": "2392",
                  "status": "processing",
                  "grandTotal": 4000,
                  "createdAt": "2026-05-19 13:13:29"
                }
              }
            ]
          }
        }
      }
---

# List Orders

Lists every order across all customers — the data behind the admin **Sales →
Orders** screen.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminOrders` | Query | Cursor-paginated list of all orders |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `pageInfo.hasNextPage` tells
  you when to stop; `totalCount` is the grand total.
- Each `node` is a **slim** order row — flat fields only. Heavy relations
  (full items, invoices, shipments) are not embedded here; fetch a single
  order's detail for those.
- The REST equivalent (`GET /api/admin/orders`) uses offset pagination with a
  `{ data, meta }` envelope instead of cursors.

## Filtering

Pass any of these arguments alongside `first` / `after` to narrow the list
(they mirror the admin datagrid filters):

| Argument | Description |
|----------|-------------|
| `order_id` | Order increment ID — partial match |
| `status` | `pending`, `pending_payment`, `processing`, `completed`, `canceled`, `closed`, `fraud` |
| `grand_total` | Exact grand total (matched against the base grand total) |
| `grand_total_from`, `grand_total_to` | Grand total range (minimum / maximum) |
| `channel` | Channel ID |
| `customer` | Customer name — partial match |
| `email` | Customer email — partial match |
| `date_range` | Preset: `today`, `yesterday`, `this_week`, `this_month`, `last_month`, `last_three_months`, `last_six_months`, `this_year` |
| `date_from`, `date_to` | Custom date range (`Y-m-d`) — overrides `date_range` |
| `sort`, `order` | Sort field + `asc` / `desc` (default `created_at desc`) |
