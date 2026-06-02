---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Import
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/data-transfer/imports/3" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Import deleted." }
---

# Delete Import

Removes the DB row and best-effort deletes the underlying upload file from storage. Permission: `settings.data_transfer.imports.delete`.
