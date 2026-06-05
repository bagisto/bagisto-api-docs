---
outline: false
---

# Orders

The Orders menu is the heart of Sales: browse every order in the store and run every per-order action. From here you can view a single order in full, drive the admin **Create Order** flow (reorder an existing order, or place a prepared draft cart), run order lifecycle actions (cancel an order, add and list its comments), and generate the documents an order produces — invoices, shipments, and refunds. It mirrors the admin **Sales → Orders** screen.

Invoices, shipments, and refunds are **generated from an order** here, but each also has its own store-wide menu listing every such document across all orders: see the [Invoices](/api/graphql-api/admin/sales/invoices/), [Shipments](/api/graphql-api/admin/sales/shipments/), and [Refunds](/api/graphql-api/admin/sales/refunds/) overviews.

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
