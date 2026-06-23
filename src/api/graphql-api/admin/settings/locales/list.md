---
outline: false
examples:
  - id: gql
    title: List Locales
    description: Paginated list of every locale (storefront language) configured in the store.
    query: |
      query AdminLocales($first: Int) {
        adminSettingsLocales(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              direction
              logoPath
              logoUrl
              createdAt
              updatedAt
            }
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
          "adminSettingsLocales": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/locales/35",
                  "_id": 35,
                  "code": "fr",
                  "name": "French",
                  "direction": "ltr",
                  "logoPath": null,
                  "logoUrl": null,
                  "createdAt": "2026-05-28T10:59:43+05:30",
                  "updatedAt": "2026-05-28T10:59:43+05:30"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/admin/settings/locales/10",
                  "_id": 10,
                  "code": "AR",
                  "name": "Arabic",
                  "direction": "rtl",
                  "logoPath": "locales/AR.png",
                  "logoUrl": "http://localhost:8000/storage/locales/AR.png",
                  "createdAt": "2026-04-02T23:21:21+05:30",
                  "updatedAt": "2026-04-02T23:21:21+05:30"
                }
              },
              {
                "cursor": "Mw==",
                "node": {
                  "id": "/api/admin/settings/locales/1",
                  "_id": 1,
                  "code": "en",
                  "name": "English",
                  "direction": "ltr",
                  "logoPath": "locales/en.png",
                  "logoUrl": "http://localhost:8000/storage/locales/en.png",
                  "createdAt": null,
                  "updatedAt": null
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "Mw=="
            },
            "totalCount": 4
          }
        }
      }
---

# List Locales

Returns every locale configured in the store as a cursor-paginated connection. Use it to populate a locale picker, audit which languages a store supports, or look up a locale's `_id` before a detail / update / delete call.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsLocales` | QueryCollection | List all locales (cursor-paginated) |

## Notes

- Pass `first` (and `after: <cursor>`) to page through results. The connection exposes `pageInfo` and `totalCount`.
- `direction` is `ltr` or `rtl` and controls the text direction of the storefront when that locale is active.
- `logoPath` is the stored relative path; `logoUrl` is its fully-qualified public URL. Both are `null` for locales without a logo.
- Seeded core locales (such as English) may have `null` `createdAt` / `updatedAt`.

See the [Locales overview](./) for field meanings and behaviour.
