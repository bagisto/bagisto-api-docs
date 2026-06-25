---
outline: false
examples:
  - id: admin-catalog-attribute-create
    title: Create Attribute
    description: Create a new product attribute with optional translations and options. Returns the full attribute detail.
    query: |
      mutation CreateAttribute($input: createAdminAttributeInput!) {
        createAdminAttribute(input: $input) {
          adminAttribute {
            id
            _id
            code
            type
            adminName
            isRequired
            isUnique
            valuePerLocale
            valuePerChannel
            isFilterable
            isConfigurable
            isVisibleOnFront
            isUserDefined
            swatchType
            position
            locale
            validation
            defaultValue
            isComparable
            enableWysiwyg
            regex
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "code": "color",
          "adminName": "Color",
          "type": "select",
          "isFilterable": true,
          "isConfigurable": true,
          "position": 5,
          "swatchType": "color",
          "translations": {
            "en": { "name": "Color" },
            "fr": { "name": "Couleur" }
          },
          "options": [
            {
              "adminName": "Red",
              "sortOrder": 1,
              "swatchValue": "#FF0000",
              "translations": { "en": { "label": "Red" }, "fr": { "label": "Rouge" } }
            },
            {
              "adminName": "Green",
              "sortOrder": 2,
              "swatchValue": "#00FF00",
              "translations": { "en": { "label": "Green" }, "fr": { "label": "Vert" } }
            },
            {
              "adminName": "Blue",
              "sortOrder": 3,
              "swatchValue": "#0000FF",
              "translations": { "en": { "label": "Blue" }, "fr": { "label": "Bleu" } }
            }
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminAttribute": {
            "adminAttribute": {
              "id": "/api/admin/catalog/attributes/50",
              "_id": 50,
              "code": "color",
              "type": "select",
              "adminName": "Color",
              "isRequired": 0,
              "isUnique": 0,
              "valuePerLocale": 0,
              "valuePerChannel": 0,
              "isFilterable": 1,
              "isConfigurable": 1,
              "isVisibleOnFront": 1,
              "isUserDefined": 1,
              "swatchType": "color",
              "position": 5,
              "locale": "en",
              "validation": null,
              "defaultValue": null,
              "isComparable": 0,
              "enableWysiwyg": 0,
              "regex": null,
              "createdAt": "2026-05-22T10:00:00+00:00",
              "updatedAt": "2026-05-22T10:00:00+00:00"
            }
          }
        }
      }
---

# Catalog Attribute — Create (GraphQL)

Creates a new product attribute. The `code` must be unique and pass the code rule (letters, digits, underscore) and may not be a reserved word. `code`, `adminName`, and `type` are required. For `select`, `multiselect`, and `checkbox` types you may supply `options`; per-locale labels go under each option's `translations`. The mutation returns the full attribute detail.

::: tip
See the [Attributes overview](/api/graphql-api/admin/catalog/attributes/) for how attributes, options, and families fit together.
:::

The nested `options` and their `translations` are not returned on the mutation payload — re-query [`adminAttribute`](/api/graphql-api/admin/catalog/attributes/attributes-detail) to read them back.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
