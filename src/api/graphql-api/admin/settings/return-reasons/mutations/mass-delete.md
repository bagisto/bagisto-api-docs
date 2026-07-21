---
outline: false
examples:
  - id: gql
    title: Mass Delete RMA reasons
    query: |
      mutation CreateAdminRmaReasonMassDelete($input: createAdminRmaReasonMassDeleteInput!) {
        createAdminRmaReasonMassDelete(input: $input) {
          adminRmaReasonMassDelete {
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [
            2,
            3,
            4
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaReasonMassDelete": {
            "adminRmaReasonMassDelete": {
              "deleted": [
                2,
                3,
                4
              ],
              "message": "Selected RMA reasons deleted successfully."
            }
          }
        }
      }
---

# Mass Delete RMA reasons

Deletes several RMA reasons in one call. Permission: `sales.rma.reasons.delete`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaReasonMassDelete(input:)` | Mutation | Delete multiple RMA reasons |

`deleted` is returned as a plain array of the numeric ids that were removed. An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric ids to delete. |
