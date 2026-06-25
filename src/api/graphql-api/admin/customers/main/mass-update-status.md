---
outline: false
examples:
  - id: admin-customer-mass-update-status-gql
    title: Mass Update Customer Status
    query: |
      mutation MassUpdate($input: createAdminCustomerMassUpdateStatusInput!) {
        createAdminCustomerMassUpdateStatus(input: $input) {
          adminCustomerMassUpdateStatus {
            updated
            value
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [12, 13],
          "value": 0
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerMassUpdateStatus": {
            "adminCustomerMassUpdateStatus": {
              "updated": [12, 13],
              "value": 0,
              "message": "Status updated."
            }
          }
        }
      }
---

# Mass Update Customer Status (GraphQL)

Activates or deactivates the supplied customers in one call. `value` must be `0` (inactive) or `1` (active).

Permission: `customers.customers.edit`.

::: tip
See the [Customers overview](/api/graphql-api/admin/customers/main/) for how the menu works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
