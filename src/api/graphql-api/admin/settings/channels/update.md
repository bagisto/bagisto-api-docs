---
outline: false
examples:
  - id: gql
    title: Update Channel
    description: Partially update a channel. Omitted fields are left unchanged; omitting the locale / currency / inventory-source arrays preserves the existing assignments.
    query: |
      mutation UpdateAdminSettingsChannel($input: updateAdminSettingsChannelInput!) {
        updateAdminSettingsChannel(input: $input) {
          adminSettingsChannel {
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
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/channels/27",
          "name": "United States Store",
          "isMaintenanceOn": true,
          "maintenanceModeText": "Back soon"
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsChannel": {
            "adminSettingsChannel": {
              "id": "/api/admin/settings/channels/27",
              "_id": 27,
              "code": "us",
              "name": "United States Store",
              "description": "United States storefront",
              "hostname": "https://us.example.com",
              "theme": null,
              "timezone": null,
              "defaultLocaleId": 1,
              "baseCurrencyId": 1,
              "rootCategoryId": 1,
              "isMaintenanceOn": true,
              "maintenanceModeText": "Back soon",
              "allowedIps": null,
              "logo": null,
              "logoUrl": null,
              "favicon": null,
              "faviconUrl": null,
              "seoMetaTitle": "US store",
              "seoMetaDescription": "US store description",
              "seoMetaKeywords": "us, store",
              "homeSeo": {
                "meta_title": "US store",
                "meta_keywords": "us, store",
                "meta_description": "US store description"
              },
              "createdAt": "2026-06-19T17:48:20+05:30",
              "updatedAt": "2026-06-19T17:48:31+05:30"
            }
          }
        }
      }
---

# Update Channel

Partially updates a channel — send only the fields you want to change. Fields you omit keep their current values.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsChannel(input:)` | Mutation | Update a channel |

## Notes

- **Partial update preserves pivots.** When you omit the `locales`, `currencies`, or `inventorySources` arrays, the channel's existing assignments are kept. Supplying any of those arrays **replaces** that assignment set entirely, so always send the full intended set.
- **Translatable scalars target the request locale.** A change to a top-level scalar like `name` / `maintenanceModeText` applies to the channel's request locale only (in the example, the `en` translation is updated while other locales keep their previous value). Top-level scalars are broadcast to every locale on **create**; on update they edit the active locale.
- **`code` is unique.** Changing it must not collide with another channel.
- **Connections are not in the mutation payload.** The update payload returns scalars + the SEO triplet; re-query [`adminSettingsChannel(id:)`](./detail) to read the refreshed `locales` / `currencies` / `inventorySources` / `translations` connections.

The example uses an illustrative `id`. Replace it with a channel id that exists in your store — use the [`adminSettingsChannels`](./list) query to discover valid ids.
