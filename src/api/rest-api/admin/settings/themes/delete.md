---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Theme Customization
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/themes/1" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Theme deleted." }
---

# Delete Theme Customization

Permission: `settings.themes.delete`.
