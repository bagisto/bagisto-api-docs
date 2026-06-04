---
outline: false
apiType: rest
examples:
  - id: admin-print-invoice
    title: Print Invoice (PDF)
    description: Downloads the invoice as an `application/pdf` binary attachment — the same PDF the admin panel produces.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices/585/print" \
        -H "Authorization: Bearer <token>" \
        --output invoice-585.pdf
    variables: |
      {}
    response: |
      HTTP/1.1 200 OK
      Content-Type: application/pdf
      Content-Disposition: attachment; filename="invoice-585.pdf"

      <binary PDF data>
    commonErrors:
      - error: Not Found (404)
        cause: Unknown invoice ID
        solution: Verify the invoice ID
      - error: PDF generation failed (500)
        cause: The PDF could not be rendered
        solution: Retry; the underlying error message is returned in `detail`
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token in the Authorization header. See the Authentication page.
---

# Print Invoice (PDF)

Returns the invoice as an `application/pdf` binary attachment — the same PDF the
admin panel produces. Requires the `sales.invoices.view` permission.

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
