---
outline: false
examples:
  - id: admin-order-detail
    title: Get Order Detail
    description: Full order-view payload for one order. Nested collections (items, invoices, shipments) are GraphQL connections — query them via edges/node.
    query: |
      query adminOrderDetail($id: ID!) {
        adminOrderDetail(id: $id) {
          id
          _id
          incrementId
          status
          statusLabel
          grandTotal
          formattedGrandTotal
          paymentTitle
          customer {
            id
            email
            name
            group { id code name }
          }
          billingAddress { city state country postcode }
          shippingAddress { city state country postcode }
          items {
            edges {
              node {
                id
                sku
                type
                name
                qtyOrdered
                price
                formattedPrice
              }
            }
          }
          invoices { edges { node { id state grandTotal } } }
          shipments { edges { node { id status carrierTitle } } }
        }
      }
    variables: |
      {
          "id": "/api/admin/orders/2392"
      }
    response: |
      {
        "data": {
          "adminOrderDetail": {
            "id": "/api/admin/orders/2392",
            "_id": 2392,
            "incrementId": "2392",
            "status": "processing",
            "statusLabel": "Processing",
            "grandTotal": 4000,
            "formattedGrandTotal": "$4,000.00",
            "paymentTitle": "Money Transfer",
            "customer": {
              "id": "19",
              "email": "admin@example.com",
              "name": "Test User",
              "group": { "id": "2", "code": "general", "name": "General" }
            },
            "billingAddress": { "city": "New York", "state": "NY", "country": "US", "postcode": "10001" },
            "shippingAddress": { "city": "New York", "state": "NY", "country": "US", "postcode": "10001" },
            "items": {
              "edges": [
                {
                  "node": {
                    "id": "/api/order_detail_items/2694",
                    "sku": "test65",
                    "type": "simple",
                    "name": "Classic Watch Hand",
                    "qtyOrdered": 1,
                    "price": 4000,
                    "formattedPrice": "$4,000.00"
                  }
                }
              ]
            },
            "invoices": { "edges": [] },
            "shipments": { "edges": [] }
          }
        }
      }
---

# Order Detail

Returns the complete order-view payload for a single order — the data behind
the admin **Sales → Orders → View** screen.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminOrderDetail` | Query | Full detail of one order by ID |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- The `id` argument is the resource IRI — `"/api/admin/orders/{id}"`.
- Everything the order-view screen needs is embedded inline: customer (with
  group), billing/shipping addresses, items, invoices, shipments.

## GraphQL shape notes

- **Nested collections are connections.** `items`, `invoices`, and `shipments`
  are returned as GraphQL cursor connections — query them via
  `items { edges { node { ... } } }`, not as plain arrays. (The REST endpoint
  returns plain arrays instead — different idiom per transport.)
- **`id` vs `_id`.** `id` is the resource IRI (`/api/admin/orders/2392`);
  `_id` is the raw integer.

## Product-type-aware items

Each item `node` carries a `type` (`simple`, `configurable`, `bundle`,
`downloadable`, `grouped`, `virtual`). Select the type-specific fields you need
and switch on `type` in the client:

| `type` | Type-specific fields |
|--------|----------------------|
| `simple`, `virtual` | — |
| `configurable` | `child { ... }`, `additional` |
| `bundle`, `grouped` | `children { edges { node { ... } } }`, `additional` |
| `downloadable` | `downloadableLinks` |
