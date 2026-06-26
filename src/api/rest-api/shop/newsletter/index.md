---
outline: false
apiType: rest
---

# Newsletter

The Newsletter menu lets a customer subscribe to the store's newsletter on the current channel. Use it to wire a "subscribe" action into the storefront so shoppers can opt in to marketing emails.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Subscribe to Newsletter](/api/rest-api/shop/newsletter/subscribe) | `POST /api/shop/newsletters` | Subscribe the customer to the newsletter. |

The Newsletter endpoint requires the storefront key and a customer Bearer token — see [Authentication](/api/rest-api/authentication).
