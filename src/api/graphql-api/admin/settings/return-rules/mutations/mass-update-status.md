---
outline: false
examples:
  - id: gql
    title: Mass Update RMA rules Status
    query: |
      mutation CreateAdminRmaRuleMassUpdateStatus($input: createAdminRmaRuleMassUpdateStatusInput!) {
        createAdminRmaRuleMassUpdateStatus(input: $input) {
          adminRmaRuleMassUpdateStatus {
            updated
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [
            3,
            5
          ],
          "value": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaRuleMassUpdateStatus": {
            "adminRmaRuleMassUpdateStatus": {
              "updated": [
                3,
                5
              ],
              "message": "Selected RMA rules updated successfully."
            }
          }
        }
      }
---

# Mass Update RMA rules Status

Sets the active `status` flag on several RMA rules in one call. Permission: `sales.rma.rules.edit`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaRuleMassUpdateStatus(input:)` | Mutation | Update the status of multiple RMA rules |

`updated` is returned as a plain array of the numeric ids that changed. An empty `indices` list or an out-of-range `value` returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric ids to update. |
| `value` | Int | Yes | New status — `1` (active) or `0` (inactive). |
