---
outline: false
examples:
  - id: get-customer-orders-basic
    title: Get All Customer Orders
    description: Retrieve a paginated list of orders for the authenticated customer using cursor-based pagination.
    query: |
      query GetCustomerOrders {
        customerOrders(first: 10, after: null) {
          edges {
            cursor
            node {
              _id
              incrementId
              status
              channelName
              customerEmail
              customerFirstName
              customerLastName
              shippingMethod
              shippingTitle
              couponCode
              totalItemCount
              totalQtyOrdered
              grandTotal
              baseGrandTotal
              subTotal
              baseSubTotal
              taxAmount
              shippingAmount
              discountAmount
              baseCurrencyCode
              orderCurrencyCode
              createdAt
              updatedAt
            }
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerOrders": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 1,
                  "incrementId": "1",
                  "status": "pending",
                  "channelName": "Default",
                  "customerEmail": "customer@example.com",
                  "customerFirstName": "John",
                  "customerLastName": "Doe",
                  "shippingMethod": "flatrate_flatrate",
                  "shippingTitle": "Flat Rate - Flat Rate",
                  "couponCode": null,
                  "totalItemCount": 1,
                  "totalQtyOrdered": 2,
                  "grandTotal": 150.00,
                  "baseGrandTotal": 150.00,
                  "subTotal": 140.00,
                  "baseSubTotal": 140.00,
                  "taxAmount": 0.00,
                  "shippingAmount": 10.00,
                  "discountAmount": 0.00,
                  "baseCurrencyCode": "USD",
                  "orderCurrencyCode": "USD",
                  "createdAt": "2025-01-15T10:30:00+00:00",
                  "updatedAt": "2025-01-15T10:30:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MQ==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100

  - id: get-customer-orders-status
    title: Get Customer Orders - Filter by Status
    description: Retrieve customer orders filtered by order status.
    query: |
      query GetPendingOrders {
        customerOrders(first: 10, status: "pending") {
          edges {
            cursor
            node {
              _id
              incrementId
              status
              grandTotal
              createdAt
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
          "customerOrders": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 1,
                  "incrementId": "1",
                  "status": "pending",
                  "grandTotal": 150.00,
                  "createdAt": "2025-01-15T10:30:00+00:00"
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: invalid-status
        cause: Invalid status value provided
        solution: Use one of pending, processing, completed, canceled, closed, fraud

  - id: get-customer-orders-pagination
    title: Get Customer Orders - Forward Pagination
    description: Paginate through customer orders using cursor-based pagination with the after argument.
    query: |
      query GetNextPage {
        customerOrders(first: 5, after: "MQ==") {
          edges {
            cursor
            node {
              _id
              incrementId
              status
              grandTotal
              createdAt
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerOrders": {
            "edges": [
              {
                "cursor": "Mg==",
                "node": {
                  "_id": 2,
                  "incrementId": "2",
                  "status": "completed",
                  "grandTotal": 250.00,
                  "createdAt": "2025-01-16T14:00:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "Mg==",
              "hasNextPage": false
            },
            "totalCount": 2
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: The cursor value is invalid or expired
        solution: Use a valid cursor from a previous response's pageInfo

---

# Get Customer Orders

## About

The `customerOrders` query retrieves a paginated list of orders belonging to the authenticated customer. This is a **read-only** API — customers can only view their own orders. Use this query to:

- Display order history in the customer's account dashboard
- Show order list with status, totals, and dates
- Filter orders by status (pending, processing, completed, etc.)
- Implement pagination for customers with many orders
- Build order tracking interfaces

Orders are automatically scoped to the authenticated customer and the current channel.

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
| `first` | `Int` | ❌ No | Number of items to return (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Cursor for forward pagination. Use `endCursor` from previous response. |
| `last` | `Int` | ❌ No | Number of items for backward pagination. Max: 100. |
| `before` | `String` | ❌ No | Cursor for backward pagination. Use `startCursor` from previous response. |
| `status` | `String` | ❌ No | Filter by order status: `pending`, `processing`, `completed`, `canceled`, `closed`, `fraud`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CustomerOrderEdge!]` | Array of order edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `CustomerOrder!` | The customer order object. |
| `edges.node._id` | `Int!` | Numeric order ID. |
| `edges.node.incrementId` | `String!` | Human-readable order number. |
| `edges.node.status` | `String!` | Order status: `pending`, `processing`, `completed`, `canceled`, `closed`, `fraud`. |
| `edges.node.channelName` | `String!` | Channel the order was placed on. |
| `edges.node.isGuest` | `Int` | Whether the order was placed as guest. |
| `edges.node.customerEmail` | `String!` | Customer email address. |
| `edges.node.customerFirstName` | `String!` | Customer first name. |
| `edges.node.customerLastName` | `String!` | Customer last name. |
| `edges.node.shippingMethod` | `String` | Shipping method code. |
| `edges.node.shippingTitle` | `String` | Shipping method display name. |
| `edges.node.couponCode` | `String` | Applied coupon code. |
| `edges.node.isGift` | `Int` | Whether the order is a gift. |
| `edges.node.totalItemCount` | `Int!` | Number of distinct items. |
| `edges.node.totalQtyOrdered` | `Int!` | Total quantity ordered. |
| `edges.node.grandTotal` | `Float!` | Grand total. |
| `edges.node.baseGrandTotal` | `Float!` | Base grand total. |
| `edges.node.grandTotalInvoiced` | `Float` | Grand total invoiced. |
| `edges.node.grandTotalRefunded` | `Float` | Grand total refunded. |
| `edges.node.subTotal` | `Float!` | Sub total. |
| `edges.node.baseSubTotal` | `Float!` | Base sub total. |
| `edges.node.taxAmount` | `Float` | Tax amount. |
| `edges.node.baseTaxAmount` | `Float` | Base tax amount. |
| `edges.node.discountAmount` | `Float` | Discount amount. |
| `edges.node.baseDiscountAmount` | `Float` | Base discount amount. |
| `edges.node.shippingAmount` | `Float` | Shipping amount. |
| `edges.node.baseShippingAmount` | `Float` | Base shipping amount. |
| `edges.node.baseCurrencyCode` | `String!` | Base currency code. |
| `edges.node.channelCurrencyCode` | `String` | Channel currency code. |
| `edges.node.orderCurrencyCode` | `String!` | Order currency code. |
| `edges.node.createdAt` | `DateTime!` | Order creation timestamp. |
| `edges.node.updatedAt` | `DateTime!` | Order last update timestamp. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total orders matching filters. |

## Order Status Values

| Status | Description |
|--------|-------------|
| `pending` | Awaiting payment confirmation |
| `processing` | Payment confirmed, order being processed |
| `completed` | Order fulfilled and delivered |
| `canceled` | Order canceled |
| `closed` | Order closed |
| `fraud` | Flagged as fraudulent |

## Use Cases

### 1. Order History Dashboard
Fetch all customer orders to display in the account dashboard with pagination.

### 2. Pending Orders
Filter by `status: "pending"` to show orders awaiting payment or processing.

### 3. Order Tracking
Display order status and details for customers to track their purchases.

### 4. Completed Orders
Filter by `status: "completed"` to show fulfilled orders for reorder functionality.

## Best Practices

1. **Use Pagination** — Always implement pagination for better performance, especially for active customers
2. **Show Status** — Display the order status prominently so customers can track progress
3. **Filter by Status** — Provide status filters so customers can quickly find specific orders
4. **Cache Results** — Cache order lists for better performance
5. **Handle Empty States** — Provide helpful UI when the customer has no orders

## Error Handling

### Unauthenticated Request

```json
{
  "errors": [
    {
      "message": "Customer is not logged in.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerOrders"]
    }
  ]
}
```

## Related Resources

- [Get Single Customer Order](/api/graphql-api/shop/queries/get-customer-order) — Query individual order details
- [Place Order](/api/graphql-api/shop/mutations/place-order) — Place a new order
- [Get Customer Profile](/api/graphql-api/shop/queries/get-customer-profile) — Query customer profile
- [Pagination Guide](/api/graphql-api/pagination) — Cursor pagination documentation
