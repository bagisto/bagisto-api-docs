---
outline: false
examples:
  - id: mass-delete
    title: Mass Delete Cart Rule Coupons
    description: Delete several coupons of one cart rule in a single call. Ids not on the rule are skipped.
    query: |
      mutation CreateAdminMarketingCartRuleCouponMassDelete(
        $input: createAdminMarketingCartRuleCouponMassDeleteInput!
      ) {
        createAdminMarketingCartRuleCouponMassDelete(input: $input) {
          adminMarketingCartRuleCouponMassDelete {
            deleted
            skipped
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "cartRuleId": 47,
          "indices": [22, 23]
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingCartRuleCouponMassDelete": {
            "adminMarketingCartRuleCouponMassDelete": {
              "deleted": [22, 23],
              "skipped": [],
              "message": "Cart rule coupons deleted."
            }
          }
        }
      }
---

# Mass Delete Cart Rule Coupons

Deletes several coupons of one cart rule in a single call — the **Mass Delete**
action on the admin **Marketing → Promotions → Cart Rules → Coupons** datagrid.

New here? Read the [Cart Rule Coupons overview](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons/) for what a coupon does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCartRuleCouponMassDelete` | Mutation | Delete multiple coupons of one cart rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.delete`
  permission.
- Pass the parent `cartRuleId` plus the numeric coupon ids in `indices`. Ids that
  do **not** belong to that cart rule are **silently skipped** (returned in
  `skipped`); the ids actually removed are returned in `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `cartRuleId` | Int | Yes | Parent cart-rule id |
| `indices` | Array | Yes | Non-empty list of numeric coupon ids to delete |
