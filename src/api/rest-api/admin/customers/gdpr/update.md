---
outline: false
apiType: rest
examples:
  - id: admin-customer-gdpr-update
    title: Update GDPR Request
    description: Pure metadata write — status + message. Use the /process endpoint for the destructive cascade.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/customers/gdpr-requests/1" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "status": "processing" }'
    response: |
      {
        "id": 1,
        "customerId": 14,
        "customerName": "Jane Doe",
        "email": "jane@example.com",
        "type": "delete",
        "status": "processing",
        "message": "Please remove my account",
        "revokedAt": null,
        "createdAt": "2026-05-25 08:00:00",
        "updatedAt": "2026-05-25 09:30:00"
      }
---

# Update GDPR Request

::: tip Overview
See the [GDPR Requests overview](/api/rest-api/admin/customers/gdpr/) for the full feature flow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/gdpr-requests/{id}` | PUT |

::: tip Pure metadata write — no side effects
For `pending → processing` / `pending → declined` use this endpoint. For the destructive cascade (delete customer when `type=delete`), use [Process GDPR Request](./process).
:::

Allowed `status` values: `pending`, `processing`, `declined`, `approved`, `revoked`. Invalid → 422. Updating the status still triggers the status-change notification email.

Permission: `customers.gdpr_requests.edit`.
