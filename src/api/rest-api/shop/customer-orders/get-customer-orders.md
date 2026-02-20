---
outline: false
examples:
  - id: get-customer-orders
    title: Get All Customer Orders
    description: Retrieve all orders for the authenticated customer.
    request: |
      GET /api/shop/customer-orders
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      [
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
        },
        {
          "id": 2,
          "incrementId": "2",
          "status": "completed",
          "channelName": "Default",
          "isGuest": 0,
          "customerEmail": "customer@example.com",
          "customerFirstName": "John",
          "customerLastName": "Doe",
          "grandTotal": 250.00,
          "baseGrandTotal": 250.00,
          "createdAt": "2025-01-16T14:00:00.000000Z",
          "updatedAt": "2025-01-16T14:00:00.000000Z"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

---

# Get Customer Orders

Retrieve all orders belonging to the authenticated customer. This is a **read-only** API — customers can only view their own orders. Orders are automatically scoped to the authenticated customer and current channel.

## Endpoint

```
GET /api/shop/customer-orders
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response Fields (200 OK)

The response is a plain JSON array of order objects.

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

## Order Status Values

| Status | Description |
|--------|-------------|
| `pending` | Awaiting payment confirmation |
| `processing` | Payment confirmed, order being processed |
| `completed` | Order fulfilled and delivered |
| `canceled` | Order canceled |
| `closed` | Order closed |
| `fraud` | Flagged as fraudulent |

## Empty Collection

When the customer has no orders, an empty array is returned:

```json
[]
```

## Error Responses

**Unauthenticated (401):**
```json
{
  "message": "Customer is not logged in."
}
```

## Use Cases

- Display order history in customer account dashboard
- Show order list with status, totals, and dates
- Track previous purchases
- View recent orders

## Notes

- **Read-only API:** Only `GET` operations are available. Orders cannot be created, updated, or deleted through this API.
- **Customer isolation:** Orders are automatically filtered by the authenticated customer. A customer can never see another customer's orders.
- **Channel scoping:** Orders are filtered by the customer's channel for multi-tenant isolation.
- **Response format:** The collection endpoint returns all matching orders as a flat JSON array.

## Related Resources

- [Get Single Customer Order](/api/rest-api/shop/customer-orders/get-customer-order)
- [Place Order](/api/rest-api/shop/checkout/place-order)
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
