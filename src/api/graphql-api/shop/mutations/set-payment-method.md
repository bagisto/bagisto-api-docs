---
outline: false
examples:
  - id: set-payment-method
    title: Set Payment Method
    description: Set the payment method for a cart.
    query: |
      mutation createCheckoutPaymentMethod(
          $paymentMethod: String!,
          $successUrl: String,
          $failureUrl: String,
          $cancelUrl: String
      ) {
        createCheckoutPaymentMethod(
          input: {
              paymentMethod: $paymentMethod,
              paymentSuccessUrl: $successUrl,
              paymentFailureUrl: $failureUrl,
              paymentCancelUrl: $cancelUrl
          }
        ) {
          checkoutPaymentMethod {
            success
            message
            paymentGatewayUrl
            paymentData
          }
        }
      }
    variables: |
      {
          "paymentMethod": "moneytransfer",
          "successUrl": "https://myapp.com/payment/success",
          "failureUrl": "https://myapp.com/payment/failure",
          "cancelUrl": "https://myapp.com/payment/cancel"
      }
    response: |
      {
          "data": {
              "createCheckoutPaymentMethod": {
                  "checkoutPaymentMethod": {
                      "success": true,
                      "message": "Payment method saved successfully",
                      "paymentGatewayUrl": null,
                      "paymentData": null
                  }
              }
          }
      }
---

# Set Payment Method

Set the payment method for a cart.

## Authentication

This query supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide a valid customer authentication token in the `Authorization` header.

```
Authorization: Bearer <accessToken>
```


## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethod` | String | ✅ Yes | Payment method code (e.g., moneytransfer, paypal) |
| `successUrl` | String | ❌ No | URL to redirect on successful payment |
| `failureUrl` | String | ❌ No | URL to redirect on failed payment |
| `cancelUrl` | String | ❌ No | URL to redirect on cancelled payment |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `success` | Boolean | Success status |
| `message` | String | Success or error message |
| `paymentGatewayUrl` | String \| null | Payment gateway URL for external payment processing |
| `paymentData` | String \| null | Additional payment data if required |

## Common Payment Method Codes

| Code | Description |
|------|-------------|
| `moneytransfer` | Money Transfer |
| `paypal` | PayPal |
| `stripe` | Stripe |
| `bank_transfer` | Bank Transfer |
| `cash_on_delivery` | Cash on Delivery (COD) |

## Prerequisites

- Billing address must be set
- Shipping method must be selected
- Payment method must be enabled in store

## Validation Rules

- Payment method code must be valid and enabled
- Payment method must be available for the customer's country
- Redirect URLs must be valid if provided
- Cart must have items
- All previous checkout steps must be completed

## Error Responses

```json
{
  "errors": {
    "paymentMethod": ["Invalid or unavailable payment method."],
    "successUrl": ["The success URL must be a valid URL."],
    "billingAddress": ["Billing address must be set first."],
    "shippingMethod": ["Shipping method must be set first."]
  }
}
```

## Related Documentation

- [Get Payment Methods](/api/graphql/shop/queries/get-payment-methods)
- [Set Billing Address](/api/graphql/shop/mutations/set-billing-address)
- [Place Order](/api/graphql/shop/mutations/place-order)
