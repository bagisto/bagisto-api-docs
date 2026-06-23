---
outline: false
examples:
  - id: gql
    title: Update Theme Customization
    description: Set the per-locale content for one locale, and/or edit the scalar fields, of a theme customization block.
    query: |
      mutation UpdateAdminSettingsTheme($input: updateAdminSettingsThemeInput!) {
        updateAdminSettingsTheme(input: $input) {
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
          "id": "/api/admin/settings/themes/24",
          "locale": "en",
          "options": {
            "html": "<div class=\"promo\">Season Sale</div><script>track()</script>",
            "css": ".promo{font-weight:bold}"
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsTheme": {
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
                "edges": [
                  {
                    "node": {
                      "_id": 33,
                      "locale": "en",
                      "options": {
                        "css": ".promo{font-weight:bold}",
                        "html": "<div class=\"promo\">Season Sale</div>"
                      }
                    }
                  }
                ]
              },
              "createdAt": "2026-06-19T17:41:25+05:30",
              "updatedAt": "2026-06-19T17:41:37+05:30"
            }
          }
        }
      }
---

# Update Theme Customization

Set the per-locale content of a theme customization block, and/or edit its scalar fields. Pass the target `locale` and an `options` object whose shape matches the block's `type`; repeat the call per locale to localize the block. The scalar fields (`name`, `sortOrder`, `themeCode`, `channelId`, `status`) can be updated in the same call.

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with the id of a block that exists in your store — use the [`adminSettingsThemes`](./list) query to discover valid ids.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsTheme` | Mutation | Update a theme customization block's content and/or scalars |

## Input

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `id` | ID | yes | The resource IRI of the block to update. |
| `locale` | String | no | The locale the `options` apply to. |
| `options` | Iterable | no | The per-locale content; its shape depends on the block's `type`. |
| `name` / `sortOrder` / `themeCode` / `channelId` / `status` | — | no | Scalar fields to update. |

## Quirks

- **`<script>` is stripped from `static_content`.** Any `<script>...</script>` blocks in `options.html` or `options.css` are removed before saving — note how the example's `<script>track()</script>` is gone from the response.
- **Image / file fields are path strings only.** For `image_carousel` slides and `services_content` icons, `options` accept already-uploaded storage paths; binary upload is not available — use the admin panel.

Permission: `settings.themes.edit`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
