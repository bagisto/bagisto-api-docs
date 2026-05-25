---
outline: false
apiType: rest
examples:
  - id: admin-customer-impersonate
    title: Issue Impersonation Token
    description: Returns a short-lived Sanctum customer token the admin can use to act as the customer.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/14/impersonate" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "token": "23|aLongRandomSanctumToken",
        "customerId": 14,
        "customerEmail": "jane@example.com",
        "customerName": "Jane Doe",
        "impersonatedByAdminId": 1,
        "expiresAt": "2026-05-25 11:00:00"
      }
---

# Impersonate Customer

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/impersonate` | POST |

::: warning Token expires in 1 hour
- Token `name = "admin-impersonate:{adminId}"` — searchable for audit.
- Abilities = `['*', 'impersonated-by-admin:{adminId}']`.
- `expires_at = now() + 1 hour` — non-negotiable; aligns with short-lived assumed-identity windows.
- The plaintext token is returned **once** in the response body. There is no way to retrieve it again — store it immediately.
- Issuance is audit-logged via `admin.customer.impersonate` with `{admin_id, customer_id, token_id, expires_at}`.
:::

Use the returned token as a regular customer Sanctum Bearer against `/api/shop/*` endpoints.

Permission: `customers.customers.edit`.
