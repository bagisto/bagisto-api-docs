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
| `Content-Disposition` | `attachment; filename="invoice-{id}.pdf"` |

### PDF Contents

The PDF document includes:
- Store information and logo
- Billing and shipping addresses
- Invoice line items with SKU, quantity, price, and totals
- Financial summary (subtotal, tax, shipping, discount, grand total)
- Invoice number, order number, and date

### cURL Example

```bash
curl -X GET "http://localhost:8000/api/shop/customer-invoices/1/pdf" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -o invoice-001.pdf
```

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

## Notes

- **Separate route:** The `/pdf` endpoint is a separate route (not an API Platform operation).
- **Rendering engine:** Uses DomPDF for LTR locales and mPDF for RTL locales, supporting multilingual invoice rendering.
- **Customer isolation:** Customers can only download PDFs for invoices from their own orders.
- **Binary response:** The response body is a raw PDF binary stream, not JSON.

## Use Cases

- Allow customers to download invoice PDFs for their records
- Provide printable invoice documents
- Support accounting and tax filing workflows

## Related Resources

- [Get All Customer Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices)
- [Get Single Customer Invoice](/api/rest-api/shop/customer-invoices/get-customer-invoice)
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders)
