---
outline: false
examples:
  - id: gql
    title: Mass Delete Locales
    description: Delete several locales in one call by their numeric ids.
    query: |
      mutation MassDelete($input: createAdminSettingsLocaleMassDeleteInput!) {
        createAdminSettingsLocaleMassDelete(input: $input) {
          adminSettingsLocaleMassDelete {
            deleted
            skipped
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [46]
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsLocaleMassDelete": {
            "adminSettingsLocaleMassDelete": {
              "deleted": {
                "data": [46],
                "meta": {
                  "currentPage": 1,
                  "perPage": 1,
                  "lastPage": 1,
                  "total": 1,
                  "from": 1,
                  "to": 1
                }
              },
              "skipped": {
                "data": [],
                "meta": {
                  "currentPage": 1,
                  "perPage": 0,
                  "lastPage": 1,
                  "total": 0,
                  "from": null,
                  "to": null
                }
              },
              "message": "Locales deleted successfully."
            }
          }
        }
      }
---

# Mass Delete Locales

Deletes multiple locales in a single request. Ids that can't be deleted (the last locale, or a channel's default locale) are reported under `skipped` rather than aborting the whole batch; non-existent ids are silently ignored.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsLocaleMassDelete` | Mutation | Bulk-delete locales by id |

## Input

| Field | Required | Notes |
|-------|----------|-------|
| `indices` | yes | Array of numeric locale ids to delete. An empty array is rejected (validation error). |

## Notes

- Over GraphQL the `deleted` and `skipped` fields render as paginated `{ data, meta }` envelopes — the actual id lists live under `deleted.data` and `skipped.data`. Read `message` for the human-readable summary.
- When a guard blocks an id (last locale or channel default), that id appears in `skipped.data` with the batch still completing for the rest.

Permissions: `settings.locales.delete`. See the [Locales overview](./) for behaviour.
