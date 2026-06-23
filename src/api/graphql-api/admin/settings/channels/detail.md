---
outline: false
examples:
  - id: gql
    title: Channel Detail
    description: Fetch a single channel by id. The locale / currency / inventory-source assignments and the per-locale translations are field-selectable connections; the home-page SEO triplet is selectable as flat fields.
    query: |
      query AdminSettingsChannel($id: ID!) {
        adminSettingsChannel(id: $id) {
          id
          _id
          code
          name
          description
          hostname
          theme
          timezone
          defaultLocaleId
          baseCurrencyId
          rootCategoryId
          isMaintenanceOn
          maintenanceModeText
          allowedIps
          logo
          logoUrl
          favicon
          faviconUrl
          seoMetaTitle
          seoMetaDescription
          seoMetaKeywords
          homeSeo
          createdAt
          updatedAt
          locales {
            edges {
              node {
                _id
                code
                name
                direction
              }
            }
          }
          currencies {
            edges {
              node {
                _id
                code
                name
                symbol
              }
            }
          }
          inventorySources {
            edges {
              node {
                _id
                code
                name
                status
              }
            }
          }
          translations {
            edges {
              node {
                _id
                locale
                name
                description
                maintenanceModeText
                homeSeo
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/settings/channels/1"
      }
    response: |
      {
        "data": {
          "adminSettingsChannel": {
            "id": "/api/admin/settings/channels/1",
            "_id": 1,
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
            "seoMetaTitle": "Demo store",
            "seoMetaDescription": "Demo store meta description",
            "seoMetaKeywords": "Demo store meta keyword",
            "homeSeo": {
              "meta_title": "Demo store",
              "meta_keywords": "Demo store meta keyword",
              "meta_description": "Demo store meta description"
            },
            "createdAt": null,
            "updatedAt": "2026-04-08T17:23:40+05:30",
            "locales": {
              "edges": [
                {
                  "node": {
                    "_id": 1,
                    "code": "en",
                    "name": "English",
                    "direction": "ltr"
                  }
                },
                {
                  "node": {
                    "_id": 10,
                    "code": "ar",
                    "name": "Arabic",
                    "direction": "rtl"
                  }
                }
              ]
            },
            "currencies": {
              "edges": [
                {
                  "node": {
                    "_id": 1,
                    "code": "USD",
                    "name": "US Dollar",
                    "symbol": "$"
                  }
                }
              ]
            },
            "inventorySources": {
              "edges": [
                {
                  "node": {
                    "_id": 1,
                    "code": "default",
                    "name": "Default",
                    "status": 1
                  }
                }
              ]
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "_id": 1,
                    "locale": "en",
                    "name": "Default Store",
                    "description": "",
                    "maintenanceModeText": "Maintenance Mode",
                    "homeSeo": {
                      "meta_title": "Demo store",
                      "meta_keywords": "Demo store meta keyword",
                      "meta_description": "Demo store meta description"
                    }
                  }
                },
                {
                  "node": {
                    "_id": 2,
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
                }
              ]
            }
          }
        }
      }
---

# Channel Detail

Returns a single channel by id. The assigned locales, currencies, inventory sources, and the per-locale translations are returned as field-selectable connections — pick exactly the node fields you need.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsChannel(id: ID!)` | Query | Fetch one channel by id |

## Nested data

| Field | Shape | Node fields |
|-------|-------|-------------|
| `locales` | connection | `_id`, `code`, `name`, `direction` |
| `currencies` | connection | `_id`, `code`, `name`, `symbol` |
| `inventorySources` | connection | `_id`, `code`, `name`, `status` |
| `translations` | connection | `_id`, `locale`, `name`, `description`, `maintenanceModeText`, `homeSeo` |

## Notes

- `locales`, `currencies`, and `inventorySources` are connections — sub-select `{ edges { node { … } } }`. **These replace the former `localeIds` / `currencyIds` / `inventorySourceIds` integer arrays**: the assigned ids are now `locales { edges { node { _id } } }` (and likewise for currencies / inventory sources).
- The home-page SEO triplet is selectable as three flat fields — `seoMetaTitle`, `seoMetaDescription`, `seoMetaKeywords` — read from the channel's `home_seo` block. The raw `homeSeo` object is also available if you prefer the whole block at once. Each translation node carries its own per-locale `homeSeo`.
- `allowedIps` is a JSON array of IP / CIDR strings (or empty when unrestricted).
- `logo` / `favicon` are the stored relative paths; `logoUrl` / `faviconUrl` are the ready-to-use absolute URLs. All four are `null` when no image is set.

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with a channel id that exists in your store — use the [`adminSettingsChannels`](./list) query to discover valid ids.
:::
