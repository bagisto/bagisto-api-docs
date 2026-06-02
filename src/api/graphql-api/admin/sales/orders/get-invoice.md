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
            id
            sku
            name
            qty
            formattedTotal
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
            "items": [
              {
                "id": 901,
                "sku": "WS-12-S",
                "name": "Argus All-Weather Tank-S",
                "qty": 3,
                "formattedTotal": "$89.97"
              }
            ]
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

> Note: `items` is exposed as a plain JSON array (the underlying DTO declares
> `public array $items`), not as a GraphQL cursor connection. Query the fields
> directly with `items { id sku ... }` — do NOT wrap with `edges { node { ... } }`.
