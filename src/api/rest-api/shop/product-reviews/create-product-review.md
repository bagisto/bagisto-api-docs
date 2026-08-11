---
outline: false
examples:
  - id: create-product-review
    title: Create Product Review
    description: Submit a review for a product. The product is named in the body, not in the path, and the review is stored as pending until an admin approves it.
    request: |
      POST /api/shop/reviews
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken

      {
        "productId": 126,
        "title": "Excellent product!",
        "comment": "Very satisfied with this purchase. Great quality and fast delivery.",
        "rating": 5,
        "name": "John Doe"
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 40,
        "name": "John Doe",
        "title": "Excellent product!",
        "rating": 5,
        "comment": "Very satisfied with this purchase. Great quality and fast delivery.",
        "status": "pending",
        "createdAt": "2026-08-07T16:04:39+05:30",
        "updatedAt": "2026-08-07T16:04:39+05:30"
      }
    commonErrors:
      - error: 400 Bad Request — Review title is required
        cause: title was empty or missing
        solution: Send a non-empty title; comment is required the same way
      - error: 400 Bad Request — Rating must be between 1 and 5
        cause: rating fell outside 1–5
        solution: Send an integer from 1 to 5
      - error: 404 Not Found — Product not found
        cause: No product carries that productId
        solution: Use an ID returned by the product endpoints
      - error: 403 Forbidden — Guest reviews are not allowed
        cause: No customer token was sent and the store has guest reviews switched off
        solution: Log the customer in, or have the store enable guest reviews
      - error: 403 Forbidden — Reviews are disabled
        cause: The store has customer reviews switched off entirely
        solution: Nothing client-side; reviews must be enabled in the admin panel

---

# Create Product Review

Submit a review and rating for a product.

## Endpoint

```
POST /api/shop/reviews
```

The product is identified by `productId` **in the body**. There is no `POST /products/{id}/reviews` route — that path exists for reading only.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Depends | Customer Bearer token. Required unless the store allows guest reviews. |

## Request Body

```json
{
  "productId": 126,
  "title": "Excellent product!",
  "comment": "Very satisfied with this purchase.",
  "rating": 5,
  "name": "John Doe"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `productId` | integer | Yes | The product being reviewed. `product_id` is accepted as well. |
| `title` | string | Yes | Review headline. |
| `comment` | string | Yes | Review body. No minimum length is enforced. |
| `rating` | integer | Yes | Star rating from 1 to 5. |
| `name` | string | No | Display name shown with the review. |

## Response Fields (201 Created)

The stored review, flat — there is no wrapper object and no message.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID. Needed for [Update](/api/rest-api/shop/product-reviews/update-product-review) and [Delete](/api/rest-api/shop/product-reviews/delete-product-review). |
| `name` | string | Display name as submitted. |
| `title` / `comment` | string | Review text as submitted. |
| `rating` | integer | Star rating. |
| `status` | string | Always `pending` on creation. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

The product ID is not echoed back — keep it client-side if the confirmation screen needs it.

## Who Can Review

Two store settings gate this endpoint, and both are enforced here.

| Setting | Effect when off |
|---------|-----------------|
| Customer reviews | Every submission is refused with `403`, token or not. |
| Guest reviews | A submission without a customer token is refused with `403`. Logged-in customers are unaffected. |

Nothing stops the same customer reviewing the same product more than once — enforce a one-review rule in the client if the store wants one.

## Use Cases

- **Review form on a product page** — post the four fields and show the returned `status` of `pending`, since the review will not appear in the default listing until it is approved.
- **Show the customer their own submission** — the default product-review listing excludes pending rows, so read it back with `?status=pending` on [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews).

## Best Practices

- **Tell the shopper the review is awaiting approval** — a `201` here does not mean the review is visible; it is stored as `pending`.
- **Validate the rating before sending** — the server rejects anything outside 1–5, and a slider that allows 0 produces a `400` after the shopper has typed a review.
- **Send `name` explicitly** — it is optional and is not filled in from the customer's profile, so a review submitted without it displays with an empty author.
- **Check the store's review settings before rendering the form** — a store with reviews disabled answers `403` on every submission, so the form should not be shown at all.

## Related Resources

- [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews) — a product's reviews, approved only by default
- [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review) — edit the customer's own review
- [Delete Product Review](/api/rest-api/shop/product-reviews/delete-product-review) — remove the customer's own review
