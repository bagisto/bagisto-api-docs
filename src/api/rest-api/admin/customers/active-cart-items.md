---
outline: false
apiType: rest
examples:
  - id: admin-customer-active-cart
    title: Get Customer's Active Cart Items
    description: Items in the customer's OWN active storefront cart (carts.is_active = 1) — the right-sidebar "Cart Items" panel on the Create-Order screen.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/19/cart-items" \
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

## Response Fields

Returns the standard `{ data, meta }` envelope. Each row in `data`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart item ID. |
| `productId` | integer | The product. |
| `sku` | string | Product SKU. |
| `type` | string | Product type. |
| `name` | string | Product name. |
| `quantity` | integer | Quantity in the cart. |
| `price` | number | Unit price. |
| `formattedPrice` | string | Currency-formatted unit price. |
| `total` | number | Line total. |
| `formattedTotal` | string | Currency-formatted line total. |
| `additional` | object \| null | Extra item attributes (options, quantity). |

Returns only **top-level** items (`cart_items.parent_id IS NULL`). Empty `data`
array when the customer has no active cart. Requires an admin Bearer token.

::: tip
For how the Create-Order helper panels fit together, see the [Create-Order Helpers overview](./create-order-helpers/index.md).
:::
