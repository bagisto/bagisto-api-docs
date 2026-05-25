---
outline: false
examples:
  - id: gql
    title: List Channels
    query: |
      query A($first: Int) { adminSettingsChannels(first: $first) { edges { cursor node { id _id code name hostname } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsChannels": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/channels/1", "_id": 1, "code": "default", "name": "Default", "hostname": "store.example.com" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Channels (GraphQL)
