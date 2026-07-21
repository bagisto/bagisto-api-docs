---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create RMA custom field
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/custom-fields" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"code": "preferred_resolution", "label": "Preferred resolution", "type": "select", "is_required": 1, "position": 1, "status": 1, "options": [{"name": "Refund", "value": "refund"}, {"name": "Replacement", "value": "replacement"}]}'
    response: |
      {
        "id": 4,
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
---

# Create RMA custom field

Creates a new RMA custom field. Permission: `sales.rma.custom-fields.create`.

## Endpoint

```
POST /api/admin/rma/custom-fields
```

## Request body

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

Returns `201` with the created RMA custom field.
