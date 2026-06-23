---
outline: false
examples:
  - id: gql
    title: Theme Customization Detail
    description: Fetch a single theme customization block, including its per-locale content under the translations connection.
    query: |
      query AdminSettingsTheme($id: ID!) {
        adminSettingsTheme(id: $id) {
          id
          _id
          name
          type
          sortOrder
          themeCode
          channelId
          status
          translations {
            edges {
              node {
                _id
                locale
                options
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/settings/themes/16"
      }
    response: |
      {
        "data": {
          "adminSettingsTheme": {
            "id": "/api/admin/settings/themes/16",
            "_id": 16,
            "name": "Services Content",
            "type": "services_content",
            "sortOrder": 12,
            "themeCode": "default",
            "channelId": 1,
            "status": true,
            "translations": {
              "edges": [
                {
                  "node": {
                    "_id": 17,
                    "locale": "en",
                    "options": {
                      "services": [
                        {
                          "title": "Free Shipping",
                          "description": "Enjoy free shipping on all orders",
                          "service_icon": "icon-truck"
                        },
                        {
                          "title": "Product Replace",
                          "description": "Easy Product Replacement Available!",
                          "service_icon": "icon-product"
                        },
                        {
                          "title": "Emi Available",
                          "description": "No cost EMI available on all major credit cards",
                          "service_icon": "icon-dollar-sign"
                        },
                        {
                          "title": "24/7 Support",
                          "description": "Dedicated 24/7 support via chat and email",
                          "service_icon": "icon-support"
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "_id": 28,
                    "locale": "ar",
                    "options": {
                      "services": [
                        {
                          "title": "شحن مجاني",
                          "description": "استمتع بشحن مجاني على جميع الطلبات",
                          "service_icon": "icon-truck"
                        }
                      ]
                    }
                  }
                }
              ]
            },
            "createdAt": "2025-10-03T16:56:04+05:30",
            "updatedAt": "2026-04-07T17:52:08+05:30"
          }
        }
      }
---

# Theme Customization Detail

Fetch a single theme customization block by id. The `translations` field is a field-selectable connection — each `node` carries one locale's `_id`, `locale`, and `options` content. Select `translations { edges { node { _id locale options } } }` to read it.

::: tip
The shape of each locale's `options` depends on the block's `type` — see the [Themes overview](./). The example shows a `services_content` block; an `image_carousel` block would carry an `images` array, a `static_content` block an `html` / `css` pair, and so on.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsTheme(id: ID!)` | Query | Get one theme customization block, with per-locale content |

The `id` argument is the resource IRI (`/api/admin/settings/themes/{id}`). Use the [`adminSettingsThemes`](./list) query to discover valid ids; each row's `_id` is the numeric id.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
