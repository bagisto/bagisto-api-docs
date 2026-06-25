---
outline: false
examples:
  - id: admin-customer-mass-delete-gql
    title: Mass Delete Customers
    query: |
      mutation MassDelete($input: createAdminCustomerMassDeleteInput!) {
        createAdminCustomerMassDelete(input: $input) {
          adminCustomerMassDelete {
            deleted
            skipped
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [12, 13, 14]
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerMassDelete": {
            "adminCustomerMassDelete": {
              "deleted": [12, 14],
              "skipped": [
                {
                  "id": 13,
                  "reason": "Customer has active orders"
                }
              ],
              "message": "Customers processed."
            }
          }
        }
      }
---

# Mass Delete Customers (GraphQL)

Deletes the supplied customer ids in one call. The per-id active-orders guard skips any customer with pending/processing orders, returning the skipped ids with a reason instead of aborting the whole batch.

Permission: `customers.customers.delete`.

::: tip
See the [Customers overview](/api/graphql-api/admin/customers/main/) for how the menu works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
