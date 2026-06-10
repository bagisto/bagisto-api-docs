---
outline: false
---

# Orders

The Orders menu is the heart of Sales: browse every order in the store and run every per-order action. From here you can view a single order in full, drive the admin **Create Order** flow (reorder an existing order, or place a prepared draft cart), run order lifecycle actions (cancel an order, add and list its comments), and generate the documents an order produces — invoices, shipments, and refunds. It mirrors the admin **Sales → Orders** screen.

Invoices, shipments, and refunds are **generated from an order** here, but each also has its own store-wide menu listing every such document across all orders: see the [Invoices](/api/graphql-api/admin/sales/invoices/), [Shipments](/api/graphql-api/admin/sales/shipments/), and [Refunds](/api/graphql-api/admin/sales/refunds/) overviews.

## Creating an order for a customer (admin Create Order)

An admin can place an order **on behalf of a customer** — the same "Create Order" flow as the admin panel. It works through a **draft cart**: create a draft cart for the customer, add products, save the billing/shipping addresses, choose a shipping method and a payment method, then place the order. The draft cart is an internal building block of order creation, not a separate menu.

| Step | Operation |
|------|-----------|
| [Start a draft cart for a customer](/api/graphql-api/admin/customers/create-draft-cart) | `createAdminDraftCart` mutation |
| [Get the draft cart](/api/graphql-api/admin/sales/carts/get-cart) | `adminCart(id:)` query |
| [Add an item](/api/graphql-api/admin/sales/carts/add-item) · [update](/api/graphql-api/admin/sales/carts/update-items) · [remove](/api/graphql-api/admin/sales/carts/remove-item) | `addItemAdminCart` / `updateItemsAdminCart` / `removeItemAdminCart` mutations |
| [Save addresses](/api/graphql-api/admin/sales/carts/save-address) | `saveAddressAdminCart` mutation |
| [List](/api/graphql-api/admin/sales/carts/list-shipping-methods) / [set](/api/graphql-api/admin/sales/carts/set-shipping-method) shipping method | `adminCartShippingRates` query / `setShippingMethodAdminCart` mutation |
| [List](/api/graphql-api/admin/sales/carts/list-payment-methods) / [set](/api/graphql-api/admin/sales/carts/set-payment-method) payment method | `adminCartPaymentMethods` query / `setPaymentMethodAdminCart` mutation |
| [Place the order](/api/graphql-api/admin/sales/orders/place-order) | `createAdminPlaceOrder` mutation |

(There's also [apply](/api/graphql-api/admin/sales/carts/apply-coupon) / [remove coupon](/api/graphql-api/admin/sales/carts/remove-coupon) on the draft cart.) [Reorder](/api/graphql-api/admin/sales/orders/reorder) is a shortcut that seeds a fresh draft cart from an existing order's items.

::: tip Only saleable products can be added
[Add Item](/api/graphql-api/admin/sales/carts/add-item) accepts only products that are in stock and enabled. Adding an out-of-stock or disabled product returns a clear error and **leaves the draft cart intact** so you can add a different product — the cart is never lost. Booking products can't be added to an admin order (no admin Create-Order surface for them).
:::

## The order lifecycle — which action, in what order

Once an order exists (placed through Create Order above, [Reorder](/api/graphql-api/admin/sales/orders/reorder), or the storefront), it moves through a lifecycle. Each action has prerequisites — this is the order they run in and what gates each one.

**1. Invoice — record payment.** [Create Invoice](/api/graphql-api/admin/sales/orders/create-invoice) records that payment was collected for some or all of the order's items. An order generally can't be refunded until it has been invoiced (you refund money that was billed). You can invoice part of an order now and the rest later. Not available for orders paid via `paypal_standard` (those are captured by the gateway, not the admin).

**2. Ship — fulfil.** [Create Shipment](/api/graphql-api/admin/sales/orders/create-shipment) marks items as dispatched and records the carrier and tracking number. It needs items still awaiting shipment and enough stock at the chosen inventory source. Partial shipments are allowed.

**3. Refund — return money.** [Create Refund](/api/graphql-api/admin/sales/orders/create-refund) returns money for invoiced items and/or an arbitrary adjustment. Call [Refund Preview](/api/graphql-api/admin/sales/orders/refund-preview) first to see the computed totals without writing anything. Requires something left to refund (an un-refunded invoiced amount or a returnable quantity).

**Cancel — abandon early.** [Cancel Order](/api/graphql-api/admin/sales/orders/cancel) is only possible while there is still something to cancel (nothing has been fully invoiced or shipped). A closed or fraud-flagged order can't be cancelled.

**Comments — any time.** [Add Comment](/api/graphql-api/admin/sales/orders/add-comment) / [List Comments](/api/graphql-api/admin/sales/orders/list-comments) work at any stage; set `customerNotified` to email the customer the note.

Every action refuses with a clear error when its prerequisite isn't met — nothing left to invoice/ship/refund, the order is already closed or flagged, insufficient stock, or a payment method that can't be invoiced. A typical fulfilled order runs **Create → Invoice → Ship** (then an optional **Refund**); an abandoned one runs **Create → Cancel**.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List Orders](/api/graphql-api/admin/sales/orders/list-orders) | `adminOrders` query |
| [Order Detail](/api/graphql-api/admin/sales/orders/order-detail) | `adminOrderDetail` query |
| [Reorder](/api/graphql-api/admin/sales/orders/reorder) | `createAdminReorder` mutation |
| [Place Order](/api/graphql-api/admin/sales/orders/place-order) | `createAdminPlaceOrder` mutation |
| [Cancel Order](/api/graphql-api/admin/sales/orders/cancel) | `createAdminCancelOrder` mutation |
| [Add Comment](/api/graphql-api/admin/sales/orders/add-comment) | `createAdminOrderComment` mutation |
| [List Comments](/api/graphql-api/admin/sales/orders/list-comments) | `adminOrderComments` query |
| [Create Invoice](/api/graphql-api/admin/sales/orders/create-invoice) | `createAdminInvoice` mutation |
| [Create Shipment](/api/graphql-api/admin/sales/orders/create-shipment) | `createAdminShipment` mutation |
| [Create Refund](/api/graphql-api/admin/sales/orders/create-refund) | `createAdminRefund` mutation |
| [Refund Preview](/api/graphql-api/admin/sales/orders/refund-preview) | `previewAdminRefund` mutation |

All Orders endpoints require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
