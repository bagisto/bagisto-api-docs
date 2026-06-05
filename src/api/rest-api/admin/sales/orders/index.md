---
outline: false
apiType: rest
---

# Orders

The Orders menu is the heart of Sales: browse every order in the store and run every per-order action. From here you can view a single order in full, drive the admin **Create Order** flow (reorder an existing order, or place a prepared draft cart), run order lifecycle actions (cancel an order, add and list its comments), and generate the documents an order produces — invoices, shipments, and refunds. It mirrors the admin **Sales → Orders** screen.

Invoices, shipments, and refunds are **generated from an order** here, but each also has its own store-wide menu listing every such document across all orders: see the [Invoices](/api/rest-api/admin/sales/invoices/), [Shipments](/api/rest-api/admin/sales/shipments/), and [Refunds](/api/rest-api/admin/sales/refunds/) overviews.

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
