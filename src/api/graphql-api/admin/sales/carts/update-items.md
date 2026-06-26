---
outline: false
examples:
  - id: admin-cart-update-items
    title: Update Cart Item Quantities
    description: Bulk-update line-item quantities. `qty` is a map of cartItemId → new quantity.
    query: |
      mutation UpdateItems($input: updateItemsAdminCartInput!) {
        updateItemsAdminCart(input: $input) {
          adminCart {
            itemsCount
            grandTotal
            formattedGrandTotal
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": "314",
          "qty": {
            "6711": 3
          }
        }
      }
    response: |
      {
        "data": {
          "updateItemsAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Cart items updated."
            }
          }
        }
      }
---

# Update Cart Item Quantities

GraphQL counterpart of `PUT /api/admin/carts/{id}/items`. Mutation field is
`updateItemsAdminCart`.

::: warning Select cart fields, not `id`
This mutation returns the updated cart — select `itemsCount`, `grandTotal`, `formattedGrandTotal`, `success`, `message`, etc. Do **not** select `id` (or `_id`): this is an action result with no addressable record, so the auto-generated IRI field is `null` and selecting it errors out the whole payload.
:::

::: tip Prerequisites
The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.
:::

## Operation

| Operation | Type |
|-----------|------|
| `updateItemsAdminCart(input: updateItemsAdminCartInput!)` | Mutation |
