---
outline: false
apiType: rest
examples:
  - id: admin-customer-gdpr-detail
    title: GDPR Request Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/gdpr-requests/1" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 1,
        "customerId": 14,
        "customerName": "Jane Doe",
        "email": "jane@example.com",
        "type": "delete",
        "status": "pending",
        "message": "Please remove my account",
        "revokedAt": null,
        "createdAt": "2026-05-25 08:00:00",
        "updatedAt": "2026-05-25 08:00:00"
      }
---

# GDPR Request Detail

See the [GDPR Requests overview](/api/rest-api/admin/customers/gdpr/) for the full feature flow.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/gdpr-requests/{id}` | GET |

There is no separate revocation-message field — a revocation reason is stored in the free-form `message` field.
