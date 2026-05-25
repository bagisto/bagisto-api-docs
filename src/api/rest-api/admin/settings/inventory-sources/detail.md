---
outline: false
apiType: rest
examples:
  - id: rest
    title: Inventory Source Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/inventory-sources/1" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "code": "default", "name": "Default Warehouse", "description": "Primary", "contactName": "Ops", "contactEmail": "ops@example.com", "contactNumber": "+15551112222", "country": "US", "state": "IL", "city": "Springfield", "street": "742 Evergreen", "postcode": "62704", "latitude": 39.78, "longitude": -89.65, "priority": 1, "status": 1 }
---

# Inventory Source Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/inventory-sources/{id}` | GET |
