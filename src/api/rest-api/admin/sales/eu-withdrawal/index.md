---
outline: false
apiType: rest
---

# EU Withdrawal

The EU Withdrawal menu is the store-wide queue of every **right-of-withdrawal declaration** a customer has filed against an order — the EU consumer's statutory right to withdraw from a distance purchase. It mirrors the admin **Sales → EU Withdrawal** screen: browse declarations, open one for its full evidence timeline, and act on it (decline, mark refunded, or resend the confirmation email).

## When a row appears here

A row exists once a customer has **submitted a withdrawal declaration** for an order from the storefront. Each declaration captures who filed it (the customer or a guest), against which order, in which channel and locale, the free-text reason, and the moment it was received.

## The evidence timeline

Every declaration keeps a durable, ordered record of what happened and when — this is the compliance evidence a merchant must retain:

1. **Received** — the customer submits the declaration (`receivedAt`, `status: received`).
2. **Confirmation email** — the storefront sends a durable-medium acknowledgement to the customer (`confirmationSentAt`). If sending failed, the reason is recorded in `confirmationError`; `finalConfirmationSentAt` records a later re-send.
3. **Outcome** — the merchant either:
   - **Declines** the declaration when the purchase is exempt from withdrawal (`status: declined`, `declinedAt`, `declinedReason`, `declinedByUserId`, `declinedByName`), or
   - **Marks it refunded** once the money has been returned out-of-band (`status: refunded`, `refundedAt`, `refundedByUserId`, `refundedByName`, `refundNote`).

The two outcomes are mutually exclusive: **declining clears any prior refund metadata, and marking refunded clears any prior decline metadata**, so a declaration always reflects a single, current outcome.

**Resend confirmation** re-sends the durable-medium acknowledgement email in the declaration's locale and refreshes `confirmationSentAt` — used when the original email bounced or the customer asks for another copy.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List declarations](/api/rest-api/admin/sales/eu-withdrawal/list-eu-withdrawals) | `GET /api/admin/eu-withdrawals` |
| [Get a single declaration](/api/rest-api/admin/sales/eu-withdrawal/get-eu-withdrawal) | `GET /api/admin/eu-withdrawals/{id}` |
| [Decline a declaration](/api/rest-api/admin/sales/eu-withdrawal/decline) | `POST /api/admin/eu-withdrawals/{id}/decline` |
| [Mark refunded](/api/rest-api/admin/sales/eu-withdrawal/mark-refunded) | `POST /api/admin/eu-withdrawals/{id}/mark-refunded` |
| [Resend confirmation](/api/rest-api/admin/sales/eu-withdrawal/resend-confirmation) | `POST /api/admin/eu-withdrawals/{id}/resend-confirmation` |

All EU Withdrawal endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication). The listing and detail endpoints require the `sales.eu_withdrawals` permission; each action requires its own permission (noted on its page).
