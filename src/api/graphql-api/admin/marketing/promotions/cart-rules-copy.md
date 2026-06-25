---
outline: false
examples:
  - id: copy
    title: Copy Cart Rule
    description: Duplicate an existing cart rule into a brand-new, inactive rule. The new rule copies channels and customer groups but not coupons.
    query: |
      mutation CopyAdminMarketingCartRule(
        $input: copyAdminMarketingCartRuleInput!
      ) {
        copyAdminMarketingCartRule(input: $input) {
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
          "id": "/api/admin/marketing/cart-rules/47"
        }
      }
    response: |
      {
        "data": {
          "copyAdminMarketingCartRule": {
            "adminMarketingCartRule": {
              "id": "/api/admin/marketing/cart-rules/48",
              "_id": 48,
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
          }
        }
      }
---

# Copy Cart Rule

Duplicates an existing cart rule into a brand-new rule — the **Copy** row action
on the admin **Marketing → Promotions → Cart Rules** datagrid. The new rule is a
ready-to-edit clone that starts inactive.

::: tip
New here? Read the [Cart Rules overview](/api/graphql-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `copyAdminMarketingCartRule` | Mutation | Duplicate a cart rule into a new rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.create`
  permission.
- Pass the **source** rule's IRI (e.g. `/api/admin/marketing/cart-rules/47`) as
  `id`. The mutation returns the full detail of the newly created rule.
- The copy:
  - prefixes `name` with `Copy of `,
  - forces `status` to `0` (the copy starts inactive),
  - copies the source's `channels` and `customerGroups`,
  - does **not** copy coupons — so `couponCode` is `null` on the new rule.
- An unknown source id returns a `404` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The source rule's IRI |
