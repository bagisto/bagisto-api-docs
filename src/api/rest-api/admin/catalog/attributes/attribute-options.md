---
outline: false
apiType: rest
examples:
  - id: admin-catalog-attribute-option-create
    title: Create Attribute Option
    description: Adds a new option to a `select`, `multiselect`, or `checkbox` attribute. Returns the full updated attribute detail.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/attributes/12/options" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "admin_name": "Wool",
          "sort_order": 2,
          "translations": {
            "en": { "label": "Wool" },
            "fr": { "label": "Laine" }
          }
        }'
    variables: |
      attributeId=12
    response: |
      {
        "id": 12,
        "code": "material",
        "type": "select",
        "options": [
          { "id": 45, "adminName": "Wool", "sortOrder": 2 }
        ]
      }
    commonErrors:
      - error: Unsupported attribute type (422)
        cause: The attribute's `type` is not `select`, `multiselect`, or `checkbox`
        solution: Options can only be attached to option-bearing types
      - error: Validation (422)
        cause: '`admin_name` missing'
        solution: Provide `admin_name`
      - error: Not Found (404)
        cause: Unknown attribute id
        solution: Verify the attribute id
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

  - id: admin-catalog-attribute-option-update
    title: Update Attribute Option
    description: Partially update an existing option. Only supplied fields are changed; translations merge per locale.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/attributes/12/options/45" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "admin_name": "Merino Wool",
          "sort_order": 1,
          "translations": {
            "en": { "label": "Merino Wool" },
            "fr": { "label": "Laine Mérinos" }
          }
        }'
    variables: |
      attributeId=12
      optionId=45
    response: |
      {
        "id": 12,
        "code": "material",
        "type": "select"
      }

  - id: admin-catalog-attribute-option-delete
    title: Delete Attribute Option
    description: Removes an option. Refused (HTTP 409) when one or more products still reference the option.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/catalog/attributes/12/options/45" \
        -H "Authorization: Bearer <token>"
    variables: |
      attributeId=12
      optionId=45
    response: |
      {
        "message": "Attribute option deleted successfully."
      }
    commonErrors:
      - error: Option in use (409)
        cause: One or more products still reference this option in their attribute values
        solution: Reassign the products to a different option first, then retry
      - error: Not Found (404)
        cause: Unknown attribute or option id
        solution: Verify the ids
---

# Catalog Attribute Options — Create / Update / Delete

CRUD for individual options on `select`, `multiselect`, and `checkbox` attributes.
Options for other attribute types do not exist (the attribute payload returns
`options: null`).

## Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/catalog/attributes/{attributeId}/options` | POST | Add a new option |
| `/api/admin/catalog/attributes/{attributeId}/options/{optionId}` | PUT | Partially update an option |
| `/api/admin/catalog/attributes/{attributeId}/options/{optionId}` | DELETE | Remove an option |

Both `{attributeId}` and `{optionId}` are constrained to digits (`\d+`).

## Request body — Create / Update

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `admin_name` | string | yes (create) / no (update) | Internal admin label. |
| `sort_order` | integer | no | Display order. |
| `swatch_value` | string\|null | no | Hex color for `color` swatches, image path for `image` swatches, display text for `text` swatches. |
| `translations` | object | no | Map of locale → `{ label }`. Merges per-locale on update. |

## Response

- **Create** — `201 Created` with the full attribute detail (same shape as `GET /api/admin/catalog/attributes/{id}`).
- **Update** — `200 OK` with the full attribute detail.
- **Delete** — `200 OK` with `{ "message": "..." }`.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `404 Not Found` | Unknown `attributeId` or `optionId` |
| `409 Conflict` | (delete only) Option is referenced by product attribute values |
| `422 Unprocessable Entity` | (create) Attribute type does not support options, or `admin_name` missing |

## Notes

- The delete-409 message names the dependency count: `This option is used by N product(s) and cannot be deleted.`
- For bulk attribute changes, supply the full `options` array on the [Update Attribute](/api/rest-api/admin/catalog/attributes/attributes-update) endpoint — that replaces the whole option set in one call.
