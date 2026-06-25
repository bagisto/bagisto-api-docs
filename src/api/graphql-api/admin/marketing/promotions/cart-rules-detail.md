---
outline: false
examples:
  - id: detail
    title: Cart Rule Detail
    description: Full payload for a single cart rule, including conditions, channels, and customer groups.
    query: |
      query AdminMarketingCartRule($id: ID!) {
        adminMarketingCartRule(id: $id) {
          id
          _id
          name
          description
          startsFrom
          endsTill
          status
          couponType
          useAutoGeneration
          usagePerCustomer
          usesPerCoupon
          timesUsed
          conditionType
          conditions
          actionType
          discountAmount
          discountQuantity
          discountStep
          applyToShipping
          freeShipping
          endOtherRules
          usesAttributeConditions
          sortOrder
          couponCode
          channels
          customerGroups
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/marketing/cart-rules/47"
      }
    response: |
      {
        "data": {
          "adminMarketingCartRule": {
            "id": "/api/admin/marketing/cart-rules/47",
            "_id": 47,
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
        }
      }
---

# Cart Rule Detail

Returns a single cart rule with its full field set — the data behind the admin
**Marketing → Promotions → Cart Rules** view screen.

::: tip
New here? Read the [Cart Rules overview](/api/graphql-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingCartRule` | Query | Fetch one cart rule by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the rule's IRI (e.g. `/api/admin/marketing/cart-rules/47`) as the `id`
  argument; `_id` in the response is the numeric id.
- Unlike list rows, the detail query resolves `conditions`, `channels`, and
  `customerGroups` — the per-rule targeting and condition data.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The rule's IRI |
| `_id` | Int | Numeric id |
| `name` | String | Rule name |
| `description` | String | Free-text description |
| `startsFrom` | String | Start date (ISO 8601) or `null` |
| `endsTill` | String | End date (ISO 8601) or `null` |
| `status` | Int | `0` inactive / `1` active |
| `couponType` | Int | `0` no coupon (auto-applies) / `1` specific coupon code |
| `useAutoGeneration` | Int | `1` when coupon codes are auto-generated |
| `usagePerCustomer` | Int | Per-customer usage limit (`0` = unlimited) |
| `usesPerCoupon` | Int | Per-coupon usage limit (`0` = unlimited) |
| `timesUsed` | Int | Read-only usage count |
| `conditionType` | Int | `1` match all conditions / `0` match any |
| `conditions` | Array | Cart / product condition filters |
| `actionType` | String | `by_percent`, `by_fixed`, `cart_fixed`, `buy_x_get_y` |
| `discountAmount` | Float | Discount value (capped at 100 for `by_percent`) |
| `discountQuantity` | Int | Quantity for `buy_x_get_y` |
| `discountStep` | String | Buy-step for `buy_x_get_y` |
| `applyToShipping` | Int | `1` applies the discount to shipping too |
| `freeShipping` | Int | `1` grants free shipping |
| `endOtherRules` | Int | `1` stops lower-priority rules from also applying |
| `usesAttributeConditions` | Int | `1` when conditions use product attributes |
| `sortOrder` | Int | Priority — lower runs first |
| `couponCode` | String | The rule's primary coupon code, or `null` |
| `channels` | Array | Channel ids the rule applies to |
| `customerGroups` | Array | Customer-group ids the rule applies to |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
