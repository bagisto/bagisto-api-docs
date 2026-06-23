---
outline: false
examples:
  - id: gql
    title: Create Locale
    description: Add a new storefront locale (language) to the store.
    query: |
      mutation Create($input: createAdminSettingsLocaleInput!) {
        createAdminSettingsLocale(input: $input) {
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
          "code": "doc_de",
          "name": "German Docs",
          "direction": "ltr"
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsLocale": {
            "adminSettingsLocale": {
              "id": "/api/admin/settings/locales/45",
              "_id": 45,
              "code": "doc_de",
              "name": "German Docs",
              "direction": "ltr",
              "logoPath": null,
              "logoUrl": null,
              "createdAt": "2026-06-19T17:38:01+05:30",
              "updatedAt": "2026-06-19T17:38:01+05:30"
            }
          }
        }
      }
---

# Create Locale

Adds a new locale so a storefront channel can offer that language. The new locale is returned with the server-assigned `id` / `_id`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsLocale` | Mutation | Create a locale |

## Input

| Field | Required | Notes |
|-------|----------|-------|
| `code` | yes | Unique locale code (lowercase letters, digits, underscore, hyphen — e.g. `fr`, `pt-br`). |
| `name` | yes | Human-readable display name. |
| `direction` | yes | Text direction — `ltr` or `rtl`. |

## Notes

- A logo image cannot be uploaded over GraphQL; new locales are created without a logo (`logoPath` / `logoUrl` are `null`).
- A duplicate or malformed `code` is rejected with a validation error.

Permissions: `settings.locales.create`. See the [Locales overview](./) for behaviour.
