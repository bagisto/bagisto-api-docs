---
outline: false
---

# Print Invoice (PDF)

## Not exposed over GraphQL

GraphQL transports cannot return a binary PDF stream, so this action is **REST
only**. Use the REST endpoint to download the PDF:

```
GET /api/admin/invoices/{id}/print
Authorization: Bearer <admin-token>
X-Admin-Key: <admin-api-key>
```

The response is an `application/pdf` binary attachment, rendered server-side
with dompdf using the `admin::sales.invoices.pdf` blade view (the same view the
monolith `InvoiceController::printInvoice` uses).

See the [REST → Print Invoice](/api/rest-api/admin/sales/orders/print-invoice)
page for the full details.
