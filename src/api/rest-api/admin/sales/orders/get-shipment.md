---
outline: false
apiType: rest
examples:
  - id: admin-get-shipment
    title: Get Shipment
    description: A single shipment — every column, the order/customer context, both addresses, and the shipped line items.
    query: |
      curl -X GET "https://your-domain.com/api/admin/shipments/7" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "id": 7,
        "orderId": 8,
        "orderIncrementId": "00000000008",
        "shippedTo": "John Doe",
        "orderDate": "2026-05-20 10:00:00",
        "orderStatus": "processing",
        "orderStatusLabel": "Processing",
        "channelName": "Default",
        "customerName": "John Doe",
        "customerEmail": "john.doe@example.com",
        "paymentMethod": "cashondelivery",
        "paymentTitle": "Cash On Delivery",
        "orderCurrencyCode": "USD",
        "shippingMethod": "free_free",
        "shippingTitle": "Free Shipping - Free Shipping",
        "baseShippingAmount": 0,
        "formattedBaseShippingAmount": "$0.00",
        "status": null,
        "totalQty": 2,
        "totalWeight": null,
        "carrierCode": null,
        "carrierTitle": "UPS",
        "trackNumber": "1Z999AA1",
        "emailSent": false,
        "inventorySourceId": 1,
        "inventorySourceName": "Default",
        "billingAddress": {
          "id": 16,
          "addressType": "order_billing",
          "firstName": "John",
          "lastName": "Doe",
          "city": "Los Angeles",
          "country": "US",
          "postcode": "90001",
          "email": "john.doe@example.com",
          "phone": "5551234567"
        },
        "shippingAddress": {
          "id": 15,
          "addressType": "order_shipping",
          "firstName": "John",
          "lastName": "Doe",
          "city": "Los Angeles",
          "country": "US",
          "postcode": "90001",
          "email": "john.doe@example.com",
          "phone": "5551234567"
        },
        "createdAt": "2026-05-20 12:00:00",
        "updatedAt": "2026-05-20 12:00:00",
        "items": [
          {
            "id": 11,
            "orderItemId": 42,
            "sku": "TSHIRT-RED-M",
            "name": "Red T-Shirt",
            "qty": 2
          }
        ]
      }
---

# Get Shipment

Returns a single shipment by id — every column, the order/customer context, both the billing and shipping addresses, and the shipped line `items` so clients can render without a follow-up fetch. Requires the `sales.shipments.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/shipments/{id}` | GET |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Shipment row id. |
| `orderId` / `orderIncrementId` | Integer / String | Parent order id and human-facing number. |
| `shippedTo` | String | The name on the order's shipping address. |
| `orderDate` | String | When the order was placed. |
| `orderStatus` / `orderStatusLabel` | String | Parent order status code and its display label. |
| `channelName` | String | Sales channel the order belongs to. |
| `customerName` / `customerEmail` | String | Customer who placed the order. |
| `paymentMethod` / `paymentTitle` | String | The order's payment method code and its display title — see Payment and Shipping below. |
| `orderCurrencyCode` | String | Currency the order was placed in (e.g. `USD`). |
| `shippingMethod` / `shippingTitle` | String | The order's shipping method code and its display title — may be `null`. |
| `baseShippingAmount` | Number | Shipping price in the store's base currency — may be `null`. |
| `formattedBaseShippingAmount` | String | The same shipping price pre-formatted for display — may be `null`. |
| `status` | String | Shipment status — often `null`. |
| `totalQty` | Number | Total quantity shipped across all line items. |
| `totalWeight` | Number | Combined weight of the shipment — may be `null`. |
| `carrierCode` / `carrierTitle` | String | Shipping carrier code and its title — either may be `null`. |
| `trackNumber` | String | Carrier tracking number — may be `null`. |
| `emailSent` | Boolean | Whether the shipment notification email was sent. |
| `inventorySourceId` / `inventorySourceName` | Integer / String | The warehouse/source the items shipped from. |
| `billingAddress` | Object | The order's billing address — see below. |
| `shippingAddress` | Object | The order's shipping address — see below. |
| `createdAt` / `updatedAt` | String | Timestamps. |
| `items` | Array | The shipped line items — see below. |

### Payment and Shipping

Mirrors the "Payment and Shipping" panel on the admin Shipment view — the order's payment and shipping details carried alongside the shipment.

| Field | Type | Description |
|-------|------|-------------|
| `paymentMethod` | String | The order's payment method code (e.g. `cashondelivery`). |
| `paymentTitle` | String | The payment method's display title (e.g. `Cash On Delivery`). |
| `orderCurrencyCode` | String | Currency the order was placed in (e.g. `USD`). |
| `shippingMethod` | String | The order's shipping method code (e.g. `free_free`) — `null` when the order had no shipping method (e.g. virtual/free). |
| `shippingTitle` | String | The shipping method's display title — `null` when there was no shipping method. |
| `baseShippingAmount` | Number | Shipping price in the store's base currency — `null` when there was no shipping method. |
| `formattedBaseShippingAmount` | String | The same shipping price pre-formatted for display — `null` when there was no shipping method. |

### Address objects (`billingAddress`, `shippingAddress`)

Each address carries `id`, `addressType`, `firstName`, `lastName`, `city`, `country`, `postcode`, `email`, and `phone`.

### Shipped items (`items`)

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Shipment-item row id. |
| `orderItemId` | Integer | The order line this shipped item maps to. |
| `sku` | String | Product SKU. |
| `name` | String | Product name. |
| `qty` | Number | Quantity shipped for this line. |

## Permission

`sales.shipments.view`
