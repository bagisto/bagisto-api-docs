---
outline: false
examples:
  - id: admin-returnable-items-gql
    title: List Returnable Items
    description: The items of an order that can be put on a return, each with the trusted server-enforced quantity caps. No customer scope — admin can open a return for any order.
    query: |
      query AdminReturnableItems($orderId: Int!) {
        adminReturnableItems(orderId: $orderId) {
          edges {
            node {
              orderItemId
              productId
              sku
              name
              type
              price
              qtyOrdered
              currentQuantity
              forReturnQuantity
              forCancelQuantity
              rmaQuantity
              rmaReturnPeriod
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "orderId": 45
      }
    response: |
      {
        "data": {
          "adminReturnableItems": {
            "edges": [
              {
                "node": {
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
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List Returnable Items (GraphQL)

Returns the items of an order that can be put on a return, each with the trusted quantity caps. Use this to build the RMA create form: the caps tell you the maximum quantity you may send as `rmaQty` when creating a return.

The `orderId` argument is required. There is no customer scope — the admin can open a return for any order.

## Field notes

| Field | Meaning |
|-------|---------|
| `orderItemId` | The order item to return (pass as `orderItemId` on create). |
| `currentQuantity` | Quantity currently on the order (not yet returned/canceled). |
| `forReturnQuantity` | Max quantity eligible for a `return` resolution. |
| `forCancelQuantity` | Max quantity eligible for a `cancel_items` resolution. |
| `rmaQuantity` | Quantity already placed on returns. |
| `rmaReturnPeriod` | The return window (in days) for this item. |

::: tip
See the [Returns overview](/api/graphql-api/admin/sales/returns/) for how a return is created.
:::

Permission: `sales.rma.requests`.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
