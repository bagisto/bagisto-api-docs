---
outline: false
apiType: rest
examples:
  - id: admin-marketing-template-delete
    title: Delete Email Template
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/templates/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Email template deleted." }
---

# Delete Email Template

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates/{id}` | DELETE |

Permission: `marketing.communications.email_templates.delete`.
