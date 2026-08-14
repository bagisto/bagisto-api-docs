---
outline: false
apiType: rest
examples:
  - id: admin-customer-group-mass-delete
    title: Mass Delete Customer Groups
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/groups/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [4, 5, 1] }'
    response: |
      {
        "deleted": [5],
        "skipped": [
          { "id": 1, "reason": "System group cannot be deleted" },
          { "id": 4, "reason": "Group has customers attached" }
        ],
        "message": "Customer groups processed."
      }
---

# Mass Delete Customer Groups

Deletes several customer groups in one request. The response reports which ids were `deleted` and which were `skipped` (with a reason).

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups/mass-delete` | POST |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `indices` | integer[] | yes | Group IDs to delete. Empty → 422. |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `deleted` | integer[] | IDs that were removed. |
| `skipped` | object[] | `{ id, reason }` for IDs refused (system group or has customers attached). |
| `message` | string | Summary message. |

System-group + in-use guards skip per-id with a reason rather than failing the whole batch. Permission: `customers.groups.delete`.

For the system-group and in-use delete rules, see the [Customer Groups overview](./index.md).
