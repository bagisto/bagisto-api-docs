---
outline: false
examples:
  - id: detail
    title: Email Template Detail
    description: Full payload for a single email template, including the raw HTML content.
    query: |
      query AdminMarketingTemplate($id: ID!) {
        adminMarketingTemplate(id: $id) {
          id
          _id
          name
          status
          content
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/marketing/templates/21"
      }
    response: |
      {
        "data": {
          "adminMarketingTemplate": {
            "id": "/api/admin/marketing/templates/21",
            "_id": 21,
            "name": "Welcome Email",
            "status": "active",
            "content": "<p>Welcome to our store!</p>",
            "createdAt": "2026-05-28T10:57:33+05:30",
            "updatedAt": "2026-05-28T10:57:33+05:30"
          }
        }
      }
---

# Email Template Detail

Returns a single email template with its full field set — the data behind the
admin **Marketing → Communications → Email Templates** view screen.

New here? Read the [Email Templates overview](/api/graphql-api/admin/marketing/communications/templates/) for what an email template does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingTemplate` | Query | Fetch one email template by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the template's IRI (e.g. `/api/admin/marketing/templates/21`) as the `id`
  argument; `_id` in the response is the numeric id.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The template's IRI |
| `_id` | Int | Numeric id |
| `name` | String | Template name |
| `status` | String | `active`, `inactive`, or `draft` |
| `content` | String | Raw HTML email body |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
