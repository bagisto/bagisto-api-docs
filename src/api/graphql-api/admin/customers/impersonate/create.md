---
outline: false
examples:
  - id: admin-customer-impersonate-gql
    title: Issue Impersonation Token
    query: |
      mutation Impersonate($input: createAdminCustomerImpersonateInput!) {
        createAdminCustomerImpersonate(input: $input) {
          adminCustomerImpersonate { token customerId customerEmail customerName impersonatedByAdminId expiresAt }
        }
      }
    variables: |
      { "input": { "customerId": 14 } }
    response: |
      { "data": { "createAdminCustomerImpersonate": { "adminCustomerImpersonate": { "token": "23|aLongRandomSanctumToken", "customerId": 14, "customerEmail": "jane@example.com", "customerName": "Jane Doe", "impersonatedByAdminId": 1, "expiresAt": "2026-05-25 11:00:00" } } } }
---

# Impersonate Customer (GraphQL)

::: warning 1-hour expiry, one-time plaintext
The plaintext token is shown once. Token name `admin-impersonate:{adminId}` for audit; abilities include `impersonated-by-admin:{adminId}`. Expires in 1 hour.
:::

Permission: `customers.customers.edit`.
