---
outline: false
apiType: rest
examples:
  - id: update
    title: Update Cart Rule
    description: Update a cart rule's name and discount. Update is a partial merge — send only the fields you change.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/cart-rules/47" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "QA Coupon Rule (15% Off)",
          "discount_amount": 15
        }'
    variables: |
      {}
    response: |
      {
        "id": 47,
        "name": "QA Coupon Rule (15% Off)",
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
---

# Update Cart Rule

Updates an existing cart rule — the **Edit Rule** action on the admin **Marketing →
Promotions → Cart Rules** screen.

New here? Read the [Cart Rules overview](/api/rest-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{id}` | PUT |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.edit`
  permission.
- The update is a **partial merge** — send only the fields you want to change;
  omitted fields keep their existing values.
- When `channels` or `customer_groups` is supplied, that list **replaces** the
  rule's current channels / customer groups. Omit them to leave the existing sets
  untouched.
- Returns the full updated rule payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | no | Rule name |
| `description` | string | no | Free-text description |
| `channels` | int[] | no | Replaces the rule's channels when supplied |
| `customer_groups` | int[] | no | Replaces the rule's customer groups when supplied |
| `coupon_type` | int | no | `0` auto-apply when conditions match / `1` specific code |
| `use_auto_generation` | int | no | `1` to auto-generate coupon codes |
| `coupon_code` | string | no | Required + unique when `coupon_type` is `1` and `use_auto_generation` is `0` |
| `action_type` | string | no | `by_percent`, `by_fixed`, `cart_fixed`, `buy_x_get_y` |
| `discount_amount` | number | no | Discount value; capped at `100` when `action_type` is `by_percent` |
| `discount_quantity` | int | no | Quantity for `buy_x_get_y` |
| `discount_step` | string | no | Step for `buy_x_get_y` |
| `apply_to_shipping` | int | no | `1` applies the discount to shipping |
| `free_shipping` | int | no | `1` grants free shipping |
| `condition_type` | int | no | `1` match all conditions / `0` match any |
| `conditions` | array | no | Cart / product filters |
| `end_other_rules` | int | no | `1` stops lower-priority rules from also applying |
| `uses_attribute_conditions` | int | no | `1` when conditions use product attributes |
| `usage_per_customer` | int | no | Per-customer usage cap (`0` = unlimited) |
| `uses_per_coupon` | int | no | Per-coupon usage cap (`0` = unlimited) |
| `sort_order` | int | no | Priority — lower runs first |
| `status` | int | no | `0` inactive / `1` active |
| `starts_from` | string | no | Start date (`YYYY-MM-DD`) or `null` |
| `ends_till` | string | no | End date (`YYYY-MM-DD`) or `null`; must be `>= starts_from` |
