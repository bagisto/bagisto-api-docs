---
outline: false
examples:
  - id: gql
    title: Update Locale
    description: Change a locale's name, code, or text direction.
    query: |
      mutation Update($input: updateAdminSettingsLocaleInput!) {
        updateAdminSettingsLocale(input: $input) {
          adminSettingsLocale {
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
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/locales/45",
          "name": "German (Updated)",
          "direction": "ltr"
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsLocale": {
            "adminSettingsLocale": {
              "id": "/api/admin/settings/locales/45",
              "_id": 45,
              "code": "doc_de",
              "name": "German (Updated)",
              "direction": "ltr",
              "logoPath": null,
              "logoUrl": null,
              "createdAt": "2026-06-19T17:38:01+05:30",
              "updatedAt": "2026-06-19T17:38:12+05:30"
            }
          }
        }
      }
---

# Update Locale

Edits an existing locale. The update is partial — send only the fields you want to change, alongside the `id`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsLocale` | Mutation | Update a locale |

## Input

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | IRI of the locale to update. |
| `code` | no | New locale code; uniqueness is enforced (excluding this locale). |
| `name` | no | New display name. |
| `direction` | no | `ltr` or `rtl`. |

## Notes

- Use the [`adminSettingsLocales`](./list.md) query to discover valid ids.
- The mutation echoes the full updated record, including the refreshed `updatedAt`.
- A logo image cannot be uploaded over GraphQL.

Permissions: `settings.locales.edit`. See the [Locales overview](./) for behaviour.
