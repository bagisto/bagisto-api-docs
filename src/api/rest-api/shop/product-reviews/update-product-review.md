---
outline: false
examples:
  - id: update-product-review
    title: Update Product Review
    description: Edit a review the authenticated customer wrote. The method is PATCH and the body must be sent as merge-patch JSON.
    request: |
      PATCH /api/shop/reviews/40
      Content-Type: application/merge-patch+json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken

      {
        "title": "Great air fryer",
        "rating": 4
      }
    response: |
      HTTP/1.1 200 OK

      {
        "id": 40,
        "name": "John Doe",
        "title": "Great air fryer",
        "rating": 4,
        "comment": "Very satisfied with this purchase. Great quality and fast delivery.",
        "status": "pending",
        "createdAt": "2026-08-07T16:04:39+05:30",
        "updatedAt": "2026-08-07T16:04:51+05:30"
      }
    commonErrors:
      - error: 415 Unsupported Media Type
        cause: The request used Content-Type application/json
        solution: Send Content-Type application/merge-patch+json — this endpoint accepts nothing else
      - error: 403 Forbidden — This review was not written by you
        cause: The review belongs to another customer, or to a guest
        solution: A review can only be edited by the customer who wrote it
      - error: 403 Forbidden — Please login to manage your review
        cause: No customer Bearer token was sent
        solution: Log the customer in and retry
      - error: 400 Bad Request — Rating must be between 1 and 5
        cause: rating fell outside 1–5
        solution: Send an integer from 1 to 5
      - error: 404 Not Found
        cause: No review carries that ID
        solution: Use an ID returned when the review was created, or from the customer's own review list

---

# Update Product Review

Edit a review the authenticated customer wrote.

## Endpoint

```
PATCH /api/shop/reviews/{reviewId}
```

The verb is `PATCH`, and the body must carry `Content-Type: application/merge-patch+json`. `PUT` is not routed, and a plain `application/json` body is rejected with `415`.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | `application/merge-patch+json` |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token of the customer who wrote the review |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reviewId` | integer | Yes | The review to edit. No product ID is part of the path. |

## Request Body

```json
{
  "title": "Great air fryer",
  "rating": 4
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | No | New headline. |
| `comment` | string | No | New body text. |
| `rating` | integer | No | New star rating, 1 to 5. |
| `name` | string | No | New display name. |

Every field is optional — the update is a partial patch, and anything omitted keeps its stored value.

## Response Fields (200 OK)

The updated review, flat — the same shape [Create](/api/rest-api/shop/product-reviews/create-product-review) returns.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID. |
| `name` | string | Display name. |
| `title` / `comment` | string | Review text after the edit. |
| `rating` | integer | Star rating after the edit. |
| `status` | string | Moderation status. Editing does not reset it. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps; only `updatedAt` moves. |

## Ownership

A review may only be edited by the customer who wrote it. The check is on the stored author, not on the token alone, so:

- Another customer's review answers `403`.
- A review submitted by a guest carries no author and can never be edited — also `403`.
- Editing an already-approved review leaves it approved; the store's moderation status is untouched.

## Use Cases

- **"Edit your review" on a product page** — send only the changed fields; the response carries the full row for immediate re-render.
- **Fix a wrong rating without retyping the text** — a body of `{"rating": 4}` alone is valid.

## Best Practices

- **Set the merge-patch content type** — sending `application/json` is the most common failure here and returns `415` rather than a validation error.
- **Do not resend the whole review** — a partial body avoids overwriting text the shopper edited in another tab.
- **Expect the status to stay as it was** — an edit is not resubmitted for approval, so an approved review stays live with the new text.

## Related Resources

- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review) — submit a review; it starts as pending
- [Delete Product Review](/api/rest-api/shop/product-reviews/delete-product-review) — remove the customer's own review
- [Get Product Review](/api/rest-api/shop/product-reviews/get-product-review) — one review by id, whatever its status
