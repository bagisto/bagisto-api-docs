---
outline: false
examples:
  - id: delete
    title: Delete Email Template
    description: Delete an email template by id. A successful delete returns no errors; the template is removed.
    query: |
      mutation DeleteAdminMarketingTemplate(
        $input: deleteAdminMarketingTemplateInput!
      ) {
        deleteAdminMarketingTemplate(input: $input) {
          adminMarketingTemplate {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/templates/21"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingTemplate": {
            "adminMarketingTemplate": null
          }
        }
      }
---

# Delete Email Template

Deletes an email template — the **Delete** row action on the admin
**Marketing → Communications → Email Templates** screen.

::: tip
New here? Read the [Email Templates overview](/api/graphql-api/admin/marketing/communications/templates/) for what an email template does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingTemplate` | Mutation | Delete an email template |

## Details

- Requires an admin Bearer token and the `marketing.communications.email_templates.delete`
  permission.
- Pass the template's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/communications/templates-list) query to
  discover valid ids.

::: warning Confirm success via the absence of `errors`
The delete mutation returns a success acknowledgement, not the deleted template's
data — `adminMarketingTemplate` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/templates/{id}`), which returns
`{ "message": "Email template deleted." }`.
:::

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The template's IRI |
