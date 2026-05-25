---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-create
    title: Create Cart Rule
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "10% off summer", "channels": [1], "customer_groups": [1, 2, 3], "coupon_type": 1, "action_type": "by_percent", "discount_amount": 10, "status": 1 }'
    response: |
      { "id": 1, "name": "10% off summer", "actionType": "by_percent", "discountAmount": 10 }
---

# Create Cart Rule

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | |
| `description` | string | no | |
| `channels` | int[] | yes | |
| `customer_groups` | int[] | yes | |
| `starts_from` | datetime | no | |
| `ends_till` | datetime | no | |
| `status` | int | no | 0/1. |
| `coupon_type` | int | yes | 1 = no coupon, 2 = specific coupon. |
| `action_type` | enum | yes | `by_percent`, `by_fixed`, `cart_fixed`, `buy_x_get_y`. |
| `discount_amount` | number | yes | |
| `condition_type` | int | no | 0/1. |
| `conditions` | array | no | |

Permission: `marketing.promotions.cart_rules.create`.
