---
outline: false
examples:
  - id: gql
    title: Delete URL Rewrite
    query: |
      mutation Delete($input: deleteAdminMarketingUrlRewriteInput!) {
        deleteAdminMarketingUrlRewrite(input: $input) {
          adminMarketingUrlRewrite { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/url-rewrites/1" } }
    response: |
      { "data": { "deleteAdminMarketingUrlRewrite": { "adminMarketingUrlRewrite": { "id": "/api/admin/marketing/url-rewrites/1", "_id": 1 } } } }
---

# Delete URL Rewrite (GraphQL)

Mutation: `deleteAdminMarketingUrlRewrite`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a URL rewrite that exists in your store — use the [`adminMarketingUrlRewrites`](./url-rewrites-list.md) query to discover valid ids.
:::
