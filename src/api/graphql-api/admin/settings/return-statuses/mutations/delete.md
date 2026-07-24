---
outline: false
examples:
  - id: gql
    title: Delete RMA status
    query: |
      mutation DeleteAdminRmaStatus($input: deleteAdminRmaStatusInput!) {
        deleteAdminRmaStatus(input: $input) {
          adminRmaStatus {
            id
            _id
            title
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/rma/statuses/9"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminRmaStatus": {
            "adminRmaStatus": {
              "id": "/api/admin/rma/statuses/9",
              "_id": 9,
              "title": "Awaiting inspection",
              "message": "RMA status deleted successfully."
            }
          }
        }
      }
---

# Delete RMA status

Deletes a RMA status. Pass the resource IRI as `id`. Permission: `sales.rma.statuses.delete`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminRmaStatus(input:)` | Mutation | Delete a RMA status |

The mutation returns a snapshot of the deleted record — select `_id` for the numeric id.

Only **non-default** statuses can be deleted. Deleting a default (system) status returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | Resource IRI of the RMA status to delete. |
