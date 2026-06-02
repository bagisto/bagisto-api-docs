---
outline: false
apiType: rest
examples:
  - id: rest
    title: Admin User Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/users/1" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "Super Admin", "email": "admin@example.com", "roleId": 1, "status": 1 }
---

# Admin User Detail
