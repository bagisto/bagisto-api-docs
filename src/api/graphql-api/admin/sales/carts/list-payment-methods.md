---
outline: false
examples:
  - id: admin-cart-list-payment-methods
    title: List Payment Methods
    description: List payment methods supported for the draft cart. A shipping method must be selected first.
    query: |
      query AdminCartPaymentMethods($id: Int!) {
        adminCartPaymentMethods(cartId: $id) {
          edges { node { method methodTitle description sort } }
        }
      }
    variables: |
      {
        "id": 314
      }
    response: |
      {
        "data": {
          "adminCartPaymentMethods": {
            "edges": [
              { "node": { "method": "cashondelivery", "methodTitle": "Cash On Delivery", "description": "", "sort": 1 } },
              { "node": { "method": "moneytransfer", "methodTitle": "Money Transfer", "description": "", "sort": 2 } }
            ]
          }
        }
      }
---

# List Payment Methods

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminCartPaymentMethods(cartId: Int!)` | QueryCollection | List supported payment methods |

## Sequence

A shipping method must already be selected on the cart, otherwise the response
carries an `errors[]` entry equivalent to HTTP 409 on REST.

## Note

Only `cashondelivery` and `moneytransfer` succeed at `createAdminPlaceOrder`
— matches the Bagisto admin monolith Create-Order screen.
