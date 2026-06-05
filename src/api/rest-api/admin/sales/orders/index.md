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
| Start a draft cart for a customer | `POST /api/admin/customers/{customerId}/draft-carts` |
| [Get the draft cart](/api/rest-api/admin/sales/carts/get-cart) | `GET /api/admin/carts/{id}` |
| [Add an item](/api/rest-api/admin/sales/carts/add-item) · [update](/api/rest-api/admin/sales/carts/update-items) · [remove](/api/rest-api/admin/sales/carts/remove-item) | `.../carts/{id}/items` |
| [Save addresses](/api/rest-api/admin/sales/carts/save-address) | `POST /api/admin/carts/{id}/addresses` |
| [List](/api/rest-api/admin/sales/carts/list-shipping-methods) / [set](/api/rest-api/admin/sales/carts/set-shipping-method) shipping method | `.../carts/{id}/shipping-methods` |
| [List](/api/rest-api/admin/sales/carts/list-payment-methods) / [set](/api/rest-api/admin/sales/carts/set-payment-method) payment method | `.../carts/{id}/payment-methods` |
| [Place the order](/api/rest-api/admin/sales/orders/place-order) | `POST /api/admin/orders/place/{cartId}` |

(There's also [apply](/api/rest-api/admin/sales/carts/apply-coupon) / [remove coupon](/api/rest-api/admin/sales/carts/remove-coupon) on the draft cart.) [Reorder](/api/rest-api/admin/sales/orders/reorder) is a shortcut that seeds a fresh draft cart from an existing order's items.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List Orders](/api/rest-api/admin/sales/orders/list-orders) | `GET /api/admin/orders` |
| [Order Detail](/api/rest-api/admin/sales/orders/order-detail) | `GET /api/admin/orders/{id}` |
| [Reorder](/api/rest-api/admin/sales/orders/reorder) | `POST /api/admin/orders/{id}/reorder` |
| [Place Order](/api/rest-api/admin/sales/orders/place-order) | `POST /api/admin/orders/place/{cartId}` |
| [Cancel Order](/api/rest-api/admin/sales/orders/cancel) | `POST /api/admin/orders/{id}/cancel` |
| [Add Comment](/api/rest-api/admin/sales/orders/add-comment) | `POST /api/admin/orders/{id}/comments` |
| [List Comments](/api/rest-api/admin/sales/orders/list-comments) | `GET /api/admin/orders/{id}/comments` |
| [Create Invoice](/api/rest-api/admin/sales/orders/create-invoice) | `POST /api/admin/orders/{id}/invoices` |
| [Create Shipment](/api/rest-api/admin/sales/orders/create-shipment) | `POST /api/admin/orders/{id}/shipments` |
| [Create Refund](/api/rest-api/admin/sales/orders/create-refund) | `POST /api/admin/orders/{id}/refunds` |
| [Refund Preview](/api/rest-api/admin/sales/orders/refund-preview) | `POST /api/admin/orders/{id}/refunds/preview` |

All Orders endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
