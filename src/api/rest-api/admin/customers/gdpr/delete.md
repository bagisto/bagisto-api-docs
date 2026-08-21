---
outline: false
apiType: rest
examples:
  - id: admin-customer-gdpr-delete
    title: Delete GDPR Request
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/customers/gdpr-requests/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "GDPR request deleted." }
---

# Delete GDPR Request

See the [GDPR Requests overview](/api/rest-api/admin/customers/gdpr/) for the full feature flow.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/gdpr-requests/{id}` | DELETE |

Hard delete. Permission: `customers.gdpr_requests.delete`.
