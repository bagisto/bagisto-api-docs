---
outline: false
apiType: rest
examples:
  - id: admin-returnable-items
    title: List Returnable Items
    description: The items of an order that can be put on a return, each with the trusted server-enforced quantity caps. Returned as a plain JSON array (no envelope). No customer scope — admin can open a return for any order.
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/requests/order-items?order_id=45" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      [
        {
          "orderItemId": 78,
          "productId": 1,
          "sku": "COASTALBREEZEMENSHOODIE",
          "name": "Coastal Breeze Men's Blue Zipper Hoodie",
          "type": "simple",
          "price": 100,
          "qtyOrdered": 2,
          "currentQuantity": 2,
          "forReturnQuantity": 2,
          "forCancelQuantity": 0,
          "rmaQuantity": 0,
          "rmaReturnPeriod": 30
        }
      ]
---

# List Returnable Items

Returns the items of an order that can be put on a return, each with the trusted quantity caps. Use this to build the create-return form: the caps tell you the maximum quantity you may send as `rma_qty` when [creating a return](./create-return). Returned as a **plain JSON array** (no `{ data, meta }` envelope). There is no customer scope — the admin can open a return for any order.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/requests/order-items` | GET |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order_id` | integer | yes | The order whose returnable items to list. |

## Field notes

| Field | Meaning |
|-------|---------|
| `orderItemId` | The order item to return (pass as `order_item_id` on create). |
| `currentQuantity` | Quantity currently on the order (not yet returned/canceled). |
| `forReturnQuantity` | Max quantity eligible for a `return` resolution. |
| `forCancelQuantity` | Max quantity eligible for a `cancel_items` resolution. |
| `rmaQuantity` | Quantity already placed on returns. |
| `rmaReturnPeriod` | The return window (in days) for this item. |

## Permission

`sales.rma.requests`

::: tip
See the [Returns overview](/api/rest-api/admin/sales/returns/) for how a return is created.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
