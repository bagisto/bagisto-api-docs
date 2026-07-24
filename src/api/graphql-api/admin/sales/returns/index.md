---
outline: false
---

# Returns (RMA)

The Returns menu is the admin queue for **RMA (Return Merchandise Authorization) requests** — the returns and item-cancellations customers raise against their orders. It mirrors the admin **Sales → Returns** screen: browse the queue, open a request for detail, create a return for any order, move a request through its status workflow, reopen a closed one, and exchange messages with the customer.

## What a return holds

Each RMA request records the order it belongs to (`orderId` / `orderIncrementId` / `orderStatus`), the customer context (`customerName` / `customerEmail` / `isGuest`), the current status (`statusId` / `statusTitle` / `statusColor`), the package condition, an optional `information` note, and the single returned item (`item`) with its resolution (`return` or a `cancel_items` cancellation) and reason. Attached proof images are listed in `images`.

## Status workflow

A request moves through a set of statuses (Pending, Accept, Declined, Dispatched package, Received package, Item canceled, …). Each request's `availableStatuses` field lists the exact status transitions the admin may set next — use those ids when calling **Update Status**.

## Update Status — the action semantics

Setting a status is more than a label change for two special statuses:

- **Received package** — creates a **refund** for the returned item. Send a `shipping` amount to include shipping in the refund; omit or send `0` to refund the item only.
- **Item canceled** — **cancels the order item** and restores its inventory.

Any other status just updates the status. Every status change adds a note to the conversation and notifies the customer.

## Reopen

A declined or canceled request can be **reopened** back to Pending when store settings allow it (otherwise the mutation returns an error). The `canReopen` flag on the detail tells you whether reopening is currently possible.

## Creating a return

To open a return for an order, first list the order's **returnable items** (`adminReturnableItems`) to get the trusted quantity caps, and the active **return reasons** (`adminReturnReasons`) for the chosen resolution type, then call **Create Return**. `rmaQty` is capped server-side by the item's returnable/cancelable quantity.

## Messages

Each request has a conversation thread. **List Messages** returns the thread newest-first; **Send Message** posts an admin reply and notifies the customer.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List Returns](./queries/list-returns.md) | `adminReturns` query |
| [View Return](./queries/view-return.md) | `adminReturn(id:)` query |
| [List Returnable Items](./queries/list-returnable-items.md) | `adminReturnableItems(orderId:)` query |
| [List Return Reasons](./queries/list-return-reasons.md) | `adminReturnReasons(resolutionType:)` query |
| [List Return Messages](./queries/list-return-messages.md) | `adminReturnMessages(returnId:)` query |
| [Create Return](./mutations/create-return.md) | `createAdminReturn` mutation |
| [Update Status](./mutations/update-status.md) | `updateStatusAdminReturn` mutation |
| [Reopen Return](./mutations/reopen-return.md) | `reopenAdminReturn` mutation |
| [Send Message](./mutations/send-return-message.md) | `createAdminReturnMessage` mutation |

Permissions: `sales.rma.requests` for reads / status changes / reopen / messages, and `sales.rma.requests.create` to create a return.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
