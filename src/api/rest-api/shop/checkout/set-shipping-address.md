---
outline: false
examples:
  - id: set-shipping-address
    title: Ship to a Different Address
    description: Send useForShipping false together with the shipping fields so the parcel goes somewhere other than the billing address. Both addresses are saved by the same call.
    request: |
      curl -X POST "http://localhost/api/shop/checkout-addresses" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
        -H "Authorization: Bearer 62f2b3f5-a455-4c78-93ba-eabca63d32ec" \
        -d '{
              "billingFirstName": "Jane",
              "billingLastName": "Doe",
              "billingEmail": "jane@example.com",
              "billingAddress": "12 Market Street",
              "billingCity": "New York",
              "billingState": "NY",
              "billingCountry": "US",
              "billingPostcode": "10001",
              "billingPhoneNumber": "+12125550123",
              "useForShipping": false,
              "shippingFirstName": "John",
              "shippingLastName": "Smith",
              "shippingEmail": "john@example.com",
              "shippingAddress": "500 Union Avenue",
              "shippingCity": "Brooklyn",
              "shippingState": "NY",
              "shippingCountry": "US",
              "shippingPostcode": "11211",
              "shippingPhoneNumber": "+12125550188"
            }'
    response: |
      HTTP/1.1 201 Created

      {
        "id": 269,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "customerId": null,
        "billingFirstName": "Jane",
        "billingLastName": "Doe",
        "billingEmail": "jane@example.com",
        "billingAddress": "12 Market Street",
        "billingCity": "New York",
        "billingState": "NY",
        "billingCountry": "US",
        "billingPostcode": "10001",
        "billingPhoneNumber": "+12125550123",
        "shippingFirstName": "John",
        "shippingLastName": "Smith",
        "shippingEmail": "john@example.com",
        "shippingAddress": "500 Union Avenue",
        "shippingCity": "Brooklyn",
        "shippingState": "NY",
        "shippingCountry": "US",
        "shippingPostcode": "11211",
        "shippingPhoneNumber": "+12125550188",
        "useForShipping": false
      }
    commonErrors:
      - error: 500 Shipping address is required
        cause: useForShipping is false but the shipping fields were not supplied
        solution: Send the full shipping block, or set useForShipping to true to reuse the billing address.
      - error: 500 Billing address is required
        cause: The billing fields were omitted
        solution: Billing is always required, even when shipping elsewhere.

---

# Set Shipping Address

Save a delivery address that differs from the billing address.

## Endpoint

```
POST /api/shop/checkout-addresses
```

This is the same endpoint as [Set Checkout Address](/api/rest-api/shop/checkout/set-billing-address) — one call saves both addresses. There is no shipping-only endpoint, so the billing fields are required here too.

## How the two addresses relate

| `useForShipping` | What to send | Result |
|------------------|--------------|--------|
| `true` | Billing fields only | The billing address is copied to the shipping address. |
| `false` | Billing fields **and** the full shipping block | The two are stored separately. |

Omitting the shipping block while `useForShipping` is `false` fails the call — the shipping fields are not optional in that mode.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | `application/json` |
| `Accept` | Yes | `application/json` |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | `Bearer <cartToken>` for a guest, or the customer's Bearer token when signed in |

## Shipping Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `shippingFirstName` | string | Yes | First name at the delivery address. |
| `shippingLastName` | string | Yes | Last name. |
| `shippingEmail` | string | Yes | Contact email for the delivery. |
| `shippingAddress` | string | Yes | Street address. |
| `shippingCity` | string | Yes | City. |
| `shippingState` | string | Yes | State or region code. |
| `shippingCountry` | string | Yes | Two-letter country code. |
| `shippingPostcode` | string | Yes | Postal code. |
| `shippingPhoneNumber` | string | Yes | Contact number for the courier. |
| `shippingCompanyName` | string | No | Company at the delivery address. |

The billing fields are listed on [Set Checkout Address](/api/rest-api/shop/checkout/set-billing-address).

## Use Cases

- **Gift orders** — bill the buyer, deliver to the recipient.
- **Business deliveries** — invoice a head office while shipping to a branch, using `shippingCompanyName`.

## Best Practices

1. **Send both blocks in one call** — there is no way to add a shipping address to an already-saved billing address without re-sending it
2. **Set `useForShipping` explicitly** — leaving it out with no shipping block behaves as an incomplete address
3. **Re-read the rates afterwards** — shipping cost depends on the destination, so the rate list changes when the shipping address does
4. **Use ISO codes** — `US`, `NY`, not full names

## Related Resources

- [Set Checkout Address](/api/rest-api/shop/checkout/set-billing-address) — save both checkout addresses in one call
- [Get Addresses](/api/rest-api/shop/checkout/get-addresses) — read back the addresses saved on the cart
- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods) — the rates available for the saved address
