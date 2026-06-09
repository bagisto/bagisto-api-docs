---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete My Account
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/users/delete-self" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "password": "current-password" }'
    response: |
      { "success": true, "message": "Your admin account has been deleted." }
---

# Delete My Account

Deletes the **authenticated** admin's own account after re-confirming their password — the API equivalent of the "delete my account" action on the admin profile.

- Requires the caller's current `password`. A missing or incorrect password returns `422`.
- Refuses to delete the **last remaining** admin (`400`).
- This is distinct from [Delete User](./delete) (`DELETE /settings/users/{id}`), which deletes **another** admin and always refuses self-deletion.
- Deleting the account also invalidates the token that owns it.

No additional permission is required beyond authentication — the password confirmation is the gate.
