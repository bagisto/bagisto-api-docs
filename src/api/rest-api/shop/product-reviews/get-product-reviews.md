---
outline: false
examples:
  - id: get-product-reviews
    title: Get Product Reviews
    description: Approved reviews for a product (default).
    request: |
      GET /api/shop/products/1/reviews
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      [
        {
          "id": 2,
          "name": "John Doe",
          "title": "Excellent product!",
          "rating": 5,
          "comment": "Very satisfied with this purchase.",
          "status": "approved",
          "createdAt": "2025-05-27T23:20:27+05:30",
          "updatedAt": "2025-09-03T18:10:50+05:30"
        },
        {
          "id": 3,
          "name": "Jane Smith",
          "title": "Good but expensive",
          "rating": 4,
          "comment": "Quality is great but price is high.",
          "status": "approved",
          "createdAt": "2025-05-27T23:22:20+05:30",
          "updatedAt": "2025-09-03T18:10:50+05:30"
        }
      ]
  - id: filter-by-rating
    title: Filter by Rating
    description: Approved reviews with a 5-star rating.
    request: |
      GET /api/shop/products/1/reviews?rating=5
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      [
        {
          "id": 2,
          "name": "John Doe",
          "title": "Excellent product!",
          "rating": 5,
          "comment": "Very satisfied with this purchase.",
          "status": "approved",
          "createdAt": "2025-05-27T23:20:27+05:30",
          "updatedAt": "2025-09-03T18:10:50+05:30"
        }
      ]
  - id: filter-by-status
    title: Filter by Status
    description: Override the approved-only default to fetch pending reviews.
    request: |
      GET /api/shop/products/1/reviews?status=pending
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      [
        {
          "id": 7,
          "name": "Sam Patel",
          "title": "Waiting on moderation",
          "rating": 5,
          "comment": "Just submitted this review.",
          "status": "pending",
          "createdAt": "2025-06-01T10:00:00+05:30",
          "updatedAt": "2025-06-01T10:00:00+05:30"
        }
      ]
  - id: paginate
    title: Pagination
    description: Two reviews per page, second page.
    request: |
      GET /api/shop/products/1/reviews?per_page=2&page=2
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      [
        {
          "id": 11,
          "name": "Alex Roy",
          "title": "Solid choice",
          "rating": 4,
          "comment": "Met expectations.",
          "status": "approved",
          "createdAt": "2025-05-30T09:10:00+05:30",
          "updatedAt": "2025-05-30T09:10:00+05:30"
        }
      ]
    commonErrors:
      - error: 404 Not Found
        cause: Product with specified ID does not exist
        solution: Verify the product ID
      - error: 401 Unauthorized
        cause: Invalid X-STOREFRONT-KEY
        solution: Provide valid storefront API key

---

# Get Product Reviews

Retrieve reviews and ratings for a specific product. By default only **approved**
reviews are returned; pass the `status` parameter to fetch a different status.

## Endpoint

```
GET /api/shop/products/{productId}/reviews
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | integer | Yes | Product ID |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | `approved` | Filter by status (`approved`, `pending`). Omit to get approved reviews only. |
| `rating` | integer | – | Filter by star rating (1–5). |
| `page` | integer | 1 | Page number (1-based). |
| `per_page` | integer | 30 | Reviews per page. Alias: `limit`. Maximum 50. |

::: tip Filtered request examples
```
GET /api/shop/products/1/reviews?rating=5
GET /api/shop/products/1/reviews?status=pending
GET /api/shop/products/1/reviews?status=approved&rating=4
GET /api/shop/products/1/reviews?per_page=10&page=2
```
:::

::: info Approved by default — overridable
A storefront product page shows only approved reviews, so this endpoint returns
`status=approved` when no `status` is supplied. To build moderation or preview
tooling, request a specific status explicitly (e.g. `?status=pending`).
:::

## Response (200 OK)

Returns a JSON **array** of review objects.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Review ID |
| `name` | string | Reviewer display name |
| `title` | string | Review title |
| `rating` | integer | Rating (1–5 stars) |
| `comment` | string | Review body |
| `status` | string | Review status (`approved`, `pending`) |
| `createdAt` | string | Review creation date (ISO 8601) |
| `updatedAt` | string | Last update date (ISO 8601) |

## Pagination

Pagination metadata is returned in **response headers** (not the body):

| Header | Description |
|--------|-------------|
| `X-Total-Count` | Total reviews matching the filters |
| `X-Page` | Current page |
| `X-Per-Page` | Reviews per page |
| `X-Total-Pages` | Total page count |

## Use Cases

- Display approved product reviews on detail pages
- Filter reviews by rating
- Paginate through a product's reviews
- Build review moderation tooling (`?status=pending`)

## Related Resources

- [Get Product Review](/api/rest-api/shop/product-reviews/get-product-review)
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review)
- [Get Product](/api/rest-api/shop/products/get-product)
