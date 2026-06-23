---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Channel
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/channels/2" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "translations": { "en": { "name": "United States Store", "description": "Our US storefront", "seo_description": "Welcome" } } }'
    response: |
      {
        "id": 2,
        "code": "us",
        "name": "United States Store",
        "hostname": "us.example.com",
        "defaultLocaleId": 1,
        "baseCurrencyId": 1,
        "rootCategoryId": 1,
        "locales": [{ "id": 1, "code": "en", "name": "English", "direction": "ltr" }],
        "currencies": [{ "id": 1, "code": "USD", "name": "US Dollar", "symbol": "$" }],
        "inventorySources": [{ "id": 1, "code": "default", "name": "Default", "status": 1 }],
        "homeSeo": { "meta_title": null, "meta_keywords": null, "meta_description": "Welcome" },
        "translations": [
          { "locale": "en", "name": "United States Store", "description": "Our US storefront", "maintenanceModeText": null, "homeSeo": { "meta_title": null, "meta_keywords": null, "meta_description": "Welcome" } }
        ]
      }
---

# Update Channel

Code/hostname uniqueness excludes self. Use the `translations` map for locale-nested attributes (name, description, seo_*, maintenance_mode_text). Top-level scalar fields broadcast to every configured locale via the repository.

The response returns the channel with `locales` / `currencies` / `inventorySources` as object arrays (replacing the former `localeIds` / `currencyIds` / `inventorySourceIds` id arrays), plus the `homeSeo` block and per-locale `translations`. **Omitting** the `locales` / `currencies` / `inventory_sources` arrays preserves the channel's existing assignments; **supplying** any of them replaces that set entirely.

Permission: `settings.channels.edit`.
