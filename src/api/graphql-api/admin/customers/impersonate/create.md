---
outline: false
examples:
  - id: admin-customer-impersonate-gql
    title: Issue Impersonation Token
    description: Returns a short-lived customer token the admin can use to act as the customer.
    query: |
      mutation Impersonate($input: createAdminCustomerImpersonateInput!) {
        createAdminCustomerImpersonate(input: $input) {
          adminCustomerImpersonate {
            token
            customerId
            customerEmail
            customerName
            impersonatedByAdminId
            expiresAt
          }
        }
      }
    variables: |
      {
        "input": {
          "customerId": 14
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerImpersonate": {
            "adminCustomerImpersonate": {
              "token": "42|q7Xz9aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3w",
              "customerId": 14,
              "customerEmail": "jane@example.com",
              "customerName": "Jane Doe",
              "impersonatedByAdminId": 1,
              "expiresAt": "2026-06-24 11:15:00"
            }
          }
        }
      }
---

# Impersonate Customer (GraphQL)

Issues a customer token an admin can use to act as the customer against the storefront API. This is the headless equivalent of the datagrid's "Login as Customer" action.

### One-hour expiry, plaintext shown once

The plaintext `token` is returned only in this response — store it immediately. The token expires one hour after issue and is audited as having been issued by the calling admin (`impersonatedByAdminId`).

Permission: `customers.customers.edit`.

See the [Impersonate overview](/api/graphql-api/admin/customers/impersonate/) for how this flow works.
