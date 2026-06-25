---
outline: false
apiType: rest
examples:
  - id: mass-delete
    title: Mass Delete Catalog Rules
    description: Delete several catalog rules in one call. Non-existent ids are silently skipped.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/catalog-rules/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "indices": [12, 18, 9999]
        }'
    variables: |
      {}
    response: |
      {
        "deleted": [12, 18],
        "skipped": [9999],
        "message": "Catalog rules deleted successfully."
      }
---

# Mass Delete Catalog Rules

Deletes several catalog rules in one call — the **Mass Delete** action on the
admin **Marketing → Promotions → Catalog Rules** datagrid. Removing rules
recomputes affected product prices in the background.

::: tip
New here? Read the [Catalog Rules overview](/api/rest-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules/mass-delete` | POST |

## Details

- Requires an admin Bearer token and the `marketing.promotions.catalog_rules.delete`
  permission.
- Non-existent ids are **silently skipped** (returned in `skipped`); the ids
  actually removed are returned in `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty list of numeric rule ids to delete |
