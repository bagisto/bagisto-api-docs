---
outline: false
examples:
  - id: get-customer-orders
    title: Get Customer Orders
    description: Retrieve the authenticated customer's orders, newest first.
    request: |
      GET /api/shop/customer-orders
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 384,
          "incrementId": "383",
          "status": "pending",
          "channelName": "Default",
          "customerEmail": "john.doe@example.com",
          "customerFirstName": "John",
          "customerLastName": "Doe",
          "shippingMethod": "flatrate_flatrate",
          "shippingTitle": "Flat Rate - Flat Rate",
          "couponCode": null,
          "totalItemCount": 1,
          "totalQtyOrdered": 1,
          "grandTotal": 65.99,
          "baseGrandTotal": 65.99,
          "subTotal": 55.99,
          "baseSubTotal": 55.99,
          "taxAmount": 0,
          "shippingAmount": 10,
          "discountAmount": 0,
          "baseCurrencyCode": "USD",
          "orderCurrencyCode": "USD",
          "createdAt": "2026-07-21T18:01:34+05:30",
          "updatedAt": "2026-07-21T18:01:34+05:30"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: The request carried no customer Bearer token, or the token has been revoked
        solution: Log in and send the returned token as Authorization Bearer
      - error: Empty array
        cause: The customer has placed no orders, or the status filter matched nothing
        solution: Drop the status filter, or check the value against the status list on this page

  - id: get-customer-orders-status
    title: Filter by Status
    description: Return only the orders in one status. Status is the single filter this endpoint accepts.
    request: |
      GET /api/shop/customer-orders?status=processing
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 362,
          "incrementId": "361",
          "status": "processing",
          "channelName": "Default",
          "customerEmail": "john.doe@example.com",
          "customerFirstName": "John",
          "customerLastName": "Doe",
          "shippingMethod": "free_free",
          "shippingTitle": "Free Shipping - Free Shipping",
          "couponCode": null,
          "totalItemCount": 2,
          "totalQtyOrdered": 3,
          "grandTotal": 149.5,
          "baseGrandTotal": 149.5,
          "subTotal": 149.5,
          "baseSubTotal": 149.5,
          "taxAmount": 0,
          "shippingAmount": 0,
          "discountAmount": 0,
          "baseCurrencyCode": "USD",
          "orderCurrencyCode": "USD",
          "createdAt": "2026-07-14T11:22:07+05:30",
          "updatedAt": "2026-07-16T09:05:41+05:30"
        }
      ]
    commonErrors:
      - error: Empty array
        cause: No order of the customer is in that status
        solution: Query without the filter to see which statuses the customer's orders actually carry

---

# Get Customer Orders

Return the order history of the authenticated customer.

## Endpoint

```
GET /api/shop/customer-orders
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token of the logged-in customer |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Return only orders in this status. Matched exactly against the stored value. |

Orders come back newest first, ten per response, and that page size is fixed — `page`, `per_page`, `limit`, and `sort` are accepted by the URL but have no effect on the result. Walk a longer history over GraphQL, where the same data is a cursor connection driven by `first` and `after`.

## Response

The response is a bare JSON array of orders. There is no wrapper object, no `data` key, and no pagination metadata block.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Order ID. Use it on [Get Order Details](/api/rest-api/shop/customer-orders/get-customer-order). |
| `incrementId` | string | Human-facing order number shown to the customer. |
| `status` | string | Current order status — see the list below. |
| `channelName` | string | Sales channel the order was placed on. |
| `customerEmail` | string | Email captured on the order. |
| `customerFirstName` / `customerLastName` | string | Name captured on the order. |
| `shippingMethod` | string | Method code, e.g. `flatrate_flatrate`. |
| `shippingTitle` | string | Human-readable method label. |
| `couponCode` | string | Coupon applied at checkout, `null` when none was used. |
| `totalItemCount` | integer | Number of distinct line items. |
| `totalQtyOrdered` | integer | Sum of the quantities across those lines. |
| `grandTotal` / `baseGrandTotal` | decimal | Order total in the order currency and in the store's base currency. |
| `subTotal` / `baseSubTotal` | decimal | Line-item total before tax, shipping, and discount. |
| `taxAmount` | decimal | Tax charged. |
| `shippingAmount` | decimal | Shipping charged. |
| `discountAmount` | decimal | Discount applied. |
| `orderCurrencyCode` / `baseCurrencyCode` | string | Currency the order was placed in, and the store's base currency. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

Amounts are raw numbers, not formatted strings — apply the currency symbol from `orderCurrencyCode` on the client.

## Order Status Values

| Status | Meaning |
|--------|---------|
| `pending` | Placed, payment not yet confirmed. |
| `pending_payment` | Awaiting an offline payment such as a bank transfer. |
| `processing` | Payment confirmed, order being prepared. |
| `completed` | Fully invoiced and shipped. |
| `canceled` | Canceled before fulfilment. |
| `closed` | Fully refunded. |
| `fraud` | Flagged by the store as fraudulent. |

## Use Cases

- **Account order history** — call the endpoint with no parameters and render the array; the newest order is already first, so no client-side sort is needed.
- **"Open orders" tab** — a status filter is one value only, so an open-orders view needs one call per status (`?status=pending`, `?status=processing`) merged on the client.
- **Reorder shortcut** — `id` from a row addresses [Get Order Details](/api/rest-api/shop/customer-orders/get-customer-order), which carries the line items needed to rebuild a cart.

## Best Practices

- **Read `incrementId`, not `id`, in the UI** — `id` is the internal row identifier and does not match the number on the customer's confirmation email.
- **Expect exactly ten rows** — the endpoint neither paginates nor reports a total, so an account page needing the full history should use the GraphQL `customerOrders` connection.
- **Compare `grandTotal` against `baseGrandTotal` before displaying** — they diverge whenever the order was placed in a non-base currency, and only `grandTotal` matches what the customer paid.
- **Treat an empty array as "no orders", not an error** — a customer with no purchases and an unmatched status filter both return `200` with `[]`.

## Related Resources

- [Get Order Details](/api/rest-api/shop/customer-orders/get-customer-order) — one order with its lines, addresses, and payment
- [Place Order](/api/rest-api/shop/checkout/place-order) — turn the prepared cart into an order
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
