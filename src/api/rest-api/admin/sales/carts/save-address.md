---
outline: false
apiType: rest
examples:
  - id: admin-cart-save-address
    title: Save Cart Addresses
    description: Set the billing (and shipping unless billing.useForShipping is true) addresses on the draft cart and recollect totals.
    query: |
      curl -X POST "https://your-domain.com/api/admin/carts/314/addresses" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "billing": {
            "firstName": "Jane", "lastName": "Doe",
            "email": "jane@example.com",
            "address": ["12 Main St"],
            "city": "Berlin", "country": "DE", "state": "BE",
            "postcode": "10115", "phone": "+4930123456",
            "useForShipping": true
          }
        }'
    variables: |
      {
        "billing": {
          "firstName": "Jane",
          "lastName": "Doe",
          "email": "jane@example.com",
          "address": ["12 Main St"],
          "city": "Berlin",
          "country": "DE",
          "state": "BE",
          "postcode": "10115",
          "phone": "+4930123456",
          "useForShipping": true
        }
      }
    response: |
      {
        "id": 314,
        "billingAddress": {
          "firstName": "Jane", "lastName": "Doe",
          "address": "12 Main St", "city": "Berlin",
          "country": "DE", "state": "BE", "postcode": "10115"
        },
        "shippingAddress": { /* same as billing when useForShipping = true */ },
        "success": true,
        "message": "Address saved."
      }
    commonErrors:
      - error: Bad Request (400)
        cause: billing object missing or empty
        solution: Send at least a billing address
      - error: Unprocessable Entity (422)
        cause: a required address field is missing
        solution: Send every required field (see below) for billing — and for shipping when useForShipping is false
---

# Save Cart Addresses

Saves the billing (and optionally a separate shipping) address on the draft
cart. CamelCase keys (`firstName`, `useForShipping`) are accepted and normalised
to snake_case before being saved.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{id}/addresses` | POST |

If `billing.useForShipping` is `true`, the `shipping` block is optional and
the billing address is reused for shipping.

## Required fields

Each address (billing always; shipping too when `useForShipping` is `false`)
must include every one of these fields, otherwise the request is rejected with
`422`:

`firstName`, `lastName`, `email`, `address` (a non-empty array of street lines),
`city`, `country`, `state`, `postcode`, `phone`. `companyName` is optional.
