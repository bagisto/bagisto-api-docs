---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Role
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/roles/3" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Role deleted." }
---

# Delete Role

### Two guards (HTTP 400)

- **In use** — refuses if any admin (`admins.role_id`) references this role.
- **Last role** — refuses if this is the only role remaining.

Permission: `settings.roles.delete`.
