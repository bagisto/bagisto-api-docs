---
outline: false
apiType: rest
examples:
  - id: admin-list-orders
    title: List Orders
    description: Paginated, filterable list of all orders, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/orders?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 2392,
            "incrementId": "2392",
            "status": "processing",
            "statusLabel": "Processing",
            "channelName": "bagisto store",
            "isGuest": false,
            "customerEmail": "admin@example.com",
            "customerName": "Test User",
            "paymentTitle": "Money Transfer",
            "totalItemCount": 1,
            "totalQtyOrdered": 1,
            "grandTotal": 4000,
            "formattedGrandTotal": "$4,000.00",
            "location": "New York, NY, US",
            "createdAt": "2026-05-19 13:13:29",
            "items": [
              { "id": 2694, "sku": "test65", "name": "Classic Watch Hand", "qtyOrdered": 1, "productImage": "http://localhost:8000/storage/product/2358/example.webp" }
            ]
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 62, "total": 616, "from": 1, "to": 10 }
      }
  - id: admin-list-orders-filtered
    title: Filter Orders
    description: Filter by status and a date preset. Filters compose; date presets and date_from/date_to are mutually exclusive.
    query: |
      curl -X GET "https://your-domain.com/api/admin/orders?status=processing&date_range=this_month" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [ { "id": 2392, "status": "processing", "...": "..." } ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Orders

Lists every order across all customers — the data behind the admin **Sales →
Orders** screen.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the slim order rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row is **slim** — flat order fields plus a light `items` preview
(name / sku / qty / thumbnail) for the listing badge. Heavy relations (full
items, invoices, shipments) are served by the order **detail** endpoint, not
the listing.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `order_id` | Order increment ID — partial match |
| `status` | `pending`, `pending_payment`, `processing`, `completed`, `canceled`, `closed`, `fraud` |
| `grand_total` | Exact grand total (matched against the base grand total) |
| `grand_total_from`, `grand_total_to` | Grand total range (minimum / maximum) |
| `channel` | Channel ID |
| `customer` | Customer name — partial match |
| `email` | Customer email — partial match |
| `date_range` | Preset: `today`, `yesterday`, `this_week`, `this_month`, `last_month`, `last_three_months`, `last_six_months`, `this_year` |
| `date_from`, `date_to` | Custom date range (`Y-m-d`) — overrides `date_range` |
| `sort`, `order` | Sort field + `asc`/`desc` (default `created_at desc`) |

Every `/api/admin/*` request requires an admin
Bearer token.
