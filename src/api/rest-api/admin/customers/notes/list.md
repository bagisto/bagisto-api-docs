---
outline: false
apiType: rest
examples:
  - id: admin-customer-note-list
    title: List Customer Notes
    description: Returns the customer's notes, newest first, in the `{ data, meta }` envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/14/notes?page=1&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          { "id": 7, "note": "Called the customer about delivery.", "customerId": 14, "customerNotified": false, "createdAt": "2026-06-09 10:15:00" },
          { "id": 5, "note": "Followed up about return RMA-1023", "customerId": 14, "customerNotified": true, "createdAt": "2026-05-25 10:00:00" }
        ],
        "meta": { "currentPage": 1, "perPage": 2, "lastPage": 1, "total": 2, "from": 1, "to": 2 }
      }
---

# List Customer Notes

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/notes` | GET |

The notes that appear on the customer's view screen, returned newest-first.

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customerId` | integer | yes | The customer whose notes to list. Unknown customer → 404. |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number. |
| `per_page` | integer | — | Items per page. |

## Response Fields

Each row in `data`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Note ID. |
| `note` | string | The note text. |
| `customerId` | integer | The customer this note belongs to. |
| `customerNotified` | boolean | Whether the customer was emailed when the note was added. |
| `createdAt` | string | When the note was created. |

The `meta` object carries `currentPage`, `perPage`, `lastPage`, `total`, `from`, and `to`.

For how the notes log works (append-only, customer-notify), see the [Notes overview](./index.md).
