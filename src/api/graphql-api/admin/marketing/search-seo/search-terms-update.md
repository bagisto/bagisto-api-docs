---
outline: false
examples:
  - id: update
    title: Update Search Term
    description: Update a search term's phrase and optional redirect URL. Update is a partial merge — send only the fields you change.
    query: |
      mutation UpdateAdminMarketingSearchTerm(
        $input: updateAdminMarketingSearchTermInput!
      ) {
        updateAdminMarketingSearchTerm(input: $input) {
          adminMarketingSearchTerm {
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
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/search-terms/106",
          "term": "Coastal Breeze",
          "redirectUrl": "https://example.com/coastal"
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingSearchTerm": {
            "adminMarketingSearchTerm": {
              "id": "/api/admin/marketing/search-terms/106",
              "_id": 106,
              "term": "Coastal Breeze",
              "results": 1,
              "uses": 3,
              "redirectUrl": "https://example.com/coastal",
              "channel": {
                "id": "/api/admin_marketing_channel_refs/1",
                "_id": 1,
                "code": "default",
                "name": "Default"
              },
              "locale": "en",
              "createdAt": "2026-06-03T13:14:05+05:30",
              "updatedAt": "2026-06-23T13:00:00+05:30"
            }
          }
        }
      }
---

# Update Search Term

Updates an existing search term — the **Edit** row action on the admin
**Marketing → Search & SEO → Search Terms** screen.

::: tip
New here? Read the [Search Terms overview](/api/graphql-api/admin/marketing/search-seo/search-terms/) for what a search term records and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingSearchTerm` | Mutation | Update a search term |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_terms.edit`
  permission.
- Pass the term's IRI as `id`. The update is a **partial merge** — send only the
  fields you want to change; omitted fields keep their existing values.
- Only `term` and `redirectUrl` are editable. `results` and `uses` are recorded
  automatically by storefront search and cannot be changed.
- The mutation returns the full updated search-term payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The term's IRI |
| `term` | String | Yes | The search phrase |
| `redirectUrl` | String | No | A valid URL to redirect this search to, or `null` to clear |
