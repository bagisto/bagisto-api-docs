---
outline: false
---

# EU Right of Withdrawal

The EU right-of-withdrawal endpoints let a shopper formally declare that they are exercising their statutory right to withdraw from a purchase (the EU "cooling-off" right). Filing a declaration records the withdrawal against an order and triggers a durable-medium confirmation email back to the shopper — the legally required acknowledgement that the store received their notice.

Both **authenticated customers** (filing against one of their own orders) and **guests** (proving ownership with an order increment id + email) can file a declaration.

## Authentication

The list, view and authenticated-file operations require an authenticated **customer** — provide the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page for how to obtain and send them.

The **guest** file operation requires only the storefront key — no customer token. Ownership of the order is proved by supplying the matching order increment id and email.

## Filing is idempotent

Filing a withdrawal is **idempotent per order**. If a declaration already exists for the given order, a second `createEuWithdrawal` / `createGuestEuWithdrawal` call returns the existing declaration unchanged instead of creating a duplicate or raising an error. A confirmation email is sent when the declaration is first created.

## Confirmation on a durable medium

When a declaration is first recorded, the store sends a confirmation email to the shopper — the durable-medium acknowledgement the withdrawal right requires. The `confirmationSentAt` timestamp reflects when that email was dispatched.

## Guest vs authenticated

| Flow | Who | How ownership is proved | Fields returned |
|------|-----|-------------------------|-----------------|
| Authenticated | Logged-in customer | The order belongs to the authenticated customer | Full set (includes decline / refund fields) |
| Guest | Anyone with the order details | Order increment id **+** email must match a guest order | Reduced set (no decline / refund fields) |

## Declaration lifecycle

A withdrawal declaration moves through these statuses:

| Status | Meaning |
|--------|---------|
| `received` | The declaration was received and acknowledged. |
| `declined` | The store reviewed and declined the withdrawal. |
| `refunded` | The withdrawal was accepted and the order refunded. |

## Endpoints

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List own declarations | [`euWithdrawals`](/api/graphql-api/shop/eu-withdrawal/queries/list-eu-withdrawals) | Paginated list of the authenticated customer's own declarations. |
| View one declaration | [`euWithdrawal`](/api/graphql-api/shop/eu-withdrawal/queries/view-eu-withdrawal) | A single declaration the customer owns. |
| File (authenticated) | [`createEuWithdrawal`](/api/graphql-api/shop/eu-withdrawal/mutations/create-eu-withdrawal) | File a declaration against one of the customer's own orders. |
| File (guest) | [`createGuestEuWithdrawal`](/api/graphql-api/shop/eu-withdrawal/mutations/create-guest-eu-withdrawal) | File a declaration for a guest order using order id + email. |
