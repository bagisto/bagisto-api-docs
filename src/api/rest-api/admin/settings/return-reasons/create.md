---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create RMA reason
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/reasons" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"title": "Damaged product", "status": 1, "position": 1, "resolution_type": ["return", "cancel_items"]}'
    response: |
      {
        "id": 6,
        "title": "Damaged product",
        "status": 1,
        "position": 1,
        "isAdmin": 0,
        "resolutionType": [
          "return",
          "cancel_items"
        ],
        "message": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T09:00:00+00:00"
      }
---

# Create RMA reason

Creates a new RMA reason. Permission: `sales.rma.reasons.create`.

## Endpoint

```
POST /api/admin/rma/reasons
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Reason label. |
| `resolution_type` | array | Yes | Allowed return actions: `return`, `cancel_items`. |
| `status` | integer | No | `1` active / `0` inactive (default `1`). |
| `position` | integer | No | Sort order. |

Returns `201` with the created RMA reason.
