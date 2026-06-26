---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Catalog Rule
    description: Delete a catalog rule by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/catalog-rules/126" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Catalog rule deleted."
      }
---

# Delete Catalog Rule

Deletes a catalog rule — the **Delete** row action on the admin **Marketing →
Promotions → Catalog Rules** screen. Removing a rule recomputes affected product
prices in the background.

::: tip
New here? Read the [Catalog Rules overview](/api/rest-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the `marketing.promotions.catalog_rules.delete`
  permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
