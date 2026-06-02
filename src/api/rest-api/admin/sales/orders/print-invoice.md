---
outline: false
apiType: rest
examples:
  - id: admin-print-invoice
    title: Print Invoice (PDF)
    description: Downloads the invoice as an `application/pdf` binary attachment. Generated with dompdf using the same blade view (`admin::sales.invoices.pdf`) the monolith uses.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices/88/print" \
        -H "Authorization: Bearer <token>" \
        --output invoice-88.pdf
    variables: |
      {}
    response: |
      HTTP/1.1 200 OK
      Content-Type: application/pdf
      Content-Disposition: attachment; filename="invoice-88.pdf"

      <binary PDF data>
    commonErrors:
      - error: Not Found (404)
        cause: Unknown invoice ID
        solution: Verify the invoice ID
      - error: PDF generation failed (500)
        cause: dompdf could not render the view (missing fonts, image-loading failure, etc.)
        solution: Check storage permissions and the dompdf install; the underlying exception message is returned in `detail`
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Print Invoice (PDF)

Returns the invoice as an `application/pdf` binary attachment. The PDF is
rendered server-side with dompdf (via the `barryvdh/laravel-dompdf` package),
using the same blade view (`admin::sales.invoices.pdf`) the monolith
`InvoiceController::printInvoice` uses — so the output matches the admin panel
exactly.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices/{id}/print` | GET |

## Response headers

```
Content-Type: application/pdf
Content-Disposition: attachment; filename="invoice-{id}.pdf"
```

> The body is a raw PDF — do not JSON-decode it.

## GraphQL

There is no GraphQL counterpart for this endpoint — GraphQL transports cannot
return a binary PDF stream. Use this REST endpoint when you need the PDF.
