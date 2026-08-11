---
outline: false
apiType: rest
---

# Newsletter

The Newsletter menu lets a shopper opt in to the store's marketing emails. It is a single endpoint, and it is **public** — a footer signup form works for visitors who are not logged in.

## Who Can Subscribe

A customer Bearer token is optional. Sent, the subscription row is linked to that customer's account and shows against them in the admin panel; omitted, it is stored as a guest subscription against the email address alone. Either way the storefront key is required.

## One Address, One Subscription

The email must be unique across the whole subscribers list — not per channel. An address already subscribed is rejected with `400` and the message `The customer email has already been taken.`, which in practice means "already subscribed" rather than a fault. There is no re-subscribe call and no unsubscribe endpoint on the storefront API; a shopper who opts out does so through the link in the emails themselves.

## What Success Means

A `201` means the subscription row was created. The store still sends its own confirmation email, so treat the response as "request accepted" rather than proof the shopper has confirmed.

## Guard the Form Yourself

Because the endpoint takes only the storefront key, an unprotected public form invites automated signups. Rate limiting or a captcha in front of it is the client's responsibility — the API applies no additional check beyond the email-uniqueness rule.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Subscribe to Newsletter](/api/rest-api/shop/newsletter/subscribe) | `POST /api/shop/newsletters` | Subscribe the customer to the newsletter. |

The Newsletter endpoint is public — it needs the storefront key only. A customer Bearer token is optional and simply links the subscription to that account. See [Authentication](/api/rest-api/authentication).
