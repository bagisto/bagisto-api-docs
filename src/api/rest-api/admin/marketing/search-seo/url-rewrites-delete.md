---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete URL Rewrite
    description: Delete a URL rewrite by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/url-rewrites/118" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "URL rewrite deleted."
      }
---

# Delete URL Rewrite

Deletes a URL rewrite — the **Delete** row action on the admin **Marketing →
Search & SEO → URL Rewrites** screen.

::: tip
New here? Read the [URL Rewrites overview](/api/rest-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.url_rewrites.delete`
  permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
