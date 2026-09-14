---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Get Section
    query: |
      query getSection($id: ID!) {
        section(id: $id) {
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
      }
    variables: |
      {
        "id": "/api/shop/sections/3"
      }
    response: |
      {
        "data": {
          "section": {
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
              },
              {
                "id": "/api/shop/section_translations/29",
                "_id": 29,
                "sectionId": 3,
                "locale": "ar",
                "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": \"10\"}}"
              }
            ]
          }
        }
      }
---

# section

One published section of the current channel's active theme.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | Section IRI, e.g. `/api/shop/sections/3`. |

## Node fields

Identical to [sections](/api/graphql-api/shop/sections/list).

## Best practices

- **Pass the IRI form, not the bare number.** `id` is `/api/shop/sections/3`; a plain `3` does not resolve.
- **A section that is switched off, or belongs to a theme the channel no longer runs, does not resolve here** — it is not part of the storefront surface, so the query answers with an error rather than a hidden record.
- **Use `translations` for a language switcher** that keeps a shopper on the same block.

## Permissions

Public. Requires only the storefront key.
