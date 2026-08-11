---
outline: false
examples:
  - id: get-product-review
    title: Get Single Product Review
    description: Retrieve detailed information for a specific product review.
    request: |
      GET /api/shop/reviews/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      HTTP/1.1 200 OK

      {
        "id": 40,
        "name": "John Doe",
        "title": "Great air fryer",
        "rating": 4,
        "comment": "Cooks evenly and cleans easily.",
        "status": "pending",
        "createdAt": "2026-08-07T16:04:39+05:30",
        "updatedAt": "2026-08-07T16:04:51+05:30"
      }
    commonErrors:
      - error: 404 Not Found
        cause: No review carries that ID
        solution: Use an ID returned by Get Product Reviews
      - error: 401 Unauthorized
        cause: The storefront key header was missing or wrong
        solution: Send X-STOREFRONT-KEY on the request

---

# Get Product Review

Retrieve detailed information for a specific product review.

## Endpoint

```
GET /api/shop/reviews/{reviewId}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reviewId` | integer | Yes | The review to read. No product ID is part of the path. |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID. |
| `name` | string | Display name the reviewer submitted. |
| `title` | string | Review headline. |
| `comment` | string | Review body. |
| `rating` | integer | Star rating, 1 to 5. |
| `status` | string | `pending` or `approved`. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

The product and customer behind a review are not part of this payload — there is no `productId`, no `customerId`, and no reviewer email. Helpfulness voting does not exist in the storefront API, so there are no vote counts either.

This endpoint is public and is **not filtered by status**: a `pending` review is readable by ID even though it is absent from the default product listing.

## Use Cases

- **Read back a just-submitted review** — the create response returns the ID, and this fetches the stored row without having to filter the product listing by status.
- **Deep link to one review** — a "permalink" route can render from this single call.

## Best Practices

- **Do not use it to build a review list** — the payload names neither the product nor the author, so listing per product is [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews).
- **Check `status` before displaying publicly** — the endpoint hands back pending rows too, so a page that renders whatever it fetches can leak unapproved content.

## Related Resources

- [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews) — a product's reviews, approved only by default
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review) — submit a review; it starts as pending
- [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review) — edit the customer's own review
