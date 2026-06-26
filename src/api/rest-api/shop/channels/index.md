---
outline: false
apiType: rest
---

# Channel

The Channel menu describes the storefronts (channels) the store publishes — each with its own code, hostname, theme, default locale and currency. Use it to learn which channel a client is operating against and to render channel-specific labels and content.

## Channels and translations

- **Channels** return the configured storefronts and their settings.
- **Channel translations** provide a channel's localised content (such as its name and home/footer text) so a client can display it in the requested language.

The `code` you read here is the same value you pass as the `channel` parameter on catalog and other channel-scoped requests.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Channels](/api/rest-api/shop/channels/get-channels) | `GET /api/shop/channels` | List the store's channels. |
| [Channel Translations](/api/rest-api/shop/channels/get-channel-translations) | `GET /api/shop/channel_translations` | Localised content for a channel. |

All Channel endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
