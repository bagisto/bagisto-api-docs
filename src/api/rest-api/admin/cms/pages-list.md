---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-list
    title: List CMS Pages
    description: Paginated, filterable, sortable CMS pages list. Mirrors the admin CMS → Pages datagrid. htmlContent is detail-only (null here).
    query: |
      curl -X GET "https://your-domain.com/api/admin/cms/pages?page=1&per_page=2&sort=id&order=desc" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      page=1
      per_page=2
      sort=id
      order=desc
    response: |
      {
        "data": [
          {
            "id": 1,
            "urlKey": "about-us",
            "pageTitle": "About Us",
            "htmlContent": null,
            "metaTitle": "about us",
            "metaKeywords": "aboutus",
            "metaDescription": "",
            "layout": null,
            "previewUrl": "https://your-domain.com/page/about-us",
            "locale": "en",
            "channel": "default",
            "channels": ["default"],
            "createdAt": "2024-04-16T21:44:17+05:30",
            "updatedAt": "2024-04-16T21:44:17+05:30"
          },
          {
            "id": 11,
            "urlKey": "privacy-policy",
            "pageTitle": "Privacy Policy",
            "htmlContent": null,
            "metaTitle": null,
            "metaKeywords": null,
            "metaDescription": null,
            "layout": null,
            "previewUrl": "https://your-domain.com/page/privacy-policy",
            "locale": "en",
            "channel": "default",
            "channels": ["default"],
            "createdAt": "2024-04-16T21:44:17+05:30",
            "updatedAt": "2024-04-16T21:44:17+05:30"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 2,
          "lastPage": 7,
          "total": 13,
          "from": 1,
          "to": 2
        }
      }
  - id: admin-cms-pages-list-filtered
    title: List CMS Pages (filtered)
    description: Filter by channel, locale, and a partial title match.
    query: |
      curl -X GET "https://your-domain.com/api/admin/cms/pages?channel=1&locale=en&page_title=policy&sort=id&order=asc" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      channel=1
      locale=en
      page_title=policy
    response: |
      {
        "data": [
          {
            "id": 11,
            "urlKey": "privacy-policy",
            "pageTitle": "Privacy Policy",
            "htmlContent": null,
            "metaTitle": null,
            "metaKeywords": null,
            "metaDescription": null,
            "layout": null,
            "previewUrl": "https://your-domain.com/page/privacy-policy",
            "locale": "en",
            "channel": "default",
            "channels": ["default"],
            "createdAt": "2024-04-16T21:44:17+05:30",
            "updatedAt": "2024-04-16T21:44:17+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# CMS Pages — List

Paginated CMS-pages list (datagrid parity), returned in the `{ data, meta }` envelope.

::: tip
For what CMS Pages are, how multi-locale / multi-channel works, and the `previewUrl` / `htmlContent` semantics, see the [CMS Pages overview](/api/rest-api/admin/cms/pages/).
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages` | GET |

## Query parameters

| Param | Type | Notes |
|-------|------|-------|
| `page` | integer | 1-based page number (default `1`). |
| `per_page` | integer | Default `10`, max `50`. |
| `id` | integer | Filter by page ID. |
| `page_title` | string | Partial title match. |
| `url_key` | string | Partial url_key match. |
| `channel` | integer | Filter by channel ID. |
| `locale` | string | Locale code used for translation resolution. |
| `sort` | string | One of `id`, `page_title`, `url_key`, `created_at`. |
| `order` | string | `asc` or `desc`. |

## Response

`200 OK` — `{ data, meta }` envelope. Each row carries every cheap column:

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Page ID. |
| `urlKey` | string | Storefront URL slug. |
| `pageTitle` | string | Title resolved for the active locale. |
| `htmlContent` | null | **Detail-only** — always `null` on the listing; fetch the body from the [detail endpoint](/api/rest-api/admin/cms/pages-detail). |
| `metaTitle` | string\|null | SEO title. |
| `metaKeywords` | string\|null | SEO keywords. |
| `metaDescription` | string\|null | SEO description. |
| `layout` | string\|null | Page layout identifier. |
| `previewUrl` | string | Live storefront URL for the page (the "View" action). |
| `locale` | string | Resolved locale code. |
| `channel` | string | Resolved channel code. |
| `channels` | string[] | Codes of all channels the page is assigned to. |
| `createdAt` | string | ISO 8601. |
| `updatedAt` | string | ISO 8601. |
