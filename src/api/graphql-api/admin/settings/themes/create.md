---
outline: false
examples:
  - id: gql
    title: Create Theme Customization
    description: Create a theme customization block with its step-1 scalar fields. Per-locale content is added afterwards via the update mutation.
    query: |
      mutation CreateAdminSettingsTheme($input: createAdminSettingsThemeInput!) {
        createAdminSettingsTheme(input: $input) {
          adminSettingsTheme {
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
      }
    variables: |
      {
        "input": {
          "name": "Homepage Static Block",
          "type": "static_content",
          "sortOrder": 13,
          "channelId": 1,
          "themeCode": "default",
          "status": true
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsTheme": {
            "adminSettingsTheme": {
              "id": "/api/admin/settings/themes/24",
              "_id": 24,
              "name": "Homepage Static Block",
              "type": "static_content",
              "sortOrder": 13,
              "themeCode": "default",
              "channelId": 1,
              "status": true,
              "translations": {
                "edges": []
              },
              "createdAt": "2026-06-19T17:41:25+05:30",
              "updatedAt": "2026-06-19T17:41:25+05:30"
            }
          }
        }
      }
---

# Create Theme Customization

Create a theme customization block. This is a **step-1** create: it sets the block's scalar fields only, and the block starts with empty `translations`. Add the per-locale content afterwards with the [Update](./update) mutation.

::: tip
See the [Themes overview](./) for what each `type` renders. The `type` is fixed at creation and cannot be changed later.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsTheme` | Mutation | Create a theme customization block |

## Input

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `name` | String | yes | Internal label shown in the admin grid. |
| `type` | String | yes | The block kind — one of `product_carousel`, `category_carousel`, `static_content`, `image_carousel`, `footer_links`, `services_content`. |
| `sortOrder` | Int | yes | Position relative to other blocks on the same channel. |
| `channelId` | Int | yes | The sales channel this block is bound to. |
| `themeCode` | String | yes | The theme code this block belongs to (e.g. `default`). |
| `status` | Boolean | no | `true` = active, `false` = inactive. |

## Quirks

- Per-locale content (`options`) is **not** accepted here — set it with the [Update](./update) mutation.
- Image / file fields are path strings only; binary upload is not available — use the admin panel to upload files.

Permission: `settings.themes.create`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
