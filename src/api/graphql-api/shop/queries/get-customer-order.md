---
outline: false
examples:
  - id: get-customer-order-basic
    title: Get Single Customer Order
    description: Retrieve details of a specific customer order by its IRI identifier.
    query: |
      query GetCustomerOrder {
        customerOrder(id: "/api/shop/customer-orders/1") {
          _id
          incrementId
          status
          channelName
          customerEmail
          customerFirstName
          customerLastName
          shippingMethod
          shippingTitle
          couponCode
          totalItemCount
          totalQtyOrdered
          grandTotal
          baseGrandTotal
          grandTotalInvoiced
          grandTotalRefunded
          subTotal
          baseSubTotal
          taxAmount
          baseTaxAmount
          discountAmount
          baseDiscountAmount
          shippingAmount
          baseShippingAmount
          baseCurrencyCode
          channelCurrencyCode
          orderCurrencyCode
          createdAt
          updatedAt
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerOrder": {
            "_id": 1,
            "incrementId": "1",
            "status": "pending",
            "channelName": "Default",
            "customerEmail": "customer@example.com",
            "customerFirstName": "John",
            "customerLastName": "Doe",
            "shippingMethod": "flatrate_flatrate",
            "shippingTitle": "Flat Rate - Flat Rate",
            "couponCode": null,
            "totalItemCount": 1,
            "totalQtyOrdered": 2,
            "grandTotal": 150.00,
            "baseGrandTotal": 150.00,
            "grandTotalInvoiced": 150.00,
            "grandTotalRefunded": 0.00,
            "subTotal": 140.00,
            "baseSubTotal": 140.00,
            "taxAmount": 0.00,
            "baseTaxAmount": 0.00,
            "discountAmount": 0.00,
            "baseDiscountAmount": 0.00,
            "shippingAmount": 10.00,
            "baseShippingAmount": 10.00,
            "baseCurrencyCode": "USD",
            "channelCurrencyCode": "USD",
            "orderCurrencyCode": "USD",
            "createdAt": "2025-01-15T10:30:00+00:00",
            "updatedAt": "2025-01-15T10:30:00+00:00"
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: Order with specified ID does not exist or does not belong to the customer
        solution: Verify the order ID and ensure it belongs to the authenticated customer
      - error: MISSING_ID
        cause: Order ID not provided
        solution: Provide a valid order IRI identifier

---

# Get Customer Order

## About

The `customerOrder` query retrieves detailed information for a specific order by its IRI identifier. Customers can only access their own orders — requesting another customer's order returns a not found error, preventing enumeration attacks. Use this query to:

- Display detailed order information
- Show order summary with line items and totals
- Track order status and shipping details
- View applied coupons and discounts
- Display invoiced and refunded amounts

## Authentication

This query requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
X-STOREFRONT-KEY: <storefrontKey>
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | The IRI identifier of the customer order (e.g. `/api/shop/customer-orders/1`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `_id` | `Int!` | Numeric order ID. |
| `incrementId` | `String!` | Human-readable order number. |
| `status` | `String!` | Order status: `pending`, `processing`, `completed`, `canceled`, `closed`, `fraud`. |
| `channelName` | `String!` | Channel the order was placed on. |
| `isGuest` | `Int` | Whether the order was placed as guest. |
| `customerEmail` | `String!` | Customer email address. |
| `customerFirstName` | `String!` | Customer first name. |
| `customerLastName` | `String!` | Customer last name. |
| `shippingMethod` | `String` | Shipping method code. |
| `shippingTitle` | `String` | Shipping method display name. |
| `couponCode` | `String` | Applied coupon code. |
| `isGift` | `Int` | Whether the order is a gift. |
| `totalItemCount` | `Int!` | Number of distinct items. |
| `totalQtyOrdered` | `Int!` | Total quantity ordered. |
| `grandTotal` | `Float!` | Grand total. |
| `baseGrandTotal` | `Float!` | Base grand total. |
| `grandTotalInvoiced` | `Float` | Grand total invoiced. |
| `baseGrandTotalInvoiced` | `Float` | Base grand total invoiced. |
| `grandTotalRefunded` | `Float` | Grand total refunded. |
| `baseGrandTotalRefunded` | `Float` | Base grand total refunded. |
| `subTotal` | `Float!` | Sub total. |
| `baseSubTotal` | `Float!` | Base sub total. |
| `taxAmount` | `Float` | Tax amount. |
| `baseTaxAmount` | `Float` | Base tax amount. |
| `discountAmount` | `Float` | Discount amount. |
| `baseDiscountAmount` | `Float` | Base discount amount. |
| `shippingAmount` | `Float` | Shipping amount. |
| `baseShippingAmount` | `Float` | Base shipping amount. |
| `baseCurrencyCode` | `String!` | Base currency code. |
| `channelCurrencyCode` | `String` | Channel currency code. |
| `orderCurrencyCode` | `String!` | Order currency code. |
| `createdAt` | `DateTime!` | Order creation timestamp. |
| `updatedAt` | `DateTime!` | Order last update timestamp. |

## Error Handling

### Order Not Found

```json
{
  "errors": [
    {
      "message": "Customer order with ID \"999\" not found.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerOrder"]
    }
  ]
}
```

### Unauthenticated Request

```json
{
  "errors": [
    {
      "message": "Customer is not logged in.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerOrder"]
    }
  ]
}
```

## Use Cases

- Display detailed order page in customer account
- Show order summary with all financial details
- Track shipping method and status
- View applied coupons and discounts
- Display invoiced and refunded amounts for order history

## Notes

- **Customer isolation:** A customer can never see another customer's orders. Requesting another customer's order returns a 404, preventing enumeration attacks.
- **Read-only:** Only `GET` operations are available. Orders cannot be modified through this API.
- **Channel scoping:** Orders are filtered by the customer's channel for multi-tenant isolation.

## Related Resources

- [Get All Customer Orders](/api/graphql-api/shop/queries/get-customer-orders) — Query all customer orders
- [Place Order](/api/graphql-api/shop/mutations/place-order) — Place a new order
- [Get Customer Profile](/api/graphql-api/shop/queries/get-customer-profile) — Query customer profile
