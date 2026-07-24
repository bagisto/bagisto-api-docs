---
outline: false
examples:
  - id: gql
    title: Update RMA custom field
    query: |
      mutation UpdateAdminRmaCustomField($input: updateAdminRmaCustomFieldInput!) {
        updateAdminRmaCustomField(input: $input) {
          adminRmaCustomField {
            id
            _id
            code
            label
            type
            isRequired
            position
            inputValidation
            status
            options {
              id
              name
              value
            }
            message
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/rma/custom-fields/4",
          "label": "How should we resolve this?",
          "isRequired": 0,
          "position": 2,
          "status": 1,
          "options": [
            {
              "name": "Refund",
              "value": "refund"
            },
            {
              "name": "Store credit",
              "value": "store_credit"
            }
          ]
        }
      }
    response: |
      {
        "data": {
          "updateAdminRmaCustomField": {
            "adminRmaCustomField": {
              "id": "/api/admin/rma/custom-fields/4",
              "_id": 4,
              "code": "preferred_resolution",
              "label": "How should we resolve this?",
              "type": "select",
              "isRequired": 0,
              "position": 2,
              "inputValidation": null,
              "status": 1,
              "options": [
                {
                  "id": 13,
                  "name": "Refund",
                  "value": "refund"
                },
                {
                  "id": 14,
                  "name": "Store credit",
                  "value": "store_credit"
                }
              ],
              "message": null,
              "createdAt": "2026-07-20T09:00:00+00:00",
              "updatedAt": "2026-07-20T11:00:00+00:00"
            }
          }
        }
      }
---

# Update RMA custom field

Partial update — send only the fields you want to change. Pass the resource IRI as `id`. Permission: `sales.rma.custom-fields.edit`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminRmaCustomField(input:)` | Mutation | Update a RMA custom field |

## Input fields

Input fields are camelCase. `id` is the resource IRI.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | Resource IRI of the RMA custom field to update. |
| `label` | string | No | Field label. |
| `is_required` | integer | No | `1`/`0`. |
| `position` | integer | No | Sort order. |
| `status` | integer | No | `1` active / `0` inactive. |
| `options` | array | No | Sending `options` **replaces** the full option set. Each entry `{ name, value }`. |
