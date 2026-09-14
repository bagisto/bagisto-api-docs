---
outline: false
apiType: graphql
examples:
  - id: basic
    title: List Sections
    query: |
      query sections($first: Int, $after: String) {
        sections(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              themeCode
              channelId
              type
              name
              sortOrder
              status
              createdAt
              updatedAt
              translation {
                id
                _id
                sectionId
                locale
                options
              }
              translations {
                id
                _id
                sectionId
                locale
                options
              }
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "sections": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/sections/3",
                  "_id": 3,
                  "themeCode": "default",
                  "channelId": 1,
                  "type": "category_carousel",
                  "name": "Categories Collections",
                  "sortOrder": 3,
                  "status": "1",
                  "createdAt": "2024-04-16T21:44:15+05:30",
                  "updatedAt": "2026-08-21T18:05:39+05:30",
                  "translation": {
                    "id": "/api/shop/section_translations/3",
                    "_id": 3,
                    "sectionId": 3,
                    "locale": "en",
                    "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": \"10\"}}"
                  },
                  "translations": [
                    {
                      "id": "/api/shop/section_translations/3",
                      "_id": 3,
                      "sectionId": 3,
                      "locale": "en",
                      "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": \"10\"}}"
                    }
                  ]
                },
                "cursor": "MA=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 6
          }
        }
      }
  - id: filtered
    title: Filter by Type
    query: |
      query sections($type: String, $first: Int) {
        sections(type: $type, first: $first) {
          edges {
            node {
              _id
              type
              name
              sortOrder
              translation {
                locale
                options
              }
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "type": "static_content",
        "first": 5
      }
    response: |
      {
        "data": {
          "sections": {
            "edges": [
              {
                "node": {
                  "_id": 15,
                  "type": "static_content",
                  "name": "Summer Sale",
                  "sortOrder": 5,
                  "translation": {
                    "locale": "en",
                    "options": "{\"html\": \"<h2>Summer sale</h2>\"}"
                  }
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
---

# sections

The published sections of the current channel's active theme, in render order, as a cursor-paginated connection.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `type` | `String` | Exact match on the section type. |
| `first` | `Int` | Items to take from the start. |
| `after` | `String` | Cursor to continue from. |
| `last` | `Int` | Items to take from the end. |
| `before` | `String` | Cursor to end at. |

## Node fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Resource IRI. |
| `_id` | `Int!` | Section ID. |
| `themeCode` | `String` | Theme the section belongs to. |
| `channelId` | `Int` | Channel the section belongs to. |
| `type` | `String` | One of the six section types. |
| `name` | `String` | Section name. |
| `sortOrder` | `Int` | Position in the page. |
| `status` | `String` | Always `"1"` — only published sections are returned. |
| `createdAt` | `String` | ISO 8601. |
| `updatedAt` | `String` | ISO 8601. |
| `translation` | object | Content for the current locale. |
| `translations` | array | Every locale the section has content for. |

Each translation carries `id`, `_id`, `sectionId`, `locale` and `options`.

## Use cases

- **Render a home page in one round trip** — take the connection without `type` and switch on each node's `type` to pick a component.
- **Fetch only the footer** — `sections(type: "footer_links", first: 1)`.

## Best practices

- **`options` is a JSON-encoded string.** Parse it client-side; it is not a typed object, because its shape changes per section type.
- **`status` comes back as a string.** It is always `"1"` here, since unpublished sections are not part of the storefront surface — do not filter on it.
- **Draw the nodes in the order returned.** The connection is already in render order.

## Permissions

Public. Requires only the storefront key.
