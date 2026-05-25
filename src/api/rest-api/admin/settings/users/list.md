---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Admin Users
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/users" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "Super Admin", "email": "admin@example.com", "roleId": 1, "status": 1 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Admin Users

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/users` | GET |
