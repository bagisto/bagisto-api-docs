---
outline: false
examples:
  - id: delete
    title: Delete Cart Rule Coupon
    description: Delete a coupon by id. A successful delete returns no errors; the coupon is removed.
    query: |
      mutation DeleteAdminMarketingCartRuleCoupon(
        $input: deleteAdminMarketingCartRuleCouponInput!
      ) {
        deleteAdminMarketingCartRuleCoupon(input: $input) {
          adminMarketingCartRuleCoupon {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/cart-rules/47/coupons/22"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingCartRuleCoupon": {
            "adminMarketingCartRuleCoupon": null
          }
        }
      }
---

# Delete Cart Rule Coupon

Deletes a coupon code — the **Delete** row action on the admin
**Marketing → Promotions → Cart Rules → Coupons** screen.

New here? Read the [Cart Rule Coupons overview](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons/) for what a coupon does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingCartRuleCoupon` | Mutation | Delete a coupon code |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.delete`
  permission.
- Pass the coupon's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-list) query to
  discover valid ids.
- A coupon that belongs to a different cart rule returns a `404` error.

### Confirm success via the absence of `errors`

The delete mutation returns a success acknowledgement, not the deleted coupon's
data — `adminMarketingCartRuleCoupon` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/cart-rules/{cartRuleId}/coupons/{id}`), which returns
`{ "message": "Cart rule coupon deleted." }`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The coupon's IRI |
