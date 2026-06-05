---
outline: false
examples:
  - id: admin-print-invoice-gql
    title: Print Invoice (PDF)
    description: Downloading the invoice PDF is a binary stream, which GraphQL cannot return — use the REST endpoint shown here. The example is the equivalent curl.
    query: |
      # Not available over GraphQL — GraphQL cannot return a binary PDF stream.
      # Download the PDF with the REST endpoint instead:

      curl -X GET "https://your-domain.com/api/admin/invoices/585/print" \
        -H "Authorization: Bearer <admin-token>" \
        -H "Accept: application/pdf" \
        --output invoice-585.pdf
    variables: |
      {}
    response: |
      # Binary response: an application/pdf attachment is written to invoice-585.pdf
      # (Content-Disposition: attachment; filename="invoice-585.pdf").
      # There is no JSON body.

---

# Print Invoice (PDF)

## Not exposed over GraphQL

GraphQL transports cannot return a binary PDF stream, so this action is **REST only**. Use the REST endpoint to download the PDF:

```
GET /api/admin/invoices/{id}/print
Authorization: Bearer <admin-token>
```

The response is an `application/pdf` binary attachment — the same PDF the admin panel produces. Requires the `sales.invoices.view` permission.

See the [REST → Print Invoice](/api/rest-api/admin/sales/orders/print-invoice) page for the full details.
