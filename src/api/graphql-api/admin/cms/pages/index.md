---
outline: false
---

# CMS Pages

CMS Pages are **static storefront content pages** — About Us, Privacy Policy, custom landing pages, and the like. Each page is served on the storefront at its `urlKey` (e.g. `/page/about-us`). This menu mirrors the admin **CMS → Pages** screen: list, create, edit, delete, and view those pages.

## Multi-locale, multi-channel

A page is content that spans languages and storefronts:

- **Multi-locale** — a page holds **one content set per language** (its `translations`). Each locale has its own `pageTitle`, `htmlContent`, `urlKey`, and SEO fields. Over GraphQL, `translations` is a **field-selectable connection** — query it via `translations { edges { node { … } } }`, picking from `locale`, `pageTitle`, `urlKey`, `htmlContent`, `metaTitle`, `metaKeywords`, `metaDescription`. It returns one entry per authored locale on both the listing and the detail query. (Over REST it comes back as a plain JSON array.)
- **Multi-channel** — a page is **assigned to one or more channels** (storefronts). Over GraphQL, `channels` is also a **field-selectable connection** — query it via `channels { edges { node { … } } }`, picking from `id`, `code`, `name`. (Over REST it comes back as a plain JSON array.)

## `previewUrl` — the "View" action

Every node carries a `previewUrl` — the storefront URL where the page actually renders (built from its `urlKey`). This is the API equivalent of the admin **View** action: open it in a browser to preview the live page.

## All multi-word fields resolve over GraphQL

`pageTitle`, `urlKey`, `metaTitle`, `metaKeywords`, `metaDescription`, `layout`, `previewUrl`, `htmlContent`, and the timestamps all **resolve over GraphQL** on both the listing and the detail query — none come back `null` for transport reasons. `translations` and `channels` are **field-selectable connections** (`translations { edges { node { … } } }` / `channels { edges { node { … } } }`) on both queries.

The node `id` is the IRI `/api/admin/cms/pages/{id}`; `_id` is the numeric ID. The single-page query takes that IRI as its `id: ID!` argument.

## Create vs Update payload shapes

The two write mutations take **different shapes** (this mirrors the admin form):

- **Create** sends **top-level** fields (`urlKey`, `pageTitle`, `htmlContent`, `meta*`, `channels`). Those values are **broadcast to every configured locale** at creation.
- **Update** sends a **locale-nested** body so you edit one locale at a time.

## GraphQL vs REST

Both transports expose the same data and behaviour. The practical difference: GraphQL lets you fetch the page **plus** its `translations` and `channels` in a **single round trip** and pick exactly the fields you need, whereas REST returns the full fixed payload per endpoint.

## Exporting pages (CSV) — REST only

The CMS Pages datagrid **Export** button (a CSV download of the whole filtered table) is available **only over REST**, at [`GET /api/admin/cms/pages/export`](/api/rest-api/admin/cms/pages/export).

There is **no GraphQL export operation** — and there cannot be one. An export is a **binary file stream** (`text/csv` attachment), and GraphQL only returns structured JSON; it has no way to transport a downloadable file. This is a project-wide rule: every datagrid CSV export lives on REST only. To export from a GraphQL-based client, call the REST endpoint directly:

```bash
curl -X GET "https://your-domain.com/api/admin/cms/pages/export?format=csv" \
  -H "Authorization: Bearer <id>|<token>" \
  -H "Accept: text/csv" \
  --output cms-pages.csv
```

It honours the same filters as the listing (`id`, `page_title`, `url_key`, `channel`, `locale`) and exports **every matching row**, not just the current page. If you only need the data (not a file), use the [`adminCmsPages`](/api/graphql-api/admin/cms/pages/queries/list) query and build the file client-side.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List pages](/api/graphql-api/admin/cms/pages/queries/list) | `adminCmsPages` query (cursor) |
| [Page detail](/api/graphql-api/admin/cms/pages/queries/detail) | `adminCmsPage(id:)` query |
| [Create page](/api/graphql-api/admin/cms/pages/mutations/create) | `createAdminCmsPage` mutation |
| [Update page](/api/graphql-api/admin/cms/pages/mutations/update) | `updateAdminCmsPage` mutation |
| [Delete page](/api/graphql-api/admin/cms/pages/mutations/delete) | `deleteAdminCmsPage` mutation |
| [Mass delete pages](/api/graphql-api/admin/cms/pages/mutations/mass-delete) | `createAdminCmsPageMassDelete` mutation |
| Export pages (CSV) | **REST only** — see [Export CMS Pages](/api/rest-api/admin/cms/pages/export). |

All CMS Pages operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication). Writes require the matching `cms.create` / `cms.edit` / `cms.delete` permission.
