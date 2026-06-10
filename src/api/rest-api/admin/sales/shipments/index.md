---
outline: false
apiType: rest
---

# Shipments

The Shipments menu is the store-wide list of every shipment that has been created across all orders. It mirrors the admin **Sales → Shipments** screen.

## When a row appears here

A shipment row exists only after a shipment has been **created** for an order (the Create Shipment action). Placing or invoicing an order does not by itself create a shipment; until one is created, the order has no row in this menu.

## What a shipment records

A shipment records which items, in what quantity, were dispatched — and from which inventory source. It can optionally carry a shipping carrier (`carrierCode` / `carrierTitle`) and a tracking number (`trackNumber`). An order can be shipped in parts: each partial dispatch creates its own shipment, so a single order may have several shipment rows, each covering a subset of its items from a (possibly different) inventory source.

## Shipped-to address

The `shippingAddress` carried on each shipment, and the `shippedTo` name, come from the **order's shipping address** — the destination the items were dispatched to. The order's billing address is also included as `billingAddress` for context.

## Payment and Shipping

The shipment detail also surfaces the order's Payment and Shipping info — the payment method and its title, the order currency, and the shipping method, its title and price — matching the admin Shipment view's "Payment and Shipping" panel. The shipping fields can be `null` when the order had no shipping method (e.g. virtual/free).

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List shipments](/api/rest-api/admin/sales/shipments/list) | `GET /api/admin/shipments` |
| [Get a single shipment](/api/rest-api/admin/sales/orders/get-shipment) | `GET /api/admin/shipments/{id}` |
| [Create shipment](/api/rest-api/admin/sales/orders/create-shipment) | `POST /api/admin/orders/{id}/shipments` |

Shipment **creation** runs against an order — see [Create Shipment](/api/rest-api/admin/sales/orders/create-shipment).

All Shipments endpoints require the `sales.shipments.view` permission and an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
