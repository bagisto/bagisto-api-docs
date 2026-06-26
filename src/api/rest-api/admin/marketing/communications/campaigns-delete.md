---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Campaign
    description: Delete a campaign by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/campaigns/5" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Campaign deleted."
      }
---

# Delete Campaign

Deletes a campaign — the **Delete** row action on the admin **Marketing →
Communications → Campaigns** screen.

::: tip
New here? Read the [Campaigns overview](/api/rest-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the
  `marketing.communications.campaigns.delete` permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
