---
outline: false
---

# Channels

A **channel** is a storefront. Each channel is a self-contained shopping front with its own hostname/domain, theme, timezone, default and allowed locales, base and allowed currencies, inventory sources, root category, SEO defaults, and maintenance mode. One store can run several channels at once — for example a US storefront and an EU storefront, each on its own domain with its own currency and language set. This menu mirrors the admin **Settings → Channels** screen.

## What a channel holds

| Field | Meaning |
|-------|---------|
| `code` | Unique channel code. |
| `name` / `description` | Display name and description (translatable per locale). |
| `hostname` | The domain/URL the channel is served on. |
| `theme` | The storefront theme assigned to the channel. |
| `timezone` | The channel's timezone. |
| `defaultLocaleId` | The channel's default language — must be one of the assigned locales. |
| `locales` | The languages available on this channel — a connection of locale objects (`_id` / `code` / `name` / `direction`). |
| `baseCurrencyId` | The channel's base currency — must be one of the assigned currencies. |
| `currencies` | The currencies available on this channel — a connection of currency objects (`_id` / `code` / `name` / `symbol`). |
| `inventorySources` | The inventory sources this channel sells from — a connection of source objects (`_id` / `code` / `name` / `status`). |
| `rootCategoryId` | The top category of the channel's catalog tree. |
| `seoMetaTitle` / `seoMetaDescription` / `seoMetaKeywords` | The home-page SEO defaults, as flat selectable fields. The whole block is also available as the `homeSeo` object. |
| `isMaintenanceOn` / `maintenanceModeText` | Whether the storefront is in maintenance mode, and the message shown to visitors while it is. |
| `allowedIps` | IP / CIDR strings allowed through while maintenance mode is on (JSON array). |
| `logo` / `logoUrl`, `favicon` / `faviconUrl` | Branding images — the stored path and the ready-to-use absolute URL. |
| `translations` | Per-locale values for the translatable fields — a connection of translation objects (`_id` / `locale` / `name` / `description` / `maintenanceModeText` / `homeSeo`). |

::: warning Reading the assignments
A channel's assigned locales, currencies, and inventory sources are exposed as the `locales` / `currencies` / `inventorySources` **object connections**. Read the assigned ids as `locales { edges { node { _id } } }` (and the same for currencies / inventory sources), alongside each row's `code` / `name` / etc.
:::

The `locales` / `currencies` / `inventorySources` / `translations` connections are detail-only — they come back empty on listing rows. Fetch a single channel to get them populated, sub-selecting `{ edges { node { … } } }`.

## How translatable fields work

Translatable scalars — `name`, `description`, the SEO triplet, and `maintenanceModeText` — exist once per locale. When you **create** a channel, the top-level values you send are broadcast to every locale you assign, so the new channel comes back with one `translations` connection node per assigned locale. When you **update**, a top-level scalar edits the channel's request locale only; other locales keep their previous values.

## Creating, updating, and deleting

- **Create** requires a unique `code`, non-empty `locales` / `currencies` / `inventorySources` arrays, a `defaultLocaleId` that is one of the assigned locales, a `baseCurrencyId` that is one of the assigned currencies, and a `rootCategoryId`.
- **Update** is partial — send only the fields you want to change. **Omitting** the `locales` / `currencies` / `inventorySources` arrays preserves the channel's existing assignments; **supplying** any of them replaces that set entirely, so always send the full intended set.
- **Delete** is guarded: the store refuses to delete the **last remaining channel** and refuses to delete the **default app channel**. Both come back as an `errors[]` entry. On success the deleted record is returned as a snapshot, so you can select `id` / `_id` / `code` / `name` to confirm what was removed.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List channels](./list) | `adminSettingsChannels` query |
| [Get a single channel](./detail) | `adminSettingsChannel(id:)` query |
| [Create a channel](./create) | `createAdminSettingsChannel` mutation |
| [Update a channel](./update) | `updateAdminSettingsChannel` mutation |
| [Delete a channel](./delete) | `deleteAdminSettingsChannel` mutation |

Permissions: `settings.channels.create` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
