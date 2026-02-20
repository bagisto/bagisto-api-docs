---
outline: false
examples:
  - id: cancel-customer-order-success
    title: Cancel a Pending Customer Order
    description: Cancel a customer order that is in pending status, restoring inventory to stock.
    query: |
      mutation {
        createCancelOrder(input: { orderId: 2 }) {
          cancelOrder {
            success
            message
            orderId
            status
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "createCancelOrder": {
            "cancelOrder": {
              "success": true,
              "message": "Order has been canceled successfully",
              "orderId": 2,
              "status": "canceled"
            }
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
      - error: CANNOT_CANCEL
        cause: Order cannot be canceled (already completed, shipped, or canceled)
        solution: Check order status - only pending orders can be canceled

  - id: cancel-customer-order-blocked
    title: Cancel Order - Already Canceled (Error)
    description: Attempt to cancel an order that is already canceled (should fail).
    query: |
      mutation {
        createCancelOrder(input: { orderId: 2 }) {
          cancelOrder {
            success
            message
            orderId
            status
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "createCancelOrder": {
            "cancelOrder": {
              "success": false,
              "message": "Order cannot be canceled. It may have already been processed, shipped, or canceled",
              "orderId": 2,
              "status": "canceled"
            }
          }
        }
      }
    commonErrors:
      - error: CANCEL_NOT_ALLOWED
        cause: Order status does not allow cancellation
        solution: Only orders with pending status can be canceled

---

# Cancel Customer Order

## Overview

The Cancel Order API allows authenticated customers to cancel their pending orders. This mutation validates order ownership, checks cancellation eligibility, and reverses inventory allocation when successful.

## Endpoint

**GraphQL Mutation URL**: `POST /api/graphql`

## Authentication

**Required**: Bearer Token (Sanctum)  
**Scope**: Customer only (order must belong to authenticated customer)

## Request

### GraphQL Mutation Schema

```graphql
mutation CreateCancelOrder($input: CancelOrderInput!) {
  createCancelOrder(input: $input) {
    cancelOrder {
      success      # Boolean: true if cancel succeeded
      message      # String: response message
      orderId      # Int: the order ID
      status       # String: final order status
    }
  }
}
```

### Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | Integer | Yes | The numeric ID of the order to cancel |

## Response

### Success Response (200 OK)

```json
{
  "data": {
    "createCancelOrder": {
      "cancelOrder": {
        "success": true,
        "message": "Order has been canceled successfully",
        "orderId": 2,
        "status": "canceled"
      }
    }
  }
}
```

### Failure Response - Cannot Cancel

When order cannot be canceled (already canceled, shipped, or completed):

```json
{
  "data": {
    "createCancelOrder": {
      "cancelOrder": {
        "success": false,
        "message": "Order cannot be canceled. It may have already been processed, shipped, or canceled",
        "orderId": 2,
        "status": "canceled"
      }
    }
  }
}
```

### Error Response - Unauthorized (401)

```json
{
  "errors": [
    {
      "message": "Unauthenticated",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}
```

### Error Response - Order Not Found (404)

When order ID doesn't exist or belongs to a different customer:

```json
{
  "data": {
    "createCancelOrder": null
  }
}
```

## Business Logic

### Cancellation Eligibility

An order can be canceled if:
- Order status is `pending` (not shipped, completed, or already canceled)
- Order belongs to the authenticated customer
- Order is not a composite/grouped order (or all child items are cancelable)

### When Cancellation Succeeds

1. **Order Status**: Changed from `pending` → `canceled`
2. **Inventory**: All ordered items are returned to stock
3. **Qty Canceled**: Updated to match ordered quantity for all items
4. **Events Fired**:
   - `order.cancel.before` — before cancel operations
   - `order.cancel.after` — after successful cancellation
5. **Database**: Order and item records updated atomically

### When Cancellation Fails

- Order status remains unchanged
- No inventory is returned
- Appropriate error message returned

## State Transitions

```
pending → canceled (valid)
shipped → (cannot cancel)
completed → (cannot cancel)
canceled → (cannot re-cancel)
```

## Use Cases

- Cancel unwanted orders before processing
- Allow customers to self-service cancel pending orders
- Automatically restore inventory when customers cancel
- Reduce support requests by enabling customer-driven cancellation
- Workflow: Customer views order → clicks cancel → inventory restored

## Testing Examples

### Test Case 1: Cancel Pending Order (Success)

**Precondition**: Order #2 with status `pending` exists for customer #2

**Query**:
```graphql
mutation {
  createCancelOrder(input: { orderId: 2 }) {
    cancelOrder {
      success
      message
      orderId
      status
    }
  }
}
```

**Expected Result**:
```json
{
  "success": true,
  "message": "Order has been canceled successfully",
  "orderId": 2,
  "status": "canceled"
}
```

**Database Verification**:
```sql
SELECT id, status FROM orders WHERE id = 2;
-- Result: id=2, status='canceled'

SELECT order_id, qty_ordered, qty_canceled FROM order_items WHERE order_id = 2;
-- Result: qty_canceled should equal qty_ordered for all items
```

### Test Case 2: Re-Cancel Already Canceled Order (Failure)

**Precondition**: Order #2 with status `canceled` (from Test Case 1)

**Query**:
```graphql
mutation {
  createCancelOrder(input: { orderId: 2 }) {
    cancelOrder {
      success
      message
      orderId
      status
    }
  }
}
```

**Expected Result**:
```json
{
  "success": false,
  "message": "Order cannot be canceled. It may have already been processed, shipped, or canceled",
  "orderId": 2,
  "status": "canceled"
}
```

**No Database Changes**: Order remains in `canceled` status

### Test Case 3: Cancel Without Authentication (Failure)

**Query** (without Authorization header):
```bash
curl -X POST http://127.0.0.1:8000/api/graphql \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_qrr4vsdbs6xNpL7DN0GHUcB0XnhjnjIS" \
  -d '{"query":"mutation { createCancelOrder(input: { orderId: 2 }) { cancelOrder { success message } } }"}'
```

**Expected Result**:
```
HTTP 401 Unauthorized
{
  "errors": [
    {
      "message": "Unauthenticated",
      "extensions": {"code": "UNAUTHENTICATED"}
    }
  ]
}
```

## Implementation Details

### Files Involved

| File | Purpose |
|------|---------|
| `CancelOrderInput.php` | Input DTO with orderId parameter |
| `CancelOrderProcessor.php` | Handles mutation business logic |
| `CancelOrder.php` | Response model with success/message/orderId/status |

### Key Components

**CancelOrderProcessor**:
- Authenticates request via `Auth::guard('sanctum')`
- Scopes orders to authenticated customer only
- Delegates to `OrderRepository::cancel()` for business logic
- Returns `CancelOrder` response model

**OrderRepository::cancel()**:
- Validates `$order->canCancel()` method
- Fires `order.cancel.before` event
- Iterates order items and returns inventory
- Updates `qty_canceled` for each item
- Calls `updateOrderStatus('canceled')`
- Fires `order.cancel.after` event

## HTTP Status Codes

| Code | Scenario |
|------|----------|
| 200 | Mutation executed (check `success` field for actual result) |
| 400 | Invalid request (missing storefront key, malformed query) |
| 401 | Unauthorized (missing or invalid Bearer token) |
| 422 | Validation error (invalid orderId type) |

## Rate Limiting

No specific rate limiting for cancel mutations. General API rate limits apply per storefront key.

## Notes

- **Customer isolation**: Orders are scoped to the authenticated customer. A customer cannot cancel another customer's order.
- **Inventory restoration**: When an order is canceled, all items are returned to inventory automatically.
- **Status tracking**: The operation is governed by Bagisto's order cancellation rules and configuration.
- **Event hooks**: Extensions can listen to `order.cancel.before` and `order.cancel.after` events.
- **Localization**: All messages are localized to the customer's language.

## Related Resources

- [Get Customer Orders](/api/graphql-api/shop/queries/get-customer-orders) — Query all customer orders
- [Get Customer Order](/api/graphql-api/shop/queries/get-customer-order) — Query a specific order before canceling
- [Reorder Customer Order](/api/graphql-api/shop/mutations/reorder-customer-order) — Re-add items from a canceled order
- [Customer Login](/api/graphql-api/shop/mutations/customer-login) — Obtain authentication token
- [Place Order](/api/graphql-api/shop/mutations/place-order) — Create new orders
