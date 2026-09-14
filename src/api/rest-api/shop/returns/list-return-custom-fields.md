---
outline: false
examples:
  - id: list-return-custom-fields
    title: List Return Custom Fields
    description: List the active custom fields the storefront return form asks the shopper to fill in.
    request: |
      GET /api/shop/return-custom-fields
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      [
        {
          "id": 1,
          "code": "invoice_number",
          "label": "Invoice number",
          "type": "text",
          "isRequired": true,
          "position": 1,
          "inputValidation": "numeric",
          "options": []
        },
        {
          "id": 2,
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
    commonErrors:
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
---

# List Return Custom Fields

List the active custom fields the store asks the shopper to fill in while raising a return — the same additional questions the storefront return form renders. Answer them with `custom_attributes` when calling [`POST /api/shop/returns`](/api/rest-api/shop/returns/create-return), keyed by each field's `id`.

The list is empty when the store has not configured any custom fields, in which case `custom_attributes` can be omitted entirely.

## Endpoint

```
GET /api/shop/return-custom-fields
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response Fields (200 OK)

The response is a plain JSON array, in the order the storefront renders the fields.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Numeric field id — the key to use in `custom_attributes`. |
| `code` | string | Machine name of the field. |
| `label` | string | Label shown to the shopper. |
| `type` | string | Input type — `text`, `textarea`, `date`, `select`, `multiselect`, `checkbox` or `radio`. |
| `isRequired` | boolean | Whether an answer is mandatory when raising a return. |
| `position` | integer | Display order position. |
| `inputValidation` | string | Validation rule configured by the admin, when any. |
| `options` | array | Allowed choices for option-based types — `id`, `name`, `value`. Empty for free-text types. |

## Answering the Fields

Send the answers as an object keyed by field id:

```json
{
  "custom_attributes": {
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
A required field left unanswered rejects the whole return with `400 Bad Request` — nothing is stored. Fetch this endpoint before rendering your return form so the shopper is asked for everything the store expects.
:::

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Custom fields retrieved. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |

## Related Resources

- [Raise a Return](/api/rest-api/shop/returns/create-return) — send the answers as `custom_attributes`
- [List Return Reasons](/api/rest-api/shop/returns/list-return-reasons) — the reason ids to choose from
- [List Returnable Items](/api/rest-api/shop/returns/list-returnable-items) — which order items are still eligible, and for how many units
- [Returns Overview](/api/rest-api/shop/returns/) — the returns menu overview, including the settings that gate it
