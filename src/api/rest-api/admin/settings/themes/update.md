---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Theme Customization
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/themes/1" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "locale": "en", "options": { "title": "Welcome to our store!" } }'
    response: |
      { "id": 1, "name": "Homepage Banner" }
---

# Update Theme Customization

Pass `locale` + `options` to write per-locale options. Permission: `settings.themes.edit`.
