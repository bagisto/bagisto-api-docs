---
outline: false
examples:
  - id: gql
    title: Create Channel
    description: Create a new channel (storefront). Requires non-empty locale / currency / inventory-source arrays, a default locale that is one of the assigned locales, a base currency that is one of the assigned currencies, and a root category.
    query: |
      mutation CreateAdminSettingsChannel($input: createAdminSettingsChannelInput!) {
        createAdminSettingsChannel(input: $input) {
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
          "code": "us",
          "name": "US Store",
          "description": "United States storefront",
          "hostname": "https://us.example.com",
          "locales": [1, 10],
          "currencies": [1],
          "inventorySources": [1],
          "defaultLocaleId": 1,
          "baseCurrencyId": 1,
          "rootCategoryId": 1,
          "seoTitle": "US store",
          "seoDescription": "US store description",
          "seoKeywords": "us, store"
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsChannel": {
            "adminSettingsChannel": {
              "id": "/api/admin/settings/channels/27",
              "_id": 27,
              "code": "us",
              "name": "US Store",
              "description": "United States storefront",
              "hostname": "https://us.example.com",
              "theme": null,
              "timezone": null,
              "defaultLocaleId": 1,
              "baseCurrencyId": 1,
              "rootCategoryId": 1,
              "isMaintenanceOn": false,
              "maintenanceModeText": null,
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
              "updatedAt": "2026-06-19T17:48:20+05:30"
            }
          }
        }
      }
---

# Create Channel

Creates a new channel (storefront). The `code` must be unique. Top-level translatable scalars (`name`, `description`, the SEO fields, `maintenanceModeText`) are broadcast to every locale you assign, so a brand-new channel comes back with a `translations` entry per assigned locale.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsChannel(input:)` | Mutation | Create a channel |

## Required input

| Field | Meaning |
|-------|---------|
| `code` | Unique channel code. |
| `name` | Channel display name (broadcast to every assigned locale). |
| `locales` | Non-empty array of locale ids assigned to this channel. |
| `currencies` | Non-empty array of currency ids assigned to this channel. |
| `inventorySources` | Non-empty array of inventory-source ids. |
| `defaultLocaleId` | Default locale — **must be one of** `locales`. |
| `baseCurrencyId` | Base currency — **must be one of** `currencies`. |
| `rootCategoryId` | Root category for the channel's catalog tree. |

Optional: `hostname`, `description`, `timezone`, `theme`, `allowedIps`, and the SEO triplet `seoTitle` / `seoDescription` / `seoKeywords` (which is rolled into `homeSeo`).

## Notes

- The create mutation payload returns the channel's scalar fields, the SEO triplet (`seoMetaTitle` / `seoMetaDescription` / `seoMetaKeywords` + the `homeSeo` object). The nested **connections** (`locales` / `currencies` / `inventorySources` / `translations`) are **not** resolved in a mutation payload — re-query [`adminSettingsChannel(id:)`](./detail) with the returned `_id` to read them.

::: warning Logo / favicon upload deferred
The `logo` and `favicon` fields accept an already-uploaded path string only. Direct binary image upload is not yet supported over GraphQL.
:::
