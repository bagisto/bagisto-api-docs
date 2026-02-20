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

  - id: delete-all-wishlists-empty
    title: Delete All Wishlist Items - No Items
    description: Calling delete all when the customer has no wishlist items returns a zero deleted count.
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
              "deletedCount": 0
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

> **Note:** This is an authenticated-only operation. The customer is auto-detected from the Bearer token.

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

> **Note:** No additional input is required. Pass an empty input `{}`.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `deleteAllWishlists.message` | `String!` | Success message confirming deletion. |
| `deleteAllWishlists.deletedCount` | `Int!` | Number of wishlist items that were removed. |
