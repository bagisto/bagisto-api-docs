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

  - id: delete-all-compare-items-empty
    title: Delete All Compare Items - No Items
    description: Calling delete all when the customer has no compare items returns a zero deleted count.
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

# Delete All Compare Items

## About

The `createDeleteAllCompareItems` mutation removes all products from the authenticated customer's comparison list at once. Use this mutation to:

- Clear the entire comparison list
- Implement a "Clear All" button for the compare feature
- Reset the customer's comparison state

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
| `deleteAllCompareItems.message` | `String!` | Success message confirming deletion. |
| `deleteAllCompareItems.deletedCount` | `Int!` | Number of compare items that were removed. |
