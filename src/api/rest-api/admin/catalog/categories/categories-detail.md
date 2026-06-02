---
outline: false
apiType: rest
examples:
  - id: admin-catalog-category-detail
    title: Category Detail (with all translations)
    description: Single category record including the full translations array (all locales present in the DB) and the list of filterable attribute IDs.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/categories/7" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      id=7
    response: |
      {
        "id": 7,
        "position": 1,
        "status": 1,
        "parentId": 1,
        "displayMode": "products_and_description",
        "logoUrl": "https://example.com/storage/category/7/logo.webp",
        "bannerUrl": null,
        "name": "Apparel",
        "slug": "apparel",
        "description": "Men's and women's apparel",
        "locale": "en",
        "createdAt": "2026-01-12T08:15:00+00:00",
        "updatedAt": "2026-04-30T14:20:09+00:00",
        "translations": [
          {
            "locale": "en",
            "name": "Apparel",
            "slug": "apparel",
            "description": "Men's and women's apparel",
            "metaTitle": null,
            "metaDescription": null,
            "metaKeywords": null
          },
          {
            "locale": "fr",
            "name": "Vêtements",
            "slug": "vetements",
            "description": null,
            "metaTitle": null,
            "metaDescription": null,
            "metaKeywords": null
          }
        ],
        "filterableAttributeIds": [11, 23]
      }
    commonErrors:
      - error: Not Found (404)
        cause: The category ID does not exist in the database
        solution: 'Verify the ID with the listing endpoint `GET /api/admin/catalog/categories`'

      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Catalog Category — Detail

Returns a single category record by ID, including the **full translations array**
(every locale present in the database) and the list of **filterable attribute IDs**
configured for the category.

This is the read endpoint to call when an admin needs the complete metadata for
a category — e.g. when opening the edit form in the Catalog → Categories UI.

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/categories/{id}` | GET | Admin Bearer token |

`{id}` must be a positive integer. Non-numeric values are rejected by a route
requirement (`\d+`) — this prevents the `{id}` segment from matching the
`/tree` path of the tree endpoint.

## Authentication

Every request requires:

```
Authorization: Bearer <token>
```

Obtain the Bearer token via [Authentication](/api/rest-api/admin/authentication).

## Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The numeric category ID |

## Response Shape

The response is a single JSON object (not wrapped in `{ data }`) with the
following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Category ID |
| `position` | integer | Display order position |
| `status` | integer | `1` = enabled, `0` = disabled |
| `parentId` | integer\|null | Parent category ID; `null` for root nodes |
| `displayMode` | string\|null | Category display mode (e.g. `products_and_description`) |
| `logoUrl` | string\|null | Storage URL for the category logo; `null` if not set |
| `bannerUrl` | string\|null | Storage URL for the category banner; `null` if not set |
| `name` | string\|null | Category name in the current app locale |
| `slug` | string\|null | URL slug in the current app locale |
| `description` | string\|null | Category description in the current app locale |
| `locale` | string\|null | App locale used for the top-level `name`/`slug`/`description` fields |
| `createdAt` | string\|null | ISO 8601 creation timestamp |
| `updatedAt` | string\|null | ISO 8601 last-update timestamp |
| `translations` | array | All locale translations (see below) |
| `filterableAttributeIds` | array\|null | Integer IDs of attributes configured as filterable for this category |

### `translations[]` item shape

Each entry in the `translations` array corresponds to one locale row in
`category_translations`:

| Field | Type | Description |
|-------|------|-------------|
| `locale` | string | Locale code (e.g. `en`, `fr`) |
| `name` | string\|null | Category name in this locale |
| `slug` | string\|null | URL slug in this locale |
| `description` | string\|null | Description in this locale |
| `metaTitle` | string\|null | SEO meta title in this locale |
| `metaDescription` | string\|null | SEO meta description in this locale |
| `metaKeywords` | string\|null | SEO meta keywords in this locale |

## Example Request

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/categories/7" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

## Example Response

```json
{
  "id": 7,
  "position": 1,
  "status": 1,
  "parentId": 1,
  "displayMode": "products_and_description",
  "logoUrl": "https://example.com/storage/category/7/logo.webp",
  "bannerUrl": null,
  "name": "Apparel",
  "slug": "apparel",
  "description": "Men's and women's apparel",
  "locale": "en",
  "createdAt": "2026-01-12T08:15:00+00:00",
  "updatedAt": "2026-04-30T14:20:09+00:00",
  "translations": [
    {
      "locale": "en",
      "name": "Apparel",
      "slug": "apparel",
      "description": "Men's and women's apparel",
      "metaTitle": null,
      "metaDescription": null,
      "metaKeywords": null
    },
    {
      "locale": "fr",
      "name": "Vêtements",
      "slug": "vetements",
      "description": null,
      "metaTitle": null,
      "metaDescription": null,
      "metaKeywords": null
    }
  ],
  "filterableAttributeIds": [11, 23]
}
```

## Errors

| HTTP Status | Cause |
|-------------|-------|
| `401 Unauthorized` | Missing, expired, or revoked admin Bearer token |
| `401 Unauthorized` | Missing or invalid admin Bearer token |
| `404 Not Found` | The specified `{id}` does not exist in the database |

## Notes

- **`translations` contains every locale in the DB**, not just the current app locale. If the store has 3 locale rows for this category (`en`, `fr`, `de`), all three are returned. Fields with no content for a locale are `null`.
- **`filterableAttributeIds`** is an array of integer attribute IDs. An empty array `[]` means no filterable attributes have been configured for the category. This differs from `null`, which would mean the field was not resolved — but in practice the detail provider always returns an array.
- **The `{id}` route parameter must be a digit.** Requesting `/api/admin/catalog/categories/tree` will NOT match this endpoint because the `requirements: ['id' => '\d+']` constraint rejects the non-numeric string `tree`. The tree endpoint has its own route at `GET /api/admin/catalog/categories/tree`.
- **Top-level `name`, `slug`, `description`, and `locale` fields** reflect the app's current default locale. They are a convenience shortcut — the same values are present in the `translations` array entry for that locale.
