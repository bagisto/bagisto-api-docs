---
outline: false
examples:
  - id: admin-cart-save-address
    title: Save Cart Addresses
    description: Save billing (and optionally shipping) addresses on the draft cart.
    query: |
      mutation SaveAddress($input: saveAddressAdminCartInput!) {
        saveAddressAdminCart(input: $input) {
          adminCart { id _id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": "314",
          "billing": {
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "jane@example.com",
            "address": ["12 Main St"],
            "city": "Berlin",
            "country": "DE",
            "state": "BE",
            "postcode": "10115",
            "phone": "+4930123456",
            "useForShipping": true
          }
        }
      }
    response: |
      {
        "data": {
          "saveAddressAdminCart": {
            "adminCart": { "id": "/api/admin/carts/314", "_id": 314 }
          }
        }
      }
---

# Save Cart Addresses

GraphQL counterpart of `POST /api/admin/carts/{id}/addresses`. Mutation field
is `saveAddressAdminCart`.

::: tip Prerequisites
The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.
:::

## Operation

| Operation | Type |
|-----------|------|
| `saveAddressAdminCart(input: saveAddressAdminCartInput!)` | Mutation |
