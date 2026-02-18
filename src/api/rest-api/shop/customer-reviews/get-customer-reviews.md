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
      {
        "data": [
          {
            "id": 1,
            "title": "Great product",
            "comment": "Really enjoyed using this product.",
            "rating": 5,
            "status": "approved",
            "name": "John",
            "product": { "id": 2 },
            "customer": { "id": 1 },
            "createdAt": "2026-02-18T10:30:00+00:00",
            "updatedAt": "2026-02-18T10:30:00+00:00"
          }
        ]
      }
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
      {
        "data": [
          {
            "id": 1,
            "title": "Great product",
            "comment": "Really enjoyed using this product.",
            "rating": 5,
            "status": "approved",
            "name": "John",
            "product": { "id": 2 },
            "customer": { "id": 1 },
            "createdAt": "2026-02-18T10:30:00+00:00",
            "updatedAt": "2026-02-18T10:30:00+00:00"
          }
        ]
      }
    commonErrors:
      - error: 400 Bad Request
        cause: Invalid status value provided
        solution: Use one of pending, approved, or rejected

  - id: get-customer-reviews-filtered-rating
    title: Get Customer Reviews - Filter by Rating
    description: Retrieve customer reviews filtered by star rating.
    request: |
      GET /api/shop/customer-reviews?rating=5
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "data": [
          {
            "id": 1,
            "title": "Great product",
            "comment": "Really enjoyed using this product.",
            "rating": 5,
            "status": "approved",
            "name": "John",
            "product": { "id": 2 },
            "customer": { "id": 1 },
            "createdAt": "2026-02-18T10:30:00+00:00",
            "updatedAt": "2026-02-18T10:30:00+00:00"
          }
        ]
      }
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
      {
        "data": [
          {
            "id": 1,
            "title": "Great product",
            "comment": "Really enjoyed using this product.",
            "rating": 5,
            "status": "approved",
            "name": "John",
            "product": { "id": 2 },
            "customer": { "id": 1 },
            "createdAt": "2026-02-18T10:30:00+00:00",
            "updatedAt": "2026-02-18T10:30:00+00:00"
          }
        ]
      }
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
| `status` | string | - | Filter by review status (`pending`, `approved`, `rejected`) |
| `rating` | integer | - | Filter by star rating (`1`–`5`) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID |
| `title` | string | Review title |
| `comment` | string | Review body text |
| `rating` | integer | Star rating (1–5) |
| `status` | string | Review status: `pending`, `approved`, or `rejected` |
| `name` | string | Reviewer display name |
| `product` | object | Associated product (nested resource) |
| `customer` | object | Customer who wrote the review (nested resource) |
| `createdAt` | string | ISO 8601 creation timestamp |
| `updatedAt` | string | ISO 8601 last update timestamp |

## Status Values

| Status | Description |
|--------|-------------|
| `pending` | Awaiting approval |
| `approved` | Published on storefront |
| `rejected` | Not published |

## Filters

```bash
# Get approved reviews only
GET /api/shop/customer-reviews?status=approved

# Get 5-star reviews only
GET /api/shop/customer-reviews?rating=5

# Get approved 5-star reviews
GET /api/shop/customer-reviews?status=approved&rating=5

# Get pending reviews
GET /api/shop/customer-reviews?status=pending

# Get rejected reviews
GET /api/shop/customer-reviews?status=rejected
```

## Use Cases

- Display customer's review history in account dashboard
- Show pending reviews awaiting approval
- Filter reviews by rating or status
- Build review management UI for customers

## Related Resources

- [Get Single Customer Review](/api/rest-api/shop/customer-reviews/get-customer-review)
- [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews)
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review)
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
