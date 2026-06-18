---
outline: false
apiType: rest
examples:
  - id: admin-create-invoice
    title: Create Invoice
    description: Create an invoice for one or more order items. Quantity is validated against `qty_to_invoice`, and a per-SKU error is returned when the requested quantity exceeds what remains.
    query: |
      curl -X POST "https://your-domain.com/api/admin/orders/2392/invoices" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "items": [
            { "orderItemId": 42, "quantity": 3 },
            { "orderItemId": 43, "quantity": 1 }
          ],
          "can_create_transaction": true
        }'
    variables: |
      {
        "items": [
          { "orderItemId": 42, "quantity": 3 },
          { "orderItemId": 43, "quantity": 1 }
        ],
        "can_create_transaction": true
      }
    response: |
      {
        "id": 88,
        "incrementId": "100000088",
        "orderId": 2392,
        "state": "paid",
        "emailSent": false,
        "totalQty": 4,
        "orderCurrencyCode": "USD",
        "subTotal": 119.96,
        "formattedSubTotal": "$119.96",
        "grandTotal": 129.96,
        "formattedGrandTotal": "$129.96",
        "taxAmount": 10.0,
        "formattedTaxAmount": "$10.00",
        "discountAmount": 0.0,
        "formattedDiscountAmount": "$0.00",
        "shippingAmount": 0.0,
        "formattedShippingAmount": "$0.00",
        "transactionId": null,
        "createdAt": "2026-05-21 10:32:01",
        "updatedAt": "2026-05-21 10:32:01",
        "items": [
          {
            "id": 901,
            "orderItemId": 42,
            "sku": "WS-12-S",
            "name": "Argus All-Weather Tank-S",
            "qty": 3,
            "price": 29.99,
            "formattedPrice": "$29.99",
            "total": 89.97,
            "formattedTotal": "$89.97"
          }
        ]
      }
    commonErrors:
      - error: Closed (422)
        cause: Order is already closed
        solution: Closed orders cannot be invoiced
      - error: Fraud (422)
        cause: Order is flagged as fraud
        solution: Resolve the fraud flag before invoicing
      - error: PayPal Standard (422)
        cause: Order was paid through PayPal Standard
        solution: Invoices cannot be created via admin for PayPal Standard orders
      - error: Nothing to invoice (422)
        cause: Every item has already been fully invoiced
        solution: No further invoice can be created
      - error: No permission (422)
        cause: Admin role lacks `sales.invoices.create`
        solution: Grant the role the `sales.invoices.create` permission
      - error: Items required (422)
        cause: '`items` array missing, empty, or every quantity is zero'

        solution: Provide at least one `{ orderItemId, quantity > 0 }` entry
      - error: Quantity exceeds (422)
        cause: Requested quantity for an SKU is greater than `qty_to_invoice`
        solution: Lower the quantity to at most `qty_to_invoice`
      - error: Not Found (404)
        cause: Unknown order ID
        solution: Verify the order ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Create Invoice

Creates an invoice for one or more order items. The same eligibility checks as
the admin Invoice screen apply (the order must not be closed, marked fraud, or
paid through PayPal Standard). Each item's requested quantity is validated
against its still-invoiceable quantity, `qty_to_invoice` (rejected per-SKU with
a message carrying the requested vs available quantity) before the invoice is
created.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/{orderId}/invoices` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `items` | array of `{ orderItemId, quantity }` | yes | At least one entry with `quantity > 0`. Each `quantity` must be ≤ that item's `qty_to_invoice`. |
| `can_create_transaction` | boolean | no | Default `false`. The admin **Create Transaction** checkbox — when `true`, also records an order transaction for the invoice amount against the order's payment method. |

## Errors

| HTTP | Message |
|------|---------|
| 422  | Closed orders cannot be invoiced. |
| 422  | Fraud orders cannot be invoiced. |
| 422  | Invoices cannot be created for orders paid through PayPal Standard. |
| 422  | There is nothing to invoice on this order. |
| 422  | You do not have permission to create invoices. |
| 422  | At least one item with a positive quantity is required. |
| 422  | Requested quantity exceeds the available quantity for the given SKU (the message names the SKU and both quantities). |
| 422  | Could not create the invoice. |

### Sample 422 response

```json
{
    "type": "/errors/422",
    "title": "Bad Request",
    "status": 422,
    "detail": "Requested quantity (5) exceeds available quantity (3) for SKU WS-12-S."
}
```
