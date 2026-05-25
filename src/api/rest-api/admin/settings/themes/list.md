---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Theme Customizations
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/themes" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "Homepage Banner", "type": "image_carousel", "sortOrder": 1, "channelId": 1, "themeCode": "default", "status": 1 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Theme Customizations
