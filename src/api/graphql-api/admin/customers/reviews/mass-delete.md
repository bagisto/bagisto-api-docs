---
outline: false
examples:
  - id: admin-customer-review-mass-delete-gql
    title: Mass Delete Reviews
    query: |
      mutation MassDelete($input: createAdminCustomerReviewMassDeleteInput!) {
        createAdminCustomerReviewMassDelete(input: $input) {
          adminCustomerReviewMassDelete {
            deleted
            skipped
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [9, 10, 11]
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerReviewMassDelete": {
            "adminCustomerReviewMassDelete": {
              "deleted": [9, 10, 11],
              "skipped": [],
              "message": "Reviews deleted."
            }
          }
        }
      }
---

# Mass Delete Reviews (GraphQL)

Deletes the supplied review ids in one call. Non-existent ids are silently skipped.

Permission: `customers.reviews.delete`.

::: tip
See the [Reviews overview](/api/graphql-api/admin/customers/reviews/) for how moderation works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
