---
outline: false
examples:
  - id: gql
    title: Mass Delete RMA custom fields
    query: |
      mutation CreateAdminRmaCustomFieldMassDelete($input: createAdminRmaCustomFieldMassDeleteInput!) {
        createAdminRmaCustomFieldMassDelete(input: $input) {
          adminRmaCustomFieldMassDelete {
            deleted
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
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaCustomFieldMassDelete": {
            "adminRmaCustomFieldMassDelete": {
              "deleted": [
                4,
                6
              ],
              "message": "Selected RMA custom fields deleted successfully."
            }
          }
        }
      }
---

# Mass Delete RMA custom fields

Deletes several RMA custom fields in one call. Permission: `sales.rma.custom-fields.delete`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaCustomFieldMassDelete(input:)` | Mutation | Delete multiple RMA custom fields |

`deleted` is returned as a plain array of the numeric ids that were removed. An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric ids to delete. |
