---
outline: false
examples:
  - id: delete-all-wishlists
    title: Delete All Wishlist Items
    description: Remove all wishlist items for the authenticated customer. Returns the count of deleted items.
    query: |
      mutation DeleteAllWishlists {
        createDeleteAllWishlists(input: {}) {
          deleteAllWishlists {
            message
            deletedCount
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "createDeleteAllWishlists": {
            "deleteAllWishlists": {
              "message": "All wishlist items have been removed successfully",
              "deletedCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

---

# Delete All Wishlist Items

## About

The `createDeleteAllWishlists` mutation removes all items from the authenticated customer's wishlist at once. Use this mutation to:

- Clear the entire wishlist
- Implement a "Clear All" button on the wishlist page
- Reset the customer's wishlist state

The wishlist is resolved from the Bearer token, so there is nothing to identify in the input — the mutation always clears the calling customer's own wishlist.

## Authentication

This mutation requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `clientMutationId` | `String` | Optional client-side mutation identifier for tracking. |

Pass an empty input object; `clientMutationId` is the only field the mutation accepts.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `deleteAllWishlists.id` | `ID!` | Identifier of the operation result. |
| `deleteAllWishlists.message` | `String` | Message confirming the wishlist was cleared. |
| `deleteAllWishlists.deletedCount` | `Int` | Number of items removed. `0` when the wishlist was already empty. |

Clearing an already-empty wishlist is not an error — the mutation succeeds and returns `deletedCount: 0` with the same message, so a "Clear All" button needs no guard against an empty list.
