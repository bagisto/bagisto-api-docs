---
outline: false
---

# Sales

The Sales section covers everything about an order after (and during) checkout — browsing and managing orders, building an order from the admin side, and the post-order documents an order produces.

## Menus

| Menu | What it's for |
|------|----------------|
| [Orders](/api/graphql-api/admin/sales/orders/) | Browse orders and run every per-order action — view, reorder, place, cancel, comment, and generate invoices / shipments / refunds. Admins can also **build an order for a customer** from here. |
| [Invoices](/api/graphql-api/admin/sales/invoices/) | Store-wide list of generated invoices, plus send-duplicate and bulk status update. |
| [Shipments](/api/graphql-api/admin/sales/shipments/) | Store-wide list of shipments created against orders. |
| [Refunds](/api/graphql-api/admin/sales/refunds/) | Store-wide list of refunds issued against orders. |
| [Transactions](/api/graphql-api/admin/sales/transactions/list) | Payment transactions recorded against orders and invoices. |
| [Bookings](/api/graphql-api/admin/sales/bookings/) | Booking lines produced by orders that contain a booking product. |

Invoices, shipments, refunds, transactions, and bookings are **documents an order produces** — a row appears in those menus only once the corresponding document exists for an order.
