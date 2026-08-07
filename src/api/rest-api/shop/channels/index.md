---
outline: false
apiType: rest
---

# Channel

The Channel menu describes the storefronts (channels) the store publishes — each with its own code, hostname, theme, default locale and currency. Use it to learn which channel a client is operating against and to render channel-specific labels and content.

## Channels and Translations

- **Channels** return the configured storefronts and their settings — code, hostname, theme, maintenance flag, and the enabled locales and currencies.
- **Channel translations** hold a channel's localised text: its name, description, home and footer content, and the maintenance-mode message.

## The Channel Object Carries No Name

A channel's display name lives in its translation, not on the channel itself. Both `translation` (the request locale) and `translations` (all locales) come back as **path references**, so rendering a channel switcher means following `translation` for each channel. The same applies to `locales`, `currencies`, `defaultLocale`, and `baseCurrency` — all references rather than nested objects.

The SEO block is the exception: `homeSeo` is returned inline as an object of `meta_title`, `meta_keywords`, and `meta_description`, so a home-page `<head>` can be built from the channel row alone.

## What the `code` Is For

`code` is the value every other endpoint expects in the `X-Channel` header — the numeric `id` is not accepted there. Channel scope decides which products, categories, and prices a request sees, and the wishlist is stored per channel, so a shopper's saved items differ between storefronts.

## Maintenance Mode

`isMaintenanceOn` tells a client the storefront is closed; `allowedIps` lists any addresses still let through. The message to show comes from the channel's translation, so read that before rendering a maintenance screen.

## Timestamps May Be Null

Channels installed with the store return `null` for `createdAt` and `updatedAt`. Treat those as absent rather than as an error.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Channels](/api/rest-api/shop/channels/get-channels) | `GET /api/shop/channels` | List the store's channels. |
| [Channel Translations](/api/rest-api/shop/channels/get-channel-translations) | `GET /api/shop/channel_translations` | Localised content for a channel. |

All Channel endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
