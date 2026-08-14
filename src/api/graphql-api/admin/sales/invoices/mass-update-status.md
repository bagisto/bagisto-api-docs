---
outline: false
examples:
  - id: admin-invoices-mass-update-status-gql
    title: Mass Update Invoice Status
    description: Bulk-set the status of several invoices at once. A manual status override — it does not capture or reverse a payment.
    query: |
      mutation MassUpdateInvoiceStatus($input: createAdminInvoiceMassUpdateStatusInput!) {
        createAdminInvoiceMassUpdateStatus(input: $input) {
          adminInvoiceMassUpdateStatus {
            updated
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [560, 561],
          "value": "paid"
        }
      }
    response: |
      {
        "data": {
          "createAdminInvoiceMassUpdateStatus": {
            "adminInvoiceMassUpdateStatus": {
              "updated": [560, 561],
              "message": "Invoice status updated successfully."
            }
          }
        }
      }
---

# Mass Update Invoice Status

GraphQL counterpart of `POST /api/admin/invoices/mass-update-status`. Bulk-sets the status of a batch of invoices — the operation behind the admin Invoices datagrid's "Update Status" bulk action. Requires the `sales.invoices.view` permission.

### This is a manual status override

Setting an invoice to `paid` here **does not capture a payment**, and setting it to `pending` / `overdue` does **not** reverse one. It only changes the stored status flag.

## Operation

| Operation | Type |
|-----------|------|
| `createAdminInvoiceMassUpdateStatus(input)` | Mutation |

## Input

| Field | Type | Description |
|-------|------|-------------|
| `indices` | `[Int!]!` | Ids of the invoices to update. Must be non-empty. |
| `value` | `String!` | New status — one of `pending`, `paid`, `overdue`. |

## Payload

`message` is the field to read for confirmation. The `updated` ids are also returned; over GraphQL this list is wrapped in a paginated envelope, so the **REST** response is the canonical place to read the flat `updated` array. Empty `indices` or an out-of-range `value` returns an error in `errors[]`.
