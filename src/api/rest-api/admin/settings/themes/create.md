---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Theme Customization (Step 1)
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/themes" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "name": "Homepage Banner", "type": "image_carousel", "sort_order": 1, "channel_id": 1, "theme_code": "default" }'
    response: |
      { "id": 1, "name": "Homepage Banner", "type": "image_carousel" }
---

# Create Theme Customization (Step 1)

Step-1: name, type, sort_order, channel_id, theme_code. Per-locale `options` are configured via PUT.

::: warning Theme uploads deferred
Multipart binary upload for theme images is **not yet supported via the API** — use the admin panel.
:::

Permission: `settings.themes.create`.
