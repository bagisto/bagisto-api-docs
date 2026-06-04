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
```

The response is an `application/pdf` binary attachment — the same PDF the admin
panel produces.

See the [REST → Print Invoice](/api/rest-api/admin/sales/orders/print-invoice)
page for the full details.
