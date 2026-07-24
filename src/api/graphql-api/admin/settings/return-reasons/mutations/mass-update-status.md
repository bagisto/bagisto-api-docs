---
outline: false
examples:
  - id: gql
    title: Mass Update RMA reasons Status
    query: |
      mutation CreateAdminRmaReasonMassUpdateStatus($input: createAdminRmaReasonMassUpdateStatusInput!) {
        createAdminRmaReasonMassUpdateStatus(input: $input) {
          adminRmaReasonMassUpdateStatus {
            updated
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [
            2,
            3
          ],
          "value": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaReasonMassUpdateStatus": {
            "adminRmaReasonMassUpdateStatus": {
              "updated": [
                2,
                3
              ],
              "message": "Selected RMA reasons updated successfully."
            }
          }
        }
      }
---

# Mass Update RMA reasons Status

Sets the active `status` flag on several RMA reasons in one call. Permission: `sales.rma.reasons.edit`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaReasonMassUpdateStatus(input:)` | Mutation | Update the status of multiple RMA reasons |

`updated` is returned as a plain array of the numeric ids that changed. An empty `indices` list or an out-of-range `value` returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric ids to update. |
| `value` | Int | Yes | New status — `1` (active) or `0` (inactive). |
