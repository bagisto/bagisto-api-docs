---
outline: false
apiType: rest
examples:
  - id: mass-delete
    title: Mass Delete Cart Rule Coupons
    description: Delete several coupons from a cart rule in one call. Ids that don't belong to the rule are skipped.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/47/coupons/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "indices": [22, 23]
        }'
    variables: |
      {}
    response: |
      {
        "deleted": [22, 23],
        "skipped": [],
        "message": "Coupons deleted."
      }
---

# Mass Delete Cart Rule Coupons

Deletes several coupons from a cart rule in one call — the **Mass Delete** action
on the **Coupons** tab of the admin **Marketing → Promotions → Cart Rules**
screen.

New here? Read the [Cart Rule Coupons overview](/api/rest-api/admin/marketing/promotions/cart-rule-coupons/) for what these coupons do and how they relate to a cart rule.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons/mass-delete` | POST |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.delete`
  permission.
- Ids that don't belong to the named `cartRuleId` are **silently skipped**
  (returned in `skipped`); the ids actually removed are returned in `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty list of coupon ids to delete |
