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
      HTTP/1.1 200 OK

      [
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
      ]
    commonErrors:
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: Empty array
        cause: The customer has no invoiced orders yet
        solution: An order is invoiced by the store, not by the shopper — there is nothing to fix client-side

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

A bare JSON array of invoices. There is no wrapper object and no pagination metadata — the endpoint returns every invoice of the customer's orders.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Invoice ID. Use it on [Get Invoice](/api/rest-api/shop/customer-invoices/get-customer-invoice) and the PDF route. |
| `incrementId` | string | Invoice number shown to the customer. |
| `state` | string | Invoice state — see below. |
| `emailSent` | boolean | Whether the invoice email has gone out. |
| `totalQty` | integer | Units covered by this invoice. |
| `orderCurrencyCode` | string | Currency the order was placed in. |
| `subTotal` / `baseSubTotal` / `subTotalInclTax` / `baseSubTotalInclTax` | float | Line total, before and including tax, in order and base currency. |
| `grandTotal` / `baseGrandTotal` | float | Invoice total. |
| `shippingAmount` / `baseShippingAmount` / `shippingAmountInclTax` / `baseShippingAmountInclTax` | float | Shipping charged on this invoice. |
| `taxAmount` / `baseTaxAmount` / `shippingTaxAmount` / `baseShippingTaxAmount` | float | Tax charged. |
| `discountAmount` / `baseDiscountAmount` | float | Discount applied. |
| `reminders` | integer | Payment reminders sent so far. |
| `downloadUrl` | string | Absolute URL of the PDF — the same route as [Download Invoice PDF](/api/rest-api/shop/customer-invoices/download-customer-invoice-pdf). It still requires the storefront key and the customer token, so it cannot be used as a plain link. |
| `items` | array | References to the invoice lines. |
| `addresses` | array | References to the order's billing and shipping addresses. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

The invoiced line items are available from the parent order's own `items` block on [Get Customer Order](/api/rest-api/shop/customer-orders/get-customer-order), and on the invoice PDF. Over GraphQL the `customerInvoices` query returns them as selectable nested objects.

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `order_id` | integer | Return only the invoices raised against that order. `orderId` is accepted as an alias. |
| `state` | string | Return only invoices in that state. |

Both narrow the same list; supplying neither returns every invoice the customer has.

## Invoice State Values

| State | Description |
|-------|-------------|
| `pending` | Invoice raised, payment not yet recorded. |
| `pending_payment` | Awaiting an offline payment such as a bank transfer. |
| `paid` | Payment recorded in full. |
| `overdue` | Past the store's payment-terms window. Usually shown as a derived countdown rather than a stored value. |

## Empty Collection

A customer with no invoiced orders gets `200` with `[]`. An order is only invoiced when the store raises the invoice, so a recently placed order legitimately has none.

## Use Cases

- **Billing history in the account area** — one call returns every invoice; there is no pagination to walk.
- **"Pay now" prompt** — filter on `state` of `pending` or `pending_payment` client-side; the endpoint does the filtering only through the documented `?state=` parameter.
- **Download link** — use `downloadUrl` as the request URL, not as an anchor `href`; the PDF route needs both auth headers.

## Best Practices

- **Read the line items from the parent order** — [Get Customer Order](/api/rest-api/shop/customer-orders/get-customer-order) carries them in full, along with the addresses captured at checkout.
- **Present `incrementId`, not `id`** — the increment ID is what appears on the invoice document.
- **Compare against the order's `grandTotalInvoiced`** — an order can carry several partial invoices, so a single invoice total is not the amount owed for the order.

## Related Resources

- [Get Single Customer Invoice](/api/rest-api/shop/customer-invoices/get-customer-invoice) — one invoice by id
- [Download Invoice PDF](/api/rest-api/shop/customer-invoices/download-customer-invoice-pdf) — the invoice as a PDF stream
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) — the customer's order history
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
