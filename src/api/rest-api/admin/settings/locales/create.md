---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Locale
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/locales" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "code": "fr", "name": "French", "direction": "ltr" }'
    response: |
      { "id": 2, "code": "fr", "name": "French", "direction": "ltr" }
---

# Create Locale

## Request Body

| Field | Type | Notes |
|-------|------|-------|
| `code` | string | Required, unique, regex `^[a-z0-9_-]+$`. |
| `name` | string | Required. |
| `direction` | enum | Required, `ltr` or `rtl`. |
| `logo_path` | string | Optional storage path (binary upload deferred — see warning). |

::: warning Image upload deferred (v1)
`logo_path` is accepted only as a path string. Multipart binary upload for locale logos is **not yet supported via the API** — use the admin panel for now. Fires `core.locale.create.before/after`.
:::

Permission: `settings.locales.create`.
