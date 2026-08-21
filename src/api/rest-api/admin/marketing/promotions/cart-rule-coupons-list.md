---
outline: false
apiType: rest
examples:
  - id: list
    title: List Cart Rule Coupons
    description: Paginated list of every coupon belonging to a cart rule, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/cart-rules/47/coupons?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 22,
            "cartRuleId": 47,
            "code": "QALIVE99",
            "usageLimit": 0,
            "usagePerCustomer": 0,
            "timesUsed": 0,
            "type": 0,
            "isPrimary": true,
            "expiredAt": "2026-12-31",
            "createdAt": "2026-06-09T13:48:29+05:30",
            "updatedAt": "2026-06-09T13:48:29+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Cart Rule Coupons

Lists every coupon code attached to a cart rule — the data behind the **Coupons**
tab of the admin **Marketing → Promotions → Cart Rules** screen.

New here? Read the [Cart Rule Coupons overview](/api/rest-api/admin/marketing/promotions/cart-rule-coupons/) for what these coupons do and how they relate to a cart rule.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the coupon rows for this page, scoped to the parent rule.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Only coupons belonging to the named `cartRuleId` are returned — coupons from
other rules never appear. An unknown parent rule returns a `404`.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Coupon id |
| `cartRuleId` | int | Parent cart-rule id |
| `code` | string | The coupon code shoppers enter |
| `usageLimit` | int | Total redemptions allowed (`0` = unlimited; inherits the rule when unset) |
| `usagePerCustomer` | int | Redemptions allowed per customer (`0` = unlimited) |
| `timesUsed` | int | Times redeemed so far — read-only |
| `type` | int | `0` the rule's primary code / `1` a secondary code |
| `isPrimary` | boolean | `true` for the rule's own primary code, `false` for secondary codes |
| `expiredAt` | string | Expiry date (`YYYY-MM-DD`) or `null` |
| `createdAt` | string | ISO 8601 timestamp |
| `updatedAt` | string | ISO 8601 timestamp |

Every `/api/admin/*` request requires an admin Bearer token.
