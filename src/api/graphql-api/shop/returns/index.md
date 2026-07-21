---
outline: false
---

# Returns (RMA)

Returns — also called RMA (Return Merchandise Authorization) — let a logged-in customer ask the store to take back or cancel an item they ordered. A customer can raise a return for an eligible item, converse with the store about it through a message thread, and cancel, reopen or close the request. Every return is scoped to the customer who owns it; a customer can only ever see and act on their own returns.

## Authentication

All return endpoints require an authenticated **customer** — provide the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page for how to obtain and send them.

## How a return works

1. **Find eligible items.** Query [`returnableItems`](/api/graphql-api/shop/returns/queries/list-returnable-items) for an order to see which items are still within their return window and how many units can be returned or canceled.
2. **Pick a reason.** Query [`returnReasons`](/api/graphql-api/shop/returns/queries/list-return-reasons) for the resolution type (`return` or `cancel_items`) to get the reason ids to choose from.
3. **Raise the return.** Call [`createCustomerReturn`](/api/graphql-api/shop/returns/mutations/create-return) with the order, the item, a quantity, the resolution type and a reason id. The return starts in a `Pending` status.
4. **Converse.** Read the thread with [`customerReturnMessages`](/api/graphql-api/shop/returns/queries/list-return-messages) and add messages with [`createCustomerReturnMessage`](/api/graphql-api/shop/returns/mutations/send-return-message).
5. **Cancel, reopen or close.** Use [`cancelCustomerReturn`](/api/graphql-api/shop/returns/mutations/cancel-return), [`reopenCustomerReturn`](/api/graphql-api/shop/returns/mutations/reopen-return) or [`closeCustomerReturn`](/api/graphql-api/shop/returns/mutations/close-return) to change the state of the request.

## Status flags

Each return carries three action flags that tell a client which operations are currently allowed:

| Flag | Meaning |
|------|---------|
| `canClose` | The return can be closed (marked solved) by the customer. |
| `canReopen` | The return can be reopened back to pending. |
| `isExpired` | The return is past its allowed action window. |

These flags are populated on the single-return view; on the list they come back `null`.

## Quantity caps are enforced by the store

When raising a return, the quantity you send is capped server-side by the trusted quantity a customer is actually allowed to return or cancel for that item (`forReturnQuantity` / `forCancelQuantity` from `returnableItems`). You can never return more units than were ordered and are still eligible.

## Endpoints

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List own returns | [`customerReturns`](/api/graphql-api/shop/returns/queries/list-returns) | Paginated list of the customer's own returns. |
| View one return | [`customerReturn`](/api/graphql-api/shop/returns/queries/view-return) | A single return the customer owns. |
| List returnable items | [`returnableItems`](/api/graphql-api/shop/returns/queries/list-returnable-items) | Return-eligible items of one of the customer's orders. |
| List return reasons | [`returnReasons`](/api/graphql-api/shop/returns/queries/list-return-reasons) | Active reasons for a resolution type. |
| List return messages | [`customerReturnMessages`](/api/graphql-api/shop/returns/queries/list-return-messages) | The conversation thread of a return. |
| Raise a return | [`createCustomerReturn`](/api/graphql-api/shop/returns/mutations/create-return) | Create a new return for one order item. |
| Cancel a return | [`cancelCustomerReturn`](/api/graphql-api/shop/returns/mutations/cancel-return) | Cancel the customer's own return. |
| Reopen a return | [`reopenCustomerReturn`](/api/graphql-api/shop/returns/mutations/reopen-return) | Reopen a canceled/declined return. |
| Close a return | [`closeCustomerReturn`](/api/graphql-api/shop/returns/mutations/close-return) | Mark a return solved. |
| Send a message | [`createCustomerReturnMessage`](/api/graphql-api/shop/returns/mutations/send-return-message) | Add a message to the return conversation. |
