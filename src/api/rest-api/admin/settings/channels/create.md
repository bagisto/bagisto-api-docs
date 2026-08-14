---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Channel
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/channels" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "code": "us", "name": "US Store", "hostname": "us.example.com", "locales": [1], "currencies": [1], "inventory_sources": [1], "default_locale_id": 1, "base_currency_id": 1, "root_category_id": 1, "description": "Our US storefront", "seo_title": "Best products", "seo_description": "Welcome to our shop" }'
    response: |
      {
        "id": 2,
        "code": "us",
        "name": "US Store",
        "hostname": "us.example.com",
        "defaultLocaleId": 1,
        "baseCurrencyId": 1,
        "rootCategoryId": 1,
        "locales": [{ "id": 1, "code": "en", "name": "English", "direction": "ltr" }],
        "currencies": [{ "id": 1, "code": "USD", "name": "US Dollar", "symbol": "$" }],
        "inventorySources": [{ "id": 1, "code": "default", "name": "Default", "status": 1 }],
        "homeSeo": { "meta_title": "Best products", "meta_keywords": null, "meta_description": "Welcome to our shop" },
        "translations": [
          { "locale": "en", "name": "US Store", "description": "Our US storefront", "maintenanceModeText": null, "homeSeo": { "meta_title": "Best products", "meta_keywords": null, "meta_description": "Welcome to our shop" } }
        ]
      }
---

# Create Channel

Send the assignments as integer-array inputs named `locales` / `currencies` / `inventory_sources` (snake_case). The create response returns the channel with its assigned `locales` / `currencies` / `inventorySources` as object arrays, the `homeSeo` block, and the per-locale `translations`.

## Validation

- `code` — unique, alpha-dash.
- `hostname` — unique.
- `locales`, `currencies`, `inventory_sources` — non-empty integer arrays.
- `default_locale_id` must appear in `locales`; `base_currency_id` must appear in `currencies`.
- `root_category_id` must exist.

### Logo / favicon upload deferred

Channel `logo` and `favicon` multipart uploads are **not yet supported via the API** — use the admin panel. Other scalar/translation fields work fine.

Permission: `settings.channels.create`.
