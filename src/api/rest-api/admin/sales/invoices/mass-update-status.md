---
outline: false
apiType: rest
examples:
  - id: admin-invoices-mass-update-status
    title: Mass Update Invoice Status
    description: Bulk-set the status of several invoices at once. A manual status override — it does not capture or reverse a payment.
    query: |
      curl -X POST "https://your-domain.com/api/admin/invoices/mass-update-status" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{
          "indices": [560, 561],
          "value": "paid"
        }'
    response: |
      {
        "updated": [560, 561],
        "message": "Invoice status updated successfully."
      }
    commonErrors:
      - error: Unprocessable Entity (422)
        cause: Empty indices, or value not one of pending/paid/overdue
        solution: Send a non-empty indices array and a value of pending, paid, or overdue.
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token in the Authorization header. See the Authentication page.
      - error: Forbidden (403)
        cause: Admin role lacks the invoices permission
        solution: Use an admin whose role grants sales.invoices.view.
---

# Mass Update Invoice Status

Bulk-sets the status of a batch of invoices in one call — the API behind the admin Invoices datagrid's "Update Status" bulk action. Requires the `sales.invoices.view` permission.

::: warning This is a manual status override
Setting an invoice to `paid` here **does not capture a payment**, and setting it to `pending` / `overdue` does **not** reverse one. It only changes the stored status flag. Use it to correct or annotate invoice states — not as a payment operation.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices/mass-update-status` | POST |

## Request body

| Field | Type | Description |
|-------|------|-------------|
| `indices` | integer[] | Ids of the invoices to update. Must be non-empty. |
| `value` | string | New status — one of `pending`, `paid`, `overdue`. |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `updated` | integer[] | Ids that were updated. |
| `message` | string | Success message. |

Ids in `indices` that don't exist are silently skipped — `updated` lists only the ids that were actually changed.
