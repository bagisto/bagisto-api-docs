---
outline: false
examples:
  - id: admin-catalog-attribute-option-create
    title: Create Attribute Option
    description: Add a new option to a select/multiselect/checkbox attribute. Mirrors POST /api/admin/catalog/attributes/{attributeId}/options.
    query: |
      mutation CreateAttributeOption($input: createAdminAttributeOptionInput!, $attributeId: Int!) {
        createAdminAttributeOption(input: $input, attributeId: $attributeId) {
          adminAttribute { id _id }
        }
      }
    variables: |
      {
        "attributeId": 12,
        "input": {
          "admin_name": "Wool",
          "sort_order": 2,
          "translations": { "en": { "label": "Wool" }, "fr": { "label": "Laine" } }
        }
      }
    response: |
      {
        "data": {
          "createAdminAttributeOption": {
            "adminAttribute": { "id": "/api/admin/attributes/12", "_id": 12 }
          }
        }
      }

  - id: admin-catalog-attribute-option-update
    title: Update Attribute Option
    description: Partial update of one option. Mirrors PUT /api/admin/catalog/attributes/{attributeId}/options/{optionId}.
    query: |
      mutation UpdateAttributeOption($input: updateAdminAttributeOptionInput!, $attributeId: Int!, $optionId: Int!) {
        updateAdminAttributeOption(input: $input, attributeId: $attributeId, optionId: $optionId) {
          adminAttribute { id _id }
        }
      }
    variables: |
      {
        "attributeId": 12,
        "optionId": 45,
        "input": {
          "admin_name": "Merino Wool",
          "sort_order": 1,
          "translations": { "en": { "label": "Merino Wool" } }
        }
      }
    response: |
      {
        "data": {
          "updateAdminAttributeOption": {
            "adminAttribute": { "id": "/api/admin/attributes/12", "_id": 12 }
          }
        }
      }

  - id: admin-catalog-attribute-option-delete
    title: Delete Attribute Option
    description: Delete one option. Refused if products still reference the option. Mirrors DELETE /api/admin/catalog/attributes/{attributeId}/options/{optionId}.
    query: |
      mutation DeleteAttributeOption($input: deleteAdminAttributeOptionInput!, $attributeId: Int!, $optionId: Int!) {
        deleteAdminAttributeOption(input: $input, attributeId: $attributeId, optionId: $optionId) {
          adminAttributeOption { id }
        }
      }
    variables: |
      {
        "attributeId": 12,
        "optionId": 45,
        "input": {}
      }
    response: |
      {
        "data": {
          "deleteAdminAttributeOption": {
            "adminAttributeOption": { "id": "/api/admin/attribute_options/45" }
          }
        }
      }
---

# Catalog Attribute Options — Create / Update / Delete

GraphQL counterpart to the
[REST attribute-options endpoints](/api/rest-api/admin/catalog/attributes/attribute-options).

## Operations

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminAttributeOption` | Mutation | Add an option to a `select`/`multiselect`/`checkbox` attribute |
| `updateAdminAttributeOption` | Mutation | Partial update of an option |
| `deleteAdminAttributeOption` | Mutation | Remove an option |

All three mutations carry **extra args** alongside `input`:

- `attributeId: Int!` — required on every mutation
- `optionId: Int!` — required on update and delete

## Input — Create / Update

| Field | Type | Notes |
|-------|------|-------|
| `admin_name` | `String` | Internal admin label (required on create) |
| `sort_order` | `Int` | Display order |
| `swatch_value` | `String` | Hex color / image path / display text depending on swatch type |
| `translations` | `JSON` | Map of locale → `{ label }` |

## Errors

| Condition | Message |
|-----------|---------|
| Attribute is not `select`/`multiselect`/`checkbox` | `This attribute type does not support options.` |
| Delete refused — option in use | `This option is used by N product(s) and cannot be deleted.` |
| Unknown id | `Attribute option not found.` |
