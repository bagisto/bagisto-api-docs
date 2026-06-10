---
outline: false
apiType: rest
examples:
  - id: admin-catalog-category-update
    title: Update (or Move) Category
    description: "Mirrors Bagisto admin Catalog → Categories → Edit. Validation is LOCALE-NESTED — `<locale>.slug`, `<locale>.name`, `<locale>.description` (when display_mode requires it) are required. Moving a category is done by sending `parent_id` + `position` on this same endpoint — there is NO separate /move endpoint."
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/categories/7" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "locale": "en",
          "position": 2,
          "attributes": [11, 23],
          "parent_id": 1,
          "status": 1,
          "en": {
            "slug": "apparel",
            "name": "Apparel",
            "description": "Men''s and women''s apparel"
          }
        }'
    variables: |
      id=7
    response: |
      {
        "id": 7,
        "name": "Apparel",
        "slug": "apparel",
        "position": 2
      }
    commonErrors:
      - error: Validation (422)
        cause: Locale-nested `<locale>.slug` / `<locale>.name` missing, or `<locale>.description` missing when `display_mode` requires it
        solution: 'Wrap translatable fields under the locale key (e.g. `"en": { "slug": ... }`)'
      - error: Not Found (404)
        cause: Unknown category id
        solution: Verify the id with the listing endpoint
---

# Category — Update (and Move)

Updates an existing category. Mirrors **Catalog → Categories → Edit** in the
Bagisto admin panel.

::: warning No separate move endpoint
**Move semantics are part of the standard update payload.** To re-parent a
category or change its sort position, `PUT` the category with the new
`parent_id` and `position`. This mirrors the Bagisto admin panel which has
no dedicated "move" action either — `parent_id` + `position` are ordinary
editable fields on the category form.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/categories/{id}` | PUT |

`{id}` must be a positive integer.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `locale` | string | no | Locale being edited (defaults to the app locale). |
| `position` | integer | yes | Display order. |
| `attributes` | integer[] | yes | List of filterable attribute ids. |
| `parent_id` | integer\|null | no | New parent — supply to re-parent (move) the category. |
| `status` | integer | no | `0` / `1`. |
| `<locale>` | object | yes | **Locale-nested** translatable fields — see below. |

### Locale-nested translatable fields

Translatable fields go inside a key matching the locale code (e.g. `"en"`):

| Field | Notes |
|-------|-------|
| `slug` | Required. |
| `name` | Required. |
| `description` | Required when `display_mode` is `description_only` or `products_and_description`. |
| `meta_title` / `meta_description` / `meta_keywords` | Optional SEO fields. |

## Response

`200 OK`. Same shape as
[`GET /api/admin/catalog/categories/{id}`](/api/rest-api/admin/catalog/categories/categories-detail).

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `404 Not Found` | The category does not exist |
| `422 Unprocessable Entity` | Locale-nested validation failure |
