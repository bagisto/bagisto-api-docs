---
outline: false
---

# Newsletter Subscribers

A **newsletter subscriber** is one email address signed up to receive the store's
marketing emails. The list is the store's newsletter audience, and it mirrors the
admin **Marketing → Communications → Newsletter Subscribers** screen.

## How newsletter subscribers work

Subscribers are **created from the storefront**, not from the admin API — a shopper
opts in through the storefront newsletter form (double opt-in). The admin side
exists to **moderate** that audience: list it, view a row, toggle a row's
subscription state, or remove a row. There is no create operation and no
mass-delete.

- **`email`** — the subscribed address.
- **`isSubscribed`** — the subscription state. Toggling it switches the address
  on or off. When the address belongs to a registered customer, the same flag is
  mirrored onto that customer's newsletter preference, so the two stay in sync.
- **`channel`** — the storefront channel the subscriber opted in on, as a
  detail-only object (`{ id, _id, code, name }`); it is `null` on list rows.
- **`customerId` / `customerName`** — set when the subscriber's email matches a
  registered customer; `null` for a guest subscriber who signed up without an
  account.
- **Delete** — removes the row, first unsubscribing the linked customer (if any).

**Relation to Campaigns.** A [Campaign](/api/graphql-api/admin/marketing/communications/campaigns/)
sends an email template to the **subscribed** members of a customer group — so the
subscriber list determines who actually receives a send.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/communications/subscribers-list) | `adminMarketingSubscribers` query |
| [Detail](/api/graphql-api/admin/marketing/communications/subscribers-detail) | `adminMarketingSubscriber` query |
| [Toggle](/api/graphql-api/admin/marketing/communications/subscribers-toggle) | `updateAdminMarketingSubscriber` mutation |
| [Delete](/api/graphql-api/admin/marketing/communications/subscribers-delete) | `deleteAdminMarketingSubscriber` mutation |

`customerId` and `customerName` resolve only when the subscriber's email matches a
registered customer — they are `null` for guest subscribers.

All Newsletter Subscribers operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
