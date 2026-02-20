---
outline: false
examples:
  - id: get-customer-invoices
    title: Get All Customer Invoices
    description: Retrieve all invoices for the authenticated customer's orders.
    request: |
      GET /api/shop/customer-invoices
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      [
        {
          "id": 1,
          "incrementId": "INV-001",
          "state": "paid",
          "totalQty": 2,
          "emailSent": true,
          "subTotal": 100.00,
          "baseSubTotal": 100.00,
          "grandTotal": 110.00,
          "baseGrandTotal": 110.00,
          "shippingAmount": 5.00,
          "baseShippingAmount": 5.00,
          "taxAmount": 5.00,
          "baseTaxAmount": 5.00,
          "discountAmount": 0.00,
          "baseDiscountAmount": 0.00,
          "shippingTaxAmount": 0.00,
          "baseShippingTaxAmount": 0.00,
          "subTotalInclTax": 105.00,
          "baseSubTotalInclTax": 105.00,
          "shippingAmountInclTax": 5.00,
          "baseShippingAmountInclTax": 5.00,
          "baseCurrencyCode": "USD",
          "channelCurrencyCode": "USD",
          "orderCurrencyCode": "USD",
          "transactionId": "TXN-12345",
          "reminders": 0,
          "nextReminderAt": null,
          "order": "/api/shop/customer-orders/1",
          "items": ["/api/shop/invoice-items/1"],
          "createdAt": "2025-02-10T10:30:00.000000Z",
          "updatedAt": "2025-02-10T10:30:00.000000Z"
        },
        {
          "id": 2,
          "incrementId": "INV-002",
          "state": "pending",
          "totalQty": 1,
          "grandTotal": 55.00,
          "baseGrandTotal": 55.00,
          "baseCurrencyCode": "USD",
          "createdAt": "2025-02-10T14:00:00.000000Z",
          "updatedAt": "2025-02-10T14:00:00.000000Z"
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

# Get Customer Invoices

Retrieve all invoices belonging to the authenticated customer's orders. This is a **read-only** API — customers can only view their own invoices. Invoices are automatically scoped to the authenticated customer via the order relationship.

## Endpoint

```
GET /api/shop/customer-invoices
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response Fields (200 OK)

The response is a plain JSON array of invoice objects.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Invoice ID |
| `incrementId` | string | Human-readable invoice number (e.g. `INV-001`) |
| `state` | string | Invoice state |
| `totalQty` | integer | Total quantity of items in the invoice |
| `emailSent` | boolean | Whether the invoice email was sent |
| `subTotal` | float | Sub total |
| `baseSubTotal` | float | Base sub total |
| `grandTotal` | float | Grand total |
| `baseGrandTotal` | float | Base grand total |
| `shippingAmount` | float | Shipping amount |
| `baseShippingAmount` | float | Base shipping amount |
| `taxAmount` | float | Tax amount |
| `baseTaxAmount` | float | Base tax amount |
| `discountAmount` | float | Discount amount |
| `baseDiscountAmount` | float | Base discount amount |
| `shippingTaxAmount` | float | Shipping tax amount |
| `baseShippingTaxAmount` | float | Base shipping tax amount |
| `subTotalInclTax` | float | Sub total including tax |
| `baseSubTotalInclTax` | float | Base sub total including tax |
| `shippingAmountInclTax` | float | Shipping amount including tax |
| `baseShippingAmountInclTax` | float | Base shipping amount including tax |
| `baseCurrencyCode` | string | Base currency code (e.g. `USD`) |
| `channelCurrencyCode` | string | Channel currency code |
| `orderCurrencyCode` | string | Order currency code |
| `transactionId` | string | Payment transaction ID |
| `reminders` | integer | Number of reminders sent |
| `nextReminderAt` | string | Next reminder scheduled date |
| `order` | string | Associated order IRI (e.g. `/api/shop/customer-orders/1`) |
| `items` | array | Invoice line item IRIs |
| `createdAt` | string | ISO 8601 creation timestamp |
| `updatedAt` | string | ISO 8601 last update timestamp |

## Invoice State Values

| State | Description |
|-------|-------------|
| `pending` | Invoice created, awaiting action |
| `pending_payment` | Payment initiated but not yet confirmed |
| `paid` | Payment received and confirmed |
| `overdue` | Payment past due date |
| `refunded` | Invoice has been refunded |

## Empty Collection

When the customer has no invoices, an empty array is returned:

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

- Display invoice history in customer account dashboard
- Show invoice list with state, totals, and dates
- Track payment status across orders
- View financial records

## Notes

- **Read-only API:** Only `GET` operations are available. Invoices cannot be created, updated, or deleted through this API.
- **Customer isolation:** Invoices are scoped through the order relationship. A customer can never see another customer's invoices.
- **Relationships:** In REST responses, relationships (`order`, `items`) are represented as IRIs (e.g. `/api/shop/customer-orders/1`).
- **Response format:** The collection endpoint returns all matching invoices as a flat JSON array.

## Related Resources

- [Get Single Customer Invoice](/api/rest-api/shop/customer-invoices/get-customer-invoice)
- [Download Invoice PDF](/api/rest-api/shop/customer-invoices/download-customer-invoice-pdf)
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders)
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
