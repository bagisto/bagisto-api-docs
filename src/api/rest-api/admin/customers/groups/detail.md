---
outline: false
apiType: rest
examples:
  - id: admin-customer-group-detail
    title: Customer Group Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/groups/4" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 4, "code": "wholesale", "name": "Wholesale", "isUserDefined": 1, "customersCount": 23, "createdAt": "2026-05-20 12:00:00" }
---

# Customer Group Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups/{id}` | GET |
