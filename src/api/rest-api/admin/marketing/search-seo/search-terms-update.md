---
outline: false
apiType: rest
examples:
  - id: update
    title: Update Search Term
    description: Update the term text and optional redirect URL. Counts are storefront-recorded and not editable.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/search-terms/106" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "term": "Coastal Breeze QA",
          "redirect_url": "https://example.com/qa"
        }'
    variables: |
      {}
    response: |
      {
        "id": 106,
        "term": "Coastal Breeze QA",
        "results": 1,
        "uses": 3,
        "redirectUrl": "https://example.com/qa",
        "channel": {
          "id": 1,
          "code": "default",
          "name": "Default"
        },
        "locale": "en",
        "createdAt": "2026-06-03T13:14:05+05:30",
        "updatedAt": "2026-06-17T12:14:07+05:30"
      }
---

# Update Search Term

Updates an existing search term — the **Edit** action on the admin **Marketing →
Search & SEO → Search Terms** screen. Only the term text and redirect URL are
editable; the result count and use count are recorded by the storefront and
cannot be changed here.

::: tip
New here? Read the [Search Terms overview](/api/rest-api/admin/marketing/search-seo/search-terms/) for what a search term is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms/{id}` | PUT |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_terms.edit`
  permission.
- `results` and `uses` are storefront-recorded and **not editable**.
- Returns the full updated search-term payload.
- An unknown id returns a `404`.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `term` | string | yes | The search term text |
| `redirect_url` | string | no | A valid URL to redirect this query to, or `null` |
