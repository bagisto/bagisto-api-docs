---
outline: false
examples:
  - id: delete-product-review
    title: Delete Product Review
    description: Delete an existing product review.
    request: |
      DELETE /api/shop/reviews/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 204 No Content
    commonErrors:
      - error: 403 Forbidden — This review was not written by you
        cause: The review belongs to another customer, or to a guest
        solution: A review can only be removed by the customer who wrote it
      - error: 403 Forbidden — Please login to manage your review
        cause: No customer Bearer token was sent
        solution: Log the customer in and retry
      - error: 404 Not Found
        cause: No review carries that ID
        solution: Use an ID from the customer's own reviews

---

# Delete Product Review

Delete an existing product review. Only the review author can delete their own review.

## Endpoint

```
DELETE /api/shop/reviews/{reviewId}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (review author required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reviewId` | integer | Yes | The review to remove. No product ID is part of the path. |

## Response

`204 No Content` with an empty body. There is no confirmation message — the status is the confirmation.

## Ownership

A review may only be removed by the customer who wrote it, checked against the stored author:

- Another customer's review answers `403`.
- A review submitted by a guest has no author and can never be removed through the API — also `403`.
- Deletion is permanent; the row is not soft-deleted and cannot be restored.

## Use Cases

- **"Delete your review" on a product page** — call with the review ID and drop the row locally; the empty body leaves nothing to re-render from.
- **Replace a review** — there is no resubmit flow, so removing and creating again is how a shopper starts over. The new review returns to `pending`.

## Best Practices

- **Confirm before calling** — the removal is immediate and irreversible.
- **Prefer [Update](/api/rest-api/shop/product-reviews/update-product-review) for corrections** — editing keeps an approved review live, while deleting and recreating sends it back into moderation.
- **Do not parse a body** — a `204` carries none.

## Related Resources

- [Get Product Review](/api/rest-api/shop/product-reviews/get-product-review) — one review by id, whatever its status
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review) — submit a review; it starts as pending
- [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review) — edit the customer's own review
