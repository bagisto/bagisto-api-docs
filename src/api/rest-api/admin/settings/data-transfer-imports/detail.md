---
outline: false
apiType: rest
examples:
  - id: rest
    title: Import Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/data-transfer/imports/3" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "id": 3, "code": "products", "action": "append", "state": "completed", "processed": 150, "summary": { "created": 100, "updated": 50, "deleted": 0 }, "file": { "name": "products.csv", "size": 12345 }, "createdAt": "2026-05-25 09:00:00" }
---

# Import Detail
