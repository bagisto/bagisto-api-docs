---
outline: false
examples:
  - id: create
    title: Create Email Template
    description: Create a reusable HTML email template.
    query: |
      mutation CreateAdminMarketingTemplate(
        $input: createAdminMarketingTemplateInput!
      ) {
        createAdminMarketingTemplate(input: $input) {
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
          "name": "Welcome Email",
          "status": "active",
          "content": "<p>Welcome to our store!</p>"
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingTemplate": {
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
      }
---

# Create Email Template

Creates an email template — the **Create Template** action on the admin
**Marketing → Communications → Email Templates** screen.

::: tip
New here? Read the [Email Templates overview](/api/graphql-api/admin/marketing/communications/templates/) for what an email template does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingTemplate` | Mutation | Create an email template |

## Details

- Requires an admin Bearer token and the `marketing.communications.email_templates.create`
  permission.
- The mutation returns the full template payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | Template name |
| `status` | String | Yes | `active`, `inactive`, or `draft` |
| `content` | String | Yes | Raw HTML email body |
