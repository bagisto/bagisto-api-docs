---
outline: false
apiType: rest
---

# Product Review

The Product Review menu covers the ratings and reviews shoppers leave on products. Anyone can read the reviews on a product; a logged-in customer can write a new review and edit or delete their own.

## Read vs. write

Reading is public — a storefront key is enough for both the per-product listing and a single review by ID. Writing requires a customer Bearer token unless the store has guest reviews switched on, and a review can only be edited or deleted by the customer who wrote it.

Two store settings gate submission: customer reviews can be switched off entirely, and guest reviews separately. Both are enforced on the API, so a form should not be shown when the store has reviews disabled.

New reviews are stored as `pending` and are excluded from the default product listing until an admin approves them. A single review fetched by ID is returned whatever its status.

## Review Lifecycle

| Status | Meaning | Where it shows |
|--------|---------|----------------|
| `pending` | Just submitted, awaiting moderation | Absent from the default product listing; readable by id, or with `?status=pending` |
| `approved` | Published by an admin | The default listing |
| `disapproved` | Reviewed and rejected | Only with `?status=disapproved` |

The status is `disapproved`, not "rejected". Editing an approved review does **not** send it back for moderation — the text changes and the review stays live.

## Reading Reviews

The per-product listing defaults to approved only, and takes one `status` value plus one `rating` at a time; combining them narrows further. Rows come back oldest-first by id, with no sort parameter, so a "most recent" widget has to request the last page or reverse the array. The count is in `X-Total-Count`, since the body is one page of up to 50.

There is no aggregate endpoint — no average rating, no per-star counts. A rating histogram means one call per star value, reading `X-Total-Count` off each.

## Writing a Review

The write routes do not sit under the product: creating is `POST /api/shop/reviews` with `productId` **in the body**, and editing and deleting address `/api/shop/reviews/{id}`. Updating is `PATCH` with `Content-Type: application/merge-patch+json` — plain `application/json` is refused with `415`, and `PUT` is not routed at all.

`title`, `comment`, `rating` (1–5) and `productId` are required on create; `name` is optional but is **not** filled in from the customer's profile, so a review submitted without it displays with an empty author.

Nothing prevents the same customer reviewing the same product twice — enforce a one-review rule client-side if the store wants one.

## Ownership

A review may only be edited or removed by the customer who wrote it, checked against the stored author rather than the token alone. Another customer's review answers `403`, and a review submitted by a guest carries no author, so it can never be changed once submitted.

## The Customer's Own Reviews

A shopper's review history is a separate menu — [Customer Reviews](/api/rest-api/shop/customer-reviews/get-customer-reviews) — and unlike this one it applies no status filter, which is what lets a customer see their own pending submission.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews) | `GET /api/shop/products/{id}/reviews` | List a product's reviews. Approved only unless `?status=` says otherwise. |
| [Get Product Review](/api/rest-api/shop/product-reviews/get-product-review) | `GET /api/shop/reviews/{id}` | A single review by ID, any status. |
| [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review) | `POST /api/shop/reviews` | Submit a review. The product goes in the body, not the path. |
| [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review) | `PATCH /api/shop/reviews/{id}` | Edit the customer's own review. Requires `application/merge-patch+json`. |
| [Delete Product Review](/api/rest-api/shop/product-reviews/delete-product-review) | `DELETE /api/shop/reviews/{id}` | Remove the customer's own review. |

There is also `GET /api/shop/reviews`, a flat listing across all products, subject to the same approved-only default.

Read endpoints need only the storefront key; create, update and delete require a customer Bearer token — see [Authentication](/api/rest-api/authentication).
