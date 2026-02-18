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
      {
        "data": {
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
      }
    commonErrors:
      - error: 404 Not Found
        cause: Review with specified ID does not exist or does not belong to the customer
        solution: Verify the review ID and ensure it belongs to the authenticated customer
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

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

## Error Responses

| Status | Error | Description |
|--------|-------|-------------|
| `401` | Unauthenticated | Missing or invalid Bearer token |
| `404` | Not Found | `Customer review with ID "999" not found` — review doesn't exist or doesn't belong to the customer |

**Error — Not Found (404):**
```json
{
  "message": "Customer review with ID \"999\" not found"
}
```

**Error — Unauthenticated (401):**
```json
{
  "message": "Unauthenticated. Please login to perform this action"
}
```

## Use Cases

- Display individual review details
- Show review with full context in account dashboard
- Load specific review for viewing status
- Check approval status of a submitted review

## Related Resources

- [Get All Customer Reviews](/api/rest-api/shop/customer-reviews/get-customer-reviews)
- [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews)
- [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review)
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
