---
outline: false
apiType: rest
examples:
  - id: admin-catalog-family-detail
    title: Attribute Family Detail (with attribute groups and attributes)
    description: Single attribute family record including all attribute groups and — within each group — all associated attributes with their pivot position. Use this to populate the edit form in Catalog → Attribute Families.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/families/1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      id=1
    response: |
      {
        "id": 1,
        "code": "default",
        "name": "Default",
        "attributeGroups": [
          {
            "id": 1,
            "code": "general",
            "name": "General",
            "column": 1,
            "position": 1,
            "attributes": [
              {
                "id": 1,
                "code": "sku",
                "type": "text",
                "isRequired": 1,
                "column": 1,
                "position": 1
              },
              {
                "id": 2,
                "code": "name",
                "type": "text",
                "isRequired": 1,
                "column": 1,
                "position": 2
              }
            ]
          }
        ]
      }
    commonErrors:
      - error: Not Found (404)
        cause: The attribute family ID does not exist in the database
        solution: 'Verify the ID with the listing endpoint `GET /api/admin/catalog/families`'

      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Catalog Attribute Family — Detail

Returns a single attribute family record by ID, including all **attribute groups**
and — within each group — all **attributes** associated via the
`attribute_group_mappings` pivot (with their pivot `position` and `column`).

This is the read endpoint to call when an admin needs the complete structure of
an attribute family — e.g. when opening the edit form in the
**Catalog → Attribute Families** UI.

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/families/{id}` | GET | Admin Bearer token |

`{id}` must be a positive integer. Non-numeric values are rejected by a route
requirement (`\d+`) — this prevents the `{id}` segment from matching any other
path under `/catalog/families/`.

## Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The numeric attribute family ID |

## Response Shape

The response is a single JSON object (not wrapped in `{ data }`) with the
following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Attribute family ID |
| `code` | string | Family code (e.g. `default`, `apparel`) |
| `name` | string | Family display name (e.g. `Default`, `Apparel`) |
| `attributeGroups` | array | All attribute groups belonging to this family (see below) |

### `attributeGroups[]` item shape

Each entry in the `attributeGroups` array corresponds to one row in
`attribute_groups`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Attribute group ID |
| `code` | string | Group code (e.g. `general`, `price`) |
| `name` | string | Group display name (e.g. `General`, `Price`) |
| `column` | integer | Layout column position for the group (typically `1` or `2`) |
| `position` | integer | Display order position of the group within the family |
| `attributes` | array | Attributes mapped to this group (see below) |

### `attributeGroups[].attributes[]` item shape

Each entry represents one attribute mapped to the group via
`attribute_group_mappings`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Attribute ID |
| `code` | string | Attribute code (e.g. `sku`, `name`, `color`) |
| `type` | string | Attribute type (e.g. `text`, `select`, `boolean`) |
| `isRequired` | integer | `1` = required on product forms, `0` = optional |
| `column` | integer | Layout column position of this attribute within the group |
| `position` | integer | Display order position of this attribute within the group |

`attributeGroups` and the nested `attributes` arrays arrive as plain inline JSON — no IRI strings, no sub-resource links — so one call returns the family's whole structure. Every id inside is numeric.

## Errors

| HTTP Status | Cause |
|-------------|-------|
| `401 Unauthorized` | Missing, expired, or revoked admin Bearer token |
| `401 Unauthorized` | Missing or invalid admin Bearer token |
| `404 Not Found` | The specified `{id}` does not exist in the database |

## Notes

- **`attributeGroups` is a plain JSON array**, not a sub-resource IRI. Groups and their nested attributes are embedded directly in the response — no follow-up requests are needed.
- **`attributeGroups` is `null` in listing rows.** The `GET /api/admin/catalog/families` listing returns only `id`, `code`, and `name`. The full nested payload is only available from this detail endpoint.
- **No timestamps.** The `attribute_families` table has `$timestamps = false` — there are no `createdAt` or `updatedAt` fields on the family itself. The `attribute_groups` table similarly carries no timestamps.
- **`column` and `position` fields** come from the `attribute_group_mappings` pivot and control where each attribute is rendered in the product-creation form layout. `column` is typically `1` or `2` (left or right panel); `position` controls vertical order.
- **The `{id}` route parameter must be a digit.** The route carries a `requirements: ['id' => '\d+']` constraint — non-numeric path segments are rejected with `404` before reaching the provider.
- **Attribute detail fields are slim.** Only the fields needed for family-structure display are returned per attribute (`id`, `code`, `type`, `isRequired`, `column`, `position`). For the full attribute payload (translations, options, validation), use `GET /api/admin/catalog/attributes/{id}`.
