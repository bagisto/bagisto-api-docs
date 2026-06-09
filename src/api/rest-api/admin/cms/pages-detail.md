---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-detail
    title: CMS Page Detail
    description: Returns a single CMS page with the full html_content body, all per-locale translations, and assigned channels inlined.
    query: |
      curl -X GET "https://your-domain.com/api/admin/cms/pages/1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      {}
    response: |
      {
        "id": 1,
        "urlKey": "about-us",
        "pageTitle": "About Us",
        "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">We are dedicated to providing high-quality products and services to our customers...</div></div>",
        "metaTitle": "about us",
        "metaKeywords": "aboutus",
        "metaDescription": "",
        "layout": null,
        "previewUrl": "https://your-domain.com/page/about-us",
        "locale": "en",
        "channel": "default",
        "createdAt": "2024-04-16T21:44:17+05:30",
        "updatedAt": "2024-04-16T21:44:17+05:30",
        "translations": [
          {
            "locale": "ar",
            "url_key": "about-us",
            "page_title": "معلومات عنا",
            "html_content": "<div>معلومات عنا...</div>",
            "meta_title": "معلومات عنا",
            "meta_keywords": "معلومات عنا",
            "meta_description": "معلومات عنا"
          },
          {
            "locale": "en",
            "url_key": "about-us",
            "page_title": "About Us",
            "html_content": "<div class=\"static-container\"><div class=\"mb-5\">We are dedicated to providing high-quality products...</div></div>",
            "meta_title": "about us",
            "meta_keywords": "aboutus",
            "meta_description": ""
          }
        ],
        "channels": [
          { "id": 1, "code": "default", "name": "Default" }
        ]
      }
---

# CMS Page — Detail

Single CMS page with the full `htmlContent` body, every locale's `translations`, and the assigned `channels` inlined.

::: tip
For what CMS Pages are and how multi-locale / multi-channel works, see the [CMS Pages overview](/api/rest-api/admin/cms/pages/).
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages/{id}` | GET |

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Page ID. |
| `urlKey` | string | URL slug for the active locale. |
| `pageTitle` | string | Title for the active locale. |
| `htmlContent` | string | The full page HTML body (the field that's `null` on the listing). |
| `metaTitle` / `metaKeywords` / `metaDescription` | string\|null | SEO fields for the active locale. |
| `layout` | string\|null | Page layout identifier. |
| `previewUrl` | string | Live storefront URL for the page (the "View" action). |
| `locale` | string | Resolved locale code. |
| `channel` | string | Resolved channel code. |
| `translations` | array | Per-locale rows — `{ locale, url_key, page_title, html_content, meta_title, meta_keywords, meta_description }`. |
| `channels` | array | `{ id, code, name }` of every assigned channel. |
| `createdAt`, `updatedAt` | string | ISO 8601. |

## Errors

| HTTP | Cause |
|------|-------|
| `404 Not Found` | Page not found. |
