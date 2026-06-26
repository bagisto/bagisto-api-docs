---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Sitemap
    description: Delete a sitemap by id. Removes the row and its generated XML files.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/sitemaps/1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Sitemap deleted."
      }
---

# Delete Sitemap

Deletes a sitemap — the **Delete** row action on the admin **Marketing →
Search & SEO → Sitemaps** screen. Removing a sitemap also deletes its generated
XML files.

::: tip
New here? Read the [Sitemaps overview](/api/rest-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.delete`
  permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
