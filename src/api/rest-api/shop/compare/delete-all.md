---
outline: false
examples:
  - id: delete-all-compare-items
    title: Delete All Compare Items
    description: Remove every product from the authenticated customer's comparison list.
    request: |
      POST /api/shop/delete-all-compare-items
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {}
    response: |
      {
        "message": "All compare items removed successfully",
        "deletedCount": 2
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

---

# Delete All Compare Items

Remove every product from the authenticated customer's comparison list in a single request.

## Endpoint

```
POST /api/shop/delete-all-compare-items
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Request Body

No fields are required. Send an empty JSON object:

```json
{}
```

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Confirmation message |
| `deletedCount` | integer | Number of compare items removed |

## Use Cases

- "Clear comparison" action on the compare page
- Reset a customer's comparison list in one call

## Notes

- Only the authenticated customer's items are removed.
- Returns `deletedCount: 0` when the comparison list is already empty.

## Related Resources

- [Get Compare Items](/api/rest-api/shop/compare/list)
- [Delete Compare Item](/api/rest-api/shop/compare/delete)
