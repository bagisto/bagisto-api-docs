---
outline: false
examples:
  - id: admin-cart-get
    title: Get Cart
    description: Read a draft cart by IRI. `id` is the resource IRI `/api/admin/carts/{cartId}`.
    query: |
      query AdminCart($id: ID!) {
        adminCart(id: $id) {
          id
          _id
        }
      }
    variables: |
      {
        "id": "/api/admin/carts/314"
      }
    response: |
      {
        "data": {
          "adminCart": {
            "id": "/api/admin/carts/314",
            "_id": 314
          }
        }
      }
---

# Get Cart

Returns the admin draft cart. The REST endpoint
(`GET /api/admin/carts/{id}`) returns the full payload — items, totals,
addresses, payment method. Over GraphQL the resource exposes its `id` (IRI)
and `_id` (integer); scalar camelCase fields (`customerId`, `isActive`,
`grandTotal`, ...) currently serialise to `null` over GraphQL due to a
project-wide API Platform quirk affecting all admin output resources. **For
the populated payload, use the REST endpoint.**

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminCart(id: ID!)` | Query | Read a draft cart |
