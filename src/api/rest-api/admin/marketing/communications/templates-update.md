---
outline: false
apiType: rest
examples:
  - id: update
    title: Update Email Template
    description: Update a template's name and status. Update is a partial merge — send only the fields you change.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/templates/21" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Welcome Email v2",
          "status": "draft"
        }'
    variables: |
      {}
    response: |
      {
        "id": 21,
        "name": "Welcome Email v2",
        "status": "draft",
        "content": "<p>Welcome to our store!</p>",
        "createdAt": "2026-05-28T10:57:33+05:30",
        "updatedAt": "2026-05-28T11:20:42+05:30"
      }
---

# Update Email Template

Updates an existing email template — the **Edit Template** action on the admin
**Marketing → Communications → Email Templates** screen.

New here? Read the [Email Templates overview](/api/rest-api/admin/marketing/communications/templates/) for what a template does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates/{id}` | PUT |

## Details

- Requires an admin Bearer token and the `marketing.communications.email_templates.edit`
  permission.
- The update is a **partial merge** — send only the fields you want to change;
  omitted fields keep their existing values.
- Returns the full updated template payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | no | Template name |
| `status` | string | no | `active`, `inactive`, or `draft` |
| `content` | string | no | Raw HTML email body |
