---
outline: false
apiType: rest
examples:
  - id: rest
    title: Section Fields
    query: |
      curl -X GET "https://your-domain.com/api/admin/appearance/sections/15/fields?locale=en" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "sectionId": 15,
        "type": "static_content",
        "locale": "en",
        "schema": [
          { "name": "html", "type": "textarea", "label": "HTML" },
          { "name": "css", "type": "textarea", "label": "CSS" }
        ],
        "options": { "html": "<h2>Summer sale</h2>", "css": ".sale { color: #c00; }" }
      }
---

# Section Fields

The field set a section's type is built from, together with the values it currently holds. This is what makes a client-side editor possible without knowing the six types in advance: render the `schema`, fill it from `options`, and post the result back to [Stage edits](/api/rest-api/admin/appearance/sections/draft).

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/appearance/sections/{id}/fields` | Get the editable fields of a section |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section ID. |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `locale` | Locale the options are read in. Must be one the channel runs; otherwise the app locale, then the channel's first locale. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | integer | Section the fields belong to. |
| `type` | string | Section type the schema describes. |
| `locale` | string | Locale the options were read in. |
| `schema` | array | The field set for the type. Shape is decided by the type. |
| `options` | object | Values currently held — staged when there are any, otherwise published. Empty object for a section with no content yet. |

## Use cases

- **Render an editor for any section type** — one code path handles all six, because the schema describes the fields and `options` supplies the values.
- **Round-trip an edit** — read `options` here, change what the merchant edited, post the whole object to the draft endpoint.

## Best practices

- **`options` resolves staged over published.** A section holding a draft returns the draft, which is what the editor should show; read [Get section](/api/rest-api/admin/appearance/sections/detail) when you specifically need the published values.
- **Ask per locale.** The response covers the one locale requested, so a translation editor calls this once per locale rather than expecting them all at once.

## Errors

| Status | When |
|--------|------|
| `404` | No section with this ID. |

## Permissions

Requires `appearance.sections`.
