---
outline: false
---

# Locales

The Locales menu manages the storefront languages your store can offer. Each locale defines a language a channel can be served in — its `code`, display `name`, text `direction`, and an optional logo. It mirrors the admin **Settings → Locales** screen.

## What a locale controls

A locale is the set of language settings a storefront channel can switch to. A channel is assigned one or more locales and a default locale; shoppers can then browse the store in any of the channel's locales, with all translatable content (product names, CMS pages, category labels) shown in that language.

## When a row appears here

A row exists for every locale configured in the store. The store ships with seeded core locales (such as English) and you add more with the Create mutation. There is no automatic creation — locales appear only when seeded at install or added through this menu.

## Field meanings

| Field | Meaning |
|-------|---------|
| `code` | The locale code (e.g. `en`, `fr`, `pt-br`). Unique across the store. |
| `name` | Human-readable display name shown in the locale switcher. |
| `direction` | Text direction — `ltr` (left-to-right) or `rtl` (right-to-left, e.g. Arabic). Drives how the storefront lays out text when this locale is active. |
| `logoPath` | The stored relative path of the locale's flag/logo image, or `null` when none is set. |
| `logoUrl` | The fully-qualified public URL of that image, derived from `logoPath` — use this to display the logo. `null` when no logo is set. |
| `createdAt` / `updatedAt` | Timestamps. Seeded core locales may have `null` timestamps. |

## What create / update / delete do

- **Create** adds a new locale (`code`, `name`, `direction`). A logo image cannot be uploaded over GraphQL, so new locales start without one.
- **Update** edits an existing locale; it is partial, so send only the fields you change alongside the `id`.
- **Delete** (and **Mass Delete**) remove locales, subject to the guards below.

## Delete guards

A locale cannot be deleted when:

- It is the **last (only) remaining locale** — the store must keep at least one.
- It is the **default locale of one or more channels** — re-point those channels to a different default locale first.

In a single delete the guard surfaces as an `errors[]` entry; in mass delete the blocked id is reported under `skipped` while the rest of the batch proceeds.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List locales](./list.md) | `adminSettingsLocales` query |
| [Get a single locale](./detail.md) | `adminSettingsLocale(id:)` query |
| [Create a locale](./create.md) | `createAdminSettingsLocale` mutation |
| [Update a locale](./update.md) | `updateAdminSettingsLocale` mutation |
| [Delete a locale](./delete.md) | `deleteAdminSettingsLocale` mutation |
| [Mass delete locales](./mass-delete.md) | `createAdminSettingsLocaleMassDelete` mutation |

Permissions: `settings.locales.create` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
