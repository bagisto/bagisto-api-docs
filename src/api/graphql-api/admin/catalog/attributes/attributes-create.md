---
outline: false
examples:
  - id: admin-catalog-attribute-create
    title: Create Attribute
    description: Create a new product attribute with optional translations and options. Mirrors the REST endpoint POST /api/admin/catalog/attributes.
    query: |
      mutation CreateAttribute($input: createAdminAttributeInput!) {
        createAdminAttribute(input: $input) {
          adminAttribute { id _id }
        }
      }
    variables: |
      {
        "input": {
          "code": "material",
          "admin_name": "Material",
          "type": "select",
          "is_filterable": true,
          "translations": { "en": { "name": "Material" }, "fr": { "name": "Matière" } },
          "options": [
            { "admin_name": "Cotton", "sort_order": 1, "translations": { "en": { "label": "Cotton" } } }
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminAttribute": {
            "adminAttribute": { "id": "/api/admin/attributes/50", "_id": 50 }
          }
        }
      }
---

# Catalog Attribute — Create

Creates a new product attribute. Equivalent to
[`POST /api/admin/catalog/attributes`](/api/rest-api/admin/catalog/attributes/attributes-create).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminAttribute` | Mutation | Create a new attribute |

## Input fields

Same field set as the REST request body — `code`, `admin_name`, `type`,
`swatch_type`, the boolean flag fields, `validation`, `default_value`,
`position`, `translations`, `options`. See the
[REST page](/api/rest-api/admin/catalog/attributes/attributes-create) for the full table.

## Notes

- The mutation returns the attribute IRI (`id`) plus `_id`. For the full detail payload, follow up with the [`adminAttribute`](/api/graphql-api/admin/catalog/attributes/attributes-detail) query or the REST `GET /api/admin/catalog/attributes/{id}` endpoint.
- Field names in the input are snake_case (`admin_name`, `is_filterable`) — the project's name-converter does NOT remap multi-word camelCase keys onto the create DTO.
