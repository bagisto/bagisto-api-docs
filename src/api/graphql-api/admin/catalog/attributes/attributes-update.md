---
outline: false
examples:
  - id: admin-catalog-attribute-update
    title: Update Attribute
    description: Update an existing attribute. code is immutable; type cannot change while products reference the attribute. Supplying options replaces the full option set.
    query: |
      mutation UpdateAttribute($input: updateAdminAttributeInput!) {
        updateAdminAttribute(input: $input) {
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
          "id": "/api/admin/catalog/attributes/50",
          "code": "color",
          "adminName": "Colour",
          "type": "select",
          "isFilterable": true,
          "translations": {
            "en": { "name": "Colour" },
            "fr": { "name": "Couleur" }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminAttribute": {
            "adminAttribute": {
              "id": "/api/admin/catalog/attributes/50",
              "_id": 50,
              "code": "color",
              "type": "select",
              "adminName": "Colour",
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
              "updatedAt": "2026-06-24T09:12:00+00:00"
            }
          }
        }
      }
---

# Catalog Attribute — Update (GraphQL)

Updates an existing attribute. `id` is the attribute IRI (`/api/admin/catalog/attributes/{id}`). `code` is immutable — supplying a different value raises an `errors[]` entry. `type` cannot be changed while product attribute values still reference the attribute. Supplying `options` replaces the **full** option set (items with an `id` are updated, items without an `id` are inserted, and omitted ids are deleted). The mutation returns the full attribute detail.

See the [Attributes overview](/api/graphql-api/admin/catalog/attributes/) for how attributes, options, and families fit together.

The nested `options` and their `translations` are not returned on the mutation payload — re-query [`adminAttribute`](/api/graphql-api/admin/catalog/attributes/attributes-detail) to read them back.
