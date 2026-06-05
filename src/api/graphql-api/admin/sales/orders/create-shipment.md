---
outline: false
examples:
  - id: admin-create-shipment
    title: Create Shipment
    description: Ship one or more order items from a chosen inventory source.
    query: |
      mutation CreateShipment($input: createAdminShipmentInput!) {
        createAdminShipment(input: $input) {
          adminShipment { id }
        }
      }
    variables: |
      {
        "input": {
          "orderId": 2392,
          "source": 1,
          "items": [
            { "orderItemId": 42, "inventorySourceId": 1, "quantity": 3 }
          ],
          "carrierTitle": "UPS",
          "trackNumber": "1Z999AA1"
        }
      }
    response: |
      {
        "data": {
          "createAdminShipment": {
            "adminShipment": { "id": "/api/admin/shipments/55" }
          }
        }
      }
---

# Create Shipment

Ships one or more order items from a chosen inventory source. The same
eligibility checks as the admin Shipment screen apply (the order must not be
closed or marked fraud). Each item's requested quantity is validated against its
still-shippable quantity, `qty_to_ship`, AND against the inventory available at
the chosen source before the shipment is created.

After the mutation, fetch the full shipment via `adminShipment(id:)` or the
REST `GET /api/admin/shipments/{id}` endpoint.

::: tip Prerequisites
The example targets an order with shippable items. If your order has no items with `qty_to_ship > 0` (already fully shipped / not yet invoiced) the mutation returns *"At least one item with a positive quantity is required."* — pick an order with outstanding qty to ship.
:::

## Operation

| Operation | Type |
|-----------|------|
| `createAdminShipment` | Mutation |

## Errors

| Condition | Lang key | Message |
|-----------|----------|---------|
| Order `closed` | `bagistoapi::app.admin.order.actions.shipment.closed` | Closed orders cannot be shipped. |
| Order `fraud`  | `bagistoapi::app.admin.order.actions.shipment.fraud`  | Fraud orders cannot be shipped. |
| Nothing to ship | `bagistoapi::app.admin.order.actions.shipment.nothing-to-ship` | There is nothing to ship on this order. |
| No permission | `bagistoapi::app.admin.order.actions.shipment.no-permission` | You do not have permission to ship orders. |
| Source missing | `bagistoapi::app.admin.order.actions.shipment.source-required` | Inventory source is required. |
| Items missing | `bagistoapi::app.admin.order.actions.shipment.items-required` | At least one item with a positive quantity is required. |
| Qty exceeds available | `bagistoapi::app.admin.order.actions.shipment.qty-exceeds` | Requested quantity (`:requested`) exceeds available quantity (`:available`) for SKU `:sku`. |
| Inventory insufficient | `bagistoapi::app.admin.order.actions.shipment.inventory-insufficient` | Inventory at the selected source is insufficient for SKU `:sku`. |
| Save failed | `bagistoapi::app.admin.order.actions.shipment.failed` | Could not create the shipment. |
