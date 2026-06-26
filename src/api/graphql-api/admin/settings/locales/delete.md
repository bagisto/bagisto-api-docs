---
outline: false
examples:
  - id: gql
    title: Delete Locale
    description: Remove a locale from the store.
    query: |
      mutation Delete($input: deleteAdminSettingsLocaleInput!) {
        deleteAdminSettingsLocale(input: $input) {
          adminSettingsLocale {
            _id
            code
            name
            direction
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/locales/47"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsLocale": {
            "adminSettingsLocale": {
              "_id": 47,
              "code": "fr",
              "name": "French",
              "direction": "ltr",
              "message": "Locale deleted successfully."
            }
          }
        }
      }
---

# Delete Locale

Permanently removes a locale, subject to the guards below.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsLocale` | Mutation | Delete a locale by id |

## Guards

The delete is refused (returns an `errors[]` entry, no record removed) when:

- It is the **only remaining locale** in the store.
- The locale is set as the **default locale of one or more channels**. For example: `"This locale is the default locale of one or more channels and cannot be deleted."` Re-point the channel(s) to another default locale first.

## Notes

- The returned node is an in-memory snapshot of the just-deleted record — its scalar fields (`_id`, `code`, `name`, `direction`) still resolve so you can confirm what was removed.
- Select **`message`** for the success confirmation — it resolves to `"Locale deleted successfully."` on a successful delete. `message` is `null` on read / list / create / update; a failed delete returns a top-level `errors[]` entry instead.
- Do **not** select the node's IRI `id` field on this mutation — the IRI cannot be generated for a deleted record and the field resolves with an `errors[]` entry. Select `_id` instead, as shown.
- Use the [`adminSettingsLocales`](./list.md) query to discover valid ids.

Permissions: `settings.locales.delete`. See the [Locales overview](./) for behaviour.
