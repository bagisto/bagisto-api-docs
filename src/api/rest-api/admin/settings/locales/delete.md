---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Locale
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/locales/2" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Locale deleted." }
---

# Delete Locale

::: warning Two guards (HTTP 400)
- **Last locale** — refuses if this is the only locale left.
- **Channel default** — refuses if any channel references it as `default_locale_id`. (Project-specific safeguard — the monolith silently breaks the channel in this case.)
:::

Permission: `settings.locales.delete`.
