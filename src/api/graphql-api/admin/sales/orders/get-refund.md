---
outline: false
examples:
  - id: admin-get-refund
    title: Get Refund
    description: Fetch a single refund with totals and embedded line items.
    query: |
      query GetRefund($id: ID!) {
        adminRefund(id: $id) {
          id
          orderId
          state
          totalQty
          subTotal
          formattedSubTotal
          grandTotal
          formattedGrandTotal
          adjustmentRefund
          adjustmentFee
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
        "id": "/api/admin/refunds/22"
      }
    response: |
      {
        "data": {
          "adminRefund": {
            "id": "/api/admin/refunds/22",
            "orderId": 2392,
            "state": "refunded",
            "totalQty": 1,
            "subTotal": 29.99,
            "formattedSubTotal": "$29.99",
            "grandTotal": 32.99,
            "formattedGrandTotal": "$32.99",
            "adjustmentRefund": 0.0,
            "adjustmentFee": 0.0,
            "items": [
              {
                "id": 701,
                "sku": "WS-12-S",
                "name": "Argus All-Weather Tank-S",
                "qty": 1,
                "formattedTotal": "$29.99"
              }
            ]
          }
        }
      }
---

# Get Refund

Returns a single refund with totals and embedded line items.

## Operation

| Operation | Type |
|-----------|------|
| `adminRefund(id: ID!)` | Query |

> Note: `items` is exposed as a plain JSON array (the underlying DTO declares
> `public array $items`), not as a GraphQL cursor connection. Query the fields
> directly with `items { id sku ... }` — do NOT wrap with `edges { node { ... } }`.
