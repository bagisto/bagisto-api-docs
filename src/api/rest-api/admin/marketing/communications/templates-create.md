---
outline: false
apiType: rest
examples:
  - id: create
    title: Create Email Template
    description: Create a reusable HTML email template that a campaign can send to a customer group.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/templates" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Welcome Email",
          "status": "active",
          "content": "<p>Welcome to our store!</p>"
        }'
    variables: |
      {}
    response: |
      {
        "id": 21,
        "name": "Welcome Email",
        "status": "active",
        "content": "<p>Welcome to our store!</p>",
        "createdAt": "2026-05-28T10:57:33+05:30",
        "updatedAt": "2026-05-28T10:57:33+05:30"
      }
---

# Create Email Template

Creates an email template — the **Create Template** action on the admin **Marketing →
Communications → Email Templates** screen.

New here? Read the [Email Templates overview](/api/rest-api/admin/marketing/communications/templates/) for what a template does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates` | POST |

## Details

- Requires an admin Bearer token and the `marketing.communications.email_templates.create`
  permission.
- Returns the full template payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Template name |
| `status` | string | yes | `active`, `inactive`, or `draft` |
| `content` | string | yes | Raw HTML email body |
