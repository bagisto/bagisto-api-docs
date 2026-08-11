---
outline: false
examples:
  - id: download-customer-invoice-pdf
    title: Download Invoice PDF
    description: Download an invoice as a PDF file.
    request: |
      GET /api/shop/customer-invoices/1/pdf
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      Binary PDF file
      Content-Type: application/pdf
      Content-Disposition: attachment; filename="invoice-1.pdf"
    commonErrors:
      - error: 404 Not Found
        cause: Invoice with specified ID does not exist or does not belong to the customer
        solution: Verify the invoice ID and ensure it belongs to the authenticated customer's orders
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

---

# Download Customer Invoice PDF

Download an invoice as a PDF file. The response is a binary PDF stream containing the full invoice document.

## Endpoint

```
GET /api/shop/customer-invoices/{id}/pdf
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Customer invoice ID |

## Response (200 OK)

The response is a binary PDF file with the following headers:

| Header | Value |
|--------|-------|
| `Content-Type` | `application/pdf` |
| `Content-Disposition` | `attachment; filename=invoice-{date}.pdf` — the invoice date, e.g. `invoice-21-07-2026.pdf`, not the invoice ID |

### PDF Contents

The PDF document includes:
- Store information and logo
- Billing and shipping addresses
- Invoice line items with SKU, quantity, price, and totals
- Financial summary (subtotal, tax, shipping, discount, grand total)
- Invoice number, order number, and date

### cURL Example

```bash
curl -X GET "https://api-demo.bagisto.com/api/shop/customer-invoices/1/pdf" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -o invoice-001.pdf
```

## Error Responses

| Status | Body `detail` | Cause |
|--------|---------------|-------|
| `404` | `Customer invoice with ID "999999" not found` | No such invoice, or it belongs to another customer's order. |
| `403` | `Unauthenticated. Please login to perform this action` | No customer Bearer token was sent. |
| `401` | — | The storefront key header was missing or wrong. |

An error answers with JSON even though the success path is binary, so branch on the status code before writing the body to a file.

## Use Cases

- **"Download invoice" button** — fetch with both auth headers and save the response body; the `downloadUrl` field on the invoice payload points at this same route.
- **Attach an invoice to an email or ticket** — the PDF is the only place the invoiced line items are available over REST.

## Best Practices

- **Do not put this URL in an anchor tag** — a browser navigation sends no `Authorization` or storefront-key header and the download fails with `403`. Fetch it in code and hand the blob to the user.
- **Take the filename from `Content-Disposition`** — it is built from the invoice date, so guessing `invoice-{id}.pdf` produces the wrong name.
- **Check the response content type first** — a failure returns JSON with the same `200`-style plumbing on the client, and saving it produces an unreadable "PDF".

## Related Resources

- [Get All Customer Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices) — every invoice raised against the customer's orders
- [Get Single Customer Invoice](/api/rest-api/shop/customer-invoices/get-customer-invoice) — one invoice by id
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) — the customer's order history
