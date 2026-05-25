---
outline: false
apiType: rest
examples:
  - id: admin-marketing-template-update
    title: Update Email Template
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/templates/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Welcome Email v2", "status": "active", "content": "<p>Welcome aboard!</p>" }'
    response: |
      { "id": 1, "name": "Welcome Email v2", "status": "active", "content": "<p>Welcome aboard!</p>" }
---

# Update Email Template

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates/{id}` | PUT |

Permission: `marketing.communications.email_templates.edit`.
