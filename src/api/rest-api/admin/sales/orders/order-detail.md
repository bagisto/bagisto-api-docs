---
outline: false
apiType: rest
examples:
  - id: admin-order-detail
    title: Get Order Detail
    description: Full order-view payload — every relation embedded inline.
    query: |
      curl -X GET "https://your-domain.com/api/admin/orders/2392" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 2392,
        "incrementId": "2392",
        "status": "processing",
        "statusLabel": "Processing",
        "channelName": "bagisto store",
        "customerEmail": "admin@example.com",
        "paymentTitle": "Money Transfer",
        "grandTotal": 4000,
        "formattedGrandTotal": "$4,000.00",
        "subTotal": 4000,
        "createdAt": "2026-05-19 13:13:29",
        "customer": {
          "id": 19, "email": "admin@example.com", "name": "Test User",
          "group": { "id": 2, "code": "general", "name": "General" }
        },
        "billingAddress": { "id": 4943, "addressType": "order_billing", "city": "New York", "state": "NY", "country": "US" },
        "shippingAddress": { "id": 4942, "addressType": "order_shipping", "city": "New York", "state": "NY", "country": "US" },
        "items": [
          {
            "id": 2694, "sku": "test65", "type": "simple", "name": "Classic Watch Hand",
            "productId": 2358, "qtyOrdered": 1, "price": 4000, "formattedPrice": "$4,000.00",
            "additional": { "quantity": 1 }, "child": null, "children": [], "downloadableLinks": []
          }
        ],
        "invoices": [],
        "shipments": []
      }
    commonErrors:
      - error: Not Found (404)
        cause: No order exists with the given ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Order Detail

Returns the complete order-view payload for a single order — the data behind
the admin **Sales → Orders → View** screen.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{id}` | GET |

## What's embedded

Unlike the listing, the detail **embeds every relation inline** — one request
returns the whole screen:

- Flat order fields + totals (grand / sub / tax / discount / shipping, invoiced
  and refunded variants, with `formatted*` strings).
- `customer` (with `group`), `billingAddress`, `shippingAddress`.
- `items` — each with `type` (`simple`, `configurable`, `bundle`,
  `downloadable`, `grouped`, `virtual`) and type-specific data in `additional`,
  `child`, `children`, `downloadableLinks`. Switch on `type` to render.
- `invoices`, `shipments`.

Eager-loading everything for one order is bounded (~constant query count,
measured ~20 ms), so no sub-resource round trips are needed.

## Product-type-aware items

The frontend reads `item.type` and renders accordingly:

| `type` | Type-specific data |
|--------|--------------------|
| `simple`, `virtual` | — |
| `configurable` | `child` — the chosen variant; `additional.super_attribute` |
| `bundle` | `children` — bundle selections; `additional.bundle_options` |
| `grouped` | `children` — grouped sub-items |
| `downloadable` | `downloadableLinks` — purchased links |

Every `/api/admin/*` request requires an admin
Bearer token.
