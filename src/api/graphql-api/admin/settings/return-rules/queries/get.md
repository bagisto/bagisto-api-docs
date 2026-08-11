---
outline: false
examples:
  - id: gql
    title: Get RMA rule
    query: |
      query AdminRmaRule($id: ID!) {
        adminRmaRule(id: $id) {
          id
          _id
          name
          description
          status
          returnPeriod
          default
          message
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/rma/rules/3"
      }
    response: |
      {
        "data": {
          "adminRmaRule": {
            "id": "/api/admin/rma/rules/3",
            "_id": 3,
            "name": "Apparel 30-day returns",
            "description": "Return window for all clothing.",
            "status": 1,
            "returnPeriod": 30,
            "default": 0,
            "message": null,
            "createdAt": "2026-07-20T09:00:00+00:00",
            "updatedAt": "2026-07-20T09:00:00+00:00"
          }
        }
      }
---

# Get RMA rule

Returns a single RMA rule by its IRI.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminRmaRule(id: ID!)` | Query | Fetch one RMA rule |

Pass the resource IRI (`/api/admin/rma/rules/{id}`) as `id`. Select `_id` for the numeric id.

For field meanings, see the [menu overview](../).
