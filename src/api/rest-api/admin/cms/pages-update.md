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
        "en": { "url_key": "about-us", "page_title": "About Us (Updated)", "html_content": "<h1>About Us</h1>" }
      }
    response: |
      <Returns 200 — same shape as GET /api/admin/cms/pages/{id}>
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

::: warning Locale-nested payload required
Unlike [Create](/api/rest-api/admin/cms/pages-create) (top-level fields
broadcast to all locales), **Update** validates and writes per-locale via
nested blocks:

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

The top-level `locale` field names which locale block is being updated.
`url_key` uniqueness excludes the current page (no false-positive collisions
against itself).
:::

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
