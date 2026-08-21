---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-update
    title: Update a CMS Page (locale-nested)
    description: Mirrors Bagisto admin CMS → Pages → Edit. Validation is LOCALE-NESTED — `<locale>.url_key`, `<locale>.page_title`, `<locale>.html_content` are required. Top-level `channels` and `locale` are also required.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/cms/pages/7" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "locale": "en",
          "channels": [1],
          "en": {
            "url_key": "about-us",
            "page_title": "About Us (Updated)",
            "html_content": "<h1>About Us</h1><p>Welcome back.</p>",
            "meta_title": "About Us",
            "meta_keywords": "about,us,company",
            "meta_description": "Updated description."
          }
        }'
    variables: |
      {
        "locale": "en",
        "channels": [1],
        "en": {
          "url_key": "about-us",
          "page_title": "About Us (Updated)",
          "html_content": "<h1>About Us</h1><p>Welcome back.</p>",
          "meta_title": "About Us",
          "meta_keywords": "about,us,company",
          "meta_description": "Updated description."
        }
      }
    response: |
      {
        "id": 7,
        "urlKey": "about-us",
        "pageTitle": "About Us (Updated)",
        "htmlContent": "<h1>About Us</h1><p>Welcome back.</p>",
        "metaTitle": "About Us",
        "metaKeywords": "about,us,company",
        "metaDescription": "Updated description.",
        "layout": null,
        "previewUrl": "https://your-domain.com/page/about-us",
        "locale": "en",
        "channel": "default",
        "createdAt": "2024-04-16T21:44:17+05:30",
        "updatedAt": "2026-06-23T11:49:19+05:30",
        "translations": [
          {
            "locale": "en",
            "url_key": "about-us",
            "page_title": "About Us (Updated)",
            "html_content": "<h1>About Us</h1><p>Welcome back.</p>",
            "meta_title": "About Us",
            "meta_keywords": "about,us,company",
            "meta_description": "Updated description."
          }
        ],
        "channels": [
          { "id": 1, "code": "default", "name": "Default" }
        ]
      }
    commonErrors:
      - error: Validation (422)
        cause: Missing nested fields, duplicate url_key, or empty channels
        solution: Send locale-nested url_key/page_title/html_content plus top-level locale + channels
      - error: Not Found (404)
        cause: Page not found
        solution: Verify `{id}` exists
---

# CMS Page — Update

Updates a CMS page using a locale-nested payload.

### The Payload Is Locale-Nested

Update writes per locale, so the translated fields go inside a block keyed by locale code — unlike [Create](/api/rest-api/admin/cms/pages-create), which takes them at the top level and broadcasts them to every locale:

```json
{
  "locale": "en",
  "channels": [1],
  "en": {
    "url_key": "about-us",
    "page_title": "About Us",
    "html_content": "<h1>About Us</h1>"
  }
}
```

The top-level `locale` names which block is being written. Only that locale changes; the others are left untouched. `url_key` uniqueness excludes the page itself, so re-sending the current slug is not a collision. `channels` **replaces** the page's channel assignment rather than adding to it.

Changing a locale's `url_key` records a **301 redirect** from the old slug to the new one, so existing links keep working. That redirect is permanent: it is **not** removed when the page is later deleted, so the old slug keeps redirecting to a URL that no longer resolves. Clean it up through [URL Rewrites](/api/rest-api/admin/marketing/search-seo/url-rewrites-list) if that matters.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages/{id}` | PUT |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `locale` | string | yes | Names which locale block is being updated. |
| `channels` | int[] | yes | Non-empty array of existing channel IDs. |
| `<locale>` | object | yes | Per-locale block — `url_key`, `page_title`, `html_content` (required), plus optional `meta_*`. |

## Response

`200 OK` — same shape as [`GET /api/admin/cms/pages/{id}`](/api/rest-api/admin/cms/pages-detail).

## Errors

| HTTP | Cause |
|------|-------|
| `404 Not Found` | Page not found. |
| `422 Unprocessable Entity` | Missing nested fields, duplicate url_key, or empty channels. |
