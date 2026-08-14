---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Email Template
    description: Delete an email template by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/templates/21" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Email template deleted."
      }
---

# Delete Email Template

Deletes an email template — the **Delete** row action on the admin **Marketing →
Communications → Email Templates** screen.

New here? Read the [Email Templates overview](/api/rest-api/admin/marketing/communications/templates/) for what a template does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the `marketing.communications.email_templates.delete`
  permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
