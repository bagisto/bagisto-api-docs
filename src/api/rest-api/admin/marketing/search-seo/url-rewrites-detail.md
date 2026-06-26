---
outline: false
apiType: rest
examples:
  - id: detail
    title: URL Rewrite Detail
    description: Full payload for a single URL rewrite.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/url-rewrites/118" \
        -H "Authorization: Bearer <token>"
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

# URL Rewrite Detail

Returns a single URL rewrite with its full field set — the data behind the admin
**Marketing → Search & SEO → URL Rewrites** view screen.

::: tip
New here? Read the [URL Rewrites overview](/api/rest-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `entityType` | string | `product`, `category`, or `cms_page` |
| `requestPath` | string | Source path the shopper requests |
| `targetPath` | string | Path the shopper is redirected to |
| `redirectType` | string | `301` permanent / `302` temporary |
| `locale` | string | Locale code the rewrite applies to |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
