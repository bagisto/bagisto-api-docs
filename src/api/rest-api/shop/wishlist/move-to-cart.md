---
outline: false
examples:
  - id: move-wishlist-to-cart
    title: Move Wishlist Item to Cart
    description: Move a wishlist item to the shopping cart and remove it from the wishlist.
    request: |
      POST /api/shop/move-wishlist-to-carts
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "wishlistItemId": 77,
        "quantity": 2
      }
    response: |
      {
        "id": 1,
        "itemsCount": 1,
        "itemsQty": 2,
        "subtotal": 1199.98,
        "grandTotal": 1329.97,
        "formattedGrandTotal": "$1,329.97",
        "couponCode": null,
        "success": true,
        "message": "Item moved to cart successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: Wishlist item does not exist or belongs to another customer
        solution: Use a valid wishlist item ID owned by the authenticated customer
      - error: 422 Validation Error
        cause: Quantity is less than 1, or a configurable product requires options
        solution: Provide a positive quantity and any required product options

  - id: move-wishlist-to-cart-default-qty
    title: Move Wishlist Item to Cart - Default Quantity
    description: Move a wishlist item with the default quantity of 1 by omitting the quantity field.
    request: |
      POST /api/shop/move-wishlist-to-carts
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "wishlistItemId": 68
      }
    response: |
      {
        "id": 1,
        "itemsCount": 1,
        "itemsQty": 1,
        "success": true,
        "message": "Item moved to cart successfully"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Wishlist item does not exist
        solution: Use a valid wishlist item ID

---

# Move Wishlist Item to Cart

Move a product from the customer's wishlist directly into their shopping cart. The item is removed from the wishlist once it is successfully added to the cart.

## Endpoint

```
POST /api/shop/move-wishlist-to-carts
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Request Body

```json
{
  "wishlistItemId": 77,
  "quantity": 2
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `wishlistItemId` | integer | Yes | The numeric ID of the wishlist item to move. |
| `quantity` | integer | No | Number of units to add to the cart. Defaults to `1`. |

## Response Fields (200 OK)

The response is the updated cart. Key fields include:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart ID |
| `itemsCount` | integer | Number of distinct items in the cart |
| `itemsQty` | integer | Total quantity across all cart items |
| `subtotal` | decimal | Items subtotal |
| `grandTotal` | decimal | Cart grand total |
| `formattedGrandTotal` | string | Localised grand total |
| `couponCode` | string | Applied coupon code (if any) |
| `success` | boolean | `true` when the move succeeded |
| `message` | string | Confirmation message |

::: tip
The cart payload mirrors the standard cart response shape. See [Get Cart](/api/rest-api/shop/cart/get-cart) for the full field set; confirm exact values against the live endpoint for your installation.
:::

## Validation

- `wishlistItemId` must reference a wishlist item owned by the authenticated customer.
- `quantity` must be a positive integer.
- Configurable products may require their options to be selected.

## Use Cases

- "Move to Cart" buttons on the wishlist page
- Convert saved-for-later items into active cart items

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list)
- [Get Cart](/api/rest-api/shop/cart/get-cart)
- [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete)
