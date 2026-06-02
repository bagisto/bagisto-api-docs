---
outline: false
apiType: rest
examples:
  - id: admin-customers-list
    title: List Customers (Datagrid)
    description: DataGrid-parity listing. Returns slim rows; detail-only fields (`totalAddresses`, `totalOrders`, `totalAmountSpent`) are null on listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers?per_page=10&customer_group_id=2" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 14,
            "firstName": "Jane",
            "lastName": "Doe",
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "+15551234567",
            "gender": "Female",
            "dateOfBirth": "1990-01-01",
            "customerGroupId": 2,
            "customerGroupName": "Wholesale",
            "channelId": 1,
            "status": 1,
            "subscribedToNewsLetter": false,
            "isVerified": 1,
            "isSuspended": 0,
            "totalAddresses": null,
            "totalOrders": null,
            "totalAmountSpent": null,
            "createdAt": "2026-05-20 12:00:00",
            "updatedAt": "2026-05-20 12:00:00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Customers (Datagrid)

Mirrors the admin **Customers → Customers** datagrid.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `10`, cap `50`). |
| `name` | string | Partial first/last name. |
| `email` | string | Partial email. |
| `phone` | string | Partial phone. |
| `customer_group_id` | integer | Filter by group ID. |
| `status` | integer | `0` or `1`. |
| `channel_id` | integer | Filter by channel ID. |
| `date_of_birth_from` / `_to` | date | DOB range. |
| `created_at_from` / `_to` | date | Created range. |
| `sort` | string | `id` (default desc), `email`, `first_name`. |
| `order` | string | `asc`, `desc`. |
