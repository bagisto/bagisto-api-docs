---
outline: false
apiType: rest
---

# Returns (RMA)

The Returns menu is the admin queue for **RMA (Return Merchandise Authorization) requests** — the returns and item-cancellations customers raise against their orders. It mirrors the admin **Sales → Returns** screen: browse the queue, open a request for detail, create a return for any order, move a request through its status workflow, reopen a closed one, and exchange messages with the customer.

## What a return holds

Each RMA request records the order it belongs to (`orderId` / `orderIncrementId` / `orderStatus`), the customer context (`customerName` / `customerEmail` / `isGuest`), the current status (`statusId` / `statusTitle` / `statusColor`), the package condition, an optional `information` note, and the single returned `item` (with its resolution and reason). Attached proof images are listed in `images`.

The nested `item` object uses snake_case keys: `id`, `order_item_id`, `sku`, `name`, `quantity`, `resolution` (`return` or `cancel_items`), `reason_id`, `reason`, `variant_id`.

## Status workflow

A request moves through a set of statuses (Pending, Accept, Declined, Dispatched package, Received package, Item canceled, …). Each request's `availableStatuses` field lists the exact status transitions the admin may set next — a list of `{ id, title }`. Use those ids when calling **Update Status**.

## Update Status — the action semantics

Setting a status is more than a label change for two special statuses:

- **Received package** (status id `5`) — creates a **refund** for the returned item. Send a `shipping` amount to include shipping in the refund; omit or send `0` to refund the item only.
- **Item canceled** (status id `8`) — **cancels the order item** and restores its inventory.

Any other status just updates the status. Every status change adds a note to the conversation and notifies the customer.

## Reopen

A declined or canceled request can be **reopened** back to Pending when store settings allow it (otherwise the request returns `422`). The `canReopen` flag on the detail tells you whether reopening is currently possible.

## Creating a return

To open a return for an order, first list the order's **returnable items** to get the trusted quantity caps, and the active **return reasons** for the chosen resolution type, then POST the return. `rma_qty` is capped server-side by the item's returnable/cancelable quantity. Optional proof images can be attached via multipart `images[]`.

## Messages

Each request has a conversation thread. **List Messages** returns the thread newest-first; **Send Message** posts an admin reply and notifies the customer.

## Response shape

The returns **listing** is wrapped in a `{ data: [...], meta: {...} }` envelope (`meta` = `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`). Detail-only fields (`item`, `images`, `availableStatuses`, `information`, `packageCondition`, `canReopen`, `messagesCount`) are `null` on the listing rows.

The three read-only helper lists — **returnable items**, **return reasons**, and **return messages** — are returned as **plain JSON arrays** (no envelope).

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List returns](./list-returns) | `GET /api/admin/rma/requests` |
| [Get a return](./get-return) | `GET /api/admin/rma/requests/{id}` |
| [Create a return](./create-return) | `POST /api/admin/rma/requests` |
| [Update status](./update-status) | `POST /api/admin/rma/requests/{id}/update-status` |
| [Reopen a return](./reopen-return) | `POST /api/admin/rma/requests/{id}/reopen` |
| [List returnable items](./list-returnable-items) | `GET /api/admin/rma/requests/order-items?order_id=` |
| [List return reasons](./list-return-reasons) | `GET /api/admin/rma/requests/resolution-reasons?resolution_type=` |
| [List return messages](./list-return-messages) | `GET /api/admin/rma/messages?return_id=` |
| [Send a message](./send-return-message) | `POST /api/admin/rma/messages` |

Permissions: `sales.rma.requests` for reads / status changes / reopen / messages, and `sales.rma.requests.create` to create a return. All endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
