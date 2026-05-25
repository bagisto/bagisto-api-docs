---
outline: false
apiType: rest
examples:
  - id: admin-customer-group-mass-delete
    title: Mass Delete Customer Groups
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/groups/mass-delete" \
        -H "X-Admin-Key: <your-admin-api-key>" \
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

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups/mass-delete` | POST |

System-group + in-use guards skip per-id with a reason. Empty `indices` → 422. Permission: `customers.groups.delete`.
