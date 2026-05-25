---
outline: false
examples:
  - id: gql
    title: List Theme Customizations
    query: |
      query A($first: Int) { adminSettingsThemes(first: $first) { edges { cursor node { id _id name type sortOrder channelId themeCode status } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsThemes": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/themes/1", "_id": 1, "name": "Homepage Banner", "type": "image_carousel", "sortOrder": 1, "channelId": 1, "themeCode": "default", "status": 1 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Theme Customizations (GraphQL)
