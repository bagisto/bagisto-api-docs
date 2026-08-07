---
outline: false
examples:
  - id: subscribe-newsletter
    title: Subscribe to Newsletter
    description: Subscribe an email address to the newsletter on the current channel. A customer token is optional — send it only to link the subscription to that account.
    request: |
      POST /api/shop/newsletters
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "customerEmail": "jane@example.com"
      }
    response: |
      HTTP/1.1 201 Created

      {
        "success": true,
        "message": "You have successfully subscribed to our newsletter."
      }
    commonErrors:
      - error: 400 Bad Request — The customer email has already been taken.
        cause: That address is already in the subscribers list
        solution: Treat it as already subscribed; there is no re-subscribe call
      - error: 400 Bad Request — The customer email field must be a valid email address.
        cause: The value is not a well-formed email
        solution: Validate the address client-side before submitting
      - error: 400 Bad Request — The customer email field is required.
        cause: customerEmail was missing from the body
        solution: Send customerEmail as a string

---

# Subscribe to Newsletter

Subscribe an email address to the store newsletter for the current channel.

## Endpoint

```
POST /api/shop/newsletters
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | No | Customer Bearer token. Optional — when sent, the subscription is linked to that customer; without it the row is stored as a guest subscription. |

## Request Body

```json
{
  "customerEmail": "jane@example.com"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customerEmail` | string | Yes | Email address to subscribe. Must be a valid email and unique in the subscribers list. |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` when the subscription was created successfully. |
| `message` | string | Human-readable confirmation or error message. |

## Validation

| Rule | Failure |
|------|---------|
| `customerEmail` is required | `400` — `The customer email field is required.` |
| It must be a valid email address | `400` — `The customer email field must be a valid email address.` |
| It must not already be subscribed | `400` — `The customer email has already been taken.` |

Uniqueness is checked across the whole subscribers list, not per channel, so an address subscribed on one channel cannot be subscribed again on another.

## Use Cases

- **Footer opt-in form** — post the typed address with the storefront key alone; no login step is needed.
- **Opt-in during registration or checkout** — send the customer's token as well so the subscription is attached to their account and follows them in the admin panel.

## Best Practices

- **Rate-limit the form yourself** — the endpoint is public, so an unguarded field invites automated signups.
- **Treat "already been taken" as success in the UI** — the shopper is subscribed either way, and surfacing it as an error reads as a fault.
- **Send the customer token when one exists** — otherwise a logged-in shopper's subscription is stored unlinked and the store cannot tie it to their account.
- **Validate the address before posting** — the server check is exact-match, so a typo is stored as a real subscriber that only an admin can remove.

## Related Resources

- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
- [Create Newsletter (GraphQL)](/api/graphql-api/shop/mutations/create-newsletter) — the same subscription over GraphQL
