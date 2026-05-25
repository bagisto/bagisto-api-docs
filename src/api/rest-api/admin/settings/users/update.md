---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Admin User
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/users/4" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "name": "Ops User (Updated)" }'
    response: |
      { "id": 4, "name": "Ops User (Updated)" }
---

# Update Admin User

Partial. Permission: `settings.users.edit`.
