---
outline: false
examples:
  - id: gql
    title: Theme Customization Detail
    query: |
      query A($id: ID!) { adminSettingsTheme(id: $id) { id _id name type sortOrder channelId themeCode status translations } }
    variables: |
      { "id": "/api/admin/settings/themes/1" }
    response: |
      { "data": { "adminSettingsTheme": { "id": "/api/admin/settings/themes/1", "_id": 1, "name": "Homepage Banner", "type": "image_carousel", "sortOrder": 1, "channelId": 1, "themeCode": "default", "status": 1, "translations": [{ "locale": "en", "options": {} }] } } }
---

# Theme Customization Detail (GraphQL)
