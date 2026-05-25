---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-detail
    title: CMS Page Detail
    description: Returns a single CMS page with all translations and channels inlined as plain arrays.
    query: |
      curl "https://your-domain.com/api/admin/cms/pages/7" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 7,
        "urlKey": "about-us",
        "pageTitle": "About Us",
        "htmlContent": "<h1>About Us</h1>",
        "metaTitle": "About Us",
        "metaKeywords": "about,us",
        "metaDescription": "About us page.",
        "locale": "en",
        "createdAt": "2026-01-12T08:15:00+00:00",
        "updatedAt": "2026-04-30T14:20:09+00:00",
        "translations": [
          {
            "locale": "en",
            "url_key": "about-us",
            "page_title": "About Us",
            "html_content": "<h1>About Us</h1>",
            "meta_title": "About Us",
            "meta_keywords": "about,us",
            "meta_description": "About us page."
          }
        ],
        "channels": [
          { "id": 1, "code": "default", "name": "Default" }
        ]
      }
---

# CMS Page — Detail

Single CMS page with all locales' translations and assigned channels inlined.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages/{id}` | GET |

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Page ID. |
| `urlKey` / `pageTitle` / `htmlContent` / `metaTitle` / `metaKeywords` / `metaDescription` | string | Resolved for the active locale. |
| `locale` | string | Resolved locale code. |
| `translations` | array | Per-locale rows (`{ locale, url_key, page_title, html_content, meta_* }`). |
| `channels` | array | `{ id, code, name }` of assigned channels. |
| `createdAt`, `updatedAt` | string | ISO 8601. |

## Errors

| HTTP | Cause |
|------|-------|
| `404 Not Found` | Page not found. |
