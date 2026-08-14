---
outline: false
apiType: rest
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

## What the detail response exposes

The single-review `GET` embeds the related records so you don't need follow-up calls:

- `product` — the reviewed product as a nested object.
- `customer` — the review's author as a nested object (may be absent for guest reviews).
- `images` — the attached review images as an array. **Detail-only** — listing rows omit images.

## Bulk actions

- **Mass Delete** removes several reviews at once.
- **Mass Update Status** sets the same status on several reviews in one call (`value` is `pending` / `approved` / `disapproved`).

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List Reviews](./list.md) | `GET /api/admin/customers/reviews` |
| [Review Detail](./detail.md) | `GET /api/admin/customers/reviews/{id}` |
| [Update Status](./update.md) | `PUT /api/admin/customers/reviews/{id}` |
| [Delete Review](./delete.md) | `DELETE /api/admin/customers/reviews/{id}` |
| [Mass Delete](./mass-delete.md) | `POST /api/admin/customers/reviews/mass-delete` |
| [Mass Update Status](./mass-update-status.md) | `POST /api/admin/customers/reviews/mass-update-status` |

Permissions: `customers.reviews.edit` / `.delete`.
