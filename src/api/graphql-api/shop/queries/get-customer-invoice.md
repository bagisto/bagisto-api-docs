---
outline: false
examples:
  - id: get-customer-invoice-basic
    title: Get Single Customer Invoice
    description: Retrieve details of a specific invoice by its IRI identifier.
    query: |
      query GetCustomerInvoice {
        customerInvoice(id: "/api/shop/customer-invoices/1") {
          incrementId
          state
          totalQty
          grandTotal
          baseGrandTotal
          subTotal
          baseSubTotal
          shippingAmount
          baseShippingAmount
          taxAmount
          baseTaxAmount
          discountAmount
          baseDiscountAmount
          shippingTaxAmount
          subTotalInclTax
          shippingAmountInclTax
          baseCurrencyCode
          channelCurrencyCode
          orderCurrencyCode
          transactionId
          emailSent
          reminders
          createdAt
          updatedAt
          downloadUrl
          items {
            edges {
              node {
                id
                sku
                name
                qty
                price
                total
              }
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerInvoice": {
            "incrementId": "INV-001",
            "state": "paid",
            "totalQty": 2,
            "grandTotal": 110.00,
            "baseGrandTotal": 110.00,
            "subTotal": 100.00,
            "baseSubTotal": 100.00,
            "shippingAmount": 5.00,
            "baseShippingAmount": 5.00,
            "taxAmount": 5.00,
            "baseTaxAmount": 5.00,
            "discountAmount": 0.00,
            "baseDiscountAmount": 0.00,
            "shippingTaxAmount": 0.00,
            "subTotalInclTax": 105.00,
            "shippingAmountInclTax": 5.00,
            "baseCurrencyCode": "USD",
            "channelCurrencyCode": "USD",
            "orderCurrencyCode": "USD",
            "transactionId": "TXN-12345",
            "emailSent": true,
            "reminders": 0,
            "createdAt": "2025-02-10T10:30:00+00:00",
            "updatedAt": "2025-02-10T10:30:00+00:00",
            "downloadUrl": "http://localhost:8000/api/shop/customer-invoices/1/pdf",
            "items": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/invoice-items/1",
                    "sku": "PROD-001",
                    "name": "Sample Product",
                    "qty": 2,
                    "price": 50.00,
                    "total": 100.00
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: Invoice with specified ID does not exist or does not belong to the customer
        solution: Verify the invoice ID and ensure it belongs to the authenticated customer's orders
      - error: MISSING_ID
        cause: Invoice ID not provided
        solution: Provide a valid invoice IRI identifier

---

# Get Customer Invoice

## About

The `customerInvoice` query retrieves detailed information for a specific invoice by its IRI identifier. Customers can only access invoices from their own orders — requesting another customer's invoice returns a not found error, preventing enumeration attacks. Use this query to:

- Display detailed invoice information
- Show invoice summary with line items and totals
- Track payment state and transaction details
- View tax, shipping, and discount breakdowns
- Display financial details for a specific invoice

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
| `id` | `ID!` | ✅ Yes | The IRI identifier of the customer invoice (e.g. `/api/shop/customer-invoices/1`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `_id` | `Int!` | Numeric invoice ID. |
| `incrementId` | `String!` | Human-readable invoice number (e.g. `INV-001`). |
| `state` | `String!` | Invoice state: `pending`, `pending_payment`, `paid`, `overdue`, `refunded`. |
| `totalQty` | `Int!` | Total quantity of items in the invoice. |
| `emailSent` | `Boolean` | Whether the invoice email was sent. |
| `grandTotal` | `Float!` | Grand total. |
| `baseGrandTotal` | `Float!` | Base grand total. |
| `subTotal` | `Float!` | Sub total. |
| `baseSubTotal` | `Float!` | Base sub total. |
| `shippingAmount` | `Float` | Shipping amount. |
| `baseShippingAmount` | `Float` | Base shipping amount. |
| `taxAmount` | `Float` | Tax amount. |
| `baseTaxAmount` | `Float` | Base tax amount. |
| `discountAmount` | `Float` | Discount amount. |
| `baseDiscountAmount` | `Float` | Base discount amount. |
| `shippingTaxAmount` | `Float` | Shipping tax amount. |
| `baseShippingTaxAmount` | `Float` | Base shipping tax amount. |
| `subTotalInclTax` | `Float` | Sub total including tax. |
| `baseSubTotalInclTax` | `Float` | Base sub total including tax. |
| `shippingAmountInclTax` | `Float` | Shipping amount including tax. |
| `baseShippingAmountInclTax` | `Float` | Base shipping amount including tax. |
| `baseCurrencyCode` | `String!` | Base currency code (e.g. `USD`). |
| `channelCurrencyCode` | `String` | Channel currency code. |
| `orderCurrencyCode` | `String!` | Order currency code. |
| `transactionId` | `String` | Payment transaction ID. |
| `reminders` | `Int` | Number of reminders sent. |
| `nextReminderAt` | `DateTime` | Next reminder scheduled date. |
| `createdAt` | `DateTime!` | Invoice creation timestamp. |
| `updatedAt` | `DateTime!` | Invoice last update timestamp. |
| `downloadUrl` | `String` | URL to download the invoice as PDF. |

## Error Handling

### Invoice Not Found

```json
{
  "errors": [
    {
      "message": "Customer invoice with ID \"999\" not found.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerInvoice"]
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
      "path": ["customerInvoice"]
    }
  ]
}
```

## Use Cases

- Display detailed invoice page in customer account
- Show full financial breakdown of an invoice
- Track payment state and transaction ID
- View tax and shipping details
- Check if invoice email was sent

## Notes

- **Customer isolation:** Invoices are scoped through the order relationship. A customer can only access invoices from their own orders.
- **Read-only:** Only query operations are available. Invoices cannot be modified through this API.

## Related Resources

- [Get All Customer Invoices](/api/graphql-api/shop/queries/get-customer-invoices) — Query all customer invoices
- [Get Customer Orders](/api/graphql-api/shop/queries/get-customer-orders) — Query customer orders
- [Get Customer Profile](/api/graphql-api/shop/queries/get-customer-profile) — Query customer profile
