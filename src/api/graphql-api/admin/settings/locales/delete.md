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
              "_id": null,
              "code": null
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

- The returned node represents the now-deleted record, so its fields come back `null` — read the operation's success from the absence of an `errors[]` entry.
- Do **not** select the node's IRI `id` field on this mutation — the IRI cannot be generated for a deleted record and the field resolves with an `errors[]` entry. Select `_id` / `code` instead, as shown.
- Use the [`adminSettingsLocales`](./list.md) query to discover valid ids.

Permissions: `settings.locales.delete`. See the [Locales overview](./) for behaviour.
