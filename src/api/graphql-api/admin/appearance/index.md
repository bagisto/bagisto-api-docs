---
outline: false
apiType: graphql
---

# Appearance

Appearance is where a store chooses how the storefront looks. It holds two things: the themes the installation has, and the sections each channel draws inside the theme it runs.

## Themes

A theme is a package of storefront templates and assets. The installation knows about two kinds — the ones installed on the server, and the ones listed as available to install. A theme is activated per channel, so two channels can run different themes at the same time.

Activating a theme on a channel does not delete anything. Sections built for the channel's previous theme stay in the database and simply stop being drawn, and they come back if the channel is pointed at that theme again. The impact endpoint reports how many sections a channel would leave behind before anything is written.

## Sections

A section is one block of the storefront page — a carousel, a static block, the footer link set. Each section belongs to one theme and one channel, and its content is stored per locale.

Six types exist: `image_carousel`, `product_carousel`, `category_carousel`, `footer_links`, `static_content` and `services_content`. A type decides the fields a section carries, which the fields endpoint returns as a schema.

Two rules the storefront depends on:

- A channel can have at most one `footer_links` section, because the storefront has one footer to draw it in. Creating or switching a second one is rejected.
- `footer_links` is always drawn last, so a reorder that puts it anywhere else has it moved back to the end.

## Staged edits

Every change to a section — its content, whether it is switched on, and its position — is held as a staged edit rather than being applied to the storefront immediately. Content drafts are per locale; status and order are per section.

A section carries `hasDraft` when it is holding any staged edit. The preview endpoint returns the theme as those edits would leave it, which is what a headless storefront renders to show the merchant their work before it goes live. Publishing promotes every staged edit of a theme and channel at once; discarding throws them all away and leaves the published content untouched.

A newly created section is created switched off with a staged status, so an empty section is never put in front of shoppers before it has been built.

## Operations

| Operation | Purpose |
|----------|---------|
| [adminAppearanceThemes](/api/graphql-api/admin/appearance/themes/list) | Installed and available themes, with the channels each runs on |
| [adminAppearanceTheme](/api/graphql-api/admin/appearance/themes/detail) | One theme by code |
| [adminAppearanceThemeImpact](/api/graphql-api/admin/appearance/themes/impact) | What activating a theme would leave behind |
| [createAdminAppearanceThemeActivate](/api/graphql-api/admin/appearance/themes/activate) | Point channels at a theme |
| [adminAppearanceSections](/api/graphql-api/admin/appearance/sections/list) | Sections of a theme for one channel, in render order |
| [adminAppearanceSection](/api/graphql-api/admin/appearance/sections/detail) | One section with its translations |
| [createAdminAppearanceSection](/api/graphql-api/admin/appearance/sections/create) | Add a section to a theme and channel |
| [updateAdminAppearanceSection](/api/graphql-api/admin/appearance/sections/update) | Write a section's published values |
| [deleteAdminAppearanceSection](/api/graphql-api/admin/appearance/sections/delete) | Remove a section |
| [createAdminAppearanceSectionDraft](/api/graphql-api/admin/appearance/sections/draft) | Hold options as an unpublished draft |
| [createAdminAppearanceSectionStatus](/api/graphql-api/admin/appearance/sections/status) | Stage a section on or off |
| [createAdminAppearanceSectionReorder](/api/graphql-api/admin/appearance/sections/reorder) | Stage a new render order |
| [createAdminAppearanceSectionDuplicate](/api/graphql-api/admin/appearance/sections/duplicate) | Copy a section and its content |
| [createAdminAppearanceSectionPublish](/api/graphql-api/admin/appearance/sections/publish) | Promote every staged edit |
| [createAdminAppearanceSectionDiscard](/api/graphql-api/admin/appearance/sections/discard) | Throw away every staged edit |
| [adminAppearanceSectionFields](/api/graphql-api/admin/appearance/sections/fields) | Field schema and current options |
| [adminAppearanceSectionPreview](/api/graphql-api/admin/appearance/sections/preview) | The theme with staged edits applied |

Uploading media is REST only — a binary upload cannot be carried over GraphQL. See [Upload media](/api/rest-api/admin/appearance/sections/media).

All Appearance operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
