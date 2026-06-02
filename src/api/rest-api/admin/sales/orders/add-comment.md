---
outline: false
apiType: rest
examples:
  - id: admin-add-order-comment
    title: Add Order Comment
    description: Persist a comment against an order. When `customerNotified` is true, Bagisto core listeners send the customer notification email via the `sales.order.comment.create.after` event.
    query: |
      curl -X POST "https://your-domain.com/api/admin/orders/2392/comments" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "comment": "Customer called to confirm shipping address.",
          "customerNotified": true
        }'
    variables: |
      {
        "comment": "Customer called to confirm shipping address.",
        "customerNotified": true
      }
    response: |
      {
        "id": 17,
        "orderId": 2392,
        "comment": "Customer called to confirm shipping address.",
        "customerNotified": true,
        "createdAt": "2026-05-21 10:14:31",
        "updatedAt": "2026-05-21 10:14:31"
      }
    commonErrors:
      - error: Empty comment (422)
        cause: '`comment` field missing or blank'

        solution: Send a non-empty comment string
      - error: Not Found (404)
        cause: Unknown order ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Add Order Comment

Adds a comment to an order. Mirrors the monolith `Admin\Sales\OrderController::comment`
flow — fires the `sales.order.comment.create.before` and
`sales.order.comment.create.after` events so Bagisto core listeners can send the
customer notification email when `customerNotified=true`.

**No permission gate** — matches the monolith. Any authenticated admin can add
a comment.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{orderId}/comments` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `comment` | string | yes | Free-form comment body. |
| `customerNotified` | boolean | no | When `true`, core listeners send the customer email. Defaults to `false`. |

## Errors

| HTTP | Lang key | Message |
|------|----------|---------|
| 422  | `bagistoapi::app.admin.order.actions.comment.empty` | Comment is required. |

### Sample 422 response

```json
{
    "type": "/errors/422",
    "title": "Bad Request",
    "status": 422,
    "detail": "Comment is required."
}
```
