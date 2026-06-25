---
outline: false
apiType: rest
---

# Customers

The Customers section is where you manage everyone who shops on the storefront and the records attached to them — their accounts, address books, internal notes, the groups they belong to, the product reviews they leave, and the privacy (GDPR) requests they raise. It also exposes the read-only panels an admin uses when **building an order on a customer's behalf**. It mirrors the admin **Customers** menu.

## Menus

| Menu | What it's for |
|------|----------------|
| [Customers](/api/rest-api/admin/customers/main/) | The shopper accounts — create, view, edit, delete, suspend, and bulk-manage them. Each customer belongs to a Customer Group and carries order/spend totals. |
| [Addresses](/api/rest-api/admin/customers/addresses/) | A customer's address book — billing/shipping addresses, with one marked default. Used at checkout and when an admin places an order for the customer. |
| [Notes](/api/rest-api/admin/customers/notes/) | Append-only internal notes attached to a customer, optionally emailing the customer when added. |
| [Impersonate](/api/rest-api/admin/customers/impersonate/) | "Login as Customer" — issues a short-lived customer token so an admin can act as that customer against the storefront API. |
| [Customer Groups](/api/rest-api/admin/customers/groups/) | The named groups customers are sorted into (e.g. *general*, *wholesale*, *guest*). Groups drive group-specific pricing and promotions. |
| [Reviews](/api/rest-api/admin/customers/reviews/) | Moderation queue for the product reviews customers submit on the storefront — approve, disapprove, delete. |
| [GDPR Requests](/api/rest-api/admin/customers/gdpr/) | The privacy requests customers raise (data export or account deletion) and the workflow to action them. |
| [Create-Order Helpers](/api/rest-api/admin/customers/create-order-helpers/) | Read-only panels — a customer's active cart, wishlist, and recent purchases — that feed the admin Create-Order flow. |

## How these records relate

- A **Customer** always belongs to a **Customer Group**; the group decides which group-specific prices and promotions apply to them. Deleting a group is blocked while any customer still belongs to it.
- A customer's **Addresses** are reused at checkout and when an admin builds an order for them through the [Create Order](/api/rest-api/admin/sales/orders/) flow under Sales.
- **Reviews** originate on the storefront against catalog products; this menu is moderation only — admins change a review's status, they don't author reviews.
- **GDPR Requests** tie back to a customer: approving a *delete* request cascades into removing that customer's account and related data.
- **Create-Order Helpers** surface a customer's cart, wishlist, and recent items so an admin can quickly seed a draft cart when placing an order on their behalf.

## REST vs. GraphQL

Over REST, each capability is its own endpoint — a separate request for the listing, the single record, and each write — and they are split by HTTP method (`GET` to read, `POST` to create, `PUT` to update, `DELETE` to remove). GraphQL combines a filtered listing with relation-loading and a single-record fetch in one query; the REST docs reflect the per-endpoint separation instead.

## Conventions across the Customers API

A few behaviours are common to every Customers menu over REST:

- **Listings are paginated.** Every `GET` collection returns a `{ data, meta }` envelope; page with `?page=` and `?per_page=` (default 10, cap 50). Supplying multiple filter params narrows the result (logical AND).
- **Nested objects, not flat ids.** A customer's detail/list rows return the group as a nested `group` object; a review's detail returns nested `product` and `customer` objects plus an `images` array — no flat id/name columns to cross-reference.
- **Detail-only fields.** Aggregates and nested data (a customer's `totalOrders` / `totalAddresses` / `totalAmountSpent`, a review's images) are populated only on the single-record `GET`, not on the listing rows.
- **Permission gates.** Write operations are gated by the matching `customers.*` permission; an admin whose role lacks it gets a `403`.

All Customers endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
