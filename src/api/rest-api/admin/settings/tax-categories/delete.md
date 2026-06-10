---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Tax Category
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/tax-categories/1" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Tax category deleted." }
---

# Delete Tax Category

::: warning Guard
Mirrors monolith `TaxCategoryController::destroy` — refuses with HTTP 400 if any tax_rates are still attached to the category.
:::
