---
outline: false
apiType: rest
---

# Orders

The Orders menu is the heart of Sales: browse every order in the store and run every per-order action. From here you can view a single order in full, drive the admin **Create Order** flow (reorder an existing order, or place a prepared draft cart), run order lifecycle actions (cancel an order, add and list its comments), and generate the documents an order produces — invoices, shipments, and refunds. It mirrors the admin **Sales → Orders** screen.

Invoices, shipments, and refunds are **generated from an order** here, but each also has its own store-wide menu listing every such document across all orders: see the [Invoices](/api/rest-api/admin/sales/invoices/), [Shipments](/api/rest-api/admin/sales/shipments/), and [Refunds](/api/rest-api/admin/sales/refunds/) overviews.

## Creating an order for a customer (admin Create Order)

An admin can place an order **on behalf of a customer** — the same "Create Order" flow as the admin panel. It works through a **draft cart**: create a draft cart for the customer, add products to it, save the billing/shipping addresses, choose a shipping method and a payment method, then place the order. The draft cart is an internal building block of order creation, not a separate menu.

| Step | Endpoint |
|------|----------|
| [Start a draft cart for a customer](/api/rest-api/admin/customers/create-draft-cart) | `POST /api/admin/customers/{customerId}/draft-carts` |
| [Get the draft cart](/api/rest-api/admin/sales/carts/get-cart) | `GET /api/admin/carts/{id}` |
| [Add an item](/api/rest-api/admin/sales/carts/add-item) · [update](/api/rest-api/admin/sales/carts/update-items) · [remove](/api/rest-api/admin/sales/carts/remove-item) | `.../carts/{id}/items` |
| [Save addresses](/api/rest-api/admin/sales/carts/save-address) | `POST /api/admin/carts/{id}/addresses` |
| [List](/api/rest-api/admin/sales/carts/list-shipping-methods) / [set](/api/rest-api/admin/sales/carts/set-shipping-method) shipping method | `.../carts/{id}/shipping-methods` |
| [List](/api/rest-api/admin/sales/carts/list-payment-methods) / [set](/api/rest-api/admin/sales/carts/set-payment-method) payment method | `.../carts/{id}/payment-methods` |
| [Place the order](/api/rest-api/admin/sales/carts/place-order) | `POST /api/admin/orders/place/{cartId}` |

(There's also [apply](/api/rest-api/admin/sales/carts/apply-coupon) / [remove coupon](/api/rest-api/admin/sales/carts/remove-coupon) on the draft cart.) [Reorder](/api/rest-api/admin/sales/orders/reorder) is a shortcut that seeds a fresh draft cart from an existing order's items.

### Only saleable products can be added

[Add Item](/api/rest-api/admin/sales/carts/add-item) accepts only products that are in stock and enabled. Adding an out-of-stock or disabled product returns a clear error and **leaves the draft cart intact** so you can add a different product — the cart is never lost. Booking products can't be added to an admin order (no admin Create-Order surface for them).

## The order lifecycle — which action, in what order

Once an order exists (placed through Create Order above, [Reorder](/api/rest-api/admin/sales/orders/reorder), or the storefront), it moves through a lifecycle. Each action has prerequisites — this is the order they run in and what gates each one.

**1. Invoice — record payment.** [Create Invoice](/api/rest-api/admin/sales/orders/create-invoice) records that payment was collected for some or all of the order's items. An order generally can't be refunded until it has been invoiced (you refund money that was billed). You can invoice part of an order now and the rest later. Not available for orders paid via `paypal_standard` (those are captured by the gateway, not the admin). Send `can_create_transaction: true` on the invoice (the **Create Transaction** checkbox) to also record the payment as a transaction in the same step; to record a **partial or later** payment against an existing invoice, use [Create Transaction](/api/rest-api/admin/sales/transactions/create).

**2. Ship — fulfil.** [Create Shipment](/api/rest-api/admin/sales/orders/create-shipment) marks items as dispatched and records the carrier and tracking number. It needs items still awaiting shipment and enough stock at the chosen inventory source. Partial shipments are allowed.

**3. Refund — return money.** [Create Refund](/api/rest-api/admin/sales/orders/create-refund) returns money for invoiced items and/or an arbitrary adjustment. Call [Refund Preview](/api/rest-api/admin/sales/orders/refund-preview) first to see the computed totals without writing anything. Requires something left to refund (an un-refunded invoiced amount or a returnable quantity).

**Cancel — abandon early.** [Cancel Order](/api/rest-api/admin/sales/orders/cancel) is only possible while there is still something to cancel (nothing has been fully invoiced or shipped). A closed or fraud-flagged order can't be cancelled.

**Comments — any time.** [Add Comment](/api/rest-api/admin/sales/orders/add-comment) / [List Comments](/api/rest-api/admin/sales/orders/list-comments) work at any stage; set `customerNotified` to email the customer the note.

Every action refuses with a clear error when its prerequisite isn't met — nothing left to invoice/ship/refund, the order is already closed or flagged, insufficient stock, or a payment method that can't be invoiced. A typical fulfilled order runs **Create → Invoice → Ship** (then an optional **Refund**); an abandoned one runs **Create → Cancel**.

### Recording payments as transactions

A payment can be recorded as a transaction (which then shows in the [Transactions listing](/api/rest-api/admin/sales/transactions/list)) in two ways:

- **At invoice time** — send `can_create_transaction: true` on [Create Invoice](/api/rest-api/admin/sales/orders/create-invoice) (the **Create Transaction** checkbox). Records the **full** invoice amount in one step.
- **Any time** — [Create Transaction](/api/rest-api/admin/sales/transactions/create) (`POST /api/admin/transactions`) records an **arbitrary or partial** payment against an existing invoice.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List Orders](/api/rest-api/admin/sales/orders/list-orders) | `GET /api/admin/orders` |
| [Order Detail](/api/rest-api/admin/sales/orders/order-detail) | `GET /api/admin/orders/{id}` |
| [Reorder](/api/rest-api/admin/sales/orders/reorder) | `POST /api/admin/orders/{id}/reorder` |
| [Place Order](/api/rest-api/admin/sales/carts/place-order) | `POST /api/admin/orders/place/{cartId}` |
| [Cancel Order](/api/rest-api/admin/sales/orders/cancel) | `POST /api/admin/orders/{id}/cancel` |
| [Add Comment](/api/rest-api/admin/sales/orders/add-comment) | `POST /api/admin/orders/{id}/comments` |
| [List Comments](/api/rest-api/admin/sales/orders/list-comments) | `GET /api/admin/orders/{id}/comments` |
| [Create Invoice](/api/rest-api/admin/sales/orders/create-invoice) | `POST /api/admin/orders/{id}/invoices` |
| [Create Shipment](/api/rest-api/admin/sales/orders/create-shipment) | `POST /api/admin/orders/{id}/shipments` |
| [Create Refund](/api/rest-api/admin/sales/orders/create-refund) | `POST /api/admin/orders/{id}/refunds` |
| [Refund Preview](/api/rest-api/admin/sales/orders/refund-preview) | `POST /api/admin/orders/{id}/refunds/preview` |
