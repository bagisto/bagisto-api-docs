---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Locale
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/locales/2" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "name": "Français" }'
    response: |
      { "id": 2, "code": "fr", "name": "Français" }
---

# Update Locale

Partial. `code` uniqueness excludes self. Image upload deferred. Permission: `settings.locales.edit`.
