---
outline: false
apiType: rest
examples:
  - id: create
    title: Create Cart Rule
    description: Create a coupon-gated cart rule that gives 10% off at checkout for a channel and customer group.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "QA Coupon Rule",
          "description": "qa",
          "starts_from": "2026-06-01",
          "ends_till": "2026-12-31",
          "status": 0,
          "coupon_type": 1,
          "use_auto_generation": 0,
          "coupon_code": "QALIVE99",
          "action_type": "by_percent",
          "discount_amount": 10,
          "condition_type": 1,
          "conditions": [],
          "channels": [1],
          "customer_groups": [2]
        }'
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

# Create Cart Rule

Creates a cart rule — the **Create Rule** action on the admin **Marketing →
Promotions → Cart Rules** screen. A cart rule discounts the shopper's cart at
checkout and can optionally be gated by a coupon code.

::: tip
New here? Read the [Cart Rules overview](/api/rest-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules` | POST |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.create`
  permission.
- When `coupon_type` is `1` and `use_auto_generation` is `0`, `coupon_code` is
  required and must be unique. With `use_auto_generation` set to `1`, codes are
  generated for you.
- Returns the full rule payload, including the resolved `conditions`, `channels`,
  and `customerGroups`.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Rule name |
| `description` | string | no | Free-text description |
| `channels` | int[] | yes | Non-empty list of channel ids |
| `customer_groups` | int[] | yes | Non-empty list of customer-group ids |
| `coupon_type` | int | no | `0` auto-apply when conditions match / `1` specific code |
| `use_auto_generation` | int | no | `1` to auto-generate coupon codes |
| `coupon_code` | string | conditional | Required + unique when `coupon_type` is `1` and `use_auto_generation` is `0` |
| `action_type` | string | yes | `by_percent`, `by_fixed`, `cart_fixed`, `buy_x_get_y` |
| `discount_amount` | number | yes | Discount value; capped at `100` when `action_type` is `by_percent` |
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
