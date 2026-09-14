---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Stage Order
    query: |
      mutation reorder($input: createAdminAppearanceSectionReorderInput!) {
        createAdminAppearanceSectionReorder(input: $input) {
          adminAppearanceSectionReorder {
            sectionIds
            hasDraft
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "sectionIds": [8, 5, 3]
        }
      }
    response: |
      {
        "data": {
          "createAdminAppearanceSectionReorder": {
            "adminAppearanceSectionReorder": {
              "sectionIds": [5, 3, 8],
              "hasDraft": { "5": true, "3": true, "8": true },
              "message": "Section order staged successfully."
            }
          }
        }
      }
---

# createAdminAppearanceSectionReorder

Stages the order sections are drawn in. `footer_links` is moved back to the end of whatever order is sent, and the payload returns the order that was actually stored.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sectionIds` | `Iterable` | Yes | Section IDs in the order they should be drawn. |

## Payload fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionIds` | `Iterable` | The order as stored, with `footer_links` last. |
| `hasDraft` | `Iterable` | Section ID to whether it now holds a staged edit. |
| `message` | `String` | Confirmation text. |

## Use cases

- **Drag-and-drop reordering** — send the list after a drop and render the returned `sectionIds`, which is authoritative when the footer was dragged.

## Best practices

- **Read `sectionIds` back rather than assuming your order stuck** — the example sent `[8, 5, 3]` and stored `[5, 3, 8]`.
- **Send the whole channel's sections, not a subset**, or the omitted ones keep stale positions.
- **`sectionIds` and `hasDraft` are JSON values** and take no sub-selection.

## Permissions

Requires `appearance.sections.edit`.
