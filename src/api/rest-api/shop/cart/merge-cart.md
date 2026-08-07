---
outline: false
examples:
  - id: merge-cart
    title: Merge Guest Cart into Customer Cart
    description: After a guest logs in, merge the guest cart's items into the authenticated customer's cart. Send the customer's Bearer token and the guest cart's id.
    request: |
      POST /api/shop/merge-carts
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 867|DlQxl04kMnUjSpduZpd2gaVWX8oi3vvGY3RZn4pE

      {
        "cartId": 6884
      }
    response: |
      {
        "id": 6885,
        "cartToken": "6885",
        "customerId": 1533,
        "channelId": 1,
        "itemsCount": 1,
        "itemsQty": 1,
        "items": [
          {
            "id": 7763,
            "cartId": 6885,
            "productId": 1,
            "name": "Coastal Breeze Men's Blue Zipper Hoodie",
            "sku": "COASTALBREEZEMENSHOODIE",
            "quantity": 1,
            "price": 100,
            "total": 100,
            "type": "simple",
            "formattedPrice": "$100.00",
            "formattedTotal": "$100.00"
          }
        ],
        "subtotal": 100,
        "grandTotal": 100,
        "taxAmount": 0,
        "discountAmount": 0,
        "couponCode": null,
        "formattedSubtotal": "$100.00",
        "formattedGrandTotal": "$100.00",
        "success": true,
        "message": "Cart merged successfully."
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: No customer Bearer token — merge requires an authenticated customer
        solution: Log the customer in first and send the customer token in the Authorization header
      - error: 404 Not Found
        cause: The guest cart id does not exist
        solution: Pass the id of a valid, active guest cart

---

# Merge Cart

Merge a **guest cart** into the **authenticated customer's cart**. This is used when a shopper adds items to a cart as a guest and then logs in — the guest cart's items are moved into the customer's own cart so nothing is lost.

## Endpoint

```
POST /api/shop/merge-carts
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | The **customer** Bearer token (from customer login) — not the cart token |

## Request Body

```json
{
  "cartId": 6884
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cartId` | integer | Yes | The id of the guest cart to merge into the customer cart |

## How the merge works

1. **Auth is required** — the request must carry a customer Bearer token. A guest (no token) is rejected with `401`.
2. **The guest cart is looked up by `cartId`** — an unknown id returns `404`.
3. The items are merged into the customer's **active** cart (one is created if the customer has none):
   - An item already in the customer cart with the **same product and type** has its **quantities added together**.
   - Any other item is **copied** into the customer cart (a configurable product's selected-variant child is copied too).
4. The **guest cart is deactivated** after the merge.
5. Invalid items are pruned (a deleted product, or a configurable item missing its variant), then **totals are recalculated**.
6. The response is the full, up-to-date **customer cart**.

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | The merged (customer) cart id |
| `cartToken` | string | Cart token identifier |
| `customerId` | integer | Owner customer id |
| `channelId` | integer | Sales channel id |
| `itemsCount` | integer | Distinct item count |
| `itemsQty` | integer | Total quantity across items |
| `items` | array | The merged line items |
| `subtotal` | decimal | Subtotal before tax and discount |
| `grandTotal` | decimal | Final total |
| `taxAmount` | decimal | Tax total |
| `discountAmount` | decimal | Discount total |
| `couponCode` | string \| null | Applied coupon, if any |
| `formattedSubtotal` | string | Subtotal with currency symbol |
| `formattedGrandTotal` | string | Grand total with currency symbol |
| `success` | boolean | Whether the merge succeeded |
| `message` | string | Result message |

## Notes

- Send the **customer** token, not the guest cart token — the guest cart is identified by the `cartId` in the body.
- After a successful merge the guest cart is inactive; continue with the returned customer cart through checkout.

## Related Resources

- [Create Cart](/api/rest-api/shop/cart/create-cart) — obtain the cart token every other cart call needs
- [Get Cart](/api/rest-api/shop/cart/get-cart) — read the current items and recalculated totals
- [Cart workflow](/api/workflows/shop/cart) — the guest-to-customer cart flow end to end
