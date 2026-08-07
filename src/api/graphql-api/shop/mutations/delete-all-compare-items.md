---
outline: false
examples:
  - id: delete-all-compare-items
    title: Delete All Compare Items
    description: Remove all compare items for the authenticated customer. Returns the count of deleted items.
    query: |
      mutation DeleteAllCompareItems {
        createDeleteAllCompareItems(input: {}) {
          deleteAllCompareItems {
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
          "createDeleteAllCompareItems": {
            "deleteAllCompareItems": {
              "message": "All compare items have been removed successfully",
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

# Delete All Compare Items

## About

The `createDeleteAllCompareItems` mutation removes all products from the authenticated customer's comparison list at once. Use this mutation to:

- Clear the entire comparison list
- Implement a "Clear All" button for the compare feature
- Reset the customer's comparison state

The comparison list is resolved from the Bearer token, so there is nothing to identify in the input — the mutation always clears the calling customer's own list.

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
| `deleteAllCompareItems.id` | `ID!` | Identifier of the operation result. |
| `deleteAllCompareItems.message` | `String` | Message confirming the list was cleared. |
| `deleteAllCompareItems.deletedCount` | `Int` | Number of products removed. `0` when the list was already empty. |

Clearing an already-empty list is not an error — the mutation succeeds and returns `deletedCount: 0` with the same message, so a "Clear All" button needs no guard against an empty list.
