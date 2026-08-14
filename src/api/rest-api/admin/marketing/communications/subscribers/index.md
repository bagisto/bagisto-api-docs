---
outline: false
---

# Newsletter Subscribers

A **newsletter subscriber** is one email address signed up to receive newsletters and campaign emails for a storefront channel. The list is your newsletter audience — the people a campaign reaches. It mirrors the admin **Marketing → Communications → Newsletter Subscribers** screen.

## How newsletter subscribers work

Subscriber rows are created by the **storefront** — a shopper opts in through the newsletter sign-up (double opt-in). There is no admin "create subscriber" action; the admin only moderates the audience.

- **The audience.** Each row pairs an `email` with the channel it subscribed on (a detail-only `channel` object `{ id, code, name }`, `null` on list rows). `isSubscribed` (`true` / `false`) is whether that address currently receives mail.
- **Customer link.** When a subscriber's email matches a registered customer, `customerId` and `customerName` resolve to that customer; otherwise both are `null` (a guest subscriber).
- **Toggling.** Setting `isSubscribed` flips the subscription. When the row is linked to a customer, the same flag is mirrored onto that customer's newsletter preference, so the two stay in sync.
- **Deleting.** Removing a subscriber first unsubscribes the linked customer (if any), then deletes the row.

**Relation to other menus.** A [Campaign](/api/rest-api/admin/marketing/communications/campaigns/) sends its email template to the **subscribed** members of a customer group — only `isSubscribed: true` rows in that group receive the send.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/communications/subscribers-list) | `GET /api/admin/marketing/subscribers` |
| [Detail](/api/rest-api/admin/marketing/communications/subscribers-detail) | `GET /api/admin/marketing/subscribers/{id}` |
| [Toggle](/api/rest-api/admin/marketing/communications/subscribers-toggle) | `PUT /api/admin/marketing/subscribers/{id}` |
| [Delete](/api/rest-api/admin/marketing/communications/subscribers-delete) | `DELETE /api/admin/marketing/subscribers/{id}` |

There is no create endpoint (subscriptions originate from the storefront) and no mass-delete.
