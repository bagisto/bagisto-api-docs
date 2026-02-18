---
outline: false
examples:
  - id: get-customer-order
    title: Get Single Customer Order
    description: Retrieve details of a specific customer order by ID.
    request: |
      GET /api/shop/customer-orders/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "id": 1,
        "incrementId": "1",
        "status": "pending",
        "channelName": "Default",
        "isGuest": 0,
        "customerEmail": "customer@example.com",
        "customerFirstName": "John",
        "customerLastName": "Doe",
        "shippingMethod": "flatrate_flatrate",
        "shippingTitle": "Flat Rate - Flat Rate",
        "couponCode": null,
        "isGift": 0,
        "totalItemCount": 1,
        "totalQtyOrdered": 2,
        "baseCurrencyCode": "USD",
        "channelCurrencyCode": "USD",
        "orderCurrencyCode": "USD",
        "grandTotal": 150.00,
        "baseGrandTotal": 150.00,
        "grandTotalInvoiced": 150.00,
        "baseGrandTotalInvoiced": 150.00,
        "grandTotalRefunded": 0.00,
        "baseGrandTotalRefunded": 0.00,
        "subTotal": 140.00,
        "baseSubTotal": 140.00,
        "taxAmount": 0.00,
        "baseTaxAmount": 0.00,
        "discountAmount": 0.00,
        "baseDiscountAmount": 0.00,
        "shippingAmount": 10.00,
        "baseShippingAmount": 10.00,
        "createdAt": "2025-01-15T10:30:00.000000Z",
        "updatedAt": "2025-01-15T10:30:00.000000Z"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Order with specified ID does not exist or does not belong to the customer
        solution: Verify the order ID and ensure it belongs to the authenticated customer
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

---

# Get Customer Order

Retrieve detailed information for a specific customer order by its ID. Customers can only access their own orders — requesting another customer's order returns a 404, preventing enumeration attacks.

## Endpoint

```
GET /api/shop/customer-orders/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Customer order ID |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Order ID |
| `incrementId` | string | Human-readable order number |
| `status` | string | Order status |
| `channelName` | string | Channel the order was placed on |
| `isGuest` | integer | Whether the order was placed as guest |
| `customerEmail` | string | Customer email |
| `customerFirstName` | string | Customer first name |
| `customerLastName` | string | Customer last name |
| `shippingMethod` | string | Shipping method code |
| `shippingTitle` | string | Shipping method display name |
| `couponCode` | string | Applied coupon code |
| `isGift` | integer | Whether the order is a gift |
| `totalItemCount` | integer | Number of distinct items |
| `totalQtyOrdered` | integer | Total quantity ordered |
| `baseCurrencyCode` | string | Base currency code |
| `channelCurrencyCode` | string | Channel currency code |
| `orderCurrencyCode` | string | Order currency code |
| `grandTotal` | float | Grand total |
| `baseGrandTotal` | float | Base grand total |
| `grandTotalInvoiced` | float | Grand total invoiced |
| `baseGrandTotalInvoiced` | float | Base grand total invoiced |
| `grandTotalRefunded` | float | Grand total refunded |
| `baseGrandTotalRefunded` | float | Base grand total refunded |
| `subTotal` | float | Sub total |
| `baseSubTotal` | float | Base sub total |
| `taxAmount` | float | Tax amount |
| `baseTaxAmount` | float | Base tax amount |
| `discountAmount` | float | Discount amount |
| `baseDiscountAmount` | float | Base discount amount |
| `shippingAmount` | float | Shipping amount |
| `baseShippingAmount` | float | Base shipping amount |
| `createdAt` | string | ISO 8601 creation timestamp |
| `updatedAt` | string | ISO 8601 last update timestamp |

## Error Responses

**Not Found (404):**
```json
{
  "message": "Customer order with ID \"999\" not found."
}
```

**Unauthenticated (401):**
```json
{
  "message": "Customer is not logged in."
}
```

**Accessing Another Customer's Order (404):**

Requesting an order that belongs to a different customer returns the same 404 response, preventing enumeration attacks:

```json
{
  "message": "Customer order with ID \"5\" not found."
}
```

## Use Cases

- Display detailed order page in customer account
- Show order summary with all financial details
- Track shipping method and status
- View applied coupons and discounts
- Display invoiced and refunded amounts

## Notes

- **Customer isolation:** A customer can never see another customer's orders. Requesting another customer's order returns a 404.
- **Read-only:** Only `GET` operations are available. Orders cannot be modified through this API.
- **Channel scoping:** Orders are filtered by the customer's channel for multi-tenant isolation.

## Related Resources

- [Get All Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders)
- [Place Order](/api/rest-api/shop/checkout/place-order)
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
