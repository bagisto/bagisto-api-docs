---
outline: false
apiType: rest
examples:
  - id: update
    title: Update URL Rewrite
    description: Change the target path and redirect type. Update is a partial merge — send only the fields you change.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/url-rewrites/118" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "target_path": "new-testing",
          "redirect_type": "302"
        }'
    variables: |
      {}
    response: |
      {
        "id": 118,
        "entityType": "cms_page",
        "requestPath": "cms-test",
        "targetPath": "new-testing",
        "redirectType": "302",
        "locale": "en",
        "createdAt": "2026-06-23T12:32:58+05:30",
        "updatedAt": "2026-06-23T12:40:11+05:30"
      }
---

# Update URL Rewrite

Updates an existing URL rewrite — the **Edit** action on the admin **Marketing →
Search & SEO → URL Rewrites** screen.

New here? Read the [URL Rewrites overview](/api/rest-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites/{id}` | PUT |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.url_rewrites.edit`
  permission.
- The update is a **partial merge** — send only the fields you want to change;
  omitted fields keep their existing values.
- Returns the full updated rewrite payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `entity_type` | string | no | `product`, `category`, or `cms_page` |
| `request_path` | string | no | Source path the shopper requests |
| `target_path` | string | no | Path the shopper is redirected to |
| `redirect_type` | string | no | `301` permanent / `302` temporary |
| `locale` | string | no | Locale code; must exist in the store's locales |
