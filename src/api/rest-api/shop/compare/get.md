---
outline: false
examples:
  - id: get-compare-item
    title: Get Single Compare Item
    description: Retrieve a specific compare item by its ID.
    request: |
      GET /api/shop/compare-items/37
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>
    response: |
      {
        "id": 37,
        "product": {
          "id": 2500,
          "sku": "MINT-BLAZER-001",
          "type": "configurable",
          "name": "Mint Axis Unisex Tailored Blazer",
          "shortDescription": "A modern mint blazer with a sharp tailored fit.",
          "price": "0",
          "formattedPrice": "$0.00",
          "minimumPrice": "544",
          "formattedMinimumPrice": "$544.00",
          "maximumPrice": "544",
          "formattedMaximumPrice": "$544.00"
        },
        "customer": {
          "id": 122,
          "firstName": "John",
          "lastName": "Doe"
        },
        "createdAt": "2026-04-06T18:47:53+05:30",
        "updatedAt": "2026-04-06T18:47:53+05:30"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: Compare item does not exist or belongs to another customer
        solution: Provide a valid compare item ID owned by the authenticated customer

---

# Get Compare Item

Retrieve a single compare item by ID.

## Endpoint

```
GET /api/shop/compare-items/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Compare item ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Compare item ID |
| `product` | object | Associated product details |
| `customer` | object | Customer who added the item |
| `createdAt` | string | Timestamp when the item was added |
| `updatedAt` | string | Timestamp when the item was last updated |

## Validation

- The compare item must exist and belong to the authenticated customer.

## Use Cases

- Fetch details for a single compared product
- Refresh a row in a comparison table

## Related Resources

- [Get Compare Items](/api/rest-api/shop/compare/list)
- [Create Compare Item](/api/rest-api/shop/compare/create)
- [Delete Compare Item](/api/rest-api/shop/compare/delete)
