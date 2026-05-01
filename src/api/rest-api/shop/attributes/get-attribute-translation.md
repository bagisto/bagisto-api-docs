---
outline: false
examples:
  - id: get-attribute-translation
    title: Get Single Attribute Translation
    description: Retrieve a single attribute translation by ID. The IRI is what you get from the `translations[]` array of an Attribute response.
    request: |
      curl -X GET "http://localhost/api/shop/attribute_translations/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 1,
        "attributeId": 1,
        "locale": "en",
        "name": "SKU"
      }
    commonErrors:
      - error: 404 Not Found
        cause: No translation with the given `{id}` exists
        solution: List translations via `GET /api/shop/attribute_translations` or read the parent attribute's `translations[]` array.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

---

# Get Single Attribute Translation

Resolve a single attribute translation by ID. This is the endpoint pointed to by every IRI string inside the `translations[]` array of an [Attribute](/api/rest-api/shop/attributes/get-attribute) response — so you typically get to this URL by following a link, not by constructing it manually.

> ⚠️ The URL uses an underscore: `attribute_translations`, not `attribute-translations`.

## Endpoint

```
GET /api/shop/attribute_translations/{id}
```

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |

## Path Parameters

| Parameter | Type    | Required | Description                            |
|-----------|---------|----------|----------------------------------------|
| `id`      | integer | Yes      | Translation primary key                |

## Response

`200 OK` — single translation object.

### Fields

| Field         | Type    | Description                                                |
|---------------|---------|------------------------------------------------------------|
| `id`          | integer | Translation primary key                                    |
| `attributeId` | integer | Owning attribute's ID                                      |
| `locale`      | string  | Locale code (`en`, `fr`, `de`, `ar`, …)                    |
| `name`        | string  | Localized attribute name                                   |

## Typical Flow

```
GET /api/shop/attributes/23
   └─ response.translations = [
        "/api/shop/attribute_translations/23",
        "/api/shop/attribute_translations/156",
        …
      ]

GET /api/shop/attribute_translations/156
   └─ { "id": 156, "attributeId": 23, "locale": "fr", "name": "Couleur" }
```

You don't need to know the translation ID up front — read the `translations[]` array on the attribute and dereference any entry you need.

## Related Resources

- [Get Attribute Translations](/api/rest-api/shop/attributes/get-attribute-translations)
- [Get Single Attribute](/api/rest-api/shop/attributes/get-attribute)
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
