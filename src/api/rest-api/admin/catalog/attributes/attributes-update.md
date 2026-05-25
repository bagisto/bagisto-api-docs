---
outline: false
apiType: rest
examples:
  - id: admin-catalog-attribute-update
    title: Update Attribute
    description: Update an attribute. The `code` field cannot be changed. Changing `type` is refused when product attribute values exist. If `options` is supplied, the full set is replaced — existing options keyed by `id` are updated, omitted ids are deleted, and entries without an `id` are inserted.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/attributes/50" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "code": "material",
          "admin_name": "Material (updated)",
          "type": "select",
          "is_filterable": true,
          "translations": {
            "en": { "name": "Material (updated)" },
            "fr": { "name": "Matière (mis à jour)" }
          }
        }'
    variables: |
      id=50
    response: |
      {
        "id": 50,
        "code": "material",
        "adminName": "Material (updated)",
        "type": "select"
      }
    commonErrors:
      - error: Code change refused (422)
        cause: A different `code` was supplied in the payload
        solution: Send the same `code` the attribute was created with — `code` is immutable
      - error: Type immutable (422)
        cause: '`type` change attempted while product attribute values exist'
        solution: Delete dependent product attribute values first, or do not change `type`
      - error: Not Found (404)
        cause: The attribute id does not exist
        solution: Verify the id via the listing endpoint
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Catalog Attribute — Update

Updates an existing attribute. Mirrors **Catalog → Attributes → Edit** in the
Bagisto admin panel.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/attributes/{id}` | PUT |

`{id}` must be a positive integer (`requirements: ['id' => '\\d+']`).

## Request body

Same fields as [Create](/api/rest-api/admin/catalog/attributes/attributes-create), with these rules:

- **`code` is immutable.** Sending a different code returns `422`.
- **`type` cannot be changed** if any product attribute value references this attribute. Returns `422`.
- **`options` is a full-set replacement.** Entries with an `id` are updated, entries without `id` are inserted, and any existing option ids omitted from the payload are deleted.
- System attributes (`is_user_defined = 0`) silently ignore immutable fields by convention — only mutable fields (e.g. `admin_name`, translations) are applied.
- `translations` merges per-locale — only the supplied locales are updated; others are untouched.

## Response

`200 OK` returning the full attribute detail — identical shape to
[`GET /api/admin/catalog/attributes/{id}`](/api/rest-api/admin/catalog/attributes/attributes-detail).

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `404 Not Found` | The attribute does not exist |
| `422 Unprocessable Entity` | Code change attempted, type change refused, or other validation failure |
