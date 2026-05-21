---
outline: false
examples:
  - id: admin-create-draft-cart
    title: Create Draft Cart
    description: Bootstrap an empty admin draft cart for a customer (Create-Order entry).
    query: |
      mutation CreateAdminDraftCart($input: createAdminDraftCartInput!) {
        createAdminDraftCart(input: $input) {
          adminDraftCart { id }
        }
      }
    variables: |
      {
        "input": { "customerId": 7 }
      }
    response: |
      {
        "data": {
          "createAdminDraftCart": {
            "adminDraftCart": { "id": "/api/admin/draft-carts/412" }
          }
        }
      }
---

# Create Draft Cart

Customer-nested Create-Order entry point. Returns the IRI of the newly
created admin draft cart (`is_active = 0`). The cart `id` integer is the last
segment of the IRI — pass that to the cart-keyed write mutations
(`addItemAdminCart`, `saveAddressAdminCart`, …) as their `cartId` input.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminDraftCart(input: createAdminDraftCartInput!)` | Mutation | Bootstrap a fresh draft cart for a customer |

Distinct from `createAdminReorder` (which seeds the cart from an existing
order's items).

## Errors

| GraphQL `errors[]` cause | Notes |
|--------------------------|-------|
| Customer not found | Returned for unknown / `0` customerId |
| Unauthenticated | Missing admin Bearer token |
| Underlying Cart::createCart failed | Bubbles up the facade error message |
