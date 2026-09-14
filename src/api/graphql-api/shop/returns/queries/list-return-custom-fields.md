---
outline: false
examples:
  - id: list-return-custom-fields
    title: List Return Custom Fields
    description: List the active custom fields the storefront return form asks the shopper to fill in.
    query: |
      query ReturnCustomFields {
        returnCustomFields {
          _id
          code
          label
          type
          isRequired
          position
          inputValidation
          options
        }
      }
    response: |
      {
        "data": {
          "returnCustomFields": [
            {
              "_id": 1,
              "code": "invoice_number",
              "label": "Invoice number",
              "type": "text",
              "isRequired": true,
              "position": 1,
              "inputValidation": "numeric",
              "options": []
            },
            {
              "_id": 2,
              "code": "preferred_pickup_slot",
              "label": "Preferred pickup slot",
              "type": "select",
              "isRequired": false,
              "position": 2,
              "inputValidation": null,
              "options": [
                { "id": 3, "name": "Morning", "value": "morning" },
                { "id": 4, "name": "Evening", "value": "evening" }
              ]
            }
          ]
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# List Return Custom Fields

## About

The `returnCustomFields` query lists the active custom fields the store asks the shopper to fill in while raising a return — the same additional questions the storefront return form renders. Answer them with `customAttributes` when calling [`createCustomerReturn`](/api/graphql-api/shop/returns/mutations/create-return), keyed by each field's `_id`.

The list is empty when the store has not configured any custom fields, in which case `customAttributes` can be omitted entirely.

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

This query takes no arguments.

## Possible Returns

The query returns a plain list of fields, not a cursor connection — there is no `edges`, `pageInfo`, or `totalCount` to select, and no pagination arguments. Fields come back in the order the storefront renders them.

| Field | Type | Description |
|-------|------|-------------|
| `_id` | `Int!` | Numeric field id — the key to use in `customAttributes`. |
| `code` | `String` | Machine name of the field. |
| `label` | `String` | Label shown to the shopper. |
| `type` | `String` | Input type — `text`, `textarea`, `date`, `select`, `multiselect`, `checkbox` or `radio`. |
| `isRequired` | `Boolean` | Whether an answer is mandatory when raising a return. |
| `position` | `Int` | Display order position. |
| `inputValidation` | `String` | Validation rule configured by the admin, when any. |
| `options` | `Array` | Allowed choices for option-based types — `id`, `name`, `value`. Empty for free-text types. Query bare (a JSON array). |

## Answering the Fields

`customAttributes` is an `Iterable` keyed by field id:

```json
{
  "customAttributes": {
    "1": "INV-9921",
    "2": "morning"
  }
}
```

- every field with `isRequired: true` must be answered
- `select` and `radio` answers must be one of the field's option `value`s
- `multiselect` and `checkbox` answers take a list of option values, e.g. `["morning", "evening"]`
- the stored answers come back on the return as `customAttributes`

::: warning
A required field left unanswered rejects the whole mutation — nothing is stored. Query this field set before rendering your return form so the shopper is asked for everything the store expects.
:::

## Related Resources

- [Raise a Return](/api/graphql-api/shop/returns/mutations/create-return) — send the answers as `customAttributes`
- [List Return Reasons](/api/graphql-api/shop/returns/queries/list-return-reasons) — the reason ids to choose from
- [List Returnable Items](/api/graphql-api/shop/returns/queries/list-returnable-items) — which order items are still eligible, and for how many units
- [Returns Overview](/api/graphql-api/shop/returns/) — the returns menu overview, including the settings that gate it
