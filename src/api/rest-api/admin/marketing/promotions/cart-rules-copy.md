---
outline: false
apiType: rest
examples:
  - id: copy
    title: Copy Cart Rule
    description: Duplicate an existing cart rule into a brand-new, inactive rule. Coupons are not copied.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/47/copy" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{}'
    variables: |
      {}
    response: |
      {
        "id": 52,
        "name": "Copy of QA Coupon Rule",
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
        "conditions": [],
        "actionType": "by_percent",
        "discountAmount": 10,
        "discountQuantity": 1,
        "discountStep": "1",
        "applyToShipping": 0,
        "freeShipping": 0,
        "endOtherRules": 0,
        "usesAttributeConditions": 0,
        "sortOrder": 0,
        "couponCode": null,
        "channels": [1],
        "customerGroups": [2],
        "createdAt": "2026-06-09T14:10:55+05:30",
        "updatedAt": "2026-06-09T14:10:55+05:30"
      }
---

# Copy Cart Rule

Duplicates an existing cart rule into a brand-new rule — the **Copy** row action on
the admin **Marketing → Promotions → Cart Rules** datagrid.

::: tip
New here? Read the [Cart Rules overview](/api/rest-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{id}/copy` | POST |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.create`
  permission.
- Send an empty body (`{}`) with `Content-Type: application/json`.
- The response is the full detail of the **newly created** rule.
- An unknown source id returns a `404`.

## What gets copied

| Field | Behaviour |
|-------|-----------|
| `name` | Prefixed with `Copy of ` (e.g. `Copy of QA Coupon Rule`) |
| `status` | Forced to `0` (the copy starts inactive) |
| `channels` | Copied from the source rule |
| `customerGroups` | Copied from the source rule |
| `actionType`, `discountAmount`, `conditions`, other settings | Copied from the source rule |
| Coupons | **Not** copied — the new rule has no coupons (`couponCode` is `null`) |
