---
outline: false
examples:
  - id: delete-compare-item
    title: Delete Compare Item
    description: Remove a single product from the authenticated customer's comparison list by ID.
    request: |
      DELETE /api/shop/compare-items/38
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>
    response: |
      {
        "message": "Item removed from compare list successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: Compare item does not exist or belongs to another customer
        solution: Provide a valid compare item ID owned by the authenticated customer

---

# Delete Compare Item

Remove a single product from the authenticated customer's comparison list.

## Endpoint

```
DELETE /api/shop/compare-items/{id}
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
| `id` | integer | Yes | Compare item ID to delete |

## Response (200 OK)

```json
{
  "message": "Item removed from compare list successfully"
}
```

::: tip
Confirm the exact success status (200 with body vs 204 no content) against the live endpoint for your installation.
:::

## Validation

- The compare item must exist and belong to the authenticated customer.

## Use Cases

- Remove a single product from the comparison page
- Drop a product from a comparison table

## Related Resources

- [Get Compare Items](/api/rest-api/shop/compare/list)
- [Delete All Compare Items](/api/rest-api/shop/compare/delete-all)
