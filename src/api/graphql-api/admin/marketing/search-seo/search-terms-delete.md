---
outline: false
examples:
  - id: delete
    title: Delete Search Term
    description: Delete a search term by id. A successful delete returns no errors; the term is removed.
    query: |
      mutation DeleteAdminMarketingSearchTerm(
        $input: deleteAdminMarketingSearchTermInput!
      ) {
        deleteAdminMarketingSearchTerm(input: $input) {
          adminMarketingSearchTerm {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/search-terms/106"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingSearchTerm": {
            "adminMarketingSearchTerm": null
          }
        }
      }
---

# Delete Search Term

Deletes a search term — the **Delete** row action on the admin
**Marketing → Search & SEO → Search Terms** screen.

New here? Read the [Search Terms overview](/api/graphql-api/admin/marketing/search-seo/search-terms/) for what a search term records and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingSearchTerm` | Mutation | Delete a search term |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_terms.delete`
  permission.
- Pass the term's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/search-seo/search-terms-list) query to
  discover valid ids.

### Confirm success via the absence of `errors`

The delete mutation returns a success acknowledgement, not the deleted term's
data — `adminMarketingSearchTerm` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/search-terms/{id}`), which returns
`{ "message": "Search term deleted." }`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The term's IRI |
