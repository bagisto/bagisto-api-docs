---
outline: false
apiType: rest
examples:
  - id: admin-customer-gdpr-process
    title: Process (Approve + Execute) GDPR Request
    description: Approves a pending request AND, for `type=delete`, cascades the customer delete via `CustomerRepository::delete`.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/gdpr-requests/1/process" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "message": "Approved on customer request" }'
    response: |
      {
        "requestId": 1,
        "customerId": 14,
        "type": "delete",
        "status": "approved",
        "customerDeleted": true,
        "processedAt": "2026-05-25 10:30:00",
        "message": "GDPR request approved and processed."
      }
---

# Process GDPR Request

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/gdpr-requests/{id}/process` | POST |

::: warning Destructive action
For `type=delete` requests this cascades the customer deletion (fires `customer.delete.before/after` so the GDPR module's listeners run). For `type=update` requests it only marks the request approved — admin then applies the requested edits through the regular Customer update endpoint.
:::

::: tip Idempotency by rejection
Already-approved or revoked requests are refused with 422.
:::

Permission: `customers.gdpr_requests.edit`.
