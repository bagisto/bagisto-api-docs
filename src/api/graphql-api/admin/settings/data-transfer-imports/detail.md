---
outline: false
examples:
  - id: gql
    title: Import Detail
    query: |
      query A($id: ID!) { adminSettingsDataTransferImport(id: $id) { id _id code action state processedRowsCount summary createdAt } }
    variables: |
      { "id": "/api/admin/settings/data-transfer/imports/3" }
    response: |
      { "data": { "adminSettingsDataTransferImport": { "id": "/api/admin/settings/data-transfer/imports/3", "_id": 3, "code": "products", "action": "append", "state": "completed", "processedRowsCount": 150, "summary": { "created": 100, "updated": 50, "deleted": 0 }, "createdAt": "2026-05-25 09:00:00" } } }
---

# Import Detail (GraphQL)
