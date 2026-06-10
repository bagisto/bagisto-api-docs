---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Delete Theme Customizations
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/themes/mass-delete" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "indices": [1, 2] }'
    response: |
      { "deleted": [1, 2], "message": "Themes deleted." }
---

# Mass Delete Theme Customizations

Empty indices → 422.
