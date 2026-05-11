---
outline: false
examples:
  - id: list-countries
    title: List Countries
    description: Retrieve a paginated list of countries with their inline translations.
    request: |
      curl -X GET "http://localhost/api/shop/countries?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 255
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 128

      [
        {
          "id": 1,
          "code": "AF",
          "name": "Afghanistan",
          "states": [],
          "translations": [
            { "id": 1,   "countryId": 1, "locale": "ar",    "name": "أفغانستان" },
            { "id": 256, "countryId": 1, "locale": "es",    "name": "Afganistán" },
            { "id": 511, "countryId": 1, "locale": "fa",    "name": "افغانستان" },
            { "id": 766, "countryId": 1, "locale": "pt_BR", "name": "Afeganistão" }
          ]
        },
        {
          "id": 2,
          "code": "AX",
          "name": "Åland Islands",
          "states": [],
          "translations": [
            { "id": 2,   "countryId": 2, "locale": "ar", "name": "جزر آلاند" }
          ]
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-country
    title: Get Single Country
    description: Retrieve a single country by ID. States are inlined when the country has them.
    request: |
      curl -X GET "http://localhost/api/shop/countries/40" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 40,
        "code": "CA",
        "name": "Canada",
        "states": [
          {
            "id": 66,
            "countryId": 40,
            "countryCode": "CA",
            "code": "AB",
            "defaultName": "Alberta",
            "translations": [
              "/api/shop/country_state_translations/66",
              "/api/shop/country_state_translations/634",
              "/api/shop/country_state_translations/1220",
              "/api/shop/country_state_translations/1788"
            ]
          },
          {
            "id": 67,
            "countryId": 40,
            "countryCode": "CA",
            "code": "BC",
            "defaultName": "British Columbia",
            "translations": [
              "/api/shop/country_state_translations/67",
              "/api/shop/country_state_translations/635",
              "/api/shop/country_state_translations/1221",
              "/api/shop/country_state_translations/1789"
            ]
          }
        ],
        "translations": [
          { "id": 40,  "countryId": 40, "locale": "ar", "name": "كندا" },
          { "id": 295, "countryId": 40, "locale": "es", "name": "Canadá" }
        ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: No country with the given `{id}` exists
        solution: List countries via `GET /api/shop/countries` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Countries

Countries are the catalog of nations available for billing/shipping addresses, taxes, and storefront scoping. Each country may have one or more sub-divisions ("states", "provinces", "territories" — generically called *country states* in this API).

## Endpoints

| Method | Path                          | Purpose                                  |
|--------|-------------------------------|------------------------------------------|
| GET    | `/api/shop/countries`         | Paginated list of countries              |
| GET    | `/api/shop/countries/{id}`    | Single country by ID                     |

Use the example switcher above to flip between the two.

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |
| `X-Locale`         | No       | Override request locale                  |

## Query Parameters (collection only)

| Parameter   | Type    | Default | Description                                 |
|-------------|---------|---------|---------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                       |
| `per_page`  | integer | 10      | Items per page. Max **50**.                 |

Pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`) are emitted on the collection. See [Pagination](/api/rest-api/introduction#pagination).

## Country Object Fields

Both endpoints return the same shape — the collection wraps an array of these objects, the single endpoint returns one.

| Field          | Type    | Description                                                                          |
|----------------|---------|--------------------------------------------------------------------------------------|
| `id`           | integer | Country primary key                                                                  |
| `code`         | string  | ISO 3166-1 alpha-2 country code (`AF`, `CA`, `US`, `IN`, …)                          |
| `name`         | string  | Default English name                                                                 |
| `states`       | array   | Inline list of [country states](/api/rest-api/shop/countries/get-country-states) for this country. Empty `[]` for countries with no sub-divisions in Bagisto's data |
| `translations` | array   | All locale translations as **inline objects**: `{ id, countryId, locale, name }`     |

> ⚠️ Unlike `Attribute` / `Channel` / `Category`, `translations` on Country is returned as **inline objects** (not IRI strings). This avoids an extra round-trip per locale. There is no `translation` field for the request locale — pick the entry that matches your `X-Locale`.

### Inline `states[]` shape

Each entry has the same fields as `/country-states/{id}` — see the [Country States](/api/rest-api/shop/countries/get-country-states) page.

## Use Cases

- Populate a country dropdown in a checkout / address form.
- Look up a country by ISO code (`?code=US`) is **not** supported — fetch the full list and filter client-side, or use the GraphQL query for a single lookup.
- Resolve a country's localized display name from `translations[]` based on the customer's locale.
- Chain to the country's states for a country/state cascade picker (use the [nested states endpoint](/api/rest-api/shop/countries/get-country-states) to skip refetching the country payload).

## Related Resources

- [Country States](/api/rest-api/shop/countries/get-country-states)
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
