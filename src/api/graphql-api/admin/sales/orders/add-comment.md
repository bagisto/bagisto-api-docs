---
outline: false
examples:
  - id: admin-add-order-comment
    title: Add Order Comment
    description: Add a comment to an order. When `customerNotified` is true, the customer is sent a notification email with the comment.
    query: |
      mutation AddOrderComment($input: createAdminOrderCommentInput!) {
        createAdminOrderComment(input: $input) {
          adminOrderComment {
            id
            orderId
            comment
            customerNotified
            createdAt
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
              "id": "/api/admin/admin_order_comments/17",
              "orderId": 2392,
              "comment": "Customer called to confirm shipping address.",
              "customerNotified": true,
              "createdAt": "2026-05-21 10:14:31"
            }
          }
        }
      }
---

# Add Order Comment

Adds a comment to an order. When `customerNotified=true`, the customer is sent a
notification email with the comment.

**No permission gate** — any authenticated admin can add a comment.

## Operation

| Operation | Type |
|-----------|------|
| `createAdminOrderComment` | Mutation |

## Errors

| Condition | Lang key | Message |
|-----------|----------|---------|
| `comment` empty | `bagistoapi::app.admin.order.actions.comment.empty` | Comment is required. |
