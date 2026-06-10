---
outline: false
examples:
  - id: list-country-states-nested
    title: List States for a Country (nested)
    description: Retrieve every state for a single country. Recommended for country/state cascade pickers.
    request: |
      curl -X GET "http://localhost/api/shop/countries/40/states?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 13
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 7

      [
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
      ]
    commonErrors:
      - error: 404 Not Found
        cause: No country with the given `{country_id}` exists
        solution: List countries via `GET /api/shop/countries` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-country-state-nested
    title: Get Single State (nested)
    description: Retrieve a single state scoped to a parent country.
    request: |
      curl -X GET "http://localhost/api/shop/countries/40/states/66" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

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
      }
    commonErrors:
      - error: 404 Not Found
        cause: Either the country `{country_id}` or the state `{id}` doesn't exist, or the state belongs to a different country
        solution: Verify both IDs against `GET /api/shop/countries` and `GET /api/shop/country-states`.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: list-country-states-flat
    title: List All States (flat)
    description: Retrieve every state across every country in one paginated stream.
    request: |
      curl -X GET "http://localhost/api/shop/country-states?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 586
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 293

      [
        {
          "id": 1,
          "countryId": 244,
          "countryCode": "US",
          "code": "AL",
          "defaultName": "Alabama",
          "translations": [
            "/api/shop/country_state_translations/1",
            "/api/shop/country_state_translations/569",
            "/api/shop/country_state_translations/1155",
            "/api/shop/country_state_translations/1723"
          ]
        },
        {
          "id": 2,
          "countryId": 244,
          "countryCode": "US",
          "code": "AK",
          "defaultName": "Alaska",
          "translations": [
            "/api/shop/country_state_translations/2"
          ]
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-country-state-flat
    title: Get Single State (flat)
    description: Retrieve a single state by its global ID without specifying a parent country.
    request: |
      curl -X GET "http://localhost/api/shop/country-states/66" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

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
      }
    commonErrors:
      - error: 404 Not Found
        cause: No state with the given `{id}` exists
        solution: List states via `GET /api/shop/country-states` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Country States

A *country state* is any sub-division of a country — state, province, territory, prefecture, etc. Each state belongs to exactly one country and identifies itself with a short code (`AL`, `CA`, `BC`, `MH`, …).

## Endpoints

The same resource is exposed under **two URL shapes** so clients can choose the access pattern that fits their UI:

| Method | Path                                              | Purpose                                                                        |
|--------|---------------------------------------------------|--------------------------------------------------------------------------------|
| GET    | `/api/shop/countries/{country_id}/states`         | **Nested** — every state for a single country (recommended for cascade pickers) |
| GET    | `/api/shop/countries/{country_id}/states/{id}`    | **Nested** — single state, scoped to its parent country                         |
| GET    | `/api/shop/country-states`                        | **Flat** — every state across every country in one paginated stream             |
| GET    | `/api/shop/country-states/{id}`                   | **Flat** — single state by global ID                                            |

The response shape is **identical** in all four — the only difference is the URL/scoping. Use the example switcher above the curl block to flip through them.

> Both shapes return state IDs from the same global sequence — `id: 66` is "Alberta" whether you reach it via `/countries/40/states/66` or `/country-states/66`.

## When to use which

| Scenario                                                    | Endpoint                                          |
|-------------------------------------------------------------|---------------------------------------------------|
| Country/state cascade dropdown in a checkout form           | `GET /api/shop/countries/{country_id}/states`     |
| Resolve a single state ID (e.g. stored on an order address) | `GET /api/shop/country-states/{id}`               |
| Build an offline cache of every state in the world          | `GET /api/shop/country-states` (paginate through) |
| Validate that a state belongs to a specific country         | `GET /api/shop/countries/{country_id}/states/{id}` (404 if mismatched) |

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |

## Query Parameters (collections only)

| Parameter   | Type    | Default | Description                                 |
|-------------|---------|---------|---------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                       |
| `per_page`  | integer | 10      | Items per page. Max **50**.                 |

Pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`) are emitted on both collection variants. See [Pagination](/api/rest-api/introduction#pagination).

## State Object Fields

| Field          | Type                  | Description                                                                              |
|----------------|-----------------------|------------------------------------------------------------------------------------------|
| `id`           | integer               | State primary key (globally unique across countries)                                     |
| `countryId`    | integer               | Owning country ID                                                                        |
| `countryCode`  | string                | ISO country code of the parent (`CA`, `US`, …)                                           |
| `code`         | string                | State/province code within the country (`AB`, `CA`, `MH`, …)                             |
| `defaultName`  | string                | Default English name                                                                     |
| `translations` | array of IRI strings  | One IRI per locale translation. `GET /api/shop/country_state_translations/{id}` to dereference |

> Unlike `Country`, where `translations` is inlined, `country state` translations are returned as IRI strings. This keeps the flat list (~586 rows) lean. See [IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas).

## Use Cases

- Render a state/province dropdown that depends on the chosen country (use the **nested** collection).
- Validate a `state_id` saved on an order against its `country_id` (use the **nested single** — 404 means mismatched).
- Resolve a localized state name for a given customer locale by following one of the `translations[]` IRIs.
- Bulk-export every state for a CSV / SPA cache (use the **flat** collection with `?per_page=50`).

## Related Resources

- [Countries](/api/rest-api/shop/countries/get-countries) — the parent resource; emits the same state objects inline under `Country.states[]`
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
