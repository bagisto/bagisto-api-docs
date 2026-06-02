---
outline: false
apiType: rest
examples:
  - id: admin-catalog-family-update
    title: Update Attribute Family
    description: Update a family. Inside `attribute_groups`, items keyed by numeric id update existing groups; items keyed by `group_*` create new groups; omitted existing ids are deleted.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/families/4" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "code": "electronics",
          "name": "Electronics (updated)",
          "attribute_groups": {
            "11": {
              "code": "general",
              "name": "General",
              "column": 1,
              "position": 1,
              "custom_attributes": [ { "id": 1, "position": 1 } ]
            },
            "group_new_1": {
              "code": "pricing",
              "name": "Pricing",
              "column": 2,
              "position": 2,
              "custom_attributes": [ { "id": 11, "position": 1 } ]
            }
          }
        }'
    variables: |
      id=4
    response: |
      {
        "id": 4,
        "code": "electronics",
        "name": "Electronics (updated)"
      }
    commonErrors:
      - error: Validation (422)
        cause: '`code` duplicate or other body validation issue'
        solution: Verify that the supplied code is unique and well-formed
      - error: Not Found (404)
        cause: Unknown family id
        solution: Verify the id with the listing endpoint
---

# Attribute Family — Update

Updates an existing attribute family. Mirrors **Catalog → Attribute Families →
Edit** in the Bagisto admin panel — same partial-update semantics for nested
attribute groups.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/families/{id}` | PUT |

`{id}` must be a positive integer.

## Request body

Top-level fields are `code` (required), `name` (required), and
`attribute_groups` (object, optional).

### `attribute_groups` semantics

The `attribute_groups` field is an **object** keyed by either a numeric existing
group id or a `group_*` placeholder for a new group:

| Key shape | Effect |
|-----------|--------|
| `"11"` (numeric id) | Updates the existing group with id 11 |
| `"group_new_1"` | Creates a new group |
| existing id **omitted** from the payload | Deletes that group |

Each value is a group object:

| Field | Type | Notes |
|-------|------|-------|
| `code` / `name` / `column` / `position` | scalars | Same fields as on Create |
| `custom_attributes` | array | `[{ id, position }, ...]` — full replacement set for the group |

## Response

`200 OK`. Same shape as
[`GET /api/admin/catalog/families/{id}`](/api/rest-api/admin/catalog/families/families-detail).

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `404 Not Found` | The family does not exist |
| `422 Unprocessable Entity` | `code` duplicate or other body validation issue |
