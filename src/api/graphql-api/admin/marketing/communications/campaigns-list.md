---
outline: false
examples:
  - id: list
    title: List Campaigns
    description: Cursor-paginated list of every campaign.
    query: |
      query AdminMarketingCampaigns($first: Int) {
        adminMarketingCampaigns(first: $first) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              _id
              name
              subject
              status
              createdAt
              updatedAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminMarketingCampaigns": {
            "totalCount": 5,
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "NA=="
            },
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/marketing/campaigns/5",
                  "_id": 5,
                  "name": "Holiday Newsletter",
                  "subject": "Big Holiday Sale Inside",
                  "status": 1,
                  "createdAt": "2026-05-26T16:51:08+05:30",
                  "updatedAt": "2026-05-26T16:51:28+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Campaigns (filtered)
    description: Filter by status and template, sorted by name.
    query: |
      query AdminMarketingCampaigns(
        $first: Int
        $status: Int
        $marketing_template_id: Int
        $sort: String
        $order: String
      ) {
        adminMarketingCampaigns(
          first: $first
          status: $status
          marketing_template_id: $marketing_template_id
          sort: $sort
          order: $order
        ) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              _id
              name
              subject
              status
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "status": 1,
        "marketing_template_id": 16,
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingCampaigns": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/campaigns/5",
                  "_id": 5,
                  "name": "Holiday Newsletter",
                  "subject": "Big Holiday Sale Inside",
                  "status": 1,
                  "createdAt": "2026-05-26T16:51:08+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Campaigns

Lists every campaign in the store — the data behind the admin **Marketing →
Communications → Campaigns** datagrid.

New here? Read the [Campaigns overview](/api/graphql-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingCampaigns` | Query | Cursor-paginated list of all campaigns |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the scalar campaign fields shown in the example. The
  `channel`, `customerGroup`, and `marketingTemplate` objects resolve **only** on
  the [detail](/api/graphql-api/admin/marketing/communications/campaigns-detail)
  query — they are `null` on list rows. The campaign's event is REST-only.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `name` | Name — partial match |
| `status` | `0` (inactive) / `1` (active) |
| `marketing_template_id` | Email template id — exact match |
| `marketing_event_id` | Event id — exact match |
| `channel_id` | Channel id — exact match |
| `customer_group_id` | Customer-group id — exact match |
| `sort`, `order` | Sort field (`id`, `name`) + `asc` / `desc` (default `id desc`) |
