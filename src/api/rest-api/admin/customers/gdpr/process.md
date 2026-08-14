---
outline: false
apiType: rest
examples:
  - id: admin-customer-gdpr-process
    title: Process (Approve + Execute) GDPR Request
    description: Approves a pending request AND, for `type=delete`, cascades the customer deletion.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/gdpr-requests/9/process" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "message": "Approved on customer request" }'
    response: |
      {
        "id": 9,
        "requestId": 9,
        "customerId": 14,
        "type": "delete",
        "status": "approved",
        "customerDeleted": true,
        "processedAt": "2026-06-24T10:15:00+00:00",
        "message": "GDPR request approved and processed."
      }
---

# Process GDPR Request

Approves a pending request and runs it.

See the [GDPR Requests overview](/api/rest-api/admin/customers/gdpr/) for the full feature flow.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/gdpr-requests/{id}/process` | POST |

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` / `requestId` | integer | The processed request ID. |
| `customerId` | integer | The customer the request belongs to. |
| `type` | string | `update` or `delete`. |
| `status` | string | `approved` after a successful process. |
| `customerDeleted` | boolean | `true` when a `delete` request cascaded the customer deletion. |
| `processedAt` | string | Timestamp the request was processed. |
| `message` | string \| null | Optional note recorded on the request. |

### Destructive action

For `type=delete` requests this cascades the customer deletion. For `type=update` requests it only marks the request approved — apply the requested edits through the regular Customer update endpoint.

### Idempotency by rejection

Already-approved or revoked requests are refused with 422.

Permission: `customers.gdpr_requests.edit`.
