---
outline: false
examples:
  - id: get-shipping-methods
    title: Get Shipping Methods
    description: Retrieve available shipping methods for checkout.
    query: |
      query checkoutShippingRates {
        collectionShippingRates(token: "") {
          _id
          id
          code
          description
          method
          price
          label
        }
      }
    response: |
      {
          "data": {
              "collectionShippingRates": [
                  {
                      "_id": "flatrate_flatrate_flatrate",
                      "id": "/api/.well-known/genid/f14f85f51f8e3efd572e",
                      "code": "flatrate",
                      "description": "Flat Rate Shipping",
                      "method": "flatrate_flatrate",
                      "price": 20,
                      "label": "Flat Rate"
                  },
                  {
                      "_id": "free_free_free",
                      "id": "/api/.well-known/genid/f14f85f51f8e3efd572e",
                      "code": "free",
                      "description": "Free Shipping",
                      "method": "free_free",
                      "price": 0,
                      "label": "Free Shipping"
                  }
              ]
          }
      }
---

# Get Shipping Methods

Retrieve available shipping methods for a cart during checkout.

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
| `_id` | String | Internal shipping method identifier |
| `id` | String | API resource identifier |
| `code` | String | Shipping method code (used for selection) |
| `description` | String | Human-readable method description |
| `method` | String | Shipping method identifier |
| `price` | Float | Shipping cost amount |
| `label` | String | Display label for the shipping method |

## Prerequisites

- Cart must exist
- Shipping address must be set
- Available methods depend on:
  - Cart items
  - Shipping address
  - Store configuration

## Common Methods

| Code | Method | Label | Price | Description |
|------|--------|-------|-------|-------------|
| `flatrate` | `flatrate_flatrate` | Flat Rate | 20 | Fixed shipping cost |
| `free` | `free_free` | Free Shipping | 0 | No shipping charge |

## Use Cases

- Display shipping options during checkout
- Calculate total with shipping
- Allow customer selection
- Show shipping cost estimates

## Error Responses

```json
{
  "errors": {
    "cartId": ["Cart not found."],
    "shippingAddress": ["Shipping address must be set first."]
  }
}
```

## Related Documentation

- [Get Cart](/api/graphql/shop/queries/get-cart)
- [Set Shipping Address](/api/graphql/shop/mutations/set-shipping-address)
- [Set Shipping Method](/api/graphql/shop/mutations/set-shipping-method)
