---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Delete Locales
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/locales/mass-delete" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "indices": [3, 4] }'
    response: |
      { "deleted": [4], "skipped": [{ "id": 3, "reason": "Channel default" }], "message": "Locales processed." }
---

# Mass Delete Locales

Per-id guards (last-locale, channel-default) skip with a reason in `skipped`. Empty `indices` → 422. Permission: `settings.locales.delete`.
