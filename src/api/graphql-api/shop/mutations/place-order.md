---
outline: false
examples:
  - id: place-order
    title: Place Order
    description: Create an order from a cart.
    query: |
      mutation createCheckoutOrder {
        createCheckoutOrder(input:{}) {
          checkoutOrder {
            id
            orderId      
          }
        }
      }
    response: |
     {
        "data": {
            "createCheckoutOrder": {
                "checkoutOrder": {
                    "id": "4814",
                    "orderId": "554",
                }
            }
        }
      }
---

# Place Order

Create an order from a cart and complete the checkout process.

## Authentication

This query supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide a valid customer authentication token in the `Authorization` header.

```
Authorization: Bearer <accessToken>
```
 
## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Checkout order ID |
| `orderId` | String | Created order ID |

## Prerequisites

All of these must be completed before placing an order:
1. ✅ Cart must contain items
2. ✅ Shipping address must be set
3. ✅ Billing address must be set
4. ✅ Shipping method must be selected
5. ✅ Payment method must be selected
6. ✅ Valid coupon (if applicable)

## Validation Rules

- Cart must have at least one item
- All checkout steps must be completed
- Billing and shipping addresses are required
- Shipping and payment methods must be selected
- Stock must be available for all items
- Inventory must not be exceeded

## Error Responses

```json
{
  "errors": {
    "checkout": ["Unable to complete checkout. Please verify all required fields."],
    "inventory": ["Insufficient stock for one or more items."],
    "payment": ["Payment processing failed."]
  }
}
```

## Order Status Values

| Status | Description |
|--------|-------------|
| `pending` | Order created, awaiting payment |
| `processing` | Payment confirmed, preparing shipment |
| `shipped` | Order has been shipped |
| `delivered` | Order delivered |
| `cancelled` | Order cancelled |
| `refunded` | Order refunded |

## After Order Placement

1. Cart is cleared
2. Order confirmation email is sent
3. Inventory is updated
4. Customer can track order using order ID

## Related Documentation

- [Create Cart](/api/graphql/shop/mutations/create-cart)
- [Set Shipping Address](/api/graphql/shop/mutations/set-shipping-address)
- [Set Payment Method](/api/graphql/shop/mutations/set-payment-method)
- [Get Customer Orders](/api/graphql/shop/queries/get-customer-orders)
