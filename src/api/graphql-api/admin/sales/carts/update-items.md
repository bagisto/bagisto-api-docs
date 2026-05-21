---
outline: false
examples:
  - id: admin-cart-update-items
    title: Update Cart Item Quantities
    description: Bulk-update line-item quantities. `qty` is a map of cartItemId → new quantity.
    query: |
      mutation UpdateItems($input: updateItemsAdminCartInput!) {
        updateItemsAdminCart(input: $input) {
          adminCart { id _id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": "314",
          "qty": { "6711": 3 }
        }
      }
    response: |
      {
        "data": {
          "updateItemsAdminCart": {
            "adminCart": { "id": "/api/admin/carts/314", "_id": 314 }
          }
        }
      }
---

# Update Cart Item Quantities

GraphQL counterpart of `PUT /api/admin/carts/{id}/items`. Mutation field is
`updateItemsAdminCart`.

## Operation

| Operation | Type |
|-----------|------|
| `updateItemsAdminCart(input: updateItemsAdminCartInput!)` | Mutation |
