---
outline: false
apiType: rest
examples:
  - id: admin-catalog-category-create
    title: Create Category
    description: Mirrors Bagisto admin Catalog → Categories → Create. Validates slug (unique), name, position, attributes. `description` is required when `display_mode` is `description_only` or `products_and_description`. File-upload for `logo_path` / `banner_path` is NOT supported in v1.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/categories" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "slug": "apparel",
          "name": "Apparel",
          "description": "Men''s and women''s apparel",
          "position": 1,
          "attributes": [11, 23],
          "parent_id": 1,
          "display_mode": "products_and_description",
          "status": 1,
          "locale": "en",
          "meta_title": "Apparel"
        }'
    variables: |
      {
        "slug": "apparel",
        "name": "Apparel",
        "position": 1,
        "attributes": [11, 23]
      }
    response: |
      {
        "id": 7,
        "position": 1,
        "status": 1,
        "parentId": 1,
        "displayMode": "products_and_description",
        "name": "Apparel",
        "slug": "apparel",
        "description": "Men's and women's apparel",
        "locale": "en"
      }
    commonErrors:
      - error: Validation (422)
        cause: '`slug` missing, duplicate, `position` missing, `attributes` empty, or `description` missing when `display_mode` requires it'
        solution: Send a unique slug and the required core fields
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Category — Create

Creates a new category. Mirrors **Catalog → Categories → Create** in the
Bagisto admin panel.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/categories` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `slug` | string | yes | URL-friendly identifier — must be unique. |
| `name` | string | yes | Display name. |
| `description` | string | conditional | Required when `display_mode` is `description_only` or `products_and_description`. |
| `position` | integer | yes | Display order. |
| `attributes` | integer[] | yes | List of filterable attribute ids. |
| `parent_id` | integer\|null | no | Parent category id (defaults to the root). |
| `display_mode` | string | no | One of `products_and_description`, `products_only`, `description_only`. |
| `status` | integer | no | `0` = disabled, `1` = enabled. |
| `locale` | string | no | Locale code (e.g. `en`). |
| `meta_title` / `meta_description` / `meta_keywords` | string | no | SEO fields. |

## Response

`201 Created`. Same shape as
[`GET /api/admin/catalog/categories/{id}`](/api/rest-api/admin/catalog/categories/categories-detail).

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `422 Unprocessable Entity` | Validation failure |

## Notes

- **File upload not supported in v1.** `logo_path` and `banner_path` cannot be set via this endpoint — they remain `null`. Use the admin panel to upload images for now.
