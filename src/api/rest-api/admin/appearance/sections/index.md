---
outline: false
apiType: rest
---

# Sections

A section is one block of a storefront page. Each belongs to one theme and one channel, carries content per locale, and is drawn in the order the channel gives it.

## Types

| Type | What it draws |
|------|---------------|
| `image_carousel` | A slider of images, each with its own link. |
| `product_carousel` | Products chosen by a filter, drawn as a slider. |
| `category_carousel` | Categories chosen by a filter, drawn as a slider. |
| `footer_links` | The footer link columns. |
| `static_content` | Free HTML and CSS. |
| `services_content` | The service badges strip, each with an icon. |

The type decides the fields a section carries. [Section fields](/api/rest-api/admin/appearance/sections/fields) returns that field set as a schema together with the values currently held, which is enough to build an editor without hard-coding any type.

## Two rules the storefront depends on

- **One footer per channel.** A channel can hold at most one `footer_links` section; creating a second, or switching another section to that type, is rejected with `422`.
- **The footer is drawn last.** A reorder that places `footer_links` anywhere but the end has it moved back, and the response returns the order that was actually stored.

## Staged edits

Nothing a client writes through the draft endpoints reaches shoppers until it is published:

| Staged | Endpoint | Held in |
|--------|----------|---------|
| Content, per locale | [Stage edits](/api/rest-api/admin/appearance/sections/draft) | `draftOptions` on the translation |
| On/off | [Stage status](/api/rest-api/admin/appearance/sections/status) | `draftStatus` |
| Render order | [Stage order](/api/rest-api/admin/appearance/sections/reorder) | `draftSortOrder` |

`hasDraft` on a section is `true` while any of the three is set. [Publish](/api/rest-api/admin/appearance/sections/publish) promotes every staged edit of a theme and channel at once; [Discard](/api/rest-api/admin/appearance/sections/discard) throws them all away. [Preview](/api/rest-api/admin/appearance/sections/preview) returns the theme as those staged edits would leave it.

Creating a section stages it switched off, so an unbuilt section is never shown. Writing published values directly — without the draft cycle — is what [Update section](/api/rest-api/admin/appearance/sections/update) does.

## Media

Images and videos are uploaded first through [Upload media](/api/rest-api/admin/appearance/sections/media), which returns a stored path. The client then records that path in the section's options through the draft or update endpoint. Uploading does not change what a section shows.

## Endpoints

| Endpoint | Purpose |
|----------|---------|
| [List sections](/api/rest-api/admin/appearance/sections/list) | Sections of a theme and channel, in render order |
| [Get section](/api/rest-api/admin/appearance/sections/detail) | One section with its translations |
| [Create section](/api/rest-api/admin/appearance/sections/create) | Add a section |
| [Update section](/api/rest-api/admin/appearance/sections/update) | Write published values |
| [Delete section](/api/rest-api/admin/appearance/sections/delete) | Remove a section |
| [Stage edits](/api/rest-api/admin/appearance/sections/draft) | Hold options as a draft |
| [Stage status](/api/rest-api/admin/appearance/sections/status) | Stage on/off |
| [Stage order](/api/rest-api/admin/appearance/sections/reorder) | Stage render order |
| [Copy section](/api/rest-api/admin/appearance/sections/duplicate) | Copy a section |
| [Publish](/api/rest-api/admin/appearance/sections/publish) | Promote staged edits |
| [Discard](/api/rest-api/admin/appearance/sections/discard) | Throw staged edits away |
| [Section fields](/api/rest-api/admin/appearance/sections/fields) | Field schema and current options |
| [Upload media](/api/rest-api/admin/appearance/sections/media) | Store an image or video |
| [Preview](/api/rest-api/admin/appearance/sections/preview) | Theme with staged edits applied |

## Permissions

| Action | Permission |
|--------|------------|
| Read, fields, preview | `appearance.sections` |
| Create, copy | `appearance.sections.create` |
| Update, draft, status, order, publish, discard, media | `appearance.sections.edit` |
| Delete | `appearance.sections.delete` |
