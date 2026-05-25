---
outline: false
examples:
  - id: admin-get-invoice
    title: Get Invoice
    description: Fetch a single invoice with totals and embedded items.
    query: |
      query GetInvoice($id: ID!) {
        adminInvoice(id: $id) {
          id
          incrementId
          orderId
          state
          totalQty
          subTotal
          formattedSubTotal
          grandTotal
          formattedGrandTotal
          items {
            edges {
              node {
                id
                sku
                name
                qty
                formattedTotal
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/invoices/88"
      }
    response: |
      {
        "data": {
          "adminInvoice": {
            "id": "/api/admin/invoices/88",
            "incrementId": "100000088",
            "orderId": 2392,
            "state": "paid",
            "totalQty": 4,
            "subTotal": 119.96,
            "formattedSubTotal": "$119.96",
            "grandTotal": 129.96,
            "formattedGrandTotal": "$129.96",
            "items": {
              "edges": [
                {
                  "node": {
                    "id": "/api/order-action-item-dtos/901",
                    "sku": "WS-12-S",
                    "name": "Argus All-Weather Tank-S",
                    "qty": 3,
                    "formattedTotal": "$89.97"
                  }
                }
              ]
            }
          }
        }
      }
---

# Get Invoice

Returns a single invoice with totals and embedded line items.

## Operation

| Operation | Type |
|-----------|------|
| `adminInvoice(id: ID!)` | Query |

> Note: nested item collections are exposed as GraphQL cursor connections —
> query them via `items { edges { node { ... } } }`. Same pattern used by
> `adminOrderDetail`.
