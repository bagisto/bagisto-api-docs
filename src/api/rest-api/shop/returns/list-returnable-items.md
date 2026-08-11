---
outline: false
examples:
  - id: list-returnable-items
    title: List Returnable Items
    description: List the return-eligible items of one of the authenticated customer's orders, with the quantity caps the store enforces.
    request: |
      GET /api/shop/returnable-items?order_id=45
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      [
        {
          "orderItemId": 78,
          "productId": 1,
          "sku": "COASTALBREEZEMENSHOODIE",
          "name": "Coastal Breeze Men's Blue Zipper Hoodie",
          "type": "simple",
          "urlKey": "coastal-breeze-mens-blue-zipper-hoodie",
          "price": 100,
          "baseImageUrl": "https://example.com/storage/product/1/hoodie.webp",
          "qtyOrdered": 2,
          "currentQuantity": 2,
          "forReturnQuantity": 2,
          "forCancelQuantity": 0,
          "rmaQuantity": 0,
          "rmaReturnPeriod": 30
        }
      ]
    commonErrors:
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The order does not exist or is not owned by the authenticated customer
        solution: Only order IDs belonging to the logged-in customer can be queried
---

# List Returnable Items

List the items of one of the customer's orders that are **still eligible for return** — within their return window and not already fully returned or canceled. Each row carries the trusted quantity caps the store enforces when a return is raised (`forReturnQuantity`, `forCancelQuantity`, `currentQuantity`), so a client can present the correct maximum. Use these rows to pick the `orderItemId` and quantity for [`POST /api/shop/returns`](/api/rest-api/shop/returns/create-return).

## Endpoint

```
GET /api/shop/returnable-items
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order_id` | integer | Yes | Id of the order to list returnable items for. Must belong to the authenticated customer. |

## Response Fields (200 OK)

The response is a plain JSON array. Each item is a returnable-item object.

| Field | Type | Description |
|-------|------|-------------|
| `orderItemId` | integer | Id of the order item — use this when raising a return. |
| `productId` | integer | Id of the product. |
| `sku` | string | Product SKU. |
| `name` | string | Product name. |
| `type` | string | Product type, e.g. `simple`. |
| `urlKey` | string | Product URL key. |
| `price` | number | Item price. |
| `baseImageUrl` | string | URL of the product's base image. |
| `qtyOrdered` | integer | Quantity originally ordered. |
| `currentQuantity` | integer | Quantity currently eligible to act on. |
| `forReturnQuantity` | integer | Maximum units that can be returned. |
| `forCancelQuantity` | integer | Maximum units that can be canceled. |
| `rmaQuantity` | integer | Units already placed into a return. |
| `rmaReturnPeriod` | integer | Return window in days. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Returnable items retrieved. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The order does not exist or is not the customer's. |

## Related Resources

- [List Return Reasons](/api/rest-api/shop/returns/list-return-reasons) — the reason ids to choose from
- [Raise a Return](/api/rest-api/shop/returns/create-return) — raise a return against one order item
- [Returns Overview](/api/rest-api/shop/returns/) — the returns menu overview, including the settings that gate it
