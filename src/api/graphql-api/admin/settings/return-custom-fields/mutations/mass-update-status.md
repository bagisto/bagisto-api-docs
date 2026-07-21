---
outline: false
examples:
  - id: gql
    title: Mass Update RMA custom fields Status
    query: |
      mutation CreateAdminRmaCustomFieldMassUpdateStatus($input: createAdminRmaCustomFieldMassUpdateStatusInput!) {
        createAdminRmaCustomFieldMassUpdateStatus(input: $input) {
          adminRmaCustomFieldMassUpdateStatus {
            updated
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [
            4,
            6
          ],
          "value": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaCustomFieldMassUpdateStatus": {
            "adminRmaCustomFieldMassUpdateStatus": {
              "updated": [
                4,
                6
              ],
              "message": "Selected RMA custom fields updated successfully."
            }
          }
        }
      }
---

# Mass Update RMA custom fields Status

Sets the active `status` flag on several RMA custom fields in one call. Permission: `sales.rma.custom-fields.edit`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaCustomFieldMassUpdateStatus(input:)` | Mutation | Update the status of multiple RMA custom fields |

`updated` is returned as a plain array of the numeric ids that changed. An empty `indices` list or an out-of-range `value` returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric ids to update. |
| `value` | Int | Yes | New status — `1` (active) or `0` (inactive). |
