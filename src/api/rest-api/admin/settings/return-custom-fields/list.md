---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Return Custom Fields
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/custom-fields" -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 4,
            "code": "preferred_resolution",
            "label": "Preferred resolution",
            "type": "select",
            "isRequired": 1,
            "position": 1,
            "inputValidation": null,
            "status": 1,
            "options": [
              {
                "id": 11,
                "name": "Refund",
                "value": "refund"
              },
              {
                "id": 12,
                "name": "Replacement",
                "value": "replacement"
              }
            ],
            "message": null,
            "createdAt": "2026-07-20T09:00:00+00:00",
            "updatedAt": "2026-07-20T09:00:00+00:00"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 1,
          "total": 1,
          "from": 1,
          "to": 1
        }
      }
---

# List RMA custom fields

Returns the store's return custom fields. `options` is populated only for `select` / `multiselect` / `checkbox` / `radio` types. Rows come back in the standard `{ data, meta }` envelope.

## Endpoint

```
GET /api/admin/rma/custom-fields
```

## Query parameters

All parameters are optional and combine in one request — filter, sort and paginate together.

### Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number (1-based). |
| `per_page` | Items per page (default `10`, max `50`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**.

| Parameter | Match | Example |
|-----------|-------|---------|
| `code` | Partial (contains). | `?code=resolution` |
| `label` | Partial (contains). | `?label=Preferred` |
| `type` | Exact input type. | `?type=select` |
| `status` | Exact — `1` active, `0` inactive. | `?status=1` |

### Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `position`, `code` |
| `order` | `asc`, `desc` (default `desc`) |

## Fields

| Field | Meaning |
|-------|---------|
| `code` | Unique machine code for the field. |
| `label` | The field label shown to the customer. |
| `type` | Input type: `text`, `textarea`, `select`, `multiselect`, `checkbox`, `radio`. |
| `isRequired` | `1` if the customer must fill it in, `0` otherwise. |
| `position` | Sort order in the returns form. |
| `inputValidation` | Optional validation rule name; `null` when none. |
| `status` | `1` active, `0` inactive. |
| `options` | Choice list for `select` / `multiselect` / `checkbox` / `radio` types — an array of `{ id, name, value }`. Empty/absent for `text` / `textarea`. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

For how this menu fits the rest of the RMA settings, see the [menu overview](./).
