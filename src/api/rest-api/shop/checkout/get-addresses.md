---
outline: false
examples:
  - id: get-checkout-addresses
    title: Get Checkout Addresses
    description: Retrieve the guest / authenticated customer's saved checkout addresses to select as shipping or billing address during checkout.
    request: |
      GET /api/shop/checkout-addresses
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 281,
          "addressType": "cart_billing",
          "parentAddressId": null,
          "orderId": null,
          "firstName": "Jane",
          "lastName": "Doe",
          "gender": null,
          "companyName": null,
          "address": "12 Elm Street",
          "city": "New York",
          "state": "NY",
          "country": "US",
          "postcode": "10001",
          "email": "jane@example.com",
          "phone": "12125550111",
          "vatId": null,
          "defaultAddress": false,
          "useForShipping": false,
          "additional": null,
          "createdAt": "2026-08-07T17:27:28+05:30",
          "updatedAt": "2026-08-07T17:27:28+05:30",
          "name": "Jane Doe"
        },
        {
          "id": 282,
          "addressType": "cart_shipping",
          "parentAddressId": null,
          "orderId": null,
          "firstName": "Jane",
          "lastName": "Doe",
          "gender": null,
          "companyName": null,
          "address": "12 Elm Street",
          "city": "New York",
          "state": "NY",
          "country": "US",
          "postcode": "10001",
          "email": "jane@example.com",
          "phone": "12125550111",
          "vatId": null,
          "defaultAddress": false,
          "useForShipping": false,
          "additional": null,
          "createdAt": "2026-08-07T17:27:28+05:30",
          "updatedAt": "2026-08-07T17:27:28+05:30",
          "name": "Jane Doe"
        }
      ]
    commonErrors:
      - error: Empty array
        cause: No checkout address has been saved on this cart yet
        solution: Save one with Set Checkout Address; an empty list is a 200, not an error
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token

---

# Get Checkout Addresses

Retrieve guest / the authenticated customer's checkout saved addresses so they can select one as their shipping or billing address during checkout. This endpoint returns previously saved addresses — it does not create new ones.

## Endpoint

```
GET /api/shop/checkout-addresses
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Accept` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | The cart's own token as a Bearer token, or a logged-in customer's token. |

## Response Fields (200 OK)

A bare array of the addresses saved **on this cart** — typically two entries, the billing one and the shipping one, told apart by `addressType`. This is not the customer's address book; that is [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses).

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Address record ID. |
| `addressType` | string | `cart_billing` or `cart_shipping`. |
| `firstName` / `lastName` / `name` | string | Recipient. `name` is the two joined. |
| `address` | string | Street address. Note the read returns `address`, while the save call takes `billingAddress` / `shippingAddress`. |
| `city` / `state` / `country` / `postcode` | string | Location. |
| `email` / `phone` | string | Contact details. |
| `companyName` / `vatId` / `gender` | string | Optional details, `null` when not supplied. |
| `defaultAddress` / `useForShipping` | boolean | Flags carried on the row; both read `false` on a cart address regardless of the `useForShipping` sent when saving. |
| `parentAddressId` | integer | The address-book entry this was copied from, `null` when typed in at checkout. |
| `orderId` | integer | `null` until the cart becomes an order. |
| `additional` | object | Extra stored data, usually `null`. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

Before the address step runs, the response is `[]`.

## Use Cases

- **Re-render the checkout review step** — read both addresses back after a page reload without re-asking the shopper.
- **Confirm "ship to billing" took effect** — with `useForShipping` sent as `true`, two rows come back holding the same details.

## Best Practices

- **Split the array by `addressType`** — both rows live in one list, so a page rendering `[0]` as billing will be wrong whenever the order differs.
- **Do not read `useForShipping` from this payload** — it reflects the stored row, not the flag you sent, and is `false` on both rows.
- **Treat `[]` as "step not done"** — it is a normal state before the address is saved, not an error.

## Related Resources

- [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address) — the same call with a separate delivery address
- [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address) — save both checkout addresses in one call
- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods) — the rates available for the saved address

This endpoint returns only the addresses attached to the current checkout, one row per type. It is not the customer's address book — read that with [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses).
