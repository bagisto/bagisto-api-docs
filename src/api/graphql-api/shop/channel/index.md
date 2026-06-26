---
outline: false
---

# Channel

The Channel menu exposes the storefronts (channels) the store runs — each channel has its own theme, default locale, currencies, and root category. A client uses it to discover the channels available and to read one channel's configuration.

## When you use it

List the channels to see every storefront the store publishes, then fetch a single channel by id for its full configuration (code, name, default locale / currency, hostname, theme).

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Channels](/api/graphql-api/shop/queries/get-channels) | `channels` query |
| [Single Channel](/api/graphql-api/shop/queries/get-channel) | `channel(id:)` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
