---
outline: false
---

# Newsletter

The Newsletter menu lets a customer subscribe to the store's newsletter on the current channel. A client uses it to power a "subscribe to our newsletter" form.

## When you use it

Submit the customer's email to subscribe them to the newsletter for the current channel. If the email is already subscribed, the call reports that back rather than creating a duplicate.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Create Newsletter](/api/graphql-api/shop/mutations/create-newsletter) | `createNewsletter` mutation |

This operation requires a customer Bearer token — see [Authentication](/api/graphql-api/authentication).
