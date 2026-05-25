---
outline: false
apiType: rest
examples:
  - id: rest
    title: Theme Customization Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/themes/1" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "Homepage Banner", "type": "image_carousel", "sortOrder": 1, "channelId": 1, "themeCode": "default", "status": 1, "translations": [{ "locale": "en", "options": {} }] }
---

# Theme Customization Detail
