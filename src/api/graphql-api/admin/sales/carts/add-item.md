---
outline: false
examples:
  - id: admin-cart-add-item
    title: Add Item to Cart
    description: Add a product to the draft cart. `id` is the resource IRI; `cartId` is forwarded as the raw integer for the processor. All other body keys (product type-specific) mirror the storefront add-to-cart payload.
    query: |
      mutation AddItem($input: addItemAdminCartInput!) {
        addItemAdminCart(input: $input) {
          adminCart { id _id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": "314",
          "productId": 142,
          "quantity": 1
        }
      }
    response: |
      {
        "data": {
          "addItemAdminCart": {
            "adminCart": { "id": "/api/admin/carts/314", "_id": 314 }
          }
        }
      }
---

# Add Item to Cart

GraphQL counterpart of `POST /api/admin/carts/{id}/items`. Mutation field is
`addItemAdminCart`. Input type is `addItemAdminCartInput`.

**Note:** API Platform's GraphQL response-IRI generation for this resource
emits a non-fatal `errors[]` entry; the mutation itself runs successfully.
Verify the resulting state with a follow-up REST GET. For mutation payloads
with full cart fields, use the REST endpoint.

::: tip Prerequisites
The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.
:::

## Operation

| Operation | Type |
|-----------|------|
| `addItemAdminCart(input: addItemAdminCartInput!)` | Mutation |

## Errors

| Cause | Response |
|-------|----------|
| `productId` missing | `errors[]` — `productId is required.` |
| Product not found | `errors[]` — `Product not found.` |
| **Booking product** — admin draft orders do not support booking products | `errors[]` — `Booking products cannot be added to an admin draft order. Booking purchases must be made through the customer storefront.` Sample: `{"errors":[{"message":"Booking products cannot be added to an admin draft order. Booking purchases must be made through the customer storefront.","extensions":{"category":"user"}}],"data":{"addItemAdminCart":null}}` |
| Cart is an active storefront cart | `errors[]` — `This cart cannot be modified through the admin API.` |
