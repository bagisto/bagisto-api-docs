---
outline: false
apiType: rest
examples:
  - id: admin-create-shipment
    title: Create Shipment
    description: Ship one or more order items from a chosen inventory source. Quantity is validated against `qty_to_ship` and against the available inventory at the chosen source.
    query: |
      curl -X POST "https://your-domain.com/api/admin/orders/2392/shipments" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "source": 1,
          "items": [
            { "orderItemId": 42, "inventorySourceId": 1, "quantity": 3 }
          ],
          "carrierTitle": "UPS",
          "trackNumber": "1Z999AA1"
        }'
    variables: |
      {
        "source": 1,
        "items": [
          { "orderItemId": 42, "inventorySourceId": 1, "quantity": 3 }
        ],
        "carrierTitle": "UPS",
        "trackNumber": "1Z999AA1"
      }
    response: |
      {
        "id": 55,
        "orderId": 2392,
        "status": "1",
        "totalQty": 3,
        "totalWeight": 1.2,
        "carrierCode": null,
        "carrierTitle": "UPS",
        "trackNumber": "1Z999AA1",
        "emailSent": false,
        "inventorySourceId": 1,
        "inventorySourceName": "Default",
        "createdAt": "2026-05-21 11:02:18",
        "updatedAt": "2026-05-21 11:02:18",
        "items": [
          {
            "id": 401,
            "orderItemId": 42,
            "sku": "WS-12-S",
            "name": "Argus All-Weather Tank-S",
            "qty": 3
          }
        ]
      }
    commonErrors:
      - error: Closed (422)
        cause: Order is already closed
        solution: Closed orders cannot be shipped
      - error: Fraud (422)
        cause: Order is flagged as fraud
        solution: Resolve the fraud flag before shipping
      - error: Nothing to ship (422)
        cause: No item has `qty_to_ship > 0` and is stockable
        solution: All shippable items are already shipped
      - error: No permission (422)
        cause: Admin role lacks `sales.shipments.create`
        solution: Grant the role the `sales.shipments.create` permission
      - error: Source required (422)
        cause: '`source` field missing or non-positive'

        solution: Send the inventory source id all items ship from
      - error: Items required (422)
        cause: '`items` array missing, empty, or every quantity is zero'

        solution: Provide at least one `{ orderItemId, inventorySourceId, quantity > 0 }` entry
      - error: Quantity exceeds (422)
        cause: Requested quantity for an SKU is greater than `qty_to_ship`
        solution: Lower the quantity to at most `qty_to_ship`
      - error: Inventory insufficient (422)
        cause: The selected source does not stock enough of an SKU
        solution: Pick a different source or split the shipment
      - error: Not Found (404)
        cause: Unknown order ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Create Shipment

Ships one or more order items from a chosen inventory source. Mirrors the
monolith `ShipmentController::store` — runs the standard
`AdminOrderActionGuard` checks, then validates each item's requested quantity
against `qty_to_ship` AND against the inventory available at the chosen source
before calling `ShipmentRepository::create`.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{orderId}/shipments` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `source` | integer | yes | Inventory source id all items ship from. |
| `items` | array of `{ orderItemId, inventorySourceId, quantity }` | yes | At least one entry with `quantity > 0`. |
| `carrierTitle` | string | no | Free-form carrier label (e.g. `UPS`). |
| `trackNumber` | string | no | Tracking number. |

## Errors

| HTTP | Lang key | Message |
|------|----------|---------|
| 422  | `bagistoapi::app.admin.order.actions.shipment.closed` | Closed orders cannot be shipped. |
| 422  | `bagistoapi::app.admin.order.actions.shipment.fraud` | Fraud orders cannot be shipped. |
| 422  | `bagistoapi::app.admin.order.actions.shipment.nothing-to-ship` | There is nothing to ship on this order. |
| 422  | `bagistoapi::app.admin.order.actions.shipment.no-permission` | You do not have permission to ship orders. |
| 422  | `bagistoapi::app.admin.order.actions.shipment.source-required` | Inventory source is required. |
| 422  | `bagistoapi::app.admin.order.actions.shipment.items-required` | At least one item with a positive quantity is required. |
| 422  | `bagistoapi::app.admin.order.actions.shipment.qty-exceeds` | Requested quantity (`:requested`) exceeds available quantity (`:available`) for SKU `:sku`. |
| 422  | `bagistoapi::app.admin.order.actions.shipment.inventory-insufficient` | Inventory at the selected source is insufficient for SKU `:sku`. |
| 422  | `bagistoapi::app.admin.order.actions.shipment.failed` | Could not create the shipment. |

### Sample 422 response

```json
{
    "type": "/errors/422",
    "title": "Bad Request",
    "status": 422,
    "detail": "Inventory at the selected source is insufficient for SKU WS-12-S."
}
```
