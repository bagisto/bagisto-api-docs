---
outline: false
examples:
  - id: get-payment-methods
    title: Get Payment Methods
    description: Retrieve available payment methods for checkout.
    query: |
      query checkoutPaymentMethods {
        collectionPaymentMethods(token: "") {
          id
          _id
          method
          title
          description
          icon
          id
          isAllowed
          
        }
      }
    response: |
      {
        "data": {
            "collectionPaymentMethods": [
                {
                    "id": "/api/.well-known/genid/0b8f9e6495ca9fce8943",
                    "_id": "moneytransfer",
                    "method": "moneytransfer",
                    "title": "Money Transfer",
                    "description": "Money Transfer",
                    "icon": "https://api-demo.bagisto.com/themes/shop/default/build/assets/money-transfer-BNjtOcYo.png",
                    "isAllowed": null
                }
            ]
        }
      }
---

# Get Payment Methods

Retrieve available payment methods for checkout.


## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | String | No | **Deprecated** - Keep empty. Use Authorization header instead |

## Authentication

This query supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide a valid customer authentication token in the `Authorization` header.

```
Authorization: Bearer <accessToken>
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | API resource identifier |
| `_id` | String | Payment method identifier |
| `method` | String | Payment method code (for setting) |
| `title` | String | Display name |
| `description` | String | Method description |
| `icon` | String | Payment method icon URL |
| `isAllowed` | Boolean \| null | Whether method is allowed for current cart |

## Common Methods

| Method | Title | Description |
|--------|-------|-------------|
| `moneytransfer` | Money Transfer | Direct money transfer payment |
| `paypal` | PayPal | PayPal online payment |
| `stripe` | Stripe | Credit/debit card via Stripe |
| `cash_on_delivery` | Cash on Delivery | Pay when item is delivered |
| `bank_transfer` | Bank Transfer | Manual bank transfer |

## Method Availability

Available payment methods depend on:
- Store configuration
- Customer country
- Cart total
- Order fulfillment location

## Use Cases

- Display payment options during checkout
- Show available methods based on customer
- Check if method is active
- Build payment selection UI

## Error Responses

```json
{
  "errors": {
    "general": ["No payment methods available."]
  }
}
```

## Related Documentation

- [Set Payment Method](/api/graphql-api/shop/mutations/set-payment-method)
- [Place Order](/api/graphql-api/shop/mutations/place-order)
- [Checkout Flow](/api/graphql-api/shop/checkout)
