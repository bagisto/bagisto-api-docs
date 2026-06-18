---
outline: false
examples:
  - id: admin-order-detail
    title: Get Order Detail
    description: Full order-view payload for one order. Top-level scalars are selected normally; the customer is a typed object you sub-select; addresses / items / invoices / shipments / refunds / comments are field-selectable Relay connections (edges { node { … } }).
    query: |
      query adminOrderDetail($id: ID!) {
        adminOrderDetail(id: $id) {
          id
          _id
          incrementId
          status
          statusLabel
          channelName
          isGuest
          customerEmail
          customerFirstName
          customerLastName
          shippingTitle
          paymentTitle
          couponCode
          totalItemCount
          totalQtyOrdered
          orderCurrencyCode
          grandTotal
          baseGrandTotal
          formattedGrandTotal
          subTotal
          formattedSubTotal
          totalDue
          formattedTotalDue
          createdAt
          customer {
            name
            email
            firstName
            lastName
            phone
            group {
              code
              name
            }
          }
          addresses {
            edges {
              node {
                addressType
                firstName
                lastName
                address
                city
                state
                country
                postcode
                phone
              }
            }
          }
          items {
            edges {
              node {
                _id
                sku
                type
                name
                productId
                qtyOrdered
                qtyInvoiced
                price
                total
                taxAmount
                discountAmount
              }
            }
          }
          invoices {
            edges {
              node {
                _id
                incrementId
                state
                grandTotal
              }
            }
          }
          shipments {
            edges {
              node {
                _id
                carrierTitle
                trackNumber
                totalQty
              }
            }
          }
          refunds {
            edges {
              node {
                _id
                state
                grandTotal
              }
            }
          }
          comments {
            edges {
              node {
                _id
                comment
                customerNotified
                createdAt
              }
            }
          }
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
            "channelName": "bagisto store",
            "isGuest": false,
            "customerEmail": "admin@example.com",
            "customerFirstName": "Test",
            "customerLastName": "User",
            "shippingTitle": "Free Shipping - Free Shipping",
            "paymentTitle": "Money Transfer",
            "couponCode": null,
            "totalItemCount": 1,
            "totalQtyOrdered": 1,
            "orderCurrencyCode": "USD",
            "grandTotal": 4000,
            "baseGrandTotal": 4000,
            "formattedGrandTotal": "$4,000.00",
            "subTotal": 4000,
            "formattedSubTotal": "$4,000.00",
            "totalDue": 0,
            "formattedTotalDue": "$0.00",
            "createdAt": "2026-05-19 13:13:29",
            "customer": {
              "name": "Test User",
              "email": "admin@example.com",
              "firstName": "Test",
              "lastName": "User",
              "phone": "145234234",
              "group": {
                "code": "general",
                "name": "General"
              }
            },
            "addresses": {
              "edges": [
                {
                  "node": {
                    "addressType": "order_billing",
                    "firstName": "John",
                    "lastName": "Doe",
                    "address": "123 Main St",
                    "city": "New York",
                    "state": "NY",
                    "country": "US",
                    "postcode": "10001",
                    "phone": "1234567890"
                  }
                },
                {
                  "node": {
                    "addressType": "order_shipping",
                    "firstName": "John",
                    "lastName": "Doe",
                    "address": "123 Main St",
                    "city": "New York",
                    "state": "NY",
                    "country": "US",
                    "postcode": "10001",
                    "phone": "1234567890"
                  }
                }
              ]
            },
            "items": {
              "edges": [
                {
                  "node": {
                    "_id": 2694,
                    "sku": "test65",
                    "type": "simple",
                    "name": "Classic Watch Hand",
                    "productId": 2358,
                    "qtyOrdered": 1,
                    "qtyInvoiced": 0,
                    "price": 4000,
                    "total": 4000,
                    "taxAmount": 0,
                    "discountAmount": 0
                  }
                }
              ]
            },
            "invoices": {
              "edges": []
            },
            "shipments": {
              "edges": []
            },
            "refunds": {
              "edges": []
            },
            "comments": {
              "edges": [
                {
                  "node": {
                    "_id": 11,
                    "comment": "Customer called to confirm the shipping address.",
                    "customerNotified": false,
                    "createdAt": "2026-05-19 14:02:10"
                  }
                }
              ]
            }
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
- Everything the order-view screen needs is embedded: customer (with group),
  addresses, items, invoices, shipments, refunds, and the comment thread
  (`comments`, newest first).

## GraphQL shape notes

- **`customer` is a typed object** — sub-select the fields you need:
  `customer { name email group { code name } }`. It is `null` for guest orders;
  the buyer's name/email are still on the top-level `customerEmail` /
  `customerFirstName` / `customerLastName` fields.
- **`addresses` is a Relay connection** carrying both the billing and shipping
  address — query `addresses { edges { node { addressType city … } } }` and read
  `addressType` (`order_billing` / `order_shipping`) on each node to tell them
  apart.
- **`items`, `invoices`, `shipments`, `refunds`, `comments` are Relay
  connections** — query each as `{ edges { node { … } } }` and pick exactly the
  sub-fields you need.
- **`id` vs `_id`.** `id` is the resource IRI (`/api/admin/orders/2392`);
  `_id` is the raw integer. Connection nodes expose `_id`.

## Product-type-aware items

Each item node carries a `type` (`simple`, `configurable`, `bundle`,
`downloadable`, `grouped`, `virtual`). Select the type-specific fields you need
per node:

| `type` | Type-specific fields available on the item node |
|--------|--------------------------------------------------|
| `simple`, `virtual` | — |
| `configurable` | `child`, `additional` |
| `bundle`, `grouped` | `children { edges { node { … } } }`, `additional` |
| `downloadable` | `downloadableLinks` |
