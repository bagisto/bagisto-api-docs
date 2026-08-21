---
outline: false
examples:
  - id: create
    title: Create Cart Rule
    description: Create a coupon-gated cart rule that discounts the cart by a percentage for a channel and customer group.
    query: |
      mutation CreateAdminMarketingCartRule(
        $input: createAdminMarketingCartRuleInput!
      ) {
        createAdminMarketingCartRule(input: $input) {
          adminMarketingCartRule {
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
      }
    variables: |
      {
        "input": {
          "name": "QA Coupon Rule",
          "description": "qa",
          "startsFrom": "2026-06-01T00:00:00+05:30",
          "endsTill": "2026-12-31T00:00:00+05:30",
          "status": 0,
          "couponType": 1,
          "useAutoGeneration": 0,
          "couponCode": "QALIVE99",
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
          "usagePerCustomer": 0,
          "usesPerCoupon": 0,
          "sortOrder": 0,
          "channels": [1],
          "customerGroups": [2]
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingCartRule": {
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
      }
---

# Create Cart Rule

Creates a cart rule — the **Create Cart Rule** action on the admin
**Marketing → Promotions → Cart Rules** screen. A cart rule discounts the cart at
checkout, optionally gated behind a coupon code.

New here? Read the [Cart Rules overview](/api/graphql-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCartRule` | Mutation | Create a cart rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.create`
  permission.
- When `couponType` is `1` and `useAutoGeneration` is `0`, a unique `couponCode`
  is required — it becomes the rule's single primary coupon. Bulk codes are
  managed through the [Cart Rule Coupons](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-list)
  sub-resource.
- The mutation returns the full rule payload, including the resolved `conditions`,
  `channels`, and `customerGroups`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | Rule name |
| `description` | String | No | Free-text description |
| `channels` | Array | Yes | Non-empty list of channel ids |
| `customerGroups` | Array | Yes | Non-empty list of customer-group ids |
| `couponType` | Int | No | `0` no coupon (auto-applies) / `1` specific coupon |
| `useAutoGeneration` | Int | No | `1` to auto-generate coupon codes |
| `couponCode` | String | No | Required + unique when `couponType` is `1` and `useAutoGeneration` is `0` |
| `actionType` | String | Yes | `by_percent`, `by_fixed`, `cart_fixed`, `buy_x_get_y` |
| `discountAmount` | Float | Yes | Discount value; capped at `100` when `actionType` is `by_percent` |
| `discountQuantity` | Int | No | Quantity for `buy_x_get_y` |
| `discountStep` | String | No | Buy-step for `buy_x_get_y` |
| `applyToShipping` | Int | No | `1` applies the discount to shipping too |
| `freeShipping` | Int | No | `1` grants free shipping |
| `conditionType` | Int | No | `1` match all conditions / `0` match any |
| `conditions` | Array | No | Cart / product condition filters |
| `endOtherRules` | Int | No | `1` stops lower-priority rules from also applying |
| `usesAttributeConditions` | Int | No | `1` when conditions use product attributes |
| `usagePerCustomer` | Int | No | Per-customer usage limit (`0` = unlimited) |
| `usesPerCoupon` | Int | No | Per-coupon usage limit (`0` = unlimited) |
| `sortOrder` | Int | No | Priority — lower runs first |
| `status` | Int | No | `0` inactive / `1` active |
| `startsFrom` | String | No | Start date (ISO 8601) or `null` |
| `endsTill` | String | No | End date (ISO 8601) or `null`; must be `>= startsFrom` |
