---
outline: false
apiType: rest
examples:
  - id: admin-catalog-family-create
    title: Create Attribute Family
    description: Creates an attribute family with optional nested attribute groups and per-group `custom_attributes`. `code` must be unique and pass the Code rule.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/families" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "code": "electronics",
          "name": "Electronics",
          "attribute_groups": [
            {
              "code": "general",
              "name": "General",
              "column": 1,
              "position": 1,
              "custom_attributes": [
                { "id": 1 },
                { "id": 2 }
              ]
            }
          ]
        }'
    variables: |
      {
        "code": "electronics",
        "name": "Electronics"
      }
    response: |
      {
        "id": 4,
        "code": "electronics",
        "name": "Electronics",
        "attributeGroups": [
          {
            "id": 11,
            "code": "general",
            "name": "General",
            "column": 1,
            "position": 1,
            "attributes": []
          }
        ]
      }
    commonErrors:
      - error: Validation (422)
        cause: '`code` missing, malformed, or duplicate'
        solution: Send a unique snake_case code that matches the Code rule
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Attribute Family — Create

Creates a new attribute family. Mirrors **Catalog → Attribute Families → Create**
in the Bagisto admin panel.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/families` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `code` | string | yes | Snake_case identifier — must be unique and pass the Code rule. |
| `name` | string | yes | Display name. |
| `attribute_groups` | array | no | Initial groups (see shape below). |

### `attribute_groups[]` shape

| Field | Type | Notes |
|-------|------|-------|
| `code` | string | Group code (snake_case). |
| `name` | string | Group display name. |
| `column` | integer | Column placement (1 or 2). |
| `position` | integer | Sort position within the column. |
| `custom_attributes` | array | `[{ id: <attribute-id> }, ...]` — attributes to attach. |

## Response

`201 Created`. Same shape as
[`GET /api/admin/catalog/families/{id}`](/api/rest-api/admin/catalog/families/families-detail).

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `422 Unprocessable Entity` | Validation failure (missing/duplicate `code`, malformed body) |
