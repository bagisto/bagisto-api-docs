---
outline: false
examples:
  - id: mass-delete-exchange-rates
    title: Mass Delete Exchange Rates
    description: Delete several exchange rates at once by their numeric ids.
    query: |
      mutation MassDelete($input: createAdminSettingsExchangeRateMassDeleteInput!) {
        createAdminSettingsExchangeRateMassDelete(input: $input) {
          adminSettingsExchangeRateMassDelete {
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [32, 33]
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsExchangeRateMassDelete": {
            "adminSettingsExchangeRateMassDelete": {
              "deleted": [32, 33],
              "message": "Exchange rates deleted successfully."
            }
          }
        }
      }
---

# Mass Delete Exchange Rates

Deletes multiple exchange rates in one call, identified by their numeric ids.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsExchangeRateMassDelete(input:)` | Mutation | Bulk-delete exchange rates |

## Input

| Field | Required | Notes |
|-------|----------|-------|
| `indices` | yes | Non-empty array of numeric exchange-rate ids to delete. |

## Notes

- The `deleted` field is a plain array of the numeric ids that were removed. Read `message` for a human-readable confirmation.
- Ids that don't exist are silently skipped.
- An empty `indices` array is rejected (equivalent to HTTP 422).

Permission: `settings.exchange_rates.delete`.

