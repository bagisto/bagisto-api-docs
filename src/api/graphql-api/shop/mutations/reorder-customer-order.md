---
outline: false
examples:
  - id: reorder-customer-order-basic
    title: Reorder Items from a Previous Order
    description: Add all items from a previous order to the customer's cart.
    query: |
      mutation {
        createReorderOrder(input: { orderId: 5 }) {
          reorderOrder {
            success
            message
            orderId
            itemsAddedCount
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "createReorderOrder": {
            "reorderOrder": {
              "success": true,
              "message": "Items have been added to your cart successfully (3 items)",
              "orderId": 5,
              "itemsAddedCount": 3
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
      - error: NO_ITEMS_ADDED
        cause: No items could be added to cart (all out of stock or unavailable)
        solution: Check product availability - some items may be discontinued or out of stock

  - id: reorder-customer-order-with-cart
    title: Reorder and Fetch Updated Cart
    description: Reorder items and retrieve the updated cart with all items and totals.
    query: |
      mutation {
        createReorderOrder(input: { orderId: 3 }) {
          reorderOrder {
            success
            message
            orderId
            itemsAddedCount
          }
        }
      }
      
      query {
        cart {
          id
          itemsCount
          items {
            id
            productId
            name
            quantity
            price
          }
          totals {
            subtotal
            tax
            shipping
            grandTotal
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "createReorderOrder": {
            "reorderOrder": {
              "success": true,
              "message": "Items have been added to your cart successfully (2 items)",
              "orderId": 3,
              "itemsAddedCount": 2
            }
          },
          "cart": {
            "id": "1",
            "itemsCount": 2,
            "items": [
              {
                "id": "101",
                "productId": "1",
                "name": "Blue T-Shirt",
                "quantity": 1,
                "price": "29.99"
              },
              {
                "id": "102",
                "productId": "2",
                "name": "Black Jeans",
                "quantity": 1,
                "price": "79.99"
              }
            ],
            "totals": {
              "subtotal": "109.98",
              "tax": "9.10",
              "shipping": "10.00",
              "grandTotal": "129.08"
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: Order does not exist or belongs to another customer
        solution: Verify the order ID and ensure it belongs to the authenticated customer

---

# Reorder Customer Order

## About

The `reorderOrder` mutation allows authenticated customers to quickly re-add items from a previous order to their cart. This enables:

- One-click reordering of frequently purchased items
- Convenient replenishment of consumables or recurring purchases
- Enhanced customer experience by reducing re-selection friction
- Support for reordering from any order status (pending, completed, shipped, canceled, etc.)

When items are reordered:

- Items are added to the customer's current/active cart
- Out-of-stock or unavailable items are silently skipped
- The mutation succeeds if at least one item is added
- Item quantities, prices, and options are preserved from the original order
- Inventory is decremented as normal for new cart items

Use this feature to:

- Enable "Quick Reorder" buttons in order history pages
- Support one-click replenishment ordering
- Improve customer retention through convenient purchasing
- Reduce cart abandonment for repeat purchases
- Implement "Frequently Reordered" sections

## Authentication

This mutation requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
X-STOREFRONT-KEY: <storefrontKey>
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `input.orderId` | `Int!` | ✅ Yes | The numeric ID of the order to reorder items from. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `success` | `Boolean!` | `true` if at least one item was added to cart, `false` if no items could be added. |
| `message` | `String!` | Human-readable message with outcome (number of items added, reasons for failures, etc.). Localized. |
| `orderId` | `Int!` | The numeric ID of the source order. |
| `itemsAddedCount` | `Int!` | Number of items successfully added to the cart. |

## Business Logic

1. **Authentication Check**: Verifies customer is logged in
2. **Ownership Validation**: Ensures order belongs to the authenticated customer
3. **Item Iteration**: Loops through each item in the order
4. **Availability Check**: For each item:
   - Verifies product still exists
   - Checks if item is purchasable
   - Validates stock availability
5. **Add to Cart**: Calls cart add-to-cart logic for available items
6. **Silent Failure**: Items that can't be added are skipped without error
7. **Success Response**: Returns count of successfully added items
8. **Inventory Update**: Stock is decremented for each item added

## Success Scenarios

| Scenario | Success? | itemsAddedCount | Notes |
|----------|----------|-----------------|-------|
| All 5 items available | ✅ Yes | 5 | Complete reorder |
| 3 of 5 items available | ✅ Yes | 3 | Partial reorder (2 out of stock) |
| Only 1 item available | ✅ Yes | 1 | Single item reorder |
| No items available | ❌ No | 0 | All items discontinued/out of stock |

## Error Handling

### Order Not Found

```json
{
  "errors": [
    {
      "message": "Order not found (ID: 99999)",
      "extensions": {
        "category": "user_error"
      }
    }
  ]
}
```

**Cause**: Order ID doesn't exist or belongs to another customer

**Solution**: Verify the order ID and ensure it belongs to the authenticated customer

### No Items Could Be Added

```json
{
  "data": {
    "reorderOrder": {
      "success": false,
      "message": "No items were added to cart. All items are out of stock or unavailable.",
      "orderId": 5,
      "itemsAddedCount": 0
    }
  }
}
```

**Cause**: All items in the order are out of stock, discontinued, or unavailable

**Solution**: Check product availability. Some items may have been discontinued or removed from the catalog.

### Unauthenticated Request

```json
{
  "errors": [
    {
      "message": "Unauthenticated",
      "extensions": {
        "category": "authentication"
      }
    }
  ]
}
```

**Cause**: Missing or invalid Bearer token

**Solution**: Login and provide a valid customer authentication token

## Use Cases

### Quick Replenishment

Customer frequently reorders the same items:

```graphql
mutation {
  createReorderOrder(input: { orderId: 5 }) {
    reorderOrder {
      success
      message
      itemsAddedCount
    }
  }
}
```

Result: 3 items (coffee, tea, sugar) added to cart in one click

### Check Availability Before Purchase

```graphql
query {
  order(id: 42) {
    id
    items {
      productId
      name
      quantity
    }
  }
}

mutation {
  createReorderOrder(input: { orderId: 42 }) {
    reorderOrder {
      itemsAddedCount
    }
  }
}
```

Then proceed to checkout if `itemsAddedCount > 0`

### Reorder with Cart Updates

Customer adds new items, then reorders previous favorites:

```graphql
mutation {
  addToCart(input: { productId: 10, quantity: 2 }) {
    success
  }
  
  createReorderOrder(input: { orderId: 15 }) {
    reorderOrder {
      success
      itemsAddedCount
    }
  }
}
```

Result: New items + previously ordered items in single cart

## Notes

- **Order Status Agnostic**: Items can be reordered from any order status (pending, completed, shipped, canceled, etc.)
- **Partial Reorder**: If some items are unavailable, operation succeeds with those available
- **Pricing Update**: Current prices from the catalog are used (not original order prices)
- **Inventory Decremented**: Reordered items follow normal inventory management rules
- **No Special Pricing**: Promotions/discounts from original order are not automatically applied
- **Customer Isolation**: Customers cannot reorder other customers' orders
- **Localization**: All messages are localized to the customer's language
- **Bundled Products**: Bundles and configurable products are handled gracefully

## Implementation Details

### Reorder Behavior

| Item Type | Behavior |
|-----------|----------|
| Simple product | Added with same quantity |
| Configurable product | Added with same options/attributes |
| Bundle product | Added with same bundle configuration |
| Grouped product | Added with same selections |
| Out of stock | Silently skipped, not added |
| Discontinued | Silently skipped, not added |
| Not purchasable | Silently skipped, not added |

### Inventory Management

- Reordered items consume inventory normally
- Stock is reserved for the active cart
- No special reservation or hold period
- Stock can run out between reorder and checkout

## Related Resources

- [Get Customer Orders](/api/graphql-api/shop/queries/get-customer-orders) — Query orders to enable reorder buttons
- [Get Customer Order](/api/graphql-api/shop/queries/get-customer-order) — Query a specific order details
- [Get Cart](/api/graphql-api/shop/queries/get-cart) — Check cart after reorder
- [Add to Cart](/api/graphql-api/shop/mutations/add-to-cart) — Manual item addition
- [Cancel Customer Order](/api/graphql-api/shop/mutations/cancel-customer-order) — Cancel orders
- [Customer Login](/api/graphql-api/shop/mutations/customer-login) — Obtain authentication token
- [Place Order](/api/graphql-api/shop/mutations/place-order) — Checkout after reorder
