---
outline: false
examples:
  - id: get-customer-order
    title: Get Single Customer Order
    description: Retrieve details of a specific customer order by ID.
    request: |
      GET /api/shop/customer-orders/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      {
        "id": 1,
        "incrementId": "1",
        "status": "pending",
        "channelName": "Default",
        "isGuest": false,
        "customerEmail": "john.doe@example.com",
        "customerFirstName": "John",
        "customerLastName": "Doe",
        "customerFullName": "John Doe",
        "shippingMethod": "flatrate_flatrate",
        "shippingTitle": "Flat Rate - Flat Rate",
        "shippingDescription": "Flat Rate Shipping",
        "couponCode": null,
        "isGift": false,
        "totalItemCount": 1,
        "totalQtyOrdered": 1,
        "baseCurrencyCode": "USD",
        "channelCurrencyCode": "USD",
        "orderCurrencyCode": "USD",
        "grandTotal": 65.99,
        "baseGrandTotal": 65.99,
        "grandTotalInvoiced": 0,
        "baseGrandTotalInvoiced": 0,
        "grandTotalRefunded": 0,
        "baseGrandTotalRefunded": 0,
        "subTotal": 55.99,
        "baseSubTotal": 55.99,
        "subTotalInvoiced": 0,
        "baseSubTotalInvoiced": 0,
        "subTotalRefunded": 0,
        "baseSubTotalRefunded": 0,
        "discountPercent": 0,
        "discountAmount": 0,
        "baseDiscountAmount": 0,
        "discountInvoiced": 0,
        "baseDiscountInvoiced": 0,
        "discountRefunded": 0,
        "baseDiscountRefunded": 0,
        "taxAmount": 0,
        "baseTaxAmount": 0,
        "taxAmountInvoiced": 0,
        "baseTaxAmountInvoiced": 0,
        "taxAmountRefunded": 0,
        "baseTaxAmountRefunded": 0,
        "shippingAmount": 10,
        "baseShippingAmount": 10,
        "shippingInvoiced": 0,
        "baseShippingInvoiced": 0,
        "shippingRefunded": 0,
        "baseShippingRefunded": 0,
        "shippingDiscountAmount": 0,
        "baseShippingDiscountAmount": 0,
        "shippingTaxAmount": 0,
        "baseShippingTaxAmount": 0,
        "shippingTaxRefunded": 0,
        "baseShippingTaxRefunded": 0,
        "subTotalInclTax": 55.99,
        "baseSubTotalInclTax": 55.99,
        "shippingAmountInclTax": 10,
        "baseShippingAmountInclTax": 10,
        "customerId": 122,
        "channelId": 1,
        "cartId": 1,
        "appliedCartRuleIds": "",
        "createdAt": "2026-07-21T18:01:34+05:30",
        "updatedAt": "2026-07-21T18:01:34+05:30",
        "items": [
          {
            "id": 279,
            "sku": "mj-coastal-hoodie",
            "type": "configurable",
            "name": "Coastal Breeze Men's Blue Zipper Hoodie",
            "productId": 59,
            "productType": "Webkul\\Product\\Models\\Product",
            "qtyOrdered": 1,
            "qtyShipped": 0,
            "qtyInvoiced": 0,
            "qtyCanceled": 0,
            "qtyRefunded": 0,
            "price": 55.99,
            "basePrice": 55.99,
            "total": 55.99,
            "baseTotal": 55.99,
            "discountPercent": 0,
            "discountAmount": 0,
            "taxPercent": 0,
            "taxAmount": 0,
            "priceInclTax": 55.99,
            "totalInclTax": 55.99
          }
        ],
        "addresses": [
          {
            "id": 220,
            "addressType": "order_shipping",
            "firstName": "John",
            "lastName": "Doe",
            "gender": null,
            "companyName": "",
            "address": "123 Main St",
            "city": "Los Angeles",
            "state": "CA",
            "country": "US",
            "postcode": "90001",
            "email": "john.doe@example.com",
            "phone": "2125551234",
            "vatId": null
          },
          {
            "id": 221,
            "addressType": "order_billing",
            "firstName": "John",
            "lastName": "Doe",
            "gender": null,
            "companyName": "",
            "address": "123 Main St",
            "city": "Los Angeles",
            "state": "CA",
            "country": "US",
            "postcode": "90001",
            "email": "john.doe@example.com",
            "phone": "2125551234",
            "vatId": null
          }
        ],
        "payment": {
          "id": 20,
          "method": "moneytransfer",
          "methodTitle": "Money Transfer"
        },
        "shipments": []
      }
    commonErrors:
      - error: 404 Not Found
        cause: No such order, or the order belongs to another customer — the two are indistinguishable
        solution: Verify the order ID and ensure it belongs to the authenticated customer
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

---

# Get Customer Order

Retrieve detailed information for a specific customer order by its ID. Customers can only access their own orders — requesting another customer's order returns a 404, preventing enumeration attacks.

## Endpoint

```
GET /api/shop/customer-orders/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Customer order ID |

## Response Fields (200 OK)

One order, flat, with four nested blocks at the end. There is no wrapper object.

### Identity and status

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Internal order ID — the value used in this path. |
| `incrementId` | string | Order number shown to the customer. |
| `status` | string | Order status — see [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) for the list. |
| `channelName` | string | Channel the order was placed on. |
| `isGuest` | integer | `1` when the order was placed without an account. |
| `isGift` | integer | `1` when the order was marked as a gift. |
| `customerId` / `channelId` / `cartId` | integer | Related record IDs. |
| `customerEmail` / `customerFirstName` / `customerLastName` / `customerFullName` | string | Contact details captured at checkout. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

### Shipping and discounts

| Field | Type | Description |
|-------|------|-------------|
| `shippingMethod` | string | Method code, e.g. `flatrate_flatrate`. |
| `shippingTitle` / `shippingDescription` | string | Human-readable method label and description. |
| `couponCode` | string | Coupon applied at checkout, `null` when none was used. |
| `appliedCartRuleIds` | string | Comma-separated IDs of the cart rules that fired. |
| `totalItemCount` / `totalQtyOrdered` | integer | Distinct lines, and the sum of their quantities. |

### Money

Every monetary figure comes in an order-currency form and a `base*` form in the store's base currency. Each family also carries `Invoiced` and `Refunded` variants, so a client can show what has actually been billed and returned rather than only what was ordered.

| Family | Fields |
|--------|--------|
| Grand total | `grandTotal`, `baseGrandTotal`, `grandTotalInvoiced`, `baseGrandTotalInvoiced`, `grandTotalRefunded`, `baseGrandTotalRefunded` |
| Subtotal | `subTotal`, `baseSubTotal`, `subTotalInvoiced`, `baseSubTotalInvoiced`, `subTotalRefunded`, `baseSubTotalRefunded`, `subTotalInclTax`, `baseSubTotalInclTax` |
| Discount | `discountPercent`, `discountAmount`, `baseDiscountAmount`, `discountInvoiced`, `baseDiscountInvoiced`, `discountRefunded`, `baseDiscountRefunded` |
| Tax | `taxAmount`, `baseTaxAmount`, `taxAmountInvoiced`, `baseTaxAmountInvoiced`, `taxAmountRefunded`, `baseTaxAmountRefunded` |
| Shipping | `shippingAmount`, `baseShippingAmount`, `shippingInvoiced`, `baseShippingInvoiced`, `shippingRefunded`, `baseShippingRefunded`, `shippingDiscountAmount`, `baseShippingDiscountAmount`, `shippingTaxAmount`, `baseShippingTaxAmount`, `shippingTaxRefunded`, `baseShippingTaxRefunded`, `shippingAmountInclTax`, `baseShippingAmountInclTax` |
| Currency | `orderCurrencyCode`, `baseCurrencyCode`, `channelCurrencyCode` |

Amounts are raw numbers, not formatted strings — apply the symbol for `orderCurrencyCode` client-side.

### Items

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Order-line ID. |
| `sku` / `name` | string | Product identity as captured at checkout. |
| `type` / `productType` | string | Product type, e.g. `simple`. |
| `productId` | integer | The catalog product; use it to link back to the product page. |
| `qtyOrdered` / `qtyShipped` / `qtyInvoiced` / `qtyCanceled` / `qtyRefunded` | integer | Per-line quantity breakdown. |
| `price` / `basePrice` / `priceInclTax` | float | Unit price. |
| `total` / `baseTotal` / `totalInclTax` | float | Line total. |
| `discountPercent` / `discountAmount` / `taxPercent` / `taxAmount` | float | Per-line discount and tax. |

### Addresses

The `addresses` array holds the billing and shipping addresses, told apart by `addressType`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Address record ID. |
| `addressType` | string | `order_billing` or `order_shipping`. |
| `firstName` / `lastName` / `gender` / `companyName` / `vatId` | string | Recipient details. |
| `address` / `city` / `state` / `country` / `postcode` | string | Location, with the street under `address`. |
| `email` / `phone` | string | Contact details captured with the address. |

### Payment and Shipments

The `payment` block is a single object of `id`, `method`, and `methodTitle`. `shipments` is an array, empty until the order ships.

## Error Responses

| Status | Body `detail` | Cause |
|--------|---------------|-------|
| `404` | `Customer order with ID "999999" not found` | No such order, **or** the order belongs to another customer. The two cases are deliberately indistinguishable. |
| `403` | `Unauthenticated. Please login to perform this action` | No customer Bearer token was sent. |
| `401` | — | The storefront key header was missing or wrong. |

## Use Cases

- **Order detail page** — one call returns the lines, both addresses, and the payment method, so no follow-up fetches are needed.
- **"Partially shipped" badge** — compare `qtyShipped` against `qtyOrdered` per line; the order-level `status` alone does not show partial fulfilment.
- **Refund summary** — the `*Refunded` figures state what was actually returned, which the order total does not reflect.
- **Reorder** — `items[].productId` and `qtyOrdered` are enough to rebuild a cart.

## Best Practices

- **Show `incrementId`, keep `id`** — the increment ID is the number on the customer's confirmation email; the plain `id` is internal and addresses this endpoint.
- **Read the `Invoiced` and `Refunded` variants before showing "amount paid"** — `grandTotal` is what was ordered, not what has been billed.
- **Do not treat an empty `shipments` array as an error** — it simply means nothing has shipped yet.
- **Split `addresses` by `addressType`** — both live in one array, and a page that renders `addresses[0]` as billing will be wrong whenever the order shipped first.

## Related Resources

- [Get All Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) — the customer's order history
- [Place Order](/api/rest-api/shop/checkout/place-order) — turn the prepared cart into an order
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
