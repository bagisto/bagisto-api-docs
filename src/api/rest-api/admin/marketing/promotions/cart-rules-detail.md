---
outline: false
apiType: rest
examples:
  - id: detail
    title: Cart Rule Detail
    description: Full payload for a single cart rule, including conditions, channels, and customer groups.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/cart-rules/47" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
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
        "couponCode": "QALIVE99",
        "channels": [1],
        "customerGroups": [2],
        "createdAt": "2026-06-09T13:48:29+05:30",
        "updatedAt": "2026-06-09T13:48:29+05:30"
      }
---

# Cart Rule Detail

Returns a single cart rule with its full field set — the data behind the admin
**Marketing → Promotions → Cart Rules** view screen.

::: tip
New here? Read the [Cart Rules overview](/api/rest-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Unlike list rows, the detail endpoint returns `conditions`, `channels`, and
  `customerGroups` — the per-rule targeting and cart-filter data.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `name` | string | Rule name |
| `description` | string | Free-text description |
| `startsFrom` | string | Start date or `null` |
| `endsTill` | string | End date or `null` |
| `status` | int | `0` inactive / `1` active |
| `couponType` | int | `0` auto-apply / `1` specific code |
| `useAutoGeneration` | int | `1` when coupon codes are auto-generated |
| `usagePerCustomer` | int | Per-customer usage cap (`0` = unlimited) |
| `usesPerCoupon` | int | Per-coupon usage cap (`0` = unlimited) |
| `timesUsed` | int | Times the rule has applied (read-only) |
| `conditionType` | int | `1` match all conditions / `0` match any |
| `conditions` | array | Cart / product filters |
| `actionType` | string | `by_percent`, `by_fixed`, `cart_fixed`, `buy_x_get_y` |
| `discountAmount` | number | Discount value (capped at 100 for `by_percent`) |
| `discountQuantity` | int | Quantity for `buy_x_get_y` |
| `discountStep` | string | Step for `buy_x_get_y` |
| `applyToShipping` | int | `1` applies the discount to shipping |
| `freeShipping` | int | `1` grants free shipping |
| `endOtherRules` | int | `1` stops lower-priority rules from also applying |
| `usesAttributeConditions` | int | `1` when conditions use product attributes |
| `sortOrder` | int | Priority — lower runs first |
| `couponCode` | string | Primary coupon code (`null` when the rule has no coupon) |
| `channels` | int[] | Channel ids the rule applies to |
| `customerGroups` | int[] | Customer-group ids the rule applies to |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
