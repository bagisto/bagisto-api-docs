---
outline: false
apiType: rest
examples:
  - id: admin-cart-get
    title: Get Cart
    description: Read an admin draft cart (items, totals, addresses, selected shipping/payment). Only `is_active = 0` (draft) carts are accessible; storefront carts return 403.
    query: |
      curl -X GET "https://your-domain.com/api/admin/carts/314" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 314,
        "customerId": 19,
        "isGuest": false,
        "isActive": false,
        "itemsCount": 1,
        "itemsQty": 1,
        "subTotal": 100,
        "formattedSubTotal": "$100.00",
        "grandTotal": 100,
        "formattedGrandTotal": "$100.00",
        "shippingAmount": 0,
        "taxTotal": 0,
        "discountAmount": 0,
        "couponCode": null,
        "shippingMethod": null,
        "paymentMethod": null,
        "haveStockableItems": true,
        "items": [
          {
            "id": 6711, "cartId": 314, "productId": 1,
            "sku": "COASTALBREEZEMENSHOODIE", "type": "simple",
            "name": "Coastal Breeze Men's Blue Zipper Hoodie",
            "quantity": 1, "price": 100, "total": 100,
            "additional": { "quantity": 1, "product_id": 1 },
            "child": null, "children": []
          }
        ],
        "billingAddress": null,
        "shippingAddress": null,
        "success": null,
        "message": null
      }
    commonErrors:
      - error: Not Found (404)
        cause: Unknown cart ID
        solution: Confirm the cart ID returned by Reorder
      - error: Forbidden (403)
        cause: Cart is an active storefront cart (is_active = 1)
        solution: This endpoint only mutates draft carts. Storefront carts are owned by the customer's session
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via /api/admin/login
---

# Get Cart

Returns the full draft-cart payload — line items (with type-specific
`additional` data), totals, billing & shipping addresses, and the
currently-selected shipping/payment method. The same payload shape is returned
by every cart write operation, so the client never needs a refetch.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}` | GET |

`{id}` is the draft cart id (typically the value returned by the Reorder action
or a future Create-Cart endpoint). Requires `X-Admin-Key` + admin Bearer token.
