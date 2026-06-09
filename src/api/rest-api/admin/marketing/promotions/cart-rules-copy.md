---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-copy
    title: Copy Cart Rule
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/17/copy" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{}'
    response: |
      { "id": 42, "name": "Copy of 10% off summer", "status": 0, "couponType": 1, "actionType": "by_percent", "discountAmount": 10, "channels": [1], "customerGroups": [1, 2, 3], "conditions": [] }
---

# Copy Cart Rule

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{id}/copy` | POST |

Duplicates an existing cart rule into a brand-new rule. This is the API equivalent of the **Copy** action on the cart rules listing.

Send an empty body (`{}`) with `Content-Type: application/json`. The response is the full detail of the **newly created** rule.

## What gets copied

| Field | Behaviour |
|-------|-----------|
| `name` | Prefixed with `Copy of ` (e.g. `Copy of 10% off summer`). |
| `status` | Forced to `0` (the copy starts inactive). |
| `channels` | Copied from the source rule. |
| `customerGroups` | Copied from the source rule. |
| `actionType`, `discountAmount`, `conditions`, other settings | Copied from the source rule. |
| Coupons | **Not** copied. The new rule has no coupons. |

A `404` is returned if the source rule id is unknown.

Permission: `marketing.promotions.cart_rules.create`.
