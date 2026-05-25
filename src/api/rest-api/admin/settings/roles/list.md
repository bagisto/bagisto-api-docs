---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Roles
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/roles" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "Administrator", "description": "Full access", "permissionType": "all", "permissions": null }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Roles
