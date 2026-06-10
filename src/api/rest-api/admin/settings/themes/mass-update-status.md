---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Update Theme Status
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/themes/mass-update-status" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "indices": [1, 2], "value": 0 }'
    response: |
      { "updated": [1, 2], "value": 0, "message": "Statuses updated." }
---

# Mass Update Theme Status

Body: `{ indices: int[], value: 0|1 }`.
