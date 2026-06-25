---
outline: false
examples:
  - id: update
    title: Update Cart Rule
    description: Update a cart rule's name and discount. Update is a partial merge — send only the fields you change.
    query: |
      mutation UpdateAdminMarketingCartRule(
        $input: updateAdminMarketingCartRuleInput!
      ) {
        updateAdminMarketingCartRule(input: $input) {
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
          "id": "/api/admin/marketing/cart-rules/47",
          "name": "QA Coupon Rule 15%",
          "discountAmount": 15
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingCartRule": {
            "adminMarketingCartRule": {
              "id": "/api/admin/marketing/cart-rules/47",
              "_id": 47,
              "name": "QA Coupon Rule 15%",
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
              "discountAmount": 15,
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
              "updatedAt": "2026-06-09T14:02:11+05:30"
            }
          }
        }
      }
---

# Update Cart Rule

Updates an existing cart rule — the **Edit** action on the admin
**Marketing → Promotions → Cart Rules** screen.

::: tip
New here? Read the [Cart Rules overview](/api/graphql-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingCartRule` | Mutation | Update a cart rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.edit`
  permission.
- Pass the rule's IRI as `id`. The update is a **partial merge** — send only the
  fields you want to change; omitted fields keep their existing values.
- When `channels` or `customerGroups` is supplied, that list **replaces** the
  rule's current channels / customer groups. Omit them to leave the existing sets
  untouched.
- The mutation returns the full updated rule payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The rule's IRI |
| `name` | String | No | Rule name |
| `description` | String | No | Free-text description |
| `channels` | Array | No | Replaces the rule's channels when supplied |
| `customerGroups` | Array | No | Replaces the rule's customer groups when supplied |
| `couponType` | Int | No | `0` no coupon (auto-applies) / `1` specific coupon |
| `useAutoGeneration` | Int | No | `1` to auto-generate coupon codes |
| `couponCode` | String | No | Required + unique when `couponType` is `1` and `useAutoGeneration` is `0` |
| `actionType` | String | No | `by_percent`, `by_fixed`, `cart_fixed`, `buy_x_get_y` |
| `discountAmount` | Float | No | Discount value; capped at `100` when `actionType` is `by_percent` |
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
