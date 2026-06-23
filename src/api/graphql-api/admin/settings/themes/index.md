---
outline: false
---

# Themes

The Themes menu controls the **theme customizations** that drive your storefront's content blocks per sales channel. It mirrors the admin **Settings → Themes** screen.

Despite the name, this menu does **not** install or switch site templates. Each row is a single content block — a product carousel, a static HTML/CSS snippet, an image slider, a footer-links group, or a service block — bound to one channel and one theme code, with its visible content stored per locale.

## What each `type` renders

The `type` you pick at creation decides what the block renders on the storefront and what shape its per-locale `options` take.

| `type` | Renders |
|--------|---------|
| `product_carousel` | A horizontal slider of products selected by filter/sort criteria. |
| `category_carousel` | A horizontal slider of categories. |
| `static_content` | A free-form HTML + CSS snippet injected into the page. |
| `image_carousel` | A rotating banner of slide images, each with a link. |
| `footer_links` | A grouped set of footer link columns. |
| `services_content` | A row of service blocks (icon + title + description), e.g. "Free Shipping". |

## Fields

| Field | Meaning |
|-------|---------|
| `name` | Internal label for the block, shown in the admin grid. |
| `type` | The block kind — fixed at creation (see the table above). |
| `sortOrder` | Position of this block relative to other blocks on the same channel (lower shows first). |
| `themeCode` | The theme code this block belongs to (e.g. `default`). |
| `channelId` | The sales channel this block is bound to. |
| `status` | `true` = active (rendered on the storefront), `false` = inactive. |
| `translations` | The per-locale `options` content, a field-selectable connection (detail only — see below). |

## Per-locale `options`

A block's actual content lives in its per-locale `options` and is **not** set at creation. Create the block with its scalar fields first (step 1), then fill in the content with the [Update](./update) mutation, passing the target `locale` and an `options` object whose shape depends on the block's `type`. Repeat per locale to localize the block. The [Detail](./detail) query returns every locale's `options` as a connection — select `translations { edges { node { _id locale options } } }`.

## What each operation does

| Operation | What it does |
|-----------|--------------|
| **Create** | Creates the block with its step-1 scalars (`name`, `type`, `sortOrder`, `themeCode`, `channelId`, `status`). The block starts with empty `translations`. |
| **Update** | Sets the per-locale `options` for one `locale`, and/or edits the scalar fields. |
| **Delete** | Removes the block and wipes its associated storage directory. |
| **Mass Delete** | Removes several blocks at once by their ids. Non-existent ids are skipped. |
| **Mass Update Status** | Bulk-sets `status` (active/inactive) on the selected blocks. |

## Quirks

- **Image / file fields are path strings only.** For `image_carousel` slides and `services_content` icons, the `options` accept already-uploaded storage **paths** — binary file upload is not available here. Use the admin panel to upload new files.
- **`<script>` is stripped from `static_content`.** Any `<script>...</script>` blocks in a `static_content` block's `options.html` or `options.css` are removed before saving.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List theme customizations](./list) | `adminSettingsThemes` query |
| [Get a theme customization](./detail) | `adminSettingsTheme(id:)` query |
| [Create a theme customization](./create) | `createAdminSettingsTheme` mutation |
| [Update a theme customization](./update) | `updateAdminSettingsTheme` mutation |
| [Delete a theme customization](./delete) | `deleteAdminSettingsTheme` mutation |
| [Mass delete theme customizations](./mass-delete) | `createAdminSettingsThemeMassDelete` mutation |
| [Mass update status](./mass-update-status) | `createAdminSettingsThemeMassUpdateStatus` mutation |

Permissions: `settings.themes.create` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
