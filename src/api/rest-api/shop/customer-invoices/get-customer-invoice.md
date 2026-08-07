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
      HTTP/1.1 200 OK

      {
        "id": 5,
        "incrementId": "5",
        "state": "paid",
        "emailSent": true,
        "totalQty": 1,
        "orderCurrencyCode": "USD",
        "subTotal": 24.99,
        "baseSubTotal": 24.99,
        "grandTotal": 34.99,
        "baseGrandTotal": 34.99,
        "shippingAmount": 10,
        "baseShippingAmount": 10,
        "taxAmount": 0,
        "baseTaxAmount": 0,
        "discountAmount": 0,
        "baseDiscountAmount": 0,
        "shippingTaxAmount": 0,
        "baseShippingTaxAmount": 0,
        "subTotalInclTax": 24.99,
        "baseSubTotalInclTax": 24.99,
        "shippingAmountInclTax": 10,
        "baseShippingAmountInclTax": 10,
        "reminders": 0,
        "createdAt": "2026-07-21T17:58:29+05:30",
        "updatedAt": "2026-07-21T17:58:30+05:30",
        "downloadUrl": "https://yourstore.com/api/shop/customer-invoices/5/pdf",
        "items": [
          "/api/customer_invoice_items/11"
        ],
        "addresses": [
          "/api/customer_invoice_addresses/210",
          "/api/customer_invoice_addresses/211"
        ]
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

One invoice, flat. The field set is identical to a row of [Get Customer Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices) — there is no extra detail on this endpoint.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Invoice ID. |
| `incrementId` | string | Invoice number shown to the customer. |
| `state` | string | `pending`, `pending_payment`, `paid`, or `overdue`. |
| `emailSent` | boolean | Whether the invoice email has gone out. |
| `totalQty` | integer | Units covered by this invoice. |
| `orderCurrencyCode` | string | Currency the order was placed in. |
| `subTotal` / `baseSubTotal` / `subTotalInclTax` / `baseSubTotalInclTax` | float | Line total, before and including tax. |
| `grandTotal` / `baseGrandTotal` | float | Invoice total. |
| `shippingAmount` / `baseShippingAmount` / `shippingAmountInclTax` / `baseShippingAmountInclTax` | float | Shipping charged. |
| `taxAmount` / `baseTaxAmount` / `shippingTaxAmount` / `baseShippingTaxAmount` | float | Tax charged. |
| `discountAmount` / `baseDiscountAmount` | float | Discount applied. |
| `reminders` | integer | Payment reminders sent so far. |
| `downloadUrl` | string | Absolute URL of the PDF. It still requires both auth headers, so it is a request URL rather than a shareable link. |
| `items` / `addresses` | array | References to the invoice lines and the order's addresses. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

The invoiced line items are available from the parent order's `items` block on [Get Customer Order](/api/rest-api/shop/customer-orders/get-customer-order), and on the invoice PDF. Over GraphQL the `customerInvoice` query returns them as selectable nested objects.

## Error Responses

| Status | Body `detail` | Cause |
|--------|---------------|-------|
| `404` | `Customer invoice with ID "999999" not found` | No such invoice, **or** it belongs to another customer's order. The two cases are deliberately indistinguishable. |
| `403` | `Unauthenticated. Please login to perform this action` | No customer Bearer token was sent. |
| `401` | — | The storefront key header was missing or wrong. |

## Use Cases

- **Invoice detail screen** — read one invoice by the `id` carried in the list, and offer the PDF from `downloadUrl`.
- **Payment-status check** — re-read after an offline payment to see `state` move from `pending_payment` to `paid`.

## Best Practices

- **Fetch the list instead when showing several invoices** — this endpoint returns no more fields than a list row, so per-invoice calls add nothing.
- **Read the line items from the parent order** — the order detail carries them in full.
- **Treat `404` as "not yours or not there"** — the message quotes the requested ID and is not proof the invoice is missing store-wide.

## Related Resources

- [Get All Customer Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices) — every invoice raised against the customer's orders
- [Download Invoice PDF](/api/rest-api/shop/customer-invoices/download-customer-invoice-pdf) — the invoice as a PDF stream
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) — the customer's order history
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
