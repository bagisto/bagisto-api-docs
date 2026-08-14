---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Admin User
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/users" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "name": "Ops User", "email": "ops@example.com", "password": "secret123", "password_confirmation": "secret123", "role_id": 2, "status": 1 }'
    response: |
      { "id": 4, "name": "Ops User", "email": "ops@example.com", "roleId": 2, "status": 1 }
---

# Create Admin User

Required: `name`, `email` (unique), `password` (+ `password_confirmation`), `role_id`. Optional: `status` (`0`/`1`).

### Image upload deferred

Admin user profile-image upload is not yet supported via the API.

Permission: `settings.users.create`.
