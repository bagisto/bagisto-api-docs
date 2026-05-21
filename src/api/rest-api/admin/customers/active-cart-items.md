---
outline: false
apiType: rest
examples:
  - id: admin-customer-active-cart
    title: Get Customer's Active Cart Items
    description: Items in the customer's OWN active storefront cart (carts.is_active = 1) — the right-sidebar "Cart Items" panel on the Create-Order screen.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/19/cart-items" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 1701, "productId": 2358, "sku": "test65",
            "type": "simple", "name": "Classic Watch Hand",
            "quantity": 1, "price": 4000, "formattedPrice": "$4,000.00",
            "total": 4000, "formattedTotal": "$4,000.00",
            "additional": { "quantity": 1 }
          }
        ],
        "meta": { "currentPage": 1, "perPage": 1, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# Customer Active Cart Items

Items the customer has in their **own** active storefront cart
(`carts.is_active = 1`) — distinct from the admin draft cart being built. The
Create-Order screen's right-sidebar shows these so the admin can pull items
into the draft.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/cart-items` | GET |

Returns only **top-level** items (`cart_items.parent_id IS NULL`). Empty `data`
array when the customer has no active cart. Requires `X-Admin-Key` + admin
Bearer token.
