---
outline: false
examples:
  - id: gql
    title: Mass Update RMA statuses Status
    query: |
      mutation CreateAdminRmaStatusMassUpdateStatus($input: createAdminRmaStatusMassUpdateStatusInput!) {
        createAdminRmaStatusMassUpdateStatus(input: $input) {
          adminRmaStatusMassUpdateStatus {
            updated
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [
            9,
            10
          ],
          "value": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaStatusMassUpdateStatus": {
            "adminRmaStatusMassUpdateStatus": {
              "updated": [
                9,
                10
              ],
              "message": "Selected RMA statuses updated successfully."
            }
          }
        }
      }
---

# Mass Update RMA statuses Status

Sets the active `status` flag on several RMA statuses in one call. Permission: `sales.rma.statuses.edit`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaStatusMassUpdateStatus(input:)` | Mutation | Update the status of multiple RMA statuses |

`updated` is returned as a plain array of the numeric ids that changed. An empty `indices` list or an out-of-range `value` returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric ids to update. |
| `value` | Int | Yes | New status — `1` (active) or `0` (inactive). |
