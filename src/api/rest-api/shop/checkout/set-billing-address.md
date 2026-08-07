---
outline: false
examples:
  - id: set-checkout-address-same
    title: Same Address for Billing and Shipping
    description: Save the checkout address with useForShipping true, which copies the billing fields to the shipping address. This is the common case.
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
              "useForShipping": true
            }'
    response: |
      HTTP/1.1 201 Created

      {
        "id": 268,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "customerId": null,
        "billingFirstName": "Jane",
        "billingLastName": "Doe",
        "billingEmail": "jane@example.com",
        "billingCompanyName": "",
        "billingAddress": "12 Market Street",
        "billingCountry": "US",
        "billingState": "NY",
        "billingCity": "New York",
        "billingPostcode": "10001",
        "billingPhoneNumber": "+12125550123",
        "shippingFirstName": "Jane",
        "shippingLastName": "Doe",
        "shippingEmail": "jane@example.com",
        "shippingCompanyName": "",
        "shippingAddress": "12 Market Street",
        "shippingCountry": "US",
        "shippingState": "NY",
        "shippingCity": "New York",
        "shippingPostcode": "10001",
        "shippingPhoneNumber": "+12125550123",
        "useForShipping": true
      }
    commonErrors:
      - error: 500 Billing address is required
        cause: The billing fields were omitted, for example by sending an addressId instead
        solution: Send the flat billing fields; there is no saved-address shortcut on this endpoint.
      - error: 404 Not Found
        cause: No cart resolves from the supplied token
        solution: Create a cart and add an item before starting checkout.

  - id: set-checkout-address-separate
    title: Separate Shipping Address
    description: Send useForShipping false and supply the shipping fields explicitly when the parcel goes somewhere other than the billing address.
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
        "billingFirstName": "Jane",
        "billingCity": "New York",
        "billingPostcode": "10001",
        "shippingFirstName": "John",
        "shippingCity": "Brooklyn",
        "shippingPostcode": "11211",
        "useForShipping": false
      }
    commonErrors:
      - error: 500 Shipping address is required
        cause: useForShipping is false but the shipping fields were not supplied
        solution: Either set useForShipping to true, or send the full shipping block.

---

# Set Checkout Address

Save the billing and shipping addresses onto the cart. This is the first step of checkout — shipping rates and payment methods are unavailable until it succeeds.

## Endpoint

```
POST /api/shop/checkout-addresses
```

One endpoint saves both addresses. There is no separate billing and shipping call, and no way to reference a saved address by ID — the fields are always sent in full.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | `application/json` |
| `Accept` | Yes | `application/json` |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | `Bearer <cartToken>` for a guest, or the customer's Bearer token when signed in |

## Request Body

### Billing fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `billingFirstName` | string | Yes | First name on the billing address. |
| `billingLastName` | string | Yes | Last name. |
| `billingEmail` | string | Yes | Email the order confirmation goes to. |
| `billingAddress` | string | Yes | Street address. |
| `billingCity` | string | Yes | City. |
| `billingState` | string | Yes | State or region code. |
| `billingCountry` | string | Yes | Two-letter country code. |
| `billingPostcode` | string | Yes | Postal code. |
| `billingPhoneNumber` | string | Yes | Contact number. |
| `billingCompanyName` | string | No | Company, for business orders. |

### Shipping fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `useForShipping` | boolean | No | `true` copies the billing address to the shipping address. Send `false` and the `shipping*` fields to ship elsewhere. |
| `shippingFirstName`, `shippingLastName`, `shippingEmail`, `shippingAddress`, `shippingCity`, `shippingState`, `shippingCountry`, `shippingPostcode`, `shippingPhoneNumber` | string | When `useForShipping` is false | The delivery address, mirroring the billing fields. |
| `shippingCompanyName` | string | No | Company at the delivery address. |

### Fields accepted but belonging to later steps

The same input also accepts `shippingMethod`, `paymentMethod`, `paymentSuccessUrl`, `paymentFailureUrl`, and `paymentCancelUrl`. Setting them here is optional — the dedicated [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method) and [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method) endpoints are the normal route.

## Response

The saved address block, returned as a bare object. When `useForShipping` is `true` the `shipping*` fields echo the billing values.

## Use Cases

- **Guest checkout** — collect the address in a form and post it with the cart token; no account is needed.
- **Ship to a different address** — send `useForShipping: false` with the full shipping block.
- **Signed-in checkout** — send the customer's Bearer token instead of the cart token. The fields are still sent in full; read the customer's saved addresses with [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses) and prefill the form from one.

## Best Practices

1. **Send every billing field** — a missing one fails the whole call with `Billing address is required`, not a field-level validation error
2. **Do not send `addressId`** — the endpoint has no saved-address shortcut, and an ID-only body fails
3. **Use ISO codes for `billingCountry` and `billingState`** — `US` and `NY`, not full names
4. **Re-read shipping methods after any address change** — available rates and their prices depend on the destination
5. **Post the address before reading rates or payment methods** — both return an empty array until it exists

## Related Resources

- [Get Addresses](/api/rest-api/shop/checkout/get-addresses) — read back the addresses saved on the cart
- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods) — the rates available for the saved address
- [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method) — save the chosen rate on the cart
- [Place Order](/api/rest-api/shop/checkout/place-order) — turn the prepared cart into an order
