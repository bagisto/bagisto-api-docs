---
outline: false
examples:
  - id: gql
    title: Locale Detail
    description: Fetch a single locale by its id.
    query: |
      query AdminLocale($id: ID!) {
        adminSettingsLocale(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/settings/locales/1"
      }
    response: |
      {
        "data": {
          "adminSettingsLocale": {
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
      }
---

# Locale Detail

Returns the full record for one locale, addressed by its `id` (IRI form, e.g. `/api/admin/settings/locales/1`). Use it to pre-fill an edit form or to read back the current state of a locale.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsLocale(id:)` | Query | Fetch a single locale by id |

## Notes

- `id` is the IRI form; discover valid ids with the [`adminSettingsLocales`](./list.md) query.
- `direction` is `ltr` or `rtl`.
- `logoPath` is the stored relative path and `logoUrl` its public URL — both `null` when no logo is set.
- A seeded core locale (such as English) may return `null` `createdAt` / `updatedAt`.
- An unknown id returns `null` (no record).

See the [Locales overview](./) for field meanings and behaviour.
