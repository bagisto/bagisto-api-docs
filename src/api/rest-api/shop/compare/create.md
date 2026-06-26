---
outline: false
examples:
  - id: create-compare-item
    title: Add Product to Compare List
    description: Add a product to the authenticated customer's comparison list.
    request: |
      POST /api/shop/compare-items
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "productId": 1
      }
    response: |
      {
        "id": 38,
        "product": {
          "id": 1,
          "sku": "ARCTIC-JACKET-001",
          "type": "simple",
          "name": "Arctic Snow Jacket"
        },
        "customer": {
          "id": 122,
          "firstName": "John",
          "lastName": "Doe"
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: Product does not exist
        solution: Provide a valid productId
      - error: 422 Validation Error
        cause: productId is missing or invalid
        solution: Provide a positive integer productId

---

# Create Compare Item

Add a product to the authenticated customer's comparison list.

## Endpoint

```
POST /api/shop/compare-items
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Request Body

```json
{
  "productId": 1
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `productId` | integer | Yes | ID of the product to add to the compare list. |

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | New compare item ID |
| `product` | object | Associated product details |
| `customer` | object | Customer who added the item |

::: tip
The exact response shape follows the package's serialization. Confirm field presence against the live endpoint for your installation.
:::

## Validation

- `productId` is required and must reference an existing product.
- A valid customer Bearer token is required.

## Use Cases

- "Add to compare" buttons on product cards
- Build a side-by-side product comparison list

## Related Resources

- [Get Compare Items](/api/rest-api/shop/compare/list)
- [Delete Compare Item](/api/rest-api/shop/compare/delete)
- [Delete All Compare Items](/api/rest-api/shop/compare/delete-all)
