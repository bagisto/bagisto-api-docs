---
outline: false
examples:
  - id: list-compare-items
    title: Get Compare Items
    description: Retrieve the authenticated customer's product comparison list.
    request: |
      GET /api/shop/compare-items
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>
    response: |
      [
        {
          "id": 36,
          "product": {
            "id": 2495,
            "sku": "IVORY-OVERCOAT-001",
            "type": "configurable",
            "name": "Ivory Frost Classic Overcoat",
            "shortDescription": "A sleek ivory overcoat with a tailored fit and soft warmth.",
            "price": "0",
            "formattedPrice": "$0.00",
            "minimumPrice": "500",
            "formattedMinimumPrice": "$500.00"
          },
          "customer": {
            "id": 122,
            "firstName": "John",
            "lastName": "Doe"
          },
          "createdAt": "2026-04-06T18:47:53+05:30",
          "updatedAt": "2026-04-06T18:47:53+05:30"
        },
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
            "formattedMinimumPrice": "$544.00"
          },
          "customer": {
            "id": 122,
            "firstName": "John",
            "lastName": "Doe"
          },
          "createdAt": "2026-04-06T18:47:53+05:30",
          "updatedAt": "2026-04-06T18:47:53+05:30"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

---

# Get Compare Items

Retrieve the products in the authenticated customer's comparison list.

## Endpoint

```
GET /api/shop/compare-items
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Compare item ID |
| `product` | object | Associated product (id, sku, type, name, price, formattedPrice, etc.) |
| `customer` | object | Customer who added the item (id, firstName, lastName) |
| `createdAt` | string | Timestamp when the item was added |
| `updatedAt` | string | Timestamp when the item was last updated |

::: tip
The response is a plain JSON array of compare items. Pagination metadata is exposed via the `X-Total-Count` / `X-Page` / `X-Per-Page` / `X-Total-Pages` response headers.
:::

## Use Cases

- Display the product comparison page
- Build comparison tables across saved products
- Show a compare count in navigation

## Notes

- Compare items are scoped to the authenticated customer (not channel-scoped).
- Guests cannot have compare lists — a valid customer token is required.

## Related Resources

- [Get Single Compare Item](/api/rest-api/shop/compare/get)
- [Create Compare Item](/api/rest-api/shop/compare/create)
- [Delete Compare Item](/api/rest-api/shop/compare/delete)
- [Delete All Compare Items](/api/rest-api/shop/compare/delete-all)
