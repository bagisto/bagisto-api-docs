---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update RMA custom field
    query: |
      curl -X PUT "https://your-domain.com/api/admin/rma/custom-fields/4" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"label": "How should we resolve this?", "is_required": 0, "position": 2, "status": 1, "options": [{"name": "Refund", "value": "refund"}, {"name": "Store credit", "value": "store_credit"}]}'
    response: |
      {
        "id": 4,
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
---

# Update RMA custom field

Partial update — send only the fields you want to change; omitted fields keep their current value. Permission: `sales.rma.custom-fields.edit`.

## Endpoint

```
PUT /api/admin/rma/custom-fields/{id}
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `label` | string | No | Field label. |
| `is_required` | integer | No | `1`/`0`. |
| `position` | integer | No | Sort order. |
| `status` | integer | No | `1` active / `0` inactive. |
| `options` | array | No | Sending `options` **replaces** the full option set. Each entry `{ name, value }`. |

Returns `200` with the updated RMA custom field.
