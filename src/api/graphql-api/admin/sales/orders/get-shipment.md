---
outline: false
examples:
  - id: admin-get-shipment
    title: Get Shipment
    description: Fetch a single shipment with totals and embedded line items.
    query: |
      query GetShipment($id: ID!) {
        adminShipment(id: $id) {
          id
          orderId
          status
          totalQty
          carrierTitle
          trackNumber
          inventorySourceName
          items {
            edges {
              node { id sku name qty }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/shipments/55"
      }
    response: |
      {
        "data": {
          "adminShipment": {
            "id": "/api/admin/shipments/55",
            "orderId": 2392,
            "status": "1",
            "totalQty": 3,
            "carrierTitle": "UPS",
            "trackNumber": "1Z999AA1",
            "inventorySourceName": "Default",
            "items": {
              "edges": [
                {
                  "node": {
                    "id": "/api/order-action-item-dtos/401",
                    "sku": "WS-12-S",
                    "name": "Argus All-Weather Tank-S",
                    "qty": 3
                  }
                }
              ]
            }
          }
        }
      }
---

# Get Shipment

Returns a single shipment with totals and embedded line items.

## Operation

| Operation | Type |
|-----------|------|
| `adminShipment(id: ID!)` | Query |
