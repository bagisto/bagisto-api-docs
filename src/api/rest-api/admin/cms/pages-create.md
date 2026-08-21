---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-create
    title: Create a CMS Page
    description: Mirrors Bagisto admin CMS → Pages → Create. Top-level translated fields (page_title, html_content, etc.) are broadcast to every locale by the PageRepository.
    query: |
      curl -X POST "https://your-domain.com/api/admin/cms/pages" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "url_key": "about-us",
          "page_title": "About Us",
          "html_content": "<h1>About Us</h1><p>Welcome.</p>",
          "channels": [1],
          "meta_title": "About Us",
          "meta_keywords": "about,us,company",
          "meta_description": "Learn more about our company."
        }'
    variables: |
      {
        "url_key": "about-us",
        "page_title": "About Us",
        "html_content": "<h1>About Us</h1>",
        "channels": [1]
      }
    response: |
      {
        "id": 7,
        "urlKey": "about-us",
        "pageTitle": "About Us",
        "htmlContent": "<h1>About Us</h1><p>Welcome.</p>",
        "metaTitle": "About Us",
        "metaKeywords": "about,us,company",
        "metaDescription": "Learn more about our company.",
        "layout": null,
        "previewUrl": "https://your-domain.com/page/about-us",
        "locale": "en",
        "channel": "default",
        "createdAt": "2026-06-23T11:49:19+05:30",
        "updatedAt": "2026-06-23T11:49:19+05:30",
        "translations": [
          { "locale": "en", "url_key": "about-us", "page_title": "About Us", "html_content": "<h1>About Us</h1><p>Welcome.</p>", "meta_title": "About Us", "meta_keywords": "about,us,company", "meta_description": "Learn more about our company." }
        ],
        "channels": [ { "id": 1, "code": "default", "name": "Default" } ]
      }
    commonErrors:
      - error: Validation (422)
        cause: Missing required field, duplicate url_key, or empty channels array
        solution: Send url_key + page_title + html_content + non-empty channels
---

# CMS Page — Create

Creates a new CMS page.

Create takes the translated fields — `page_title`, `html_content`, `url_key`, and the `meta_*` set — at the **top level**, and the same values are written to every configured locale. [Update](/api/rest-api/admin/cms/pages-update) works the other way round: it requires a locale-nested payload such as `{ "en": { "page_title": "…" } }` and touches only the locale you name. Send a create payload to update and nothing is written.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `url_key` | string | yes | Must be unique on `cms_page_translations` and pass slug regex. |
| `page_title` | string | yes | |
| `html_content` | string | yes | |
| `channels` | int[] | yes | Non-empty array of existing channel IDs. |
| `meta_title` | string | no | |
| `meta_keywords` | string | no | |
| `meta_description` | string | no | |

## Response

`201 Created` returning the same shape as [`GET /api/admin/cms/pages/{id}`](/api/rest-api/admin/cms/pages-detail).

## Errors

| HTTP | Cause |
|------|-------|
| `422 Unprocessable Entity` | Validation failure (missing required field, duplicate url_key, empty channels). |
