---
outline: false
examples:
  - id: gql
    title: Mass Delete RMA statuses
    query: |
      mutation CreateAdminRmaStatusMassDelete($input: createAdminRmaStatusMassDeleteInput!) {
        createAdminRmaStatusMassDelete(input: $input) {
          adminRmaStatusMassDelete {
            deleted
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
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaStatusMassDelete": {
            "adminRmaStatusMassDelete": {
              "deleted": [
                9,
                10
              ],
              "message": "Selected RMA statuses deleted successfully."
            }
          }
        }
      }
---

# Mass Delete RMA statuses

Deletes several RMA statuses in one call. Permission: `sales.rma.statuses.delete`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaStatusMassDelete(input:)` | Mutation | Delete multiple RMA statuses |

`deleted` is returned as a plain array of the numeric ids that were removed. An empty or missing `indices` list returns a `422` error.

Default (system) statuses in the list are **silently skipped**.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric ids to delete. |
