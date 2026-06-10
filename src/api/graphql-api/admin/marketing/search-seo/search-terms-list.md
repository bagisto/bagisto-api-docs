---
outline: false
examples:
  - id: gql
    title: List Search Terms
    query: |
      query AdminTerms($first: Int) {
        adminMarketingSearchTerms(first: $first) {
          edges { node { id _id term uses results channelName locale } }
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingSearchTerms": { "edges": [{ "node": { "id": "/api/admin/marketing/search-terms/1", "_id": 1, "term": "red shirt", "uses": 142, "results": 23, "channelName": "Default", "locale": "en" } }] } } }
---

# List Search Terms (GraphQL)

Query: `adminMarketingSearchTerms`. Extra args: `term`, `channel_id`, `locale`, `sort` (`id`/`term`/`uses`/`results`), `order`.

::: warning Auto-recorded
Search terms are recorded automatically by storefront searches; there is no create mutation.
:::
