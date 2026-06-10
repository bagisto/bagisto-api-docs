---
outline: false
apiType: rest
examples:
  - id: rest
    title: Cancel Import
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/data-transfer/imports/3/cancel" -H "Authorization: Bearer <token>"
    response: |
      { "id": 3, "state": "cancelled", "message": "Import cancelled successfully." }
---

# Cancel Import

Sets state to `cancelled`.

::: warning Terminal-state guard
Refuses (HTTP 422) when the import is in a terminal state (`completed`, `processed`, `failed`, `cancelled`).
:::

Permission: `settings.data_transfer.imports.edit`.
