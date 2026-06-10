---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Admin User
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/users/4" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Admin deleted." }
---

# Delete Admin User

::: warning Two guards (HTTP 400)
- **Self-delete** — refuses if the caller is deleting themselves.
- **Last admin** — refuses if this is the only admin remaining.
:::

Permission: `settings.users.delete`.
