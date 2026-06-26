---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Search Synonym
    description: Delete a search-synonym group by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/search-synonyms/19" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Search synonym deleted."
      }
---

# Delete Search Synonym

Deletes a search-synonym group — the **Delete** row action on the admin
**Marketing → Search & SEO → Search Synonyms** screen.

::: tip
New here? Read the [Search Synonyms overview](/api/rest-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the
  `marketing.search_seo.search_synonyms.delete` permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
