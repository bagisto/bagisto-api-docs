---
outline: false
examples:
  - id: admin-catalog-attribute-option-create
    title: Create Attribute Option
    description: Add a new option to a select/multiselect/checkbox attribute. The parent attribute is named by attributeId in the input. Returns the created option.
    query: |
      mutation CreateAttributeOption($input: createAdminAttributeOptionInput!) {
        createAdminAttributeOption(input: $input) {
          adminAttributeOption {
            _id
            attributeId
            adminName
            sortOrder
            swatchValue
          }
        }
      }
    variables: |
      {
        "input": {
          "attributeId": 12,
          "adminName": "Green",
          "sortOrder": 2,
          "swatchValue": "#00FF00",
          "translations": {
            "en": { "label": "Green" },
            "fr": { "label": "Vert" }
          }
        }
      }
    response: |
      {
        "data": {
          "createAdminAttributeOption": {
            "adminAttributeOption": {
              "_id": 45,
              "attributeId": 12,
              "adminName": "Green",
              "sortOrder": 2,
              "swatchValue": "#00FF00"
            }
          }
        }
      }

  - id: admin-catalog-attribute-option-update
    title: Update Attribute Option
    description: Partial update of one option. Identify it with the option IRI plus attributeId and optionId. Returns the updated option.
    query: |
      mutation UpdateAttributeOption($input: updateAdminAttributeOptionInput!) {
        updateAdminAttributeOption(input: $input) {
          adminAttributeOption {
            _id
            attributeId
            adminName
            sortOrder
            swatchValue
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/attributes/12/options/45",
          "attributeId": 12,
          "optionId": 45,
          "adminName": "Forest Green",
          "sortOrder": 1,
          "swatchValue": "#228B22",
          "translations": {
            "en": { "label": "Forest Green" },
            "fr": { "label": "Vert Forêt" }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminAttributeOption": {
            "adminAttributeOption": {
              "_id": 45,
              "attributeId": 12,
              "adminName": "Forest Green",
              "sortOrder": 1,
              "swatchValue": "#228B22"
            }
          }
        }
      }

  - id: admin-catalog-attribute-option-delete
    title: Delete Attribute Option
    description: Delete one option, identified by its option IRI plus attributeId and optionId. Refused if products still reference the option. Returns the deleted option snapshot.
    query: |
      mutation DeleteAttributeOption($input: deleteAdminAttributeOptionInput!) {
        deleteAdminAttributeOption(input: $input) {
          adminAttributeOption {
            _id
            attributeId
            adminName
            sortOrder
            swatchValue
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/attributes/12/options/45",
          "attributeId": 12,
          "optionId": 45
        }
      }
    response: |
      {
        "data": {
          "deleteAdminAttributeOption": {
            "adminAttributeOption": {
              "_id": 45,
              "attributeId": 12,
              "adminName": "Green",
              "sortOrder": 2,
              "swatchValue": "#00FF00"
            }
          }
        }
      }
---

# Catalog Attribute Options — Create / Update / Delete (GraphQL)

Options are the selectable values of a `select`, `multiselect`, or `checkbox` attribute (e.g. the Red / Green / Blue values of a "Color" attribute). They cannot be added to any other attribute type. Per-locale labels go under each option's `translations`. All three mutations return the option as `adminAttributeOption`; select its `_id` (the numeric option id) rather than `id`, since the option has no standalone detail route.

::: tip
See the [Attributes overview](/api/graphql-api/admin/catalog/attributes/) for how attributes, options, and families fit together.
:::

## Operations

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminAttributeOption` | Mutation | Add an option to a `select`/`multiselect`/`checkbox` attribute |
| `updateAdminAttributeOption` | Mutation | Partial update of an option |
| `deleteAdminAttributeOption` | Mutation | Remove an option |

Create takes the parent `attributeId: Int!` inside `input`. Update and delete identify the option with three input fields: the option IRI in `input.id` (`/api/admin/catalog/attributes/{attributeId}/options/{optionId}`) plus `attributeId: Int!` and `optionId: Int!`.

## Input — Create / Update

| Field | Type | Notes |
|-------|------|-------|
| `attributeId` | `Int!` | Parent attribute id (required on all three operations) |
| `id` | `String` | Option IRI — required on update and delete |
| `optionId` | `Int` | Option id — required on update and delete |
| `adminName` | `String` | Internal admin label (required on create) |
| `sortOrder` | `Int` | Display order |
| `swatchValue` | `String` | Hex color / image path / display text, depending on the parent attribute's swatch type |
| `translations` | `JSON` | Map of locale to `{ label }` |

## Errors

| Condition | Message |
|-----------|---------|
| Attribute is not `select`/`multiselect`/`checkbox` | `This attribute type does not support options.` |
| Delete refused — option in use by products | `This option is used by N product(s) and cannot be deleted.` |
| Unknown id | `Attribute option not found.` |

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
