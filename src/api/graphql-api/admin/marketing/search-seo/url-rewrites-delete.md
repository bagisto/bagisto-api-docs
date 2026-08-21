---
outline: false
examples:
  - id: delete
    title: Delete URL Rewrite
    description: Delete a URL rewrite by id. A successful delete returns no errors; the rewrite is removed.
    query: |
      mutation DeleteAdminMarketingUrlRewrite(
        $input: deleteAdminMarketingUrlRewriteInput!
      ) {
        deleteAdminMarketingUrlRewrite(input: $input) {
          adminMarketingUrlRewrite {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/url-rewrites/118"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingUrlRewrite": {
            "adminMarketingUrlRewrite": null
          }
        }
      }
---

# Delete URL Rewrite

Deletes a URL rewrite — the **Delete** row action on the admin **Marketing →
Search & SEO → URL Rewrites** screen.

New here? Read the [URL Rewrites overview](/api/graphql-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingUrlRewrite` | Mutation | Delete a URL rewrite |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.url_rewrites.delete`
  permission.
- Pass the rewrite's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/search-seo/url-rewrites-list) query to
  discover valid ids.

### Confirm success via the absence of `errors`

The delete mutation returns a success acknowledgement, not the deleted rewrite's
data — `adminMarketingUrlRewrite` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/url-rewrites/{id}`), which returns
`{ "message": "URL rewrite deleted." }`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The rewrite's IRI |
