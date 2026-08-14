---
outline: false
apiType: rest
examples:
  - id: list
    title: List Campaigns
    description: Paginated list of every campaign, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/campaigns?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 5,
            "name": "Holiday Newsletter",
            "subject": "Big Holiday Sale Inside",
            "status": 1,
            "channel": null,
            "customerGroup": null,
            "marketingTemplate": null,
            "marketingEvent": null,
            "createdAt": "2026-05-26T16:51:08+05:30",
            "updatedAt": "2026-05-26T16:51:28+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
  - id: list-filtered
    title: Filter Campaigns
    description: Filter by status and customer group. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/campaigns?status=1&customer_group_id=2&sort=name&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 5,
            "name": "Holiday Newsletter",
            "subject": "Big Holiday Sale Inside",
            "status": 1,
            "channel": null,
            "customerGroup": null,
            "marketingTemplate": null,
            "marketingEvent": null,
            "createdAt": "2026-05-26T16:51:08+05:30",
            "updatedAt": "2026-05-26T16:51:28+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Campaigns

Lists every campaign in the store — the data behind the admin **Marketing →
Communications → Campaigns** datagrid.

New here? Read the [Campaigns overview](/api/rest-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the campaign rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row carries the campaign's scalar fields shown in the example. The
`channel`, `customerGroup`, `marketingTemplate`, and `marketingEvent` objects are
served only by the
[detail](/api/rest-api/admin/marketing/communications/campaigns-detail)
endpoint; they are `null` on list rows.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `name` | Name — partial match |
| `status` | `0` (inactive) / `1` (active) |
| `marketing_template_id` | Linked email-template id |
| `marketing_event_id` | Linked event id |
| `channel_id` | Channel id |
| `customer_group_id` | Customer-group id |
| `sort`, `order` | Sort field (`id`, `name`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
