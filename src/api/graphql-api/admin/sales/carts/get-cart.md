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
          customerId
          isGuest
          isActive
          itemsCount
          itemsQty
          subTotal
          formattedSubTotal
          grandTotal
          formattedGrandTotal
          shippingAmount
          formattedShippingAmount
          taxTotal
          formattedTaxTotal
          discountAmount
          formattedDiscountAmount
          couponCode
          shippingMethod
          paymentMethod
          paymentMethodTitle
          haveStockableItems
          items
          billingAddress
          shippingAddress
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
            "_id": 314,
            "customerId": 19,
            "isGuest": false,
            "isActive": false,
            "itemsCount": 1,
            "itemsQty": 1,
            "subTotal": 4000,
            "formattedSubTotal": "$4,000.00",
            "grandTotal": 4000,
            "formattedGrandTotal": "$4,000.00",
            "shippingAmount": 0,
            "formattedShippingAmount": "$0.00",
            "taxTotal": 0,
            "formattedTaxTotal": "$0.00",
            "discountAmount": 0,
            "formattedDiscountAmount": "$0.00",
            "couponCode": null,
            "shippingMethod": null,
            "paymentMethod": null,
            "paymentMethodTitle": null,
            "haveStockableItems": true,
            "items": [
              {
                "id": 41,
                "cartId": 314,
                "productId": 2358,
                "parentId": null,
                "sku": "test65",
                "type": "simple",
                "name": "Classic Watch Hand",
                "quantity": 1,
                "price": 4000,
                "formattedPrice": "$4,000.00",
                "total": 4000,
                "formattedTotal": "$4,000.00",
                "taxAmount": 0,
                "discountAmount": 0,
                "additional": { "quantity": 1 },
                "child": null,
                "children": []
              }
            ],
            "billingAddress": null,
            "shippingAddress": null
          }
        }
      }
---

# Get Cart

Returns the admin draft cart — items, totals, addresses, and the selected
shipping / payment method. Identical payload to the REST endpoint
(`GET /api/admin/carts/{id}`).

## GraphQL shape notes

- **Scalar fields resolve normally.** `customerId`, `isActive`, `itemsCount`,
  `subTotal`, `grandTotal`, `formattedGrandTotal`, `shippingMethod`,
  `paymentMethodTitle`, and the rest are selected like any field and come back
  populated over GraphQL (same values as REST).
- **`items`, `billingAddress`, and `shippingAddress` are JSON scalars —
  request them bare.** Write `items` (not `items { id ... }`); you receive the
  complete JSON for each, identical to REST. `billingAddress` /
  `shippingAddress` are `null` until addresses are saved on the cart.
- **`id` vs `_id`.** `id` is the resource IRI (`/api/admin/carts/314`); `_id`
  is the raw integer.
- Only draft carts (`isActive: false`) are accessible; customer-owned active
  carts are rejected.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminCart(id: ID!)` | Query | Read a draft cart |
