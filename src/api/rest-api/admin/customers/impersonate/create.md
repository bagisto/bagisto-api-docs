---
outline: false
apiType: rest
examples:
  - id: admin-customer-impersonate
    title: Issue Impersonation Token
    description: Returns a short-lived Sanctum customer token the admin can use to act as the customer.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/14/impersonate" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "token": "23|aLongRandomCustomerToken",
        "customerId": 14,
        "customerEmail": "jane@example.com",
        "customerName": "Jane Doe",
        "impersonatedByAdminId": 1,
        "expiresAt": "2026-06-24T11:15:00+00:00"
      }
---

# Impersonate Customer

This is the API equivalent of the datagrid's **Login as Customer** action. It returns a short-lived customer Bearer token the admin can use to act as the customer against the storefront API.

::: tip Overview
See the [Customers menu overview](/api/rest-api/admin/customers/main/) for the full feature flow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/impersonate` | POST |

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `token` | string | The customer Bearer token. Returned **once** — store it immediately. |
| `customerId` | integer | The impersonated customer. |
| `customerEmail` | string | |
| `customerName` | string | |
| `impersonatedByAdminId` | integer | The admin who issued the token (audit). |
| `expiresAt` | string | Expiry timestamp — the token is valid for 1 hour. |

::: warning Token expires in 1 hour
The plaintext token is returned only once and cannot be retrieved again. Use it as a regular customer Bearer against the `/api/shop/*` endpoints to act as the customer.
:::

Permission: `customers.customers.edit`.
