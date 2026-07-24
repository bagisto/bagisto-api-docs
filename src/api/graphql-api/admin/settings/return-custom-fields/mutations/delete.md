---
outline: false
examples:
  - id: gql
    title: Delete RMA custom field
    query: |
      mutation DeleteAdminRmaCustomField($input: deleteAdminRmaCustomFieldInput!) {
        deleteAdminRmaCustomField(input: $input) {
          adminRmaCustomField {
            id
            _id
            label
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/rma/custom-fields/4"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminRmaCustomField": {
            "adminRmaCustomField": {
              "id": "/api/admin/rma/custom-fields/4",
              "_id": 4,
              "label": "Preferred resolution",
              "message": "RMA custom field deleted successfully."
            }
          }
        }
      }
---

# Delete RMA custom field

Deletes a RMA custom field. Pass the resource IRI as `id`. Permission: `sales.rma.custom-fields.delete`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminRmaCustomField(input:)` | Mutation | Delete a RMA custom field |

The mutation returns a snapshot of the deleted record — select `_id` for the numeric id.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | Resource IRI of the RMA custom field to delete. |
