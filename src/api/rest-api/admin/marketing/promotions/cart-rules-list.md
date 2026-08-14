---
outline: false
apiType: rest
examples:
  - id: list
    title: List Cart Rules
    description: Paginated list of every cart rule, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/cart-rules?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 47,
            "name": "QA Coupon Rule",
            "description": "qa",
            "startsFrom": "2026-06-01T00:00:00+05:30",
            "endsTill": "2026-12-31T00:00:00+05:30",
            "status": 0,
            "couponType": 1,
            "useAutoGeneration": 0,
            "usagePerCustomer": 0,
            "usesPerCoupon": 0,
            "timesUsed": 0,
            "conditionType": 1,
            "actionType": "by_percent",
            "discountAmount": 10,
            "discountQuantity": 1,
            "discountStep": "1",
            "applyToShipping": 0,
            "freeShipping": 0,
            "endOtherRules": 0,
            "usesAttributeConditions": 0,
            "sortOrder": 0,
            "couponCode": "QALIVE99",
            "createdAt": "2026-06-09T13:48:29+05:30",
            "updatedAt": "2026-06-09T13:48:29+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 5, "total": 47, "from": 1, "to": 10 }
      }
  - id: list-filtered
    title: Filter Cart Rules
    description: Filter by status and coupon code, sorted by priority. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/cart-rules?status=0&coupon_code=QALIVE&sort=sort_order&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 47,
            "name": "QA Coupon Rule",
            "description": "qa",
            "startsFrom": "2026-06-01T00:00:00+05:30",
            "endsTill": "2026-12-31T00:00:00+05:30",
            "status": 0,
            "couponType": 1,
            "useAutoGeneration": 0,
            "usagePerCustomer": 0,
            "usesPerCoupon": 0,
            "timesUsed": 0,
            "conditionType": 1,
            "actionType": "by_percent",
            "discountAmount": 10,
            "discountQuantity": 1,
            "discountStep": "1",
            "applyToShipping": 0,
            "freeShipping": 0,
            "endOtherRules": 0,
            "usesAttributeConditions": 0,
            "sortOrder": 0,
            "couponCode": "QALIVE99",
            "createdAt": "2026-06-09T13:48:29+05:30",
            "updatedAt": "2026-06-09T13:48:29+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Cart Rules

Lists every cart rule in the store — the data behind the admin **Marketing →
Promotions → Cart Rules** datagrid.

New here? Read the [Cart Rules overview](/api/rest-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the cart-rule rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row carries the flat rule fields shown in the example, including `couponCode`
(the rule's primary coupon code, `null` when the rule has no coupon). The heavier
`conditions`, `channels`, and `customerGroups` are served only by the
[detail](/api/rest-api/admin/marketing/promotions/cart-rules-detail) endpoint —
they are `null` on list rows.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `id` | Single id or comma-separated list (e.g. `1,4,9`) |
| `name` | Name — partial match |
| `status` | `0` (inactive) / `1` (active) |
| `coupon_type` | `0` (auto-apply) / `1` (specific code) |
| `coupon_code` | Primary coupon code — partial match |
| `sort_order` | Priority — exact match |
| `starts_from_from`, `starts_from_to` | Start-date range (ISO 8601) |
| `ends_till_from`, `ends_till_to` | End-date range (ISO 8601) |
| `sort`, `order` | Sort field (`id`, `name`, `sort_order`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
