---
outline: false
apiType: rest
examples:
  - id: admin-customer-gdpr-list
    title: List GDPR Requests
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/gdpr-requests?status=pending&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
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
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List GDPR Requests

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/gdpr-requests` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination. |
| `status` | string | `pending`, `processing`, `declined`, `approved`, `revoked`. |
| `type` | string | `update`, `delete`. |
| `customer_id` | integer | Filter by customer id. |
| `email` | string | Partial email. |
| `customer_name` | string | Partial customer name. |
| `created_at_from` / `_to` | date | Range. |
| `sort` | string | `id` (default desc), `status`, `type`, `created_at`. |
| `order` | string | `asc`, `desc`. |
