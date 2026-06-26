---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Cart Rule Coupon
    description: Delete a single coupon from a cart rule by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/cart-rules/47/coupons/22" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Coupon deleted."
      }
---

# Delete Cart Rule Coupon

Deletes a single coupon from a cart rule — the **Delete** row action on the
**Coupons** tab of the admin **Marketing → Promotions → Cart Rules** screen.

::: tip
New here? Read the [Cart Rule Coupons overview](/api/rest-api/admin/marketing/promotions/cart-rule-coupons/) for what these coupons do and how they relate to a cart rule.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.delete`
  permission.
- The coupon must belong to the named `cartRuleId` — a coupon from another rule
  (or an unknown id) returns a `404`.
- Returns a success message on completion.
