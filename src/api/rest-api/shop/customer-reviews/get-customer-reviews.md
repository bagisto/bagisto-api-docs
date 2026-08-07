---
outline: false
examples:
  - id: get-customer-reviews
    title: Get Customer Reviews
    description: Retrieve all product reviews submitted by the authenticated customer.
    request: |
      GET /api/shop/customer-reviews
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
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
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

  - id: get-customer-reviews-filtered-status
    title: Get Customer Reviews - Filter by Status
    description: Retrieve customer reviews filtered by approval status.
    request: |
      GET /api/shop/customer-reviews?status=approved
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
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
      ]
    commonErrors:
      - error: 400 Bad Request
        cause: Invalid status value provided
        solution: Use one of pending, approved, or disapproved

  - id: get-customer-reviews-filtered-rating
    title: Get Customer Reviews - Filter by Rating
    description: Retrieve customer reviews filtered by star rating.
    request: |
      GET /api/shop/customer-reviews?rating=5
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
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
      ]
    commonErrors:
      - error: 400 Bad Request
        cause: Invalid rating value provided
        solution: Use a rating between 1 and 5

  - id: get-customer-reviews-combined-filters
    title: Get Customer Reviews - Combined Filters
    description: Retrieve customer reviews filtered by both status and rating.
    request: |
      GET /api/shop/customer-reviews?status=approved&rating=5
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
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
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

---

# Get Customer Reviews

Retrieve a paginated list of product reviews submitted by the authenticated customer. This is a **read-only, customer-scoped** resource — customers can only see their own reviews.

## Endpoint

```
GET /api/shop/customer-reviews
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter by review status (`pending`, `approved`, `disapproved`) |
| `rating` | integer | - | Filter by star rating (`1`–`5`) |

## Response

A bare JSON array of the customer's own reviews, newest first. The product and customer are **path references, not nested objects**.

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

Pagination is reported in headers: `X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`. The page size is fixed at 10 — `per_page` and `page` are accepted by the URL but do not change the result. Walk a longer history over GraphQL, where the same rows are a cursor connection.

## Status Values

| Status | Description |
|--------|-------------|
| `pending` | Submitted and awaiting moderation. Not visible on the product page. |
| `approved` | Published on the storefront. |
| `disapproved` | Reviewed by an admin and not published. |

Unlike the product-review listing, this endpoint applies **no default status filter** — a customer sees all of their own reviews, pending ones included.

## Filters

| Parameter | Description |
|-----------|-------------|
| `status` | One status value per request. |
| `rating` | One rating from 1 to 5. |

Supplying both narrows the result: `?status=approved&rating=5` returns only published five-star reviews.

## Use Cases

- **"My reviews" in the account area** — call with no parameters; unapproved reviews are included, which is what lets the shopper see their own submission before it goes live.
- **"Awaiting approval" section** — `?status=pending` isolates the reviews the shopper cannot yet see on the product page.
- **Link back to the product** — take the numeric ID from the end of the `product` path and fetch the product for its name and image; they are not in this payload.

## Best Practices

- **Do not expect product names here** — the row carries a path only, so a review history that shows product titles needs a second fetch per product.
- **Read `X-Total-Count` for the count** — the body is one fixed page of 10.
- **Use `disapproved`, not `rejected`** — an unrecognised status value silently matches nothing and returns an empty array.

## Related Resources

- [Get Single Customer Review](/api/rest-api/shop/customer-reviews/get-customer-review) — one of the customer's own reviews
- [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews) — a product's reviews, approved only by default
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review) — submit a review; it starts as pending
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
