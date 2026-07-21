---
outline: false
examples:
  - id: gql
    title: Create RMA custom field
    query: |
      mutation CreateAdminRmaCustomField($input: createAdminRmaCustomFieldInput!) {
        createAdminRmaCustomField(input: $input) {
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
          "code": "preferred_resolution",
          "label": "Preferred resolution",
          "type": "select",
          "isRequired": 1,
          "position": 1,
          "status": 1,
          "options": [
            {
              "name": "Refund",
              "value": "refund"
            },
            {
              "name": "Replacement",
              "value": "replacement"
            }
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaCustomField": {
            "adminRmaCustomField": {
              "id": "/api/admin/rma/custom-fields/4",
              "_id": 4,
              "code": "preferred_resolution",
              "label": "Preferred resolution",
              "type": "select",
              "isRequired": 1,
              "position": 1,
              "inputValidation": null,
              "status": 1,
              "options": [
                {
                  "id": 11,
                  "name": "Refund",
                  "value": "refund"
                },
                {
                  "id": 12,
                  "name": "Replacement",
                  "value": "replacement"
                }
              ],
              "message": null,
              "createdAt": "2026-07-20T09:00:00+00:00",
              "updatedAt": "2026-07-20T09:00:00+00:00"
            }
          }
        }
      }
---

# Create RMA custom field

Creates a new RMA custom field. Permission: `sales.rma.custom-fields.create`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaCustomField(input:)` | Mutation | Create a RMA custom field |

## Input fields

Input fields are camelCase.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `code` | string | Yes | Unique machine code. |
| `label` | string | Yes | Field label. |
| `type` | string | Yes | One of `text`, `textarea`, `select`, `multiselect`, `checkbox`, `radio`. |
| `options` | array | Conditional | **Required** for `select` / `multiselect` / `checkbox` / `radio`. Each entry `{ name, value }`. |
| `is_required` | integer | No | `1`/`0` (default `0`). |
| `position` | integer | No | Sort order. |
| `input_validation` | string | No | Validation rule name. |
| `status` | integer | No | `1` active / `0` inactive (default `1`). |
