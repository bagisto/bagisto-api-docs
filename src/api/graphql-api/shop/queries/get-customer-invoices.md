---
outline: false
examples:
  - id: get-customer-invoices-by-order-with-items
    title: Get Customer Invoices by Order ID with Items
    description: Retrieve invoices for a specific order with detailed invoice line items.
    query: |
      query customerInvoices {
        customerInvoices(first: 1, orderId: 6) {
          edges {
            node {
              orderCurrencyCode        
              grandTotal
              downloadUrl
              items {
                edges {
                  node {
                    id
                    _id
                    sku              
                    parentId
                    name
                    price
                    qty              
                    total
                    basePrice
                    description
                    baseTotal
                    taxAmount
                    baseTaxAmount
                    discountPercent
                    discountAmount
                    baseDiscountAmount
                    priceInclTax
                    basePriceInclTax
                    totalInclTax
                    baseTotalInclTax
                    productId
                    productType
                    orderItemId
                    invoiceId
                    createdAt
                    updatedAt
                  }
                }
              }
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerInvoices": {
            "edges": [
              {
                "node": {
                  "orderCurrencyCode": "USD",
                  "grandTotal": 150.00,
                  "downloadUrl": "/customer/invoices/download/1",
                  "items": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/invoice-items/1",
                          "_id": 1,
                          "sku": "PROD-001",
                          "parentId": null,
                          "name": "Sample Product",
                          "price": 100.00,
                          "qty": 1,
                          "total": 100.00,
                          "basePrice": 100.00,
                          "description": "Product description",
                          "baseTotal": 100.00,
                          "taxAmount": 10.00,
                          "baseTaxAmount": 10.00,
                          "discountPercent": 0.00,
                          "discountAmount": 0.00,
                          "baseDiscountAmount": 0.00,
                          "priceInclTax": 110.00,
                          "basePriceInclTax": 110.00,
                          "totalInclTax": 110.00,
                          "baseTotalInclTax": 110.00,
                          "productId": 1,
                          "productType": "simple",
                          "orderItemId": 1,
                          "invoiceId": 1,
                          "createdAt": "2025-02-10T10:30:00+00:00",
                          "updatedAt": "2025-02-10T10:30:00+00:00"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: invalid-order-id
        cause: Order ID does not exist or does not belong to the customer
        solution: Verify the order ID belongs to the authenticated customer

  - id: get-customer-invoices-basic
    title: Get All Customer Invoices
    description: Retrieve a paginated list of invoices for the authenticated customer using cursor-based pagination.
    query: |
      query GetCustomerInvoices {
        customerInvoices(first: 10, after: null) {
          edges {
            cursor
            node {
              _id
              incrementId
              state
              totalQty
              grandTotal
              baseGrandTotal
              subTotal
              baseSubTotal
              shippingAmount
              baseShippingAmount
              taxAmount
              baseTaxAmount
              discountAmount
              baseDiscountAmount
              baseCurrencyCode
              orderCurrencyCode
              downloadUrl
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
          "customerInvoices": {
            "edges": [
              {
                "cursor": "Mg==",
                "node": {
                  "_id": 2,
                  "incrementId": "INV-002",
                  "state": "pending",
                  "totalQty": 1,
                  "grandTotal": 55.00,
                  "baseGrandTotal": 55.00,
                  "subTotal": 50.00,
                  "baseSubTotal": 50.00,
                  "shippingAmount": 5.00,
                  "baseShippingAmount": 5.00,
                  "taxAmount": 0.00,
                  "baseTaxAmount": 0.00,
                  "discountAmount": 0.00,
                  "baseDiscountAmount": 0.00,
                  "baseCurrencyCode": "USD",
                  "orderCurrencyCode": "USD",
                  "downloadUrl": "/customer/invoices/download/2",
                  "createdAt": "2025-02-10T14:00:00+00:00",
                  "updatedAt": "2025-02-10T14:00:00+00:00"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 1,
                  "incrementId": "INV-001",
                  "state": "paid",
                  "totalQty": 2,
                  "grandTotal": 110.00,
                  "baseGrandTotal": 110.00,
                  "subTotal": 100.00,
                  "baseSubTotal": 100.00,
                  "shippingAmount": 5.00,
                  "baseShippingAmount": 5.00,
                  "taxAmount": 5.00,
                  "baseTaxAmount": 5.00,
                  "discountAmount": 0.00,
                  "baseDiscountAmount": 0.00,
                  "baseCurrencyCode": "USD",
                  "orderCurrencyCode": "USD",
                  "downloadUrl": "/customer/invoices/download/1",
                  "createdAt": "2025-02-10T10:30:00+00:00",
                  "updatedAt": "2025-02-10T10:30:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "Mg==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 2
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

  - id: get-customer-invoices-by-order
    title: Get Customer Invoices - Filter by Order ID
    description: Retrieve invoices for a specific order.
    query: |
      query GetInvoicesByOrder($orderId: Int) {
        customerInvoices(first: 10, orderId: $orderId) {
          edges {
            node {
              _id
              incrementId
              state
              grandTotal
              downloadUrl
              createdAt
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "orderId": 1
      }
    response: |
      {
        "data": {
          "customerInvoices": {
            "edges": [
              {
                "node": {
                  "_id": 1,
                  "incrementId": "INV-001",
                  "state": "paid",
                  "grandTotal": 110.00,
                  "downloadUrl": "/customer/invoices/download/1",
                  "createdAt": "2025-02-10T10:30:00+00:00"
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: invalid-order-id
        cause: Order ID does not exist or does not belong to the customer
        solution: Verify the order ID belongs to the authenticated customer

  - id: get-customer-invoices-by-state
    title: Get Customer Invoices - Filter by State
    description: Retrieve invoices filtered by payment state.
    query: |
      query GetPaidInvoices {
        customerInvoices(first: 10, state: "paid") {
          edges {
            node {
              _id
              incrementId
              state
              grandTotal
              downloadUrl
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
          "customerInvoices": {
            "edges": [
              {
                "node": {
                  "_id": 1,
                  "incrementId": "INV-001",
                  "state": "paid",
                  "grandTotal": 110.00,
                  "downloadUrl": "/customer/invoices/download/1",
                  "createdAt": "2025-02-10T10:30:00+00:00"
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: invalid-state
        cause: Invalid state value provided
        solution: Use one of pending, pending_payment, paid, overdue, refunded

  - id: get-customer-invoices-pagination
    title: Get Customer Invoices - Forward Pagination
    description: Paginate through customer invoices using cursor-based pagination with the after argument.
    query: |
      query GetNextPage {
        customerInvoices(first: 5, after: "Mg==") {
          edges {
            cursor
            node {
              _id
              incrementId
              state
              grandTotal
              downloadUrl
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
          "customerInvoices": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 1,
                  "incrementId": "INV-001",
                  "state": "paid",
                  "grandTotal": 110.00,
                  "downloadUrl": "/customer/invoices/download/1",
                  "createdAt": "2025-02-10T10:30:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
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

# Get Customer Invoices

## About

The `customerInvoices` query retrieves a paginated list of invoices belonging to the authenticated customer's orders. This is a **read-only** API — customers can only view their own invoices. Use this query to:

- Display invoice history in the customer's account dashboard
- Show invoice list with state, totals, and dates
- Filter invoices by order ID or payment state
- Implement pagination for customers with many invoices
- Build invoice tracking interfaces

Invoices are automatically scoped to the authenticated customer via the order relationship.

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
| `orderId` | `Int` | ❌ No | Filter invoices by order ID. |
| `state` | `String` | ❌ No | Filter by invoice state: `pending`, `pending_payment`, `paid`, `overdue`, `refunded`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CustomerInvoiceEdge!]` | Array of invoice edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `CustomerInvoice!` | The customer invoice object. |
| `edges.node._id` | `Int!` | Numeric invoice ID. |
| `edges.node.incrementId` | `String!` | Human-readable invoice number (e.g. `INV-001`). |
| `edges.node.state` | `String!` | Invoice state: `pending`, `pending_payment`, `paid`, `overdue`, `refunded`. |
| `edges.node.totalQty` | `Int!` | Total quantity of items in the invoice. |
| `edges.node.emailSent` | `Boolean` | Whether the invoice email was sent. |
| `edges.node.grandTotal` | `Float!` | Grand total. |
| `edges.node.baseGrandTotal` | `Float!` | Base grand total. |
| `edges.node.subTotal` | `Float!` | Sub total. |
| `edges.node.baseSubTotal` | `Float!` | Base sub total. |
| `edges.node.shippingAmount` | `Float` | Shipping amount. |
| `edges.node.baseShippingAmount` | `Float` | Base shipping amount. |
| `edges.node.taxAmount` | `Float` | Tax amount. |
| `edges.node.baseTaxAmount` | `Float` | Base tax amount. |
| `edges.node.discountAmount` | `Float` | Discount amount. |
| `edges.node.baseDiscountAmount` | `Float` | Base discount amount. |
| `edges.node.shippingTaxAmount` | `Float` | Shipping tax amount. |
| `edges.node.baseShippingTaxAmount` | `Float` | Base shipping tax amount. |
| `edges.node.subTotalInclTax` | `Float` | Sub total including tax. |
| `edges.node.baseSubTotalInclTax` | `Float` | Base sub total including tax. |
| `edges.node.shippingAmountInclTax` | `Float` | Shipping amount including tax. |
| `edges.node.baseShippingAmountInclTax` | `Float` | Base shipping amount including tax. |
| `edges.node.baseCurrencyCode` | `String!` | Base currency code (e.g. `USD`). |
| `edges.node.channelCurrencyCode` | `String` | Channel currency code. |
| `edges.node.orderCurrencyCode` | `String!` | Order currency code. |
| `edges.node.transactionId` | `String` | Payment transaction ID. |
| `edges.node.reminders` | `Int` | Number of reminders sent. |
| `edges.node.nextReminderAt` | `DateTime` | Next reminder scheduled date. |
| `edges.node.createdAt` | `DateTime!` | Invoice creation timestamp. |
| `edges.node.updatedAt` | `DateTime!` | Invoice last update timestamp. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total invoices matching filters. |

## Invoice State Values

| State | Description |
|-------|-------------|
| `pending` | Invoice created, awaiting action |
| `pending_payment` | Payment initiated but not yet confirmed |
| `paid` | Payment received and confirmed |
| `overdue` | Payment past due date |
| `refunded` | Invoice has been refunded |

## Use Cases

### 1. Invoice History Dashboard
Fetch all customer invoices to display in the account dashboard with pagination.

### 2. Order-Specific Invoices
Filter by `orderId` to show all invoices associated with a specific order.

### 3. Paid Invoices
Filter by `state: "paid"` to show confirmed payment history.

### 4. Pending Payments
Filter by `state: "pending"` or `state: "pending_payment"` to show outstanding invoices.

## Best Practices

1. **Use Pagination** — Always implement pagination for better performance
2. **Show State** — Display the invoice state prominently so customers can track payment status
3. **Filter by Order** — Use `orderId` filter when showing invoices within an order detail page
4. **Cache Results** — Cache invoice lists for better performance
5. **Handle Empty States** — Provide helpful UI when the customer has no invoices

## Error Handling

### Unauthenticated Request

```json
{
  "errors": [
    {
      "message": "Customer is not logged in.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerInvoices"]
    }
  ]
}
```

## Related Resources

- [Get Single Customer Invoice](/api/graphql-api/shop/queries/get-customer-invoice) — Query individual invoice details
- [Get Customer Orders](/api/graphql-api/shop/queries/get-customer-orders) — Query customer orders
- [Get Customer Profile](/api/graphql-api/shop/queries/get-customer-profile) — Query customer profile
- [Pagination Guide](/api/graphql-api/pagination) — Cursor pagination documentation
