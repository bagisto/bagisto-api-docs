---
outline: false
examples:
  - id: update
    title: Update Email Template
    description: Partial-merge update of an email template; returns the full detail object.
    query: |
      mutation UpdateAdminMarketingTemplate(
        $input: updateAdminMarketingTemplateInput!
      ) {
        updateAdminMarketingTemplate(input: $input) {
          adminMarketingTemplate {
            id
            _id
            name
            status
            content
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/templates/21",
          "name": "Welcome Email v2",
          "status": "active",
          "content": "<p>Welcome aboard!</p>"
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingTemplate": {
            "adminMarketingTemplate": {
              "id": "/api/admin/marketing/templates/21",
              "_id": 21,
              "name": "Welcome Email v2",
              "status": "active",
              "content": "<p>Welcome aboard!</p>",
              "createdAt": "2026-05-28T10:57:33+05:30",
              "updatedAt": "2026-05-28T11:42:10+05:30"
            }
          }
        }
      }
---

# Update Email Template

Updates an email template — the **Edit** row action on the admin
**Marketing → Communications → Email Templates** screen. Only the fields you send
are changed; the rest keep their current values.

::: tip
New here? Read the [Email Templates overview](/api/graphql-api/admin/marketing/communications/templates/) for what an email template does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingTemplate` | Mutation | Update an email template |

## Details

- Requires an admin Bearer token and the `marketing.communications.email_templates.edit`
  permission.
- Pass the template's IRI as `id`. The mutation is a partial merge and returns
  the full template payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The template's IRI |
| `name` | String | No | Template name |
| `status` | String | No | `active`, `inactive`, or `draft` |
| `content` | String | No | Raw HTML email body |
