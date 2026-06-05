---
outline: false
apiType: rest
examples:
  - id: admin-cart-add-item
    title: Add Item to Cart
    description: Add a product (any type) to the admin draft cart. Body keys mirror the storefront add-to-cart payload so configurable, bundle, grouped, and downloadable products work without code changes.
    query: |
      curl -X POST "https://your-domain.com/api/admin/carts/314/items" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "productId": 142,
          "quantity": 1
        }'
    variables: |
      {
        "productId": 142,
        "quantity": 1
      }
    response: |
      {
        "id": 314,
        "itemsCount": 2,
        "itemsQty": 2,
        "grandTotal": 200,
        "items": [ /* ... full updated cart payload ... */ ],
        "success": true,
        "message": "Item added to cart."
      }
    commonErrors:
      - error: Bad Request (400)
        cause: productId missing
        solution: Send productId in the request body
      - error: Bad Request (400)
        cause: Booking product — admin draft orders do not support booking products
        solution: Booking purchases must be made through the customer storefront. Sample response&#58; `{"type":"about:blank","title":"An error occurred","status":400,"detail":"Booking products cannot be added to an admin draft order. Booking purchases must be made through the customer storefront."}`
      - error: Not Found (404)
        cause: productId does not exist
        solution: Verify the product ID
      - error: Forbidden (403)
        cause: Cart is an active storefront cart
        solution: Use a draft cart (is_active = 0)
---

# Add Item to Cart

Adds a product to the draft cart. The whole request body is forwarded to the
cart, so use whatever extra keys that product type requires:

| Product type | Body keys (in addition to `productId` and `quantity`) |
|--------------|--------------------------------------------------------|
| Simple       | — |
| Configurable | `selectedConfigurableOption`, `superAttribute` |
| Bundle       | `bundleOptions`, `bundleOptionQty` |
| Grouped      | `qty[]` keyed by child product id |
| Downloadable | `links` (array of link ids) |

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}/items` | POST |
