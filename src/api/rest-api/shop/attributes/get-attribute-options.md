---
outline: false
examples:
  - id: list-attribute-options
    title: List Attribute Options
    description: Retrieve a paginated, flat list of every attribute option in the system.
    request: |
      curl -X GET "http://localhost/api/shop/attribute-options?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 84
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 42

      [
        {
          "id": 1,
          "adminName": "Red",
          "sortOrder": 0,
          "translation": { "id": 1, "attributeOptionId": 1, "locale": "en", "label": "Red" },
          "translations": [
            { "id": 1,  "attributeOptionId": 1, "locale": "en", "label": "Red" },
            { "id": 86, "attributeOptionId": 1, "locale": "de", "label": "" },
            { "id": 85, "attributeOptionId": 1, "locale": "es", "label": "" },
            { "id": 82, "attributeOptionId": 1, "locale": "fr", "label": "" }
          ]
        },
        {
          "id": 2,
          "adminName": "Green",
          "sortOrder": 0,
          "translation": { "id": 2, "attributeOptionId": 2, "locale": "en", "label": "Green" },
          "translations": []
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-attribute-option
    title: Get Single Attribute Option
    description: Retrieve a single attribute option by ID.
    request: |
      curl -X GET "http://localhost/api/shop/attribute-options/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 1,
        "adminName": "Red",
        "sortOrder": 0,
        "translation": { "id": 1, "attributeOptionId": 1, "locale": "en", "label": "Red" },
        "translations": [
          { "id": 1,  "attributeOptionId": 1, "locale": "en", "label": "Red" },
          { "id": 86, "attributeOptionId": 1, "locale": "de", "label": "" },
          { "id": 85, "attributeOptionId": 1, "locale": "es", "label": "" },
          { "id": 82, "attributeOptionId": 1, "locale": "fr", "label": "" },
          { "id": 87, "attributeOptionId": 1, "locale": "it", "label": "" },
          { "id": 83, "attributeOptionId": 1, "locale": "nl", "label": "" },
          { "id": 88, "attributeOptionId": 1, "locale": "ru", "label": "" },
          { "id": 84, "attributeOptionId": 1, "locale": "tr", "label": "" }
        ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: No attribute option with the given `{id}` exists
        solution: List options via `GET /api/shop/attribute-options` or fetch the parent attribute via `GET /api/shop/attributes/{id}`.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Attribute Options

Attribute options are the selectable values for a `select` / `multiselect` attribute (color values, sizes, brands, etc.).

Prefer reading options inline through [`GET /api/shop/attributes/{id}`](/api/rest-api/shop/attributes/get-attributes), which scopes them to one attribute. Use the endpoints here when you want the whole option catalog, or need to resolve an option by ID without knowing its parent attribute.
>
The URL is flat rather than nested under its attribute — `/attribute-options`, not `/attributes/{id}/options`.

## Endpoints

| Method | Path                                  | Purpose                                    |
|--------|---------------------------------------|--------------------------------------------|
| GET    | `/api/shop/attribute-options`         | Paginated flat list of every option        |
| GET    | `/api/shop/attribute-options/{id}`    | Single option by ID                        |

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |

## Query Parameters (collection only)

| Parameter   | Type    | Default | Description                                 |
|-------------|---------|---------|---------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                       |
| `per_page`  | integer | 10      | Items per page. Max **50**.                 |

Pagination headers are emitted on the collection. See [Pagination](/api/rest-api/introduction#pagination).

## Attribute Option Object Fields

| Field          | Type    | Description                                                                              |
|----------------|---------|------------------------------------------------------------------------------------------|
| `id`           | integer | Option primary key — use this value when filtering products by an attribute              |
| `adminName`    | string  | Internal admin label                                                                     |
| `sortOrder`    | integer | Display order within its parent attribute                                                |
| `translation`  | object  | Current-locale translation: `{ id, attributeOptionId, locale, label }`                   |
| `translations` | array   | All locale-specific labels (each `{ id, attributeOptionId, locale, label }`). Empty `[]` if no other locales have stored labels. |

The parent attribute is not embedded in the response, so an option on its own does not say which attribute it belongs to. Read the attribute when that matters.

## Use Cases

- Pre-load all option labels in every storefront locale for offline / SPA caching.
- Resolve historical option IDs stored against orders or carts back to readable labels.
- Build admin-style "find option by label" search.
- Look up the localized label for a specific option in a non-default locale.

## Best Practices

- **Prefer the attribute's inline `options`** — [Get Attributes](/api/rest-api/shop/attributes/get-attributes) already embeds them, and this flat collection cannot be filtered to one attribute.
- **Order by `sortOrder`** — it is the order the store configured for display, and it is not guaranteed to match ID order.
- **Read the localised label from `translation`** — `adminName` is the back-office label, not what a shopper should see.

## Related Resources

- [Attributes](/api/rest-api/shop/attributes/get-attributes) — preferred when you only need options for one attribute
- [Attribute Translations](/api/rest-api/shop/attributes/get-attribute-translations) — localised attribute labels, keyed by locale
