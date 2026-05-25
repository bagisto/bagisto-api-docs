---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Channel
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/channels" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "code": "us", "name": "US Store", "hostname": "us.example.com", "locales": [1], "currencies": [1], "inventory_sources": [1], "default_locale_id": 1, "base_currency_id": 1, "root_category_id": 1, "description": "Our US storefront", "seo_title": "Best products", "seo_description": "Welcome to our shop" }'
    response: |
      { "id": 2, "code": "us", "name": "US Store", "hostname": "us.example.com" }
---

# Create Channel

## Validation

- `code` — unique, alpha-dash.
- `hostname` — unique.
- `locales`, `currencies`, `inventory_sources` — non-empty integer arrays.
- `default_locale_id` must appear in `locales`; `base_currency_id` must appear in `currencies`.
- `root_category_id` must exist.

::: warning Logo / favicon upload deferred
Channel `logo` and `favicon` multipart uploads are **not yet supported via the API** — use the admin panel. Other scalar/translation fields work fine.
:::

Permission: `settings.channels.create`.
