---
outline: false
apiType: rest
examples:
  - id: admin-cart-update-items
    title: Update Cart Item Quantities
    description: Bulk-update line-item quantities. `qty` is a map of cart_item_id → new quantity.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/carts/314/items" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "qty": { "6711": 3 } }'
    variables: |
      { "qty": { "6711": 3 } }
    response: |
      {
        "id": 314,
        "itemsQty": 3,
        "grandTotal": 300,
        "items": [
          {
            "id": 375,
            "cartId": 510,
            "productId": 2,
            "parentId": null,
            "sku": "ws-blossom-skirt-w24",
            "type": "simple",
            "name": "Blossom Breeze Cotton Printed Short Skirt-24",
            "quantity": 3,
            "price": 24.99,
            "formattedPrice": "$24.99",
            "total": 74.97,
            "formattedTotal": "$74.97",
            "taxAmount": 0,
            "formattedTaxAmount": "$0.00",
            "discountAmount": 0,
            "formattedDiscountAmount": "$0.00",
            "additional": null,
            "child": null,
            "children": []
          }
        ],
        "success": true,
        "message": "Cart items updated."
      }
    commonErrors:
      - error: Bad Request (400)
        cause: qty missing or not an object
        solution: 'Send qty as `{ "<cartItemId>": <newQty> }`'

---

# Update Cart Item Quantities

Bulk-update line-item quantities on a draft cart.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}/items` | PUT |

Body: `{ "qty": { "<cartItemId>": <newQty>, ... } }`. Quantities of `0` remove
the line.
