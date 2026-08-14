---
outline: false
apiType: rest
examples:
  - id: detail
    title: Email Template Detail
    description: Full payload for a single email template, including the HTML content body.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/templates/21" \
        -H "Authorization: Bearer <token>"
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

# Email Template Detail

Returns a single email template with its full field set — the data behind the admin
**Marketing → Communications → Email Templates** view screen.

New here? Read the [Email Templates overview](/api/rest-api/admin/marketing/communications/templates/) for what a template does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `name` | string | Template name |
| `status` | string | `active`, `inactive`, or `draft` |
| `content` | string | Raw HTML email body |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
