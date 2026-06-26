---
outline: false
examples:
  - id: subscribe-newsletter
    title: Subscribe to Newsletter
    description: Subscribe the authenticated customer to the newsletter on the current channel.
    request: |
      POST /api/shop/newsletters
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "customerEmail": "jane@example.com"
      }
    response: |
      {
        "success": true,
        "message": "You have subscribed to the newsletter successfully."
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 422 Validation Error
        cause: Email is missing, invalid, or already subscribed
        solution: Provide a valid email that is not already in the subscribers list

---

# Subscribe to Newsletter

Subscribe the authenticated customer to the store newsletter for the current channel.

## Endpoint

```
POST /api/shop/newsletters
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

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

- `customerEmail` is required and must be a valid email format.
- The email must not already exist in the subscribers list for the channel.
- A valid customer Bearer token is required.

## Use Cases

- Newsletter opt-in from the storefront footer or account page
- Re-subscribe a customer who previously unsubscribed
- Capture marketing consent at checkout or registration

## Notes

- The subscription is scoped to the current channel (resolved from the storefront key).
- Field names are camelCase (`customerEmail`).

## Related Resources

- [Contact Us](/api/rest-api/shop/customers)
- [Create Newsletter (GraphQL)](/api/graphql-api/shop/mutations/create-newsletter)
