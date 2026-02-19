---
outline: false
examples:
  - id: get-customer-order-shipments-basic
    title: Get Customer Order Shipments by Order ID
    description: Retrieve all shipments for a specific customer order with tracking details and line items.
    query: |
      query getOrderShipments {
        customerOrderShipments(orderId: 3) {
          edges {
            node {
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
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerOrderShipments": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/shipments/1",
                  "_id": 1,
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
                  "shippingNumber": "SH-001"
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: Order with specified ID does not exist or does not belong to the customer
        solution: Verify the order ID and ensure it belongs to the authenticated customer
      - error: INVALID_ORDER_ID
        cause: Invalid or missing order ID
        solution: Provide a valid order ID as an integer

---

# Get Customer Order Shipments

## About

The `customerOrderShipments` query retrieves all shipments for a specific customer order identified by its order ID. Customers can only access shipments from their own orders — requesting another customer's shipments returns a not found error, preventing enumeration attacks. Use this query to:

- Display shipment tracking information
- Show shipped items and quantities
- Track shipping status and carrier details
- View tracking numbers and shipping numbers
- Display shipment creation timestamps
- Show item-level shipment details

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
| `orderId` | `Int!` | ✅ Yes | The numeric order ID for which to retrieve shipments. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI identifier of the shipment. |
| `_id` | `ID!` | Numeric shipment ID. |
| `status` | `String!` | Shipment status: `pending`, `shipped`, `delivered`, `cancelled`. |
| `trackNumber` | `String` | Carrier tracking number. |
| `carrierTitle` | `String` | Carrier name (e.g. `FedEx`, `UPS`, `Standard Post`). |
| `totalQty` | `Int!` | Total quantity of items in the shipment. |
| `createdAt` | `DateTime!` | Shipment creation timestamp. |
| `items` | `ShipmentItemConnection` | Paginated list of shipment line items. |
| `items.edges.node.id` | `ID!` | IRI identifier of the shipment item. |
| `items.edges.node.name` | `String!` | Product name in the shipment. |
| `items.edges.node.sku` | `String!` | Product SKU. |
| `items.edges.node.qty` | `Int!` | Quantity shipped. |
| `shippingNumber` | `String` | Unique shipping number for the shipment. |
| `totalCount` | `Int!` | Total number of shipments for the order. |

## Error Handling

### Order Not Found

```json
{
  "errors": [
    {
      "message": "Customer order with ID \"999\" not found.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerOrderShipments"]
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
      "path": ["customerOrderShipments"]
    }
  ]
}
```

### Invalid Order ID

```json
{
  "errors": [
    {
      "message": "Invalid order ID provided.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerOrderShipments"]
    }
  ]
}
```

## Use Cases

- Display shipment tracking page in customer account
- Show tracking numbers and carrier information
- Display shipped items and quantities
- Track shipment status and delivery progress
- Build shipment history timeline
- Show carrier-specific tracking links

## Notes

- **Customer isolation:** A customer can only view shipments from their own orders. Requesting shipments for another customer's order returns a 404, preventing enumeration attacks.
- **Read-only:** Only `GET` operations are available. Shipments cannot be modified through this API.
- **Tracking information:** Tracking numbers are only available for shipments with carrier information.
- **Item-level details:** Each shipment item includes SKU and quantity information for order fulfillment tracking.

## Related Resources

- [Get Customer Order](/api/graphql-api/shop/queries/get-customer-order) — Query a specific order with shipment summary
- [Get All Customer Orders](/api/graphql-api/shop/queries/get-customer-orders) — Query all customer orders
- [Get Customer Profile](/api/graphql-api/shop/queries/get-customer-profile) — Query customer profile
