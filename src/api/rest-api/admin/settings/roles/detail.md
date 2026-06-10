---
outline: false
apiType: rest
examples:
  - id: rest
    title: Role Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/roles/1" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "Administrator", "description": "Full access", "permissionType": "all", "permissions": null }
---

# Role Detail
