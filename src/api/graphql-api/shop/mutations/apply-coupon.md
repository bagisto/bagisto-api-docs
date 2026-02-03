---
outline: false
examples:
  - id: apply-coupon-to-cart
    title: Apply Coupon Code to Cart
    description: Apply a valid coupon code to reduce cart total.
    query: |
      mutation createApplyCoupon (
          $couponCode: String!
      ) {
        createApplyCoupon(input: {
          couponCode: $couponCode
        }) {
          applyCoupon {
            id            
            discountAmount
            grandTotal
          }
        }
      }
    variables: |
      {
          "couponCode": "SAVE10"
      }
    response: |
      {
          "data": {
              "createApplyCoupon": {
                  "applyCoupon": {
                      "id": "4813", 
                      "discountAmount": 0,
                      "grandTotal": 100
                  }
              }
          }
      }
    commonErrors:
      - error: INVALID_COUPON
        cause: Coupon code does not exist
        solution: Verify coupon code spelling
      - error: COUPON_EXPIRED
        cause: Coupon validity period has ended
        solution: Use an active coupon
      - error: MINIMUM_ORDER_NOT_MET
        cause: Cart total doesn't meet minimum requirement
        solution: Add more items to cart
---

# Apply Coupon

## About

The `applyCoupon` mutation applies a promotional coupon code to a shopping cart. Use this mutation to:

- Apply discount codes to reduce cart total
- Enable promo/coupon code functionality
- Implement "Apply Coupon" features on cart page
- Validate coupon eligibility
- Display discount calculations
- Support promotional campaigns

This mutation validates coupon code, checks eligibility conditions, and recalculates cart totals with applied discount.

## Authentication

This mutation supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `couponCode` | `String!` | Promotional coupon code to apply. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `applyCoupon` | `Coupon!` | Return coupon and cart related values. |
| `applyCoupon.id` | `String` | id of the cart. |
| `applyCoupon.discountAmount` | `Float` | Total discount from all applied coupons. |
| `applyCoupon.grandTotal` | `Float!` | Recalculated cart total with discount. | 
| `errors` | `[ErrorMessage!]` | Validation errors if application failed. |

