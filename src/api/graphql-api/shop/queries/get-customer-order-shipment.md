---
outline: false
examples:
  - id: get-customer-order-shipment-basic
    title: Get Single Customer Order Shipment
    description: Retrieve details of a specific shipment by its ID with tracking information and line items.
    query: |
      query getOrderShipment {
        customerOrderShipment(id: 5) {
          id
          _id
          status
          trackNumber
          carrierTitle
          totalQty
          createdAt
          items {
            edges {
              node {
                id
                name
                sku
                qty
              }
            }
          }
          shippingNumber
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerOrderShipment": {
            "id": "/api/shop/shipments/5",
            "_id": 5,
            "status": "shipped",
            "trackNumber": "794698949845",
            "carrierTitle": "FedEx",
            "totalQty": 2,
            "createdAt": "2025-01-20T14:30:00+00:00",
            "items": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/shipment-items/1",
                    "name": "Sample Product",
                    "sku": "PROD-001",
                    "qty": 2
                  }
                }
              ]
            },
            "shippingNumber": "SH-005"
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: Shipment with specified ID does not exist or does not belong to the customer's order
        solution: Verify the shipment ID and ensure it belongs to one of the authenticated customer's orders
      - error: INVALID_ID
        cause: Invalid or missing shipment ID
        solution: Provide a valid shipment ID as an integer

---

# Get Customer Order Shipment

## About

The `customerOrderShipment` query retrieves detailed information for a specific shipment identified by its ID. Customers can only access shipments from their own orders — requesting another customer's shipment returns a not found error, preventing enumeration attacks. Use this query to:

- Display shipment details on a tracking page
- Show tracking number and carrier information
- View shipped items and quantities
- Track individual shipment status
- Display shipment creation and tracking details
- Build shipment tracking interfaces

## Authentication

This query requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
X-STOREFRONT-KEY: <storefrontKey>
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `Int!` | ✅ Yes | The numeric ID of the shipment to retrieve. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI identifier of the shipment. |
| `_id` | `ID!` | Numeric shipment ID. |
| `status` | `String!` | Shipment status: `pending`, `shipped`, `delivered`, `cancelled`. |
| `trackNumber` | `String` | Carrier tracking number for shipment tracking. |
| `carrierTitle` | `String` | Carrier name (e.g. `FedEx`, `UPS`, `Standard Post`). |
| `totalQty` | `Int!` | Total quantity of items in the shipment. |
| `createdAt` | `DateTime!` | Shipment creation timestamp. |
| `items` | `ShipmentItemConnection` | Paginated list of shipment line items. |
| `items.edges.node.id` | `ID!` | IRI identifier of the shipment item. |
| `items.edges.node.name` | `String!` | Product name in the shipment. |
| `items.edges.node.sku` | `String!` | Product SKU. |
| `items.edges.node.qty` | `Int!` | Quantity shipped. |
| `shippingNumber` | `String` | Unique shipping number for the shipment. |

## Error Handling

### Shipment Not Found

```json
{
  "errors": [
    {
      "message": "Customer shipment with ID \"999\" not found.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerOrderShipment"]
    }
  ]
}
```

### Unauthenticated Request

```json
{
  "errors": [
    {
      "message": "Customer is not logged in.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerOrderShipment"]
    }
  ]
}
```

### Invalid Shipment ID

```json
{
  "errors": [
    {
      "message": "Invalid shipment ID provided.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerOrderShipment"]
    }
  ]
}
```

## Use Cases

- Display single shipment tracking details on a dedicated page
- Show tracking number for carrier tracking websites
- View shipped items and quantities for a specific shipment
- Track individual shipment status and delivery progress
- Build detailed shipment information pages
- Integrate with carrier tracking APIs using tracking numbers

## Notes

- **Customer isolation:** A customer can only view shipments from their own orders. Requesting another customer's shipment returns a 404, preventing enumeration attacks.
- **Read-only:** Only `GET` operations are available. Shipments cannot be modified through this API.
- **Tracking information:** The `trackNumber` field can be used to track the shipment on the carrier's website.
- **Item-level details:** Each shipment item includes SKU and quantity for order fulfillment verification.
- **Status tracking:** Monitor shipment status changes from `pending` to `shipped` to `delivered`.

## Related Resources

- [Get Customer Order Shipments](/api/graphql-api/shop/queries/get-customer-order-shipments) — Query all shipments for a specific order
- [Get Customer Order](/api/graphql-api/shop/queries/get-customer-order) — Query a specific order with shipment summary
- [Get All Customer Orders](/api/graphql-api/shop/queries/get-customer-orders) — Query all customer orders
- [Get Customer Profile](/api/graphql-api/shop/queries/get-customer-profile) — Query customer profile
