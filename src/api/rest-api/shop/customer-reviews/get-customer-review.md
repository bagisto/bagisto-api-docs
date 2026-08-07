---
outline: false
examples:
  - id: get-customer-review
    title: Get Single Customer Review
    description: Retrieve a specific product review by ID for the authenticated customer.
    request: |
      GET /api/shop/customer-reviews/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      {
        "id": 44,
        "name": "John Doe",
        "title": "Solid",
        "rating": 4,
        "comment": "Works well.",
        "status": "approved",
        "createdAt": "2026-08-07T16:10:51+05:30",
        "updatedAt": "2026-08-07T16:10:51+05:30",
        "product": "/api/shop/products/127",
        "customer": "/api/shop/customers/122"
      }
    commonErrors:
      - error: 404 Not Found — Customer review with ID "2" not found
        cause: No such review, or it belongs to another customer
        solution: Use an ID returned by Get Customer Reviews for this customer
      - error: 403 Forbidden — Unauthenticated
        cause: No customer Bearer token was sent
        solution: Log the customer in and retry

---

# Get Customer Review

Retrieve detailed information for a specific product review submitted by the authenticated customer. Customers can only access their own reviews.

## Endpoint

```
GET /api/shop/customer-reviews/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Customer review ID |

## Response Fields (200 OK)

One review written by the authenticated customer. Product and customer are **path references, not nested objects**.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID. |
| `name` | string | Display name submitted with the review. |
| `title` / `comment` | string | Review text. |
| `rating` | integer | Star rating, 1 to 5. |
| `status` | string | `pending`, `approved`, or `disapproved`. |
| `product` | string | Path of the reviewed product, e.g. `/api/shop/products/127`. |
| `customer` | string | Path of the author — always the authenticated customer. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

A review written by someone else answers `404`, the same as an ID that does not exist. The message names the ID that was asked for, so do not surface it verbatim as proof the review is missing store-wide.

## Use Cases

- **Detail view in "my reviews"** — read one row to render an edit form, then submit through [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review), which addresses the same review at `/api/shop/reviews/{id}`.
- **Poll for approval** — re-read after submission to see `status` move from `pending` to `approved`.

## Best Practices

- **Prefer the list endpoint for a review history** — this returns the same fields for one row, so a "my reviews" page is one call, not one per review.
- **Remember the write path is a different route** — reading is `/api/shop/customer-reviews/{id}`, but editing and deleting go to `/api/shop/reviews/{id}`.

## Related Resources

- [Get All Customer Reviews](/api/rest-api/shop/customer-reviews/get-customer-reviews) — the reviews this customer has written, pending ones included
- [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews) — a product's reviews, approved only by default
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review) — submit a review; it starts as pending
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
