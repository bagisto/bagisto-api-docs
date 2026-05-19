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
