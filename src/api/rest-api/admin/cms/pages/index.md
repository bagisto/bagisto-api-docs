---
outline: false
apiType: rest
---

# CMS Pages

CMS Pages are **static storefront content pages** — About Us, Privacy Policy, custom landing pages, and the like. Each page is served on the storefront at its `url_key` (e.g. `/page/about-us`). This menu mirrors the admin **CMS → Pages** screen: list, create, edit, delete, and export those pages.

## Multi-locale, multi-channel

A page is content that spans languages and storefronts:

- **Multi-locale** — a page holds **one content set per language** (its `translations`). Each locale has its own `page_title`, `html_content`, `url_key`, and SEO fields. The listing/detail show the values for the resolved `locale`; the full per-locale set comes back under `translations` on the detail endpoint.
- **Multi-channel** — a page is **assigned to one or more channels** (storefronts). The detail endpoint returns the assigned `channels` as `{ id, code, name }` objects; the listing returns the channel codes as a `channels` string array.

## `previewUrl` — the "View" action

Every row carries a `previewUrl` — the storefront URL where the page actually renders (built from its `url_key`). This is the API equivalent of the admin **View** action: open it in a browser to preview the live page.

## `htmlContent` is detail-only

`htmlContent` is the **full page HTML body**. It is **`null` on the listing** (to keep rows light) and is returned only by the [detail endpoint](/api/rest-api/admin/cms/pages-detail). The listing carries every other cheap column (titles, url_key, SEO, layout, channels, timestamps).

## Create vs Update payload shapes

The two write endpoints take **different shapes** (this mirrors the admin form):

- **Create** sends **top-level** fields (`url_key`, `page_title`, `html_content`, `meta_*`, `channels`). Those values are **broadcast to every configured locale** at creation.
- **Update** sends a **locale-nested** body (`{ "en": { url_key, page_title, ... }, "channels": [...] }`) so you edit one locale at a time.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List pages](/api/rest-api/admin/cms/pages-list) | `GET /api/admin/cms/pages` |
| [Page detail](/api/rest-api/admin/cms/pages-detail) | `GET /api/admin/cms/pages/{id}` |
| [Create page](/api/rest-api/admin/cms/pages-create) | `POST /api/admin/cms/pages` |
| [Update page](/api/rest-api/admin/cms/pages-update) | `PUT /api/admin/cms/pages/{id}` |
| [Delete page](/api/rest-api/admin/cms/pages-delete) | `DELETE /api/admin/cms/pages/{id}` |
| [Mass delete pages](/api/rest-api/admin/cms/pages-mass-delete) | `POST /api/admin/cms/pages/mass-delete` |
| [Export pages (CSV)](/api/rest-api/admin/cms/pages/export) | `GET /api/admin/cms/pages/export` |

All CMS Pages endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication). Writes require the matching `cms.create` / `cms.edit` / `cms.delete` permission.
