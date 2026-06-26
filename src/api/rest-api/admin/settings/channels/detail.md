---
outline: false
apiType: rest
examples:
  - id: rest
    title: Channel Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/channels/1" -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 1,
        "code": "default",
        "name": "Default Store",
        "description": "",
        "hostname": "https://store.example.com",
        "theme": "default",
        "timezone": null,
        "defaultLocaleId": 1,
        "baseCurrencyId": 1,
        "rootCategoryId": 1,
        "isMaintenanceOn": false,
        "maintenanceModeText": "Maintenance Mode",
        "allowedIps": ["192.168.45.51"],
        "logo": null,
        "logoUrl": null,
        "favicon": null,
        "faviconUrl": null,
        "locales": [
          { "id": 1, "code": "en", "name": "English", "direction": "ltr" },
          { "id": 10, "code": "ar", "name": "Arabic", "direction": "rtl" }
        ],
        "currencies": [
          { "id": 1, "code": "USD", "name": "US Dollar", "symbol": "$" }
        ],
        "inventorySources": [
          { "id": 1, "code": "default", "name": "Default", "status": 1 }
        ],
        "homeSeo": {
          "meta_title": "Demo store",
          "meta_keywords": "Demo store meta keyword",
          "meta_description": "Demo store meta description"
        },
        "translations": [
          {
            "locale": "en",
            "name": "Default Store",
            "description": "",
            "maintenanceModeText": "Maintenance Mode",
            "homeSeo": {
              "meta_title": "Demo store",
              "meta_keywords": "Demo store meta keyword",
              "meta_description": "Demo store meta description"
            }
          },
          {
            "locale": "fr",
            "name": "Default",
            "description": null,
            "maintenanceModeText": null,
            "homeSeo": {
              "meta_title": "Demo store",
              "meta_keywords": "Demo store meta keyword",
              "meta_description": "Demo store meta description"
            }
          }
        ],
        "createdAt": null,
        "updatedAt": "2026-04-08T17:23:40+05:30"
      }
---

# Channel Detail

Returns a single channel by id, including its assigned locales, currencies, inventory sources, SEO block, and per-locale translations.

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/channels/{id}` | GET |

## Notes

- `locales`, `currencies`, and `inventorySources` are arrays of objects (`id` / `code` / `name` / …) — read the assigned ids from each object's `id`.
- `homeSeo` is the home-page SEO block (`meta_title` / `meta_keywords` / `meta_description`); each translation carries its own per-locale `homeSeo`.
- `allowedIps` is a JSON array of IP / CIDR strings (empty when unrestricted).
- `logo` / `favicon` are the stored relative paths; `logoUrl` / `faviconUrl` are the ready-to-use absolute URLs (`null` when unset).
