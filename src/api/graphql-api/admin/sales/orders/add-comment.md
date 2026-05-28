---
outline: false
examples:
  - id: admin-add-order-comment
    title: Add Order Comment
    description: Persist a comment against an order. When `customerNotified` is true, Bagisto core listeners send the customer notification email.
    query: |
      mutation AddOrderComment($input: createAdminOrderCommentInput!) {
        createAdminOrderComment(input: $input) {
          adminOrderComment {
            id
          }
        }
      }
    variables: |
      {
        "input": {
          "orderId": 2392,
          "comment": "Customer called to confirm shipping address.",
          "customerNotified": true
        }
      }
    response: |
      {
        "data": {
          "createAdminOrderComment": {
            "adminOrderComment": {
              "id": "/api/admin/order-comments/17",
              "comment": "Customer called to confirm shipping address.",
              "customerNotified": true,
              "createdAt": "2026-05-21 10:14:31"
            }
          }
        }
      }
---

# Add Order Comment

Adds a comment to an order. Mirrors the monolith
`Admin\Sales\OrderController::comment` flow — fires the
`sales.order.comment.create.before` and `sales.order.comment.create.after`
events so Bagisto core listeners can send the customer notification email when
`customerNotified=true`.

**No permission gate** — matches the monolith.

## Operation

| Operation | Type |
|-----------|------|
| `createAdminOrderComment` | Mutation |

## Errors

| Condition | Lang key | Message |
|-----------|----------|---------|
| `comment` empty | `bagistoapi::app.admin.order.actions.comment.empty` | Comment is required. |
