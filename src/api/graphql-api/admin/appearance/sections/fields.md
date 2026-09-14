---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Section Fields
    query: |
      query sectionFields($sectionId: Int!, $locale: String) {
        adminAppearanceSectionFields(sectionId: $sectionId, locale: $locale) {
          sectionId
          type
          locale
          schema
          options
        }
      }
    variables: |
      {
        "sectionId": 15,
        "locale": "en"
      }
    response: |
      {
        "data": {
          "adminAppearanceSectionFields": {
            "sectionId": 15,
            "type": "static_content",
            "locale": "en",
            "schema": [
              { "name": "html", "type": "textarea", "label": "HTML" },
              { "name": "css", "type": "textarea", "label": "CSS" }
            ],
            "options": { "html": "<h2>Summer sale</h2>", "css": ".sale { color: #c00; }" }
          }
        }
      }
---

# adminAppearanceSectionFields

The field set a section's type is built from, together with the values it currently holds. This is what makes a client-side editor possible without knowing the six types in advance: render the `schema`, fill it from `options`, and send the result to [createAdminAppearanceSectionDraft](/api/graphql-api/admin/appearance/sections/draft).

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `sectionId` | `Int!` | Section ID. |
| `locale` | `String` | Locale the options are read in. Falls back to the channel locale. |

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | `Int` | Section the fields belong to. |
| `type` | `String` | Section type the schema describes. |
| `locale` | `String` | Locale the options were read in. |
| `schema` | `Iterable` | The field set for the type. |
| `options` | `Iterable` | Values currently held — staged when there are any, otherwise published. |

## Use cases

- **Render an editor for any section type** — one code path handles all six.
- **Round-trip an edit** — read `options`, change what the merchant edited, stage the whole object.

## Best practices

- **The argument is `sectionId`, a plain `Int` — not `id`, and not an IRI.** `id` is reserved for the resource IRI on a GraphQL item query, so the section is named explicitly.
- **`schema` and `options` are JSON values** and take no sub-selection.
- **`options` resolves staged over published**, which is what the editor should show.

## Permissions

Requires `appearance.sections`.
