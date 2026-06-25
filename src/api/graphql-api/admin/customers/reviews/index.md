---
outline: false
---

# Reviews

The Reviews menu is the moderation queue for the product reviews customers leave on the storefront. Reviews are written by shoppers against catalog products; this menu is **moderation only** — you approve, disapprove, or delete them, but you never author one here. It mirrors the admin **Customers → Reviews** screen.

## Where reviews come from

Every row originates from a storefront customer submitting a review on a product. A review carries the shopper's rating, title, and comment, and may include attached images. New reviews land in `pending` until an admin acts on them.

## Status workflow

A review's `status` moves between three values:

| Status | Meaning |
|--------|---------|
| `pending` | Newly submitted, awaiting moderation. Not shown on the storefront yet. |
| `approved` | Visible on the product's storefront page. |
| `disapproved` | Hidden — rejected by a moderator. |

The only editable field is `status` — the rating, title, comment, and images belong to the customer and are not changed here. Approving a review can trigger a notification to its author.

## What the detail query exposes

The single-review query embeds the related records so you don't need follow-up calls:

- `product` — the reviewed product as a nested object.
- `customer` — the review's author as a nested object (may be absent for guest reviews).
- `images` — the attached review images as a connection (`edges { node { … } }`). **Detail-only** — listing rows omit images.

## Bulk actions

- **Mass Delete** removes several reviews at once.
- **Mass Update Status** sets the same status on several reviews in one call (`value` is `pending` / `approved` / `disapproved`).

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List Reviews](./list.md) | `adminCustomerReviews` query |
| [Review Detail](./detail.md) | `adminCustomerReview(id:)` query |
| [Update Status](./update.md) | `updateAdminCustomerReview` mutation |
| [Delete Review](./delete.md) | `deleteAdminCustomerReview` mutation |
| [Mass Delete](./mass-delete.md) | `createAdminCustomerReviewMassDelete` mutation |
| [Mass Update Status](./mass-update-status.md) | `createAdminCustomerReviewMassUpdateStatus` mutation |

Permissions: `customers.reviews.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
