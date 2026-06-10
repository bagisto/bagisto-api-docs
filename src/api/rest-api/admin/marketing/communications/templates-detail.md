---
outline: false
apiType: rest
examples:
  - id: admin-marketing-template-detail
    title: Email Template Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/templates/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "Welcome Email", "status": "active", "content": "<p>Welcome to our store!</p>" }
---

# Email Template Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates/{id}` | GET |
