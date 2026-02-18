---
outline: false
examples:
  - id: get-customer-invoice
    title: Get Single Customer Invoice
    description: Retrieve details of a specific customer invoice by ID.
    request: |
      GET /api/shop/customer-invoices/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
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
        "items": ["/api/shop/invoice-items/1", "/api/shop/invoice-items/2"],
        "createdAt": "2025-02-10T10:30:00.000000Z",
        "updatedAt": "2025-02-10T10:30:00.000000Z"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Invoice with specified ID does not exist or does not belong to the customer
        solution: Verify the invoice ID and ensure it belongs to the authenticated customer's orders
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

---

# Get Customer Invoice

Retrieve detailed information for a specific customer invoice by its ID. Customers can only access invoices from their own orders — requesting another customer's invoice returns a 404, preventing enumeration attacks.

## Endpoint

```
GET /api/shop/customer-invoices/{id}
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
| `id` | integer | Yes | Customer invoice ID |

## Response Fields (200 OK)

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

## Error Responses

**Not Found (404):**
```json
{
  "message": "Customer invoice with ID \"999\" not found."
}
```

**Unauthenticated (401):**
```json
{
  "message": "Customer is not logged in."
}
```

**Accessing Another Customer's Invoice (404):**

Requesting an invoice that belongs to a different customer's order returns the same 404 response, preventing enumeration attacks:

```json
{
  "message": "Customer invoice with ID \"5\" not found."
}
```

## Use Cases

- Display detailed invoice page in customer account
- Show full financial breakdown of an invoice
- Track payment state and transaction ID
- View tax, shipping, and discount details
- Check if invoice email was sent

## Related Resources

- [Get All Customer Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices)
- [Download Invoice PDF](/api/rest-api/shop/customer-invoices/download-customer-invoice-pdf)
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders)
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile)
