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
      { "id": 1, "status": "processing" }
---

# Update GDPR Request

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/gdpr-requests/{id}` | PUT |

::: tip Pure metadata write — no side effects
For `pending → processing` / `pending → declined` use this endpoint. For the destructive cascade (delete customer when `type=delete`), use [Process GDPR Request](./process).
:::

Allowed `status` values: `pending`, `processing`, `declined`, `approved`, `revoked`. Invalid → 422. Fires `customer.gdpr-request.update.before/after` + `customer.account.gdpr-request.update.after` so the StatusUpdateNotification email listener still fires.

Permission: `customers.gdpr_requests.edit`.
