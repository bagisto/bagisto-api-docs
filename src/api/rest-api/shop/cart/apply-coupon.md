---
outline: false
examples:
  - id: apply-coupon
    title: Apply Coupon to Cart
    description: Apply a discount coupon code to the shopping cart.
    request: |
      curl -X POST "http://localhost/api/shop/apply-coupon" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
        -H "Authorization: Bearer 62f2b3f5-a455-4c78-93ba-eabca63d32ec" \
        -d '{
              "couponCode": "SAVE20"
            }'
    response: |
      HTTP/1.1 201 Created

      {
        "id": 495,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "itemsCount": 1,
        "subtotal": 74.97,
        "discountAmount": 14.99,
        "taxAmount": 0,
        "shippingAmount": 0,
        "grandTotal": 59.98,
        "formattedSubtotal": "$74.97",
        "formattedDiscountAmount": "$14.99",
        "formattedGrandTotal": "$59.98",
        "couponCode": "SAVE20",
        "isGuest": true
      }
    commonErrors:
      - error: success false with the message "Failed to apply coupon"
        cause: The code does not exist, has expired, or the cart does not meet its conditions
        solution: All three fail the same way and still answer 201 — read the success field, not the status code
      - error: 400 Bad Request — Coupon code is required
        cause: couponCode was missing from the body
        solution: Send couponCode; the field is not named code
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token

---

# Apply Coupon

Apply a discount coupon code to the shopping cart.

## Endpoint

```
POST /api/shop/apply-coupon
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | The cart's own token as a Bearer token, or a logged-in customer's token. |

## Request Body

```json
{
  "couponCode": "SAVE20"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `couponCode` | string | Yes | The coupon to apply. The field is `couponCode` — `code` is not read, and its absence fails with `Coupon code is required`. |

## Response

`201 Created` carrying the whole recalculated cart — the same object [Get Cart](/api/rest-api/shop/cart/get-cart) returns, plus two fields describing the attempt.

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` when the coupon was applied. |
| `message` | string | `Coupon applied successfully` or `Failed to apply coupon`. |
| `couponCode` | string | The applied code. `null` when the attempt failed. |
| `discountAmount` / `formattedDiscountAmount` | number / string | The discount now on the cart. |
| `grandTotal` / `formattedGrandTotal` | number / string | The recalculated total. |

A rejected coupon still answers `201` with the full cart untouched, so the status code alone never tells you whether the discount applied.

## Validation

| Rule | Result |
|------|--------|
| `couponCode` present | Missing → `400 Coupon code is required`. |
| The code exists on an active cart rule | Otherwise `success: false`, `Failed to apply coupon`. |
| The cart satisfies the rule's conditions | Same failure — the message does not distinguish "unknown code" from "conditions not met". |

Applying a second coupon replaces the first; a cart holds one coupon at a time.

## Use Cases

- **Coupon field at checkout** — post the typed code, then branch on `success` and re-render the totals straight from the response.
- **Show the discount immediately** — the response is the recalculated cart, so no follow-up [Get Cart](/api/rest-api/shop/cart/get-cart) is needed.

## Best Practices

- **Branch on `success`, never on the status code** — a wrong code and a valid one both answer `201`.
- **Use `couponCode`, not `code`** — the wrong key is treated as a missing coupon.
- **Show the store's own message with care** — one generic failure string covers unknown, expired, and non-qualifying codes, so a UI that says "coupon does not exist" will sometimes be wrong.
- **Re-read `grandTotal` after applying** — the discount changes shipping and tax lines as well as the subtotal.

## Related Resources

- [Remove Coupon](/api/rest-api/shop/cart/remove-coupon) — clear the applied coupon and recalculate
- [Get Cart](/api/rest-api/shop/cart/get-cart) — read the current items and recalculated totals
