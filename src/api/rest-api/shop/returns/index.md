---
outline: false
---

# Returns (RMA)

Returns — also called RMA (Return Merchandise Authorization) — let a logged-in customer ask the store to take back or cancel an item they ordered. A customer can raise a return for an eligible item, converse with the store about it through a message thread, and cancel, reopen or close the request. Every return is scoped to the customer who owns it; a customer can only ever see and act on their own returns.

## Authentication

All return endpoints require an authenticated **customer** — provide the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page for how to obtain and send them.

## Returns must be switched on first

Returns are off out of the box. Nothing in the API errors when they are — [`GET /api/shop/returnable-items`](/api/rest-api/shop/returns/list-returnable-items) simply comes back empty, and a client sees an order with no returnable rows rather than a message explaining why. Three things have to line up, all configured on the admin side:

| Requirement | Where it lives | Effect when unset |
|-------------|----------------|-------------------|
| **Allowed product types** | Configuration → Sales → RMA → *Allowed product types* | An empty setting makes **nothing** returnable — it does not mean "all types". A product whose type is absent from the list is never eligible. |
| **Allow RMA on the product** | The product's own `allow_rma` attribute, off by default | That product's order items are never returnable. |
| **Return window** | The product's active RMA rule, otherwise Configuration → Sales → RMA → *Default allow days* (default `7`) | Falls back to the configured default. |

The decision is made **when the order is placed**, not when the return is requested: the resolved window is written onto the order item and frozen there. Enabling RMA later therefore does not make existing orders returnable — only orders placed after the change qualify. A client testing the flow against pre-existing orders will see an empty list no matter how the settings are changed.

An item then stays returnable while the order date plus that window has not passed, and while some quantity remains unrefunded and uncanceled.

## How a return works

1. **Find eligible items.** Call [`GET /api/shop/returnable-items`](/api/rest-api/shop/returns/list-returnable-items) for an order to see which items are still within their return window and how many units can be returned or canceled.
2. **Pick a reason.** Call [`GET /api/shop/return-reasons`](/api/rest-api/shop/returns/list-return-reasons) for the resolution type (`return` or `cancel_items`) to get the reason ids to choose from.
3. **Raise the return.** Call [`POST /api/shop/returns`](/api/rest-api/shop/returns/create-return) with the order, the item, a quantity, the resolution type and a reason id. The return starts in a `Pending` status.
4. **Converse.** Read the thread with [`GET /api/shop/return-messages`](/api/rest-api/shop/returns/list-return-messages) and add messages with [`POST /api/shop/return-messages`](/api/rest-api/shop/returns/send-return-message).
5. **Cancel, reopen or close.** Use [cancel](/api/rest-api/shop/returns/cancel-return), [reopen](/api/rest-api/shop/returns/reopen-return) or [close](/api/rest-api/shop/returns/close-return) to change the state of the request.

## Status flags

Each return carries three action flags that tell a client which operations are currently allowed:

| Flag | Meaning |
|------|---------|
| `canClose` | The return can be closed (marked solved) by the customer. |
| `canReopen` | The return can be reopened back to pending. |
| `isExpired` | The return is past its allowed action window. |

These flags are populated on the single-return view; on the list they come back `null`.

## Quantity caps are enforced by the store

When raising a return, the quantity you send is capped server-side by the trusted quantity a customer is actually allowed to return or cancel for that item (`forReturnQuantity` / `forCancelQuantity` from `returnable-items`). You can never return more units than were ordered and are still eligible.

## Endpoints

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [List own returns](/api/rest-api/shop/returns/list-returns) | `GET /api/shop/returns` | The customer's own returns, newest first. |
| [View one return](/api/rest-api/shop/returns/view-return) | `GET /api/shop/returns/{id}` | A single return the customer owns. |
| [Raise a return](/api/rest-api/shop/returns/create-return) | `POST /api/shop/returns` | Create a new return for one order item. |
| [Cancel a return](/api/rest-api/shop/returns/cancel-return) | `POST /api/shop/returns/{id}/cancel` | Cancel the customer's own return. |
| [Reopen a return](/api/rest-api/shop/returns/reopen-return) | `POST /api/shop/returns/{id}/reopen` | Reopen a canceled/declined return. |
| [Close a return](/api/rest-api/shop/returns/close-return) | `POST /api/shop/returns/{id}/close` | Mark a return solved. |
| [List returnable items](/api/rest-api/shop/returns/list-returnable-items) | `GET /api/shop/returnable-items` | Return-eligible items of one of the customer's orders. |
| [List return reasons](/api/rest-api/shop/returns/list-return-reasons) | `GET /api/shop/return-reasons` | Active reasons for a resolution type. |
| [List return messages](/api/rest-api/shop/returns/list-return-messages) | `GET /api/shop/return-messages` | The conversation thread of a return. |
| [Send a message](/api/rest-api/shop/returns/send-return-message) | `POST /api/shop/return-messages` | Add a message to the return conversation. |
