---
outline: false
examples:
  - id: detail
    title: Search Synonym Detail
    description: Full payload for a single search synonym group.
    query: |
      query AdminMarketingSearchSynonym($id: ID!) {
        adminMarketingSearchSynonym(id: $id) {
          id
          _id
          name
          terms
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/marketing/search-synonyms/19"
      }
    response: |
      {
        "data": {
          "adminMarketingSearchSynonym": {
            "id": "/api/admin/marketing/search-synonyms/19",
            "_id": 19,
            "name": "shirt-group",
            "terms": "shirt,tshirt,tee",
            "createdAt": "2026-05-28T10:57:59+05:30",
            "updatedAt": "2026-05-28T10:57:59+05:30"
          }
        }
      }
---

# Search Synonym Detail

Returns a single search synonym group with its full field set — the data behind
the admin **Marketing → Search & SEO → Search Synonyms** view screen.

::: tip
New here? Read the [Search Synonyms overview](/api/graphql-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingSearchSynonym` | Query | Fetch one search synonym group by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the synonym's IRI (e.g. `/api/admin/marketing/search-synonyms/19`) as the
  `id` argument; `_id` in the response is the numeric id.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The synonym's IRI |
| `_id` | Int | Numeric id |
| `name` | String | Group name |
| `terms` | String | Comma-separated list of interchangeable search words |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
