---
outline: false
apiType: rest
examples:
  - id: admin-marketing-template-create
    title: Create Email Template
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/templates" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Welcome Email", "status": "active", "content": "<p>Welcome to our store!</p>" }'
    response: |
      { "id": 1, "name": "Welcome Email", "status": "active", "content": "<p>Welcome to our store!</p>" }
---

# Create Email Template

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | |
| `status` | enum | yes | `active`, `inactive`, `draft`. |
| `content` | string | yes | HTML body. |

Permission: `marketing.communications.email_templates.create`.
