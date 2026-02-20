---
outline: false
examples:
  - id: delete-wishlist-basic
    title: Delete Wishlist Item
    description: Delete a specific wishlist item by its IRI.
    query: |
      mutation DeleteWishlist($input: deleteWishlistInput!) {
        deleteWishlist(input: $input) {
          wishlist {
            id
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/shop/wishlists/69"
        }
      }
    response: |
      {
        "data": {
          "deleteWishlist": {
            "wishlist": {
              "id": "/api/shop/wishlists/69",
              "_id": 69
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: ITEM_NOT_FOUND
        cause: Wishlist item does not exist or belongs to another customer
        solution: Use a valid wishlist item IRI from the wishlists collection query
---

# Delete Wishlist Item

## About

The `deleteWishlist` mutation removes a specific item from the authenticated customer's wishlist. Use this mutation to:

- Remove individual products from the wishlist
- Implement "Remove from Wishlist" buttons
- Clean up wishlist items programmatically

## Authentication

This mutation requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | The IRI of the wishlist item to delete (e.g. `/api/shop/wishlists/69`). |
| `clientMutationId` | `String` | Optional client-side mutation identifier for tracking. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `wishlist` | `Wishlist!` | The deleted wishlist item. |
| `wishlist.id` | `ID!` | IRI identifier of the removed item. |
| `wishlist._id` | `Int!` | Numeric identifier of the removed item. |
