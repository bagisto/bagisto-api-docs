---
outline: false
examples:
  - id: gql
    title: Get RMA custom field
    query: |
      query AdminRmaCustomField($id: ID!) {
        adminRmaCustomField(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/rma/custom-fields/4"
      }
    response: |
      {
        "data": {
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
---

# Get RMA custom field

Returns a single RMA custom field by its IRI.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminRmaCustomField(id: ID!)` | Query | Fetch one RMA custom field |

Pass the resource IRI (`/api/admin/rma/custom-fields/{id}`) as `id`. Select `_id` for the numeric id.

For field meanings, see the [menu overview](./).
