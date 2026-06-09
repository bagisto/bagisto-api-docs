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

Adds a product to the draft cart. Each product type needs its own selection
fields in addition to `productId` and `quantity`. The fields below are typed and
work **identically over REST and GraphQL**:

| Product type | Fields (besides `productId`, `quantity`) |
|--------------|-------------------------------------------|
| Simple / Virtual | — |
| Configurable | `selectedConfigurableOption` — the chosen variant's product id |
| Downloadable | `links` — array of downloadable-link ids |
| Grouped      | `groupedQuantities` — array of `{ productId, quantity }` |
| Bundle       | `bundleOptions` — array of `{ optionId, productIds, quantity }` |
| Booking      | not supported in admin Create-Order (returns `400`) |

Example bundle body:

```json
{
  "productId": 142,
  "quantity": 1,
  "bundleOptions": [
    { "optionId": 5, "productIds": [10], "quantity": 1 },
    { "optionId": 6, "productIds": [12], "quantity": 1 }
  ]
}
```

::: tip REST also accepts the raw storefront keys
Because REST forwards the whole body to the cart, it additionally accepts the
storefront snake_case shape — `selected_configurable_option`, `bundle_options`
(map of `optionId => [productIds]`), `bundle_option_qty`, `qty` (map of
`productId => quantity`), `links`. The typed fields above are recommended because
they also work over GraphQL.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}/items` | POST |
