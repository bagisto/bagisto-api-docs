---
outline: false
examples:
  - id: remove-coupon
    title: Remove Coupon
    description: Remove an applied coupon code from the cart.
    query: |
      mutation createRemoveCoupon {
        createRemoveCoupon(input: {}) {
          removeCoupon {
            id 
            discountAmount
            grandTotal
          }
        }
      } 
    response: |
      {
          "data": {
              "createRemoveCoupon": {
                  "removeCoupon": {
                      "id": "4813", 
                      "discountAmount": 0,
                      "grandTotal": 100
                  }
              }
          }
      }
---

# Remove Coupon

Remove an applied coupon code from the cart.

## Authentication

This mutation supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```
 
## Response

| Field | Type | Description |
|-------|------|-------------|
| `createRemoveCoupon` | Cart | Updated cart without coupon |
| `message` | String | Success or error message |
| `success` | Boolean | Removal success status |

## Cart Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Cart ID |
| `couponCode` | String | Coupon code (null if removed) |
| `discountAmount` | Float | Discount amount (0 if removed) |
| `grandTotal` | Float | Cart total without discount |
| `discountAmount` | Float | Discounted amount  |

## Behavior

- Removes the applied coupon from the cart
- Recalculates cart totals
- Discount is no longer applied
- Cart becomes valid again without coupon requirement

## Error Responses

```json
{
  "errors": {
    "cartId": ["Cart not found."],
    "coupon": ["No coupon is currently applied to this cart."]
  }
}
```

## Related Documentation

- [Apply Coupon](/api/graphql/shop/mutations/apply-coupon)
- [Get Cart](/api/graphql/shop/queries/get-cart)
- [Create Cart](/api/graphql/shop/mutations/create-cart)
