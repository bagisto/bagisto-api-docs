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
              incrementId
              status
              statusLabel
              channelId
              channelName
              isGuest
              customerId
              customerEmail
              customerName
              paymentTitle
              couponCode
              totalItemCount
              totalQtyOrdered
              orderCurrencyCode
              grandTotal
              baseGrandTotal
              formattedGrandTotal
              location
              createdAt
              updatedAt
              items {
                edges {
                  node {
                    _id
                    sku
                    name
                    qtyOrdered
                    productImage
                  }
                }
              }
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
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "OQ=="
            },
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": 2392,
                  "incrementId": "2392",
                  "status": "processing",
                  "statusLabel": "Processing",
                  "channelId": 1,
                  "channelName": "bagisto store",
                  "isGuest": false,
                  "customerId": 19,
                  "customerEmail": "admin@example.com",
                  "customerName": "Test User",
                  "paymentTitle": "Money Transfer",
                  "couponCode": null,
                  "totalItemCount": 1,
                  "totalQtyOrdered": 1,
                  "orderCurrencyCode": "USD",
                  "grandTotal": 4000,
                  "baseGrandTotal": 4000,
                  "formattedGrandTotal": "$4,000.00",
                  "location": "New York, NY, US",
                  "createdAt": "2026-05-19 13:13:29",
                  "updatedAt": "2026-05-19 13:13:30",
                  "items": {
                    "edges": [
                      {
                        "node": {
                          "_id": 2694,
                          "sku": "test65",
                          "name": "Classic Watch Hand",
                          "qtyOrdered": 1,
                          "productImage": "http://localhost:8000/storage/product/2358/example.webp"
                        }
                      }
                    ]
                  }
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
        $sort: String
        $order: String
      ) {
        adminOrders(
          first: $first
          status: $status
          grand_total_from: $grand_total_from
          grand_total_to: $grand_total_to
          date_range: $date_range
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
              incrementId
              status
              statusLabel
              channelId
              channelName
              isGuest
              customerId
              customerEmail
              customerName
              paymentTitle
              couponCode
              totalItemCount
              totalQtyOrdered
              orderCurrencyCode
              grandTotal
              baseGrandTotal
              formattedGrandTotal
              location
              createdAt
              updatedAt
              items {
                edges {
                  node {
                    _id
                    sku
                    name
                    qtyOrdered
                    productImage
                  }
                }
              }
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
          "date_range": "this_month",
          "sort": "created_at",
          "order": "desc"
      }
    response: |
      {
        "data": {
          "adminOrders": {
            "totalCount": 12,
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "OQ=="
            },
            "edges": [
              {
                "node": {
                  "id": 2392,
                  "incrementId": "2392",
                  "status": "processing",
                  "statusLabel": "Processing",
                  "channelId": 1,
                  "channelName": "bagisto store",
                  "isGuest": false,
                  "customerId": 19,
                  "customerEmail": "admin@example.com",
                  "customerName": "Test User",
                  "paymentTitle": "Money Transfer",
                  "couponCode": null,
                  "totalItemCount": 1,
                  "totalQtyOrdered": 1,
                  "orderCurrencyCode": "USD",
                  "grandTotal": 4000,
                  "baseGrandTotal": 4000,
                  "formattedGrandTotal": "$4,000.00",
                  "location": "New York, NY, US",
                  "createdAt": "2026-05-19 13:13:29",
                  "updatedAt": "2026-05-19 13:13:30",
                  "items": {
                    "edges": [
                      {
                        "node": {
                          "_id": 2694,
                          "sku": "test65",
                          "name": "Classic Watch Hand",
                          "qtyOrdered": 1,
                          "productImage": "http://localhost:8000/storage/product/2358/example.webp"
                        }
                      }
                    ]
                  }
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
- Each `node` carries every flat order field shown in the example
  (`incrementId`, `status`, `statusLabel`, `channelId` / `channelName`,
  `customerId` / `customerEmail` / `customerName`, `paymentTitle`,
  `couponCode`, `totalItemCount`, `totalQtyOrdered`, `orderCurrencyCode`,
  `grandTotal` / `baseGrandTotal` / `formattedGrandTotal`, `location`,
  `createdAt`, `updatedAt`) plus `items` — a **lightweight preview connection**.
  Sub-select it with `items { edges { node { _id sku name qtyOrdered productImage } } }`.
  Heavy relations (full line items, invoices, shipments) are **not** embedded
  here — fetch a single order's detail for those.
- The REST equivalent (`GET /api/admin/orders`) uses offset pagination with a
  `{ data, meta }` envelope instead of cursors, and returns `items` as a **flat
  array** (same fields).

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
