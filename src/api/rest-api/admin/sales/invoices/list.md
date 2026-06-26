---
outline: false
apiType: rest
examples:
  - id: admin-invoices-list
    title: List Invoices (Datagrid)
    description: Paginated invoices listing. Every invoice column is populated on each row. Returns a `{ data, meta }` envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices?per_page=10&state=paid" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "data": [
          {
            "id": 560,
            "incrementId": "560",
            "order": { "id": 2392 },
            "orderIncrementId": "2392",
            "state": "paid",
            "emailSent": true,
            "totalQty": 1,

            "orderCurrencyCode": "USD",
            "baseCurrencyCode": "USD",
            "channelCurrencyCode": "USD",

            "subTotal": 4000,
            "formattedSubTotal": "$4,000.00",
            "baseSubTotal": 4000,
            "formattedBaseSubTotal": "$4,000.00",
            "subTotalInclTax": 4000,
            "formattedSubTotalInclTax": "$4,000.00",
            "baseSubTotalInclTax": 4000,
            "formattedBaseSubTotalInclTax": "$4,000.00",

            "grandTotal": 4000,
            "formattedGrandTotal": "$4,000.00",
            "baseGrandTotal": 4000,
            "formattedBaseGrandTotal": "$4,000.00",

            "taxAmount": 0,
            "formattedTaxAmount": "$0.00",
            "baseTaxAmount": 0,
            "formattedBaseTaxAmount": "$0.00",

            "discountAmount": 0,
            "formattedDiscountAmount": "$0.00",
            "baseDiscountAmount": 0,
            "formattedBaseDiscountAmount": "$0.00",

            "shippingAmount": 0,
            "formattedShippingAmount": "$0.00",
            "baseShippingAmount": 0,
            "formattedBaseShippingAmount": "$0.00",
            "shippingAmountInclTax": 0,
            "formattedShippingAmountInclTax": "$0.00",
            "baseShippingAmountInclTax": 0,
            "formattedBaseShippingAmountInclTax": "$0.00",
            "shippingTaxAmount": 0,
            "formattedShippingTaxAmount": "$0.00",
            "baseShippingTaxAmount": 0,
            "formattedBaseShippingTaxAmount": "$0.00",

            "transactionId": null,
            "reminders": 0,
            "nextReminderAt": null,
            "createdAt": "2026-05-19 13:13:30",
            "updatedAt": "2026-05-29 13:30:32",

            "orderStatus": "processing",
            "orderStatusLabel": "Processing",
            "orderDate": "2026-05-19 13:13:29",
            "channelName": "bagisto store",
            "customerName": "John Doe",
            "customerEmail": "john.doe@example.com",

            "billingAddress": {
              "id": 268,
              "addressType": "order_billing",
              "firstName": "John",
              "lastName": "Doe",
              "companyName": "Acme Trades",
              "address": "21 Market Street",
              "city": "Los Angeles",
              "state": "CA",
              "country": "US",
              "postcode": "90001",
              "email": "john.doe@example.com",
              "phone": "5551234567"
            },
            "shippingAddress": {
              "id": 267,
              "addressType": "order_shipping",
              "firstName": "John",
              "lastName": "Doe",
              "companyName": "Acme Trades",
              "address": "21 Market Street",
              "city": "Los Angeles",
              "state": "CA",
              "country": "US",
              "postcode": "90001",
              "email": "john.doe@example.com",
              "phone": "5551234567"
            },

            "items": []
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 57, "total": 562, "from": 1, "to": 10 }
      }
---

# List Invoices

Listing of every invoice across all orders, matching the admin Invoices grid. Every invoice **field** plus the `billingAddress` / `shippingAddress` objects are populated on each row — only the line `items` are left empty on the listing. Requires the `sales.invoices.view` permission.

::: tip How this menu works
For the invoice `state` semantics, why a paid order can read "pending", the red payment-due countdown, and the print / send-duplicate / mass-status actions, see the [Invoices overview](/api/rest-api/admin/sales/invoices/).
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (1-based). |
| `per_page` | integer | Items per page (default `10`, cap `50`). |
| `id` | string | Filter by invoice id (integer or comma-separated list). |
| `order_id` | string | Partial match on the parent order number. |
| `state` | string | `pending`, `pending_payment`, `paid`, `overdue`. |
| `base_grand_total_from` | number | Min grand total. |
| `base_grand_total_to` | number | Max grand total. |
| `created_at_from` | date | Created after (ISO date). |
| `created_at_to` | date | Created before (ISO date). |
| `sort` | string | `id` (default desc), `increment_id`, `order_id`, `base_grand_total`, `state`, `created_at`. |
| `order` | string | `asc` or `desc`. |

## Row shape

Each row carries the full invoice column set, order/customer context, and the billing & shipping addresses. The field reference is identical to [Get Invoice](/api/rest-api/admin/sales/orders/get-invoice) — the only difference is that the line `items` are empty (`[]`) on the listing.

| Group | Fields |
|-------|--------|
| Identity | `id`, `incrementId`, `order` (`{ id }`), `orderIncrementId`, `state`, `emailSent`, `totalQty` |
| Currency codes | `orderCurrencyCode`, `baseCurrencyCode`, `channelCurrencyCode` |
| Totals | `subTotal*`, `grandTotal*`, `taxAmount*`, `discountAmount*`, `shippingAmount*` — each in order + base currency, with `formatted*` and incl-tax variants |
| Status & timestamps | `transactionId`, `reminders`, `nextReminderAt`, `createdAt`, `updatedAt` |
| Order & customer | `orderStatus`, `orderStatusLabel`, `orderDate`, `channelName`, `customerName`, `customerEmail` |
| Addresses | `billingAddress`, `shippingAddress` (objects) |
| Line items (empty on listing) | `items` (`[]`) |

::: warning A `null` here means the DB is genuinely empty
Listing rows return the actual stored value for every column. A `null` (e.g. `transactionId`, `customerName`, `baseCurrencyCode`) means that row has no value stored for it — not that the listing is withholding data. Only the line `items` are deliberately omitted on the listing.
:::

::: info
For invoice **detail** + **PDF** + **create**, see the per-order endpoints
under [Orders](/api/rest-api/admin/sales/orders/get-invoice).
:::
