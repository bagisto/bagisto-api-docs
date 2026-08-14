---
outline: false
examples:
  - id: detail
    title: Search Term Detail
    description: Full payload for a single search term.
    query: |
      query AdminMarketingSearchTerm($id: ID!) {
        adminMarketingSearchTerm(id: $id) {
          id
          _id
          term
          results
          uses
          redirectUrl
          channel {
            id
            _id
            code
            name
          }
          locale
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/marketing/search-terms/106"
      }
    response: |
      {
        "data": {
          "adminMarketingSearchTerm": {
            "id": "/api/admin/marketing/search-terms/106",
            "_id": 106,
            "term": "Coastal Breeze QA",
            "results": 1,
            "uses": 3,
            "redirectUrl": "https://example.com/qa",
            "channel": {
              "id": "/api/admin_marketing_channel_refs/1",
              "_id": 1,
              "code": "default",
              "name": "Default"
            },
            "locale": "en",
            "createdAt": "2026-06-03T13:14:05+05:30",
            "updatedAt": "2026-06-17T12:14:07+05:30"
          }
        }
      }
---

# Search Term Detail

Returns a single search term with its full field set — the data behind the admin
**Marketing → Search & SEO → Search Terms** view screen.

New here? Read the [Search Terms overview](/api/graphql-api/admin/marketing/search-seo/search-terms/) for what a search term records and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingSearchTerm` | Query | Fetch one search term by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the term's IRI (e.g. `/api/admin/marketing/search-terms/106`) as the `id`
  argument; `_id` in the response is the numeric id.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The term's IRI |
| `_id` | Int | Numeric id |
| `term` | String | The phrase the shopper searched for |
| `results` | Int | Number of products the search returned — read-only |
| `uses` | Int | How many times the term has been searched — read-only |
| `redirectUrl` | String | Optional URL the search redirects to, or `null` |
| `channel` | Object | The channel the search was recorded on — sub-select `id`, `_id`, `code`, `name`. Detail-only (`null` on list rows) |
| `locale` | String | Locale the search was recorded in |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
