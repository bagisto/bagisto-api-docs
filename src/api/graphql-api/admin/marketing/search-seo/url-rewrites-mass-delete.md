---
outline: false
examples:
  - id: gql
    title: Mass Delete URL Rewrites
    query: |
      mutation MassDelete($input: createAdminMarketingUrlRewriteMassDeleteInput!) {
        createAdminMarketingUrlRewriteMassDelete(input: $input) {
          adminMarketingUrlRewriteMassDelete { deleted message }
        }
      }
    variables: |
      { "input": { "indices": [12, 18] } }
    response: |
      { "data": { "createAdminMarketingUrlRewriteMassDelete": { "adminMarketingUrlRewriteMassDelete": { "deleted": [12, 18], "message": "URL rewrites deleted." } } } }
---

# Mass Delete URL Rewrites (GraphQL)

Mutation: `createAdminMarketingUrlRewriteMassDelete`.
