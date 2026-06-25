---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Search Term
    description: Delete a search term by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/search-terms/106" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Search term deleted."
      }
---

# Delete Search Term

Deletes a search term — the **Delete** row action on the admin **Marketing →
Search & SEO → Search Terms** screen.

::: tip
New here? Read the [Search Terms overview](/api/rest-api/admin/marketing/search-seo/search-terms/) for what a search term is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_terms.delete`
  permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
