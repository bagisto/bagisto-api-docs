---
outline: false
examples:
  - id: gql
    title: Delete RMA reason
    query: |
      mutation DeleteAdminRmaReason($input: deleteAdminRmaReasonInput!) {
        deleteAdminRmaReason(input: $input) {
          adminRmaReason {
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
          "id": "/api/admin/rma/reasons/2"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminRmaReason": {
            "adminRmaReason": {
              "id": "/api/admin/rma/reasons/2",
              "_id": 2,
              "title": "Damaged product",
              "message": "RMA reason deleted successfully."
            }
          }
        }
      }
---

# Delete RMA reason

Deletes a RMA reason. Pass the resource IRI as `id`. Permission: `sales.rma.reasons.delete`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminRmaReason(input:)` | Mutation | Delete a RMA reason |

The mutation returns a snapshot of the deleted record — select `_id` for the numeric id.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | Resource IRI of the RMA reason to delete. |
