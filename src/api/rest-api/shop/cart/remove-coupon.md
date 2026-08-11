---
outline: false
examples:
  - id: remove-coupon
    title: Remove Coupon from Cart
    description: Remove a discount coupon code from the shopping cart.
    request: |
      POST /api/shop/remove-coupon
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
    response: |
      HTTP/1.1 201 Created

      {
        "id": 506,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "itemsCount": 1,
        "subtotal": 367.50,
        "discountAmount": 0,
        "taxAmount": 0,
        "shippingAmount": 0,
        "grandTotal": 367.50,
        "formattedSubtotal": "$367.50",
        "formattedGrandTotal": "$367.50",
        "couponCode": null,
        "success": true,
        "message": "Coupon removed successfully"
      }
    commonErrors:
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token

---

# Remove Coupon

Remove a discount coupon code from the shopping cart.

## Endpoint

```
POST /api/shop/remove-coupon
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | The cart's own token as a Bearer token, or a logged-in customer's token. |

## Request Body

Send `{}`. The cart is identified by the token, and the coupon by whatever is currently on that cart — there is no code to name.

## Response

`201 Created` carrying the whole recalculated cart, the same object [Get Cart](/api/rest-api/shop/cart/get-cart) returns, with `couponCode` back to `null`.

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` when the call completed. |
| `message` | string | `Coupon removed successfully`. |
| `couponCode` | string | `null` after removal. |
| `discountAmount` / `grandTotal` | number | Recalculated without the discount. |

The call is idempotent — running it on a cart with no coupon still answers `201` with `success: true`, so it is safe to call before applying a new code.

## Effects

- The discount is dropped and the totals are recalculated, including any shipping or tax that depended on the discounted subtotal.
- Cart items are untouched.
- A cart holds one coupon at a time, so applying a different code replaces the current one without needing this call first.

## Use Cases

- **"Remove" next to an applied coupon** — one call, then re-render from the returned cart.
- **Reset before trying another code** — optional, since [Apply Coupon](/api/rest-api/shop/cart/apply-coupon) overwrites the existing one.

## Best Practices

- **Re-render from the response** — it is the full recalculated cart, so no follow-up fetch is needed.
- **Do not guard the call behind "is a coupon applied"** — it is safe on a coupon-less cart.
- **Send the cart token** — without a Bearer token the call fails with `401`, even though the body is empty.

## Related Resources

- [Apply Coupon](/api/rest-api/shop/cart/apply-coupon) — apply a discount code to the cart
- [Get Cart](/api/rest-api/shop/cart/get-cart) — read the current items and recalculated totals
