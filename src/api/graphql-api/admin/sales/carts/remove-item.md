---
outline: false
examples:
  - id: admin-cart-remove-item
    title: Remove a Cart Item
    description: Remove a single line item from the draft cart.
    query: |
      mutation RemoveItem($input: removeItemAdminCartInput!) {
        removeItemAdminCart(input: $input) {
          adminCart { id _id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": "314",
          "cartItemId": 6711
        }
      }
    response: |
      {
        "data": {
          "removeItemAdminCart": {
            "adminCart": { "id": "/api/admin/carts/314", "_id": 314 }
          }
        }
      }
---

# Remove a Cart Item

GraphQL counterpart of `DELETE /api/admin/carts/{id}/items`. Mutation field is
`removeItemAdminCart`.

## Operation

| Operation | Type |
|-----------|------|
| `removeItemAdminCart(input: removeItemAdminCartInput!)` | Mutation |
