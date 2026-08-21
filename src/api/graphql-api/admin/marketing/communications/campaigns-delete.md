---
outline: false
examples:
  - id: delete
    title: Delete Campaign
    description: Delete a campaign by id. A successful delete returns no errors; the campaign is removed.
    query: |
      mutation DeleteAdminMarketingCampaign(
        $input: deleteAdminMarketingCampaignInput!
      ) {
        deleteAdminMarketingCampaign(input: $input) {
          adminMarketingCampaign {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/campaigns/5"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingCampaign": {
            "adminMarketingCampaign": null
          }
        }
      }
---

# Delete Campaign

Deletes a campaign — the **Delete** row action on the admin
**Marketing → Communications → Campaigns** screen.

New here? Read the [Campaigns overview](/api/graphql-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingCampaign` | Mutation | Delete a campaign |

## Details

- Requires an admin Bearer token and the `marketing.communications.campaigns.delete`
  permission.
- Pass the campaign's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/communications/campaigns-list) query to
  discover valid ids.

### Confirm success via the absence of `errors`

The delete mutation returns a success acknowledgement, not the deleted
campaign's data — `adminMarketingCampaign` resolves to `null` on the payload.
**Treat a response with no `errors[]` as a successful delete.** If you need a
confirmation message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/campaigns/{id}`), which returns
`{ "message": "Campaign deleted." }`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The campaign's IRI |
