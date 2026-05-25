---
outline: false
examples:
  - id: admin-catalog-family-detail
    title: Attribute Family Detail (with attribute groups and attributes)
    description: Fetch a single attribute family by IRI including all attribute groups and — within each group — all associated attributes with pivot position. The attributeGroups field is a plain JSON scalar in GraphQL; it may return null in some environments due to a known API Platform ?array serialization limitation — use the REST endpoint as the canonical path for guaranteed full data.
    query: |
      query AdminAttributeFamily($id: ID!) {
        adminAttributeFamily(id: $id) {
          id
          _id
          code
          name
          attributeGroups
        }
      }
    variables: |
      {
        "id": "/api/admin/catalog/families/1"
      }
    response: |
      {
        "data": {
          "adminAttributeFamily": {
            "id": "/api/admin/admin_attribute_families/1",
            "_id": 1,
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
        }
      }
---

# Catalog Attribute Family — Detail (GraphQL)

GraphQL item query that returns a single attribute family by its IRI, including
all **attribute groups** and — within each group — all **attributes** associated
via the `attribute_group_mappings` pivot (with their pivot `position` and `column`).

This is the query to call when an admin needs the complete structure of an
attribute family — e.g. when pre-populating the edit form in
**Catalog → Attribute Families**.

## Operation

| Operation | Type |
|-----------|------|
| `adminAttributeFamily` | Query (item) |

## Authentication

Every request must include an admin Bearer token:

```
Authorization: Bearer <token>
```

Obtain a token via the [`createAdminLogin`](/api/graphql-api/admin/authentication)
mutation.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | API Platform IRI of the attribute family (e.g. `"/api/admin/catalog/families/1"`) |

::: tip Finding the IRI
The IRI can be taken directly from `id` in any `adminAttributeFamilies` edge
node, or constructed as `/api/admin/catalog/families/{numericId}`. Both forms
are accepted by the resolver.
:::

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/admin_attribute_families/1`) |
| `_id` | `Int` | Raw family ID |
| `code` | `String` | Family code (e.g. `default`, `apparel`) |
| `name` | `String` | Family display name (e.g. `Default`, `Apparel`) |
| `attributeGroups` | scalar (JSON array\|null) | All attribute groups with nested attributes — see shape below |

### `attributeGroups` item shape

`attributeGroups` is returned as a **plain JSON array** (scalar in GraphQL). Each
element corresponds to one row in `attribute_groups`:

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Attribute group ID |
| `code` | string | Group code (e.g. `general`, `price`) |
| `name` | string | Group display name |
| `column` | integer | Layout column position for the group |
| `position` | integer | Display order position of the group within the family |
| `attributes` | array | Attributes mapped to this group (see below) |

### `attributeGroups[].attributes[]` item shape

Each element corresponds to one attribute mapped via `attribute_group_mappings`:

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Attribute ID |
| `code` | string | Attribute code (e.g. `sku`, `name`, `color`) |
| `type` | string | Attribute type (e.g. `text`, `select`, `boolean`) |
| `isRequired` | integer | `1` = required on product forms, `0` = optional |
| `column` | integer | Layout column position of this attribute within the group |
| `position` | integer | Display order position of this attribute within the group |

::: warning Known limitation — attributeGroups may return null over GraphQL
`attributeGroups` is typed as `?array` (a plain PHP array) on the
`AdminAttributeFamily` resource. API Platform's GraphQL serializer does not
reliably serialize raw `?array` scalar fields on non-Eloquent DTO resources —
the field can return `null` even when the REST endpoint returns the full array.

**Recommended approach:** use `GET /api/admin/catalog/families/{id}` (REST) as
the canonical path when you need guaranteed `attributeGroups` data. This is a
pre-existing project-wide limitation documented in the codebase; no workaround
is available on the GraphQL side without promoting `attributeGroups` to a typed
sub-resource (which would break the inline-object shape). If `attributeGroups`
comes back non-null in your environment, the shape described above is correct —
you can safely use it.
:::

## Example Query

```graphql
query AdminAttributeFamily($id: ID!) {
  adminAttributeFamily(id: $id) {
    id
    _id
    code
    name
    attributeGroups
  }
}
```

```json
{
  "id": "/api/admin/catalog/families/1"
}
```

## Example Response

```json
{
  "data": {
    "adminAttributeFamily": {
      "id": "/api/admin/admin_attribute_families/1",
      "_id": 1,
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
  }
}
```

## Errors

| Scenario | GraphQL `errors[]` | HTTP Status |
|----------|-------------------|-------------|
| Unknown ID | `errors[]` populated or `data.adminAttributeFamily: null` | `200` (GraphQL convention) |
| Missing auth | `"Unauthenticated"` in `errors[]` | `200` |

## Notes

- **`attributeGroups` is a plain JSON scalar**, not a typed GraphQL object list. You access it as a regular JSON array in the response. This avoids API Platform serializing nested objects as IRI strings instead of inline objects — a known behavior when using nested DTO types in API Platform GraphQL.
- **`attributeGroups` may return null** — see the warning above. This is a known pre-existing project limitation with `?array` scalar fields on non-Eloquent resources in API Platform GraphQL. The REST detail endpoint always returns the full array.
- **Same provider as the REST detail endpoint** — `AdminAttributeFamilyItemProvider` serves both transports with identical data loading semantics. Both eagerly load `attributeGroups.customAttributes` and embed the pivot `column` and `position` fields.
- **The `id` argument is the IRI**, not the numeric integer. Construct it as `"/api/admin/catalog/families/{_id}"` using the `_id` field from a listing query, or pass the `id` field directly from a listing result.
- **No timestamps.** The `attribute_families` table has `$timestamps = false`, so `createdAt` and `updatedAt` are not available on either transport.
- **Attribute detail fields are slim.** Each attribute inside `attributeGroups[].attributes` carries only the fields needed for family-structure display: `id`, `code`, `type`, `isRequired`, `column`, `position`. For the full attribute payload (translations, options, validation), use `adminAttribute(id: ID!)` or `GET /api/admin/catalog/attributes/{id}`.
