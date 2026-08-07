---
outline: false
examples:
  - id: create-compare-item
    title: Add Product to Compare List
    description: Add a product to the authenticated customer's comparison list.
    request: |
      POST /api/shop/compare_items
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "productId": 1
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 155,
        "createdAt": "2026-08-07T15:56:42+05:30",
        "updatedAt": "2026-08-07T15:56:42+05:30",
        "product": "/api/shop/products/126",
        "customer": "/api/shop/customers/122"
      }
    commonErrors:
      - error: 400 Bad Request — Product ID is required
        cause: productId was missing from the body
        solution: Send productId as a numeric product ID
      - error: 400 Bad Request — This product is already in your comparison list
        cause: The customer already added this product
        solution: Read the list first, or treat the 400 as "already added" in the UI
      - error: 404 Not Found — Product not found
        cause: No product carries that ID
        solution: Use an ID returned by the product endpoints
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests cannot hold a comparison list

---

# Create Compare Item

Add a product to the authenticated customer's comparison list.

## Endpoint

```
POST /api/shop/compare_items
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

The created comparison row. Product and customer come back as **path references, not nested objects** — no product details are included.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | New comparison row ID. Keep it for [Delete](/api/rest-api/shop/compare/delete). |
| `product` | string | Path of the compared product, e.g. `/api/shop/products/126`. |
| `customer` | string | Path of the owning customer. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

## Behaviour

- Adding a product that is already on the list is **rejected** with `400`; it is not a silent no-op, and there is no toggle endpoint here as there is for the wishlist.
- The list is not channel-scoped, so an item added on one channel appears on all of them.
- Any product type can be added; comparison reads the products separately, so no option choices are stored.

## Use Cases

- **"Add to compare" on a product card** — post the product ID and keep the returned row ID so the same control can remove it again.
- **Build a comparison set before rendering** — add each product as it is marked, then fetch all of them at once for the comparison table.

## Best Practices

- **Handle `400` as "already added"** — the message names that case explicitly, and it is the common outcome of a double tap.
- **Do not render from this response** — it carries no name, price, or attributes.
- **Cap the set client-side** — the API imposes no limit, and a comparison table with a dozen columns is unusable.

## Related Resources

- [Get Compare Items](/api/rest-api/shop/compare/list) — the customer's comparison rows
- [Delete Compare Item](/api/rest-api/shop/compare/delete) — remove one comparison row
- [Delete All Compare Items](/api/rest-api/shop/compare/delete-all) — clear the whole comparison list
