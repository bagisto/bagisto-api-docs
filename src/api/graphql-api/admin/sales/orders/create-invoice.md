---
outline: false
examples:
  - id: admin-create-invoice
    title: Create Invoice
    description: Create an invoice for one or more order items.
    query: |
      mutation CreateInvoice($input: createAdminInvoiceInput!) {
        createAdminInvoice(input: $input) {
          adminInvoice { id }
        }
      }
    variables: |
      {
        "input": {
          "orderId": 2392,
          "items": [
            { "orderItemId": 42, "quantity": 3 },
            { "orderItemId": 43, "quantity": 1 }
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminInvoice": {
            "adminInvoice": { "id": "/api/admin/invoices/88" }
          }
        }
      }
---

# Create Invoice

Creates an invoice for one or more order items. Mirrors the monolith
`InvoiceController::store` — runs the shared `AdminOrderActionGuard.assertCanInvoice`
checks (which includes a hard block for orders paid through PayPal Standard,
mirroring the monolith Create-Invoice blade), validates each item's requested
quantity against `qty_to_invoice`, then calls `InvoiceRepository::create`.

After the mutation, fetch the full invoice via `adminInvoice(id:)` or the
REST `GET /api/admin/invoices/{id}` endpoint to get the embedded items and
totals.

## Operation

| Operation | Type |
|-----------|------|
| `createAdminInvoice` | Mutation |

## Errors

| Condition | Lang key | Message |
|-----------|----------|---------|
| Order is `closed` | `bagistoapi::app.admin.order.actions.invoice.closed` | Closed orders cannot be invoiced. |
| Order is `fraud`  | `bagistoapi::app.admin.order.actions.invoice.fraud`  | Fraud orders cannot be invoiced. |
| Order paid with PayPal Standard | `bagistoapi::app.admin.order.actions.invoice.paypal-standard-blocked` | Invoices cannot be created for orders paid through PayPal Standard. |
| Nothing to invoice | `bagistoapi::app.admin.order.actions.invoice.nothing-to-invoice` | There is nothing to invoice on this order. |
| No permission | `bagistoapi::app.admin.order.actions.invoice.no-permission` | You do not have permission to create invoices. |
| Items missing | `bagistoapi::app.admin.order.actions.invoice.items-required` | At least one item with a positive quantity is required. |
| Qty exceeds available | `bagistoapi::app.admin.order.actions.invoice.qty-exceeds` | Requested quantity (`:requested`) exceeds available quantity (`:available`) for SKU `:sku`. |
| Repository failure | `bagistoapi::app.admin.order.actions.invoice.failed` | Could not create the invoice. |
