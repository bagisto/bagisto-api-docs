---
outline: false
examples:
  - id: create-newsletter-basic
    title: Subscribe to Newsletter
    description: Subscribe an email address to the newsletter on the current channel. A customer token is optional and only links the subscription to that account.
    query: |
      mutation createNewsletter($input: createNewsletterInput!) {
        createNewsletter(input: $input) {
          newsletter {
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "customerEmail": "jane@example.com"
        }
      }
    response: |
      {
        "data": {
          "createNewsletter": {
            "newsletter": {
              "success": true,
              "message": "You have subscribed to the newsletter successfully."
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: The storefront key header was missing or wrong
        solution: Login and provide a valid customer authentication token
      - error: invalid-email
        cause: The email address provided is not valid
        solution: Use a properly formatted email address
      - error: already-subscribed
        cause: The email already exists in the subscribers list
        solution: Use an email that is not already subscribed

  - id: create-newsletter-with-mutation-id
    title: Subscribe to Newsletter - With Client Mutation ID
    description: Subscribe and track the mutation with a client-side identifier.
    query: |
      mutation createNewsletter($input: createNewsletterInput!) {
        createNewsletter(input: $input) {
          newsletter {
            success
            message
          }
          clientMutationId
        }
      }
    variables: |
      {
        "input": {
          "customerEmail": "john.doe@example.com",
          "clientMutationId": "newsletter-001"
        }
      }
    response: |
      {
        "data": {
          "createNewsletter": {
            "newsletter": {
              "success": true,
              "message": "You have subscribed to the newsletter successfully."
            },
            "clientMutationId": "newsletter-001"
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: The storefront key header was missing or wrong
        solution: Login and provide a valid customer authentication token
      - error: validation-error
        cause: The email field fails server-side validation
        solution: Provide a valid, non-empty, unique email address
---

# Create Newsletter

## About

The `createNewsletter` mutation subscribes an email address to the store newsletter on the current channel. Use this mutation to:

- Add newsletter opt-in to the storefront footer or account page
- Re-subscribe a customer who previously unsubscribed
- Capture marketing consent during registration or checkout
- Track submissions using `clientMutationId`

The subscription is scoped to the current channel.

## Authentication

The mutation is public — the storefront key alone is enough, so a footer signup form works for guests.

A customer token is optional. When one is sent, the subscription is linked to that customer's account; without it the row is stored as a guest subscription.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `input` | `createNewsletterInput!` | ✅ Yes | Input object containing the subscription fields. |

### Input Fields (`createNewsletterInput`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customerEmail` | `String!` | ✅ Yes | Email address to subscribe. Must be valid and unique in the subscribers list. |
| `clientMutationId` | `String` | ❌ No | Optional client-side identifier for tracking the mutation request. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `newsletter.success` | `Boolean!` | `true` if the subscription was created successfully. |
| `newsletter.message` | `String!` | Human-readable confirmation or error message. |
| `clientMutationId` | `String` | Echoed back from the input if provided. |

## Use Cases

### 1. Storefront Footer Opt-in
Trigger this mutation when a logged-in customer submits the newsletter form, then display `message` as feedback.

### 2. Account Preferences
Let customers manage their marketing consent from the account settings page.

## Best Practices

1. **Validate email client-side first** to reduce unnecessary API calls.
2. **Always read `success`** before showing a success state.
3. **Handle the already-subscribed case** gracefully — surface the server `message`.

## Related Resources

- [Subscribe to Newsletter (REST)](/api/rest-api/shop/newsletter/subscribe)
- [Customer Login](/api/graphql-api/shop/mutations/customer-login)
- [Shop API Overview](/api/graphql-api/shop-api)
