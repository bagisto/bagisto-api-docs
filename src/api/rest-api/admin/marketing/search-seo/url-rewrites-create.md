---
outline: false
apiType: rest
examples:
  - id: create
    title: Create URL Rewrite
    description: Create a 301 redirect from an old CMS page path to a new target path.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/url-rewrites" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "entity_type": "cms_page",
          "request_path": "cms-test",
          "target_path": "testing",
          "redirect_type": "301",
          "locale": "en"
        }'
    variables: |
      {}
    response: |
      {
        "id": 118,
        "entityType": "cms_page",
        "requestPath": "cms-test",
        "targetPath": "testing",
        "redirectType": "301",
        "locale": "en",
        "createdAt": "2026-06-23T12:32:58+05:30",
        "updatedAt": "2026-06-23T12:32:58+05:30"
      }
---

# Create URL Rewrite

Creates a URL rewrite — the **Create** action on the admin **Marketing →
Search & SEO → URL Rewrites** screen.

::: tip
New here? Read the [URL Rewrites overview](/api/rest-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites` | POST |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.url_rewrites.create`
  permission.
- Returns the full rewrite payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `entity_type` | string | yes | `product`, `category`, or `cms_page` |
| `request_path` | string | yes | Source path the shopper requests |
| `target_path` | string | yes | Path the shopper is redirected to |
| `redirect_type` | string | yes | `301` permanent / `302` temporary |
| `locale` | string | yes | Locale code; must exist in the store's locales |
