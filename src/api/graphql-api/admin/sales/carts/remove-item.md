---
outline: false
examples:
  - id: admin-cart-remove-item
    title: Remove a Cart Item
    description: Remove a single line item from the draft cart.
    query: |
      mutation RemoveItem($input: removeItemAdminCartInput!) {
        removeItemAdminCart(input: $input) {
          adminCart { itemsCount grandTotal formattedGrandTotal success message }
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
            "adminCart": { "itemsCount": 1, "grandTotal": 100, "formattedGrandTotal": "$100.00", "success": true, "message": "Item removed from cart." }
          }
        }
      }
---

# Remove a Cart Item

GraphQL counterpart of `DELETE /api/admin/carts/{id}/items`. Mutation field is
`removeItemAdminCart`.

::: tip Prerequisites
The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.
:::

## Operation

| Operation | Type |
|-----------|------|
| `removeItemAdminCart(input: removeItemAdminCartInput!)` | Mutation |
