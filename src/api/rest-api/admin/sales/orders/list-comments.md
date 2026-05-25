---
outline: false
apiType: rest
examples:
  - id: admin-list-order-comments
    title: List Order Comments
    description: Cursor-friendly list of an order's comments, newest first. Wrapped in the standard `{ data, meta }` admin envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/orders/2392/comments?per_page=10&page=1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 17,
            "orderId": 2392,
            "comment": "Customer called to confirm shipping address.",
            "customerNotified": true,
            "createdAt": "2026-05-21 10:14:31",
            "updatedAt": "2026-05-21 10:14:31"
          },
          {
            "id": 16,
            "orderId": 2392,
            "comment": "Picking started.",
            "customerNotified": false,
            "createdAt": "2026-05-20 17:02:01",
            "updatedAt": "2026-05-20 17:02:01"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 1,
          "total": 2,
          "from": 1,
          "to": 2
        }
      }
    commonErrors:
      - error: Not Found (404)
        cause: Unknown order ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# List Order Comments

Returns all comments on an order, newest first, in the standard admin
`{ data, meta }` envelope.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{orderId}/comments` | GET |

## Query parameters

| Parameter | Default | Max | Notes |
|-----------|---------|-----|-------|
| `per_page` | 10 | 50 | Items per page. |
| `page` | 1 | — | 1-indexed page number. |
