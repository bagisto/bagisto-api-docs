---
outline: false
apiType: rest
examples:
  - id: admin-send-duplicate-invoice
    title: Send Duplicate Invoice
    description: Emails a copy of the invoice. The recipient is the `email` you pass, or the order's customer email when omitted.
    query: |
      curl -X POST "https://your-domain.com/api/admin/invoices/585/send-duplicate" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{ "email": "customer@example.com" }'
    variables: |
      {
        "email": "customer@example.com"
      }
    response: |
      {
        "id": 585,
        "email": "customer@example.com",
        "success": true,
        "message": "Invoice email sent to customer@example.com."
      }
    commonErrors:
      - error: Unprocessable (422)
        cause: The recipient email is missing/invalid and the order has no customer email to fall back to
        solution: Pass a valid `email` in the request body
      - error: Not Found (404)
        cause: Unknown invoice ID
        solution: Verify the invoice ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token in the Authorization header. See the Authentication page.
---

# Send Duplicate Invoice

Emails a copy of the invoice. Requires the `sales.invoices.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices/{id}/send-duplicate` | POST |

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | String | No | Recipient address. Defaults to the order's customer email when omitted. Must be a valid email when provided. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Invoice id. |
| `email` | String | The address the invoice was sent to. |
| `success` | Boolean | Whether the email was queued. |
| `message` | String | Human-readable result message. |

**Recipient** — Whatever address you pass in `email` is the actual recipient. Leave it out to send to the order's customer.
