---
outline: false
apiType: rest
examples:
  - id: admin-get-invoice
    title: Get Invoice
    description: Fetch a single invoice with totals and embedded line items.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices/88" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
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
      - error: Not Found (404)
        cause: Unknown invoice ID
        solution: Verify the invoice ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Get Invoice

Returns a single invoice with totals and embedded line items (no follow-up
calls required).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices/{id}` | GET |
