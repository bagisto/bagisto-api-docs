---
outline: false
examples:
  - id: delete
    title: Delete Search Synonym
    description: Delete a search synonym group by id. A successful delete returns no errors; the group is removed.
    query: |
      mutation DeleteAdminMarketingSearchSynonym(
        $input: deleteAdminMarketingSearchSynonymInput!
      ) {
        deleteAdminMarketingSearchSynonym(input: $input) {
          adminMarketingSearchSynonym {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/search-synonyms/19"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingSearchSynonym": {
            "adminMarketingSearchSynonym": null
          }
        }
      }
---

# Delete Search Synonym

Deletes a search synonym group — the **Delete** row action on the admin
**Marketing → Search & SEO → Search Synonyms** screen.

::: tip
New here? Read the [Search Synonyms overview](/api/graphql-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingSearchSynonym` | Mutation | Delete a search synonym group |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_synonyms.delete`
  permission.
- Pass the synonym's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/search-seo/search-synonyms-list) query to
  discover valid ids.

::: warning Confirm success via the absence of `errors`
The delete mutation returns a success acknowledgement, not the deleted group's
data — `adminMarketingSearchSynonym` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/search-synonyms/{id}`), which returns
`{ "message": "Search synonym deleted." }`.
:::

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The synonym's IRI |
