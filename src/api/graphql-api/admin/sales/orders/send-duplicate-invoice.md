---
outline: false
examples:
  - id: admin-send-duplicate-invoice-gql
    title: Send Duplicate Invoice
    description: Emails a copy of the invoice. The recipient is the email you pass, or the order's customer email when omitted.
    query: |
      mutation SendDuplicateInvoice($input: createAdminInvoiceSendDuplicateInput!) {
        createAdminInvoiceSendDuplicate(input: $input) {
          adminInvoiceSendDuplicate {
            id
            email
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "invoiceId": 585,
          "email": "customer@example.com"
        }
      }
    response: |
      {
        "data": {
          "createAdminInvoiceSendDuplicate": {
            "adminInvoiceSendDuplicate": {
              "id": "/api/admin/invoices/585",
              "email": "customer@example.com",
              "success": true,
              "message": "Invoice email sent to customer@example.com."
            }
          }
        }
      }
---

# Send Duplicate Invoice

GraphQL counterpart of `POST /api/admin/invoices/{id}/send-duplicate`. Emails a copy of the invoice. Requires the `sales.invoices.view` permission.

## Operation

| Operation | Type |
|-----------|------|
| `createAdminInvoiceSendDuplicate` | Mutation |

## Input (`createAdminInvoiceSendDuplicateInput`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `invoiceId` | `Int!` | Yes | Id of the invoice to send. |
| `email` | `String` | No | Recipient address. Defaults to the order's customer email when omitted. Must be a valid email when provided. |

## Payload fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Invoice IRI. |
| `email` | `String` | The address the invoice was sent to. |
| `success` | `Boolean` | Whether the email was queued. |
| `message` | `String` | Human-readable result message. |

**Recipient** — Whatever address you pass in `email` is the actual recipient. Leave it out to send to the order's customer.
