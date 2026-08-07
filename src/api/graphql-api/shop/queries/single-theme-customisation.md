---
outline: false
examples:
  - id: get-theme-customisation-by-id-basic
    title: Get Theme Customisation by ID - Basic
    description: Retrieve basic information for a single theme customisation by its ID.
    query: |
      query getThemeCustomisation($id: ID!) {
        themeCustomization(id: $id) {
          id
          _id
          type
          name
          status
          themeCode
          translation {
            locale
            options
          }
        }
      }
    variables: |
      {
        "id": "/api/theme_customizations/1"
      }
    response: |
      {
        "data": {
          "themeCustomization": {
            "id": "/api/shop/theme-customizations/1",
            "_id": 1,
            "type": "image_carousel",
            "name": "Image Carousel",
            "status": "1",
            "themeCode": "default",
            "translation": {
              "locale": "en",
              "options": "{\"images\": [{\"link\": \"fashion\", \"image\": \"storage/theme/1/ATTrUoI1AN2s8mR7KdlxfmGPG1eeFV0uwdIPn9fb.webp\", \"title\": \"Fashion\"}, {\"link\": \"furniture\", \"image\": \"storage/theme/1/CoizBehgRZ4vqmV1gw88HiJWnx16BVorCpRxaBSb.webp\", \"title\": \"Furniture\"}, {\"link\": \"electronics\", \"image\": \"storage/theme/1/HRIEAfZ4vTc0hrW5G5L1tK3vzmwBXgZR781tjEwU.webp\", \"title\": \"Electronics\"}]}"
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Theme Customization ID parameter is missing
        solution: Provide the theme customization ID as a required parameter
      - error: not-found
        cause: Theme Customization with given ID does not exist
        solution: Verify the theme customization ID is correct

  - id: get-theme-customisation-by-numeric-id
    title: Get Theme Customisation by Numeric ID
    description: Retrieve a theme customisation using a numeric ID instead of IRI format.
    query: |
      query getThemeCustomisation($id: ID!) {
        themeCustomization(id: $id) {
          id
          _id
          type
          name
          status
          themeCode
          sortOrder
          translation {
            locale
            options
          }
        }
      }
    variables: |
      {
        "id": 5
      }
    response: |
      {
        "data": {
          "themeCustomization": {
            "id": "/api/shop/theme-customizations/5",
            "_id": 5,
            "type": "static_content",
            "name": "Top Collections",
            "status": "1",
            "themeCode": "default",
            "sortOrder": 5,
            "translation": {
              "locale": "en",
              "options": "{\"css\": \".top-collection-header {...}\", \"html\": \"<div class=\\\"top-collection-container\\\"><div class=\\\"top-collection-header\\\"><h2>The game with our new additions!</h2></div>...</div>\"}"
            }
          }
        }
      }
    commonErrors:
      - error: not-found
        cause: Theme Customization with given ID does not exist
        solution: Verify the theme customization ID is correct

  - id: get-theme-customisation-complete
    title: Get Theme Customisation - Complete Details
    description: Retrieve complete theme customisation details including timestamps and all translations.
    query: |
      query getThemeCustomisation($id: ID!) {
        themeCustomization(id: $id) {
          id
          _id
          themeCode
          type
          name
          sortOrder
          status
          channelId
          createdAt
          updatedAt
          translation {
            id
            _id
            themeCustomizationId
            locale
            options
          }
          translations {
            edges {
              cursor
              node {
                id
                _id
                themeCustomizationId
                locale
                options
              }
            }
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            totalCount
          }
        }
      }
    variables: |
      {
        "id": 5
      }
    response: |
      {
        "data": {
          "themeCustomization": {
            "id": "/api/shop/theme-customizations/5",
            "_id": 5,
            "themeCode": "default",
            "type": "static_content",
            "name": "Top Collections",
            "sortOrder": 5,
            "status": "1",
            "channelId": "1",
            "createdAt": "2024-04-16T16:14:15+05:30",
            "updatedAt": "2026-04-07T12:02:47+05:30",
            "translation": {
              "id": "/api/shop/theme_customization_translations/5",
              "_id": 5,
              "themeCustomizationId": "5",
              "locale": "en",
              "options": "{\"css\": \".top-collection-header {...}\", \"html\": \"<div class=\\\"top-collection-container\\\"><div class=\\\"top-collection-header\\\"><h2>The game with our new additions!</h2></div>...</div>\"}"
            },
            "translations": {
              "edges": [
                {
                  "cursor": "MA==",
                  "node": {
                    "id": "/api/shop/theme_customization_translations/5",
                    "_id": 5,
                    "themeCustomizationId": "5",
                    "locale": "en",
                    "options": "{\"css\": \".top-collection-header {...}\", \"html\": \"<div class=\\\"top-collection-container\\\">...<h2>The game with our new additions!</h2>...</div>\"}"
                  }
                },
                {
                  "cursor": "MQ==",
                  "node": {
                    "id": "/api/shop/theme_customization_translations/22",
                    "_id": 22,
                    "themeCustomizationId": "5",
                    "locale": "AR",
                    "options": "{\"css\": \".top-collection-header {...}\", \"html\": \"<div class=\\\"top-collection-container\\\">...<h2>اللعبة مع إضافاتنا الجديدة!</h2>...</div>\"}"
                  }
                }
              ],
              "pageInfo": {
                "endCursor": "MQ==",
                "startCursor": "MA==",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "totalCount": 2
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Theme Customization ID parameter is missing
        solution: Provide the theme customization ID as a required parameter
      - error: not-found
        cause: Theme Customization with given ID does not exist
        solution: Verify the theme customization ID is correct
---

# Get Theme Customisation

## About

The `themeCustomization` query retrieves detailed information about a single theme customisation by its ID. Use this query to:

- Display specific theme customisation details
- Fetch carousel or slider configurations by ID
- Retrieve footer links or static content sections
- Access all translations for a specific customisation
- Get customisation metadata including timestamps
- Display channel-specific customisations
- Access complete JSON configuration options

This query returns comprehensive customisation data including all translations, display settings, and channel information.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | Theme Customization ID. Supports two formats: numeric ID (e.g., `1`) or IRI format (e.g., `/api/theme_customizations/1`). Required. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique theme customization API identifier. |
| `_id` | `Int!` | Numeric customization ID. |
| `themeCode` | `String!` | Theme code/identifier (e.g., 'default'). |
| `type` | `String!` | Customization type (e.g., 'footer_links', 'image_carousel', 'product_carousel', 'category_carousel', 'static_content'). |
| `name` | `String!` | Human-readable name of the customization. |
| `sortOrder` | `Int` | Sort order for display. |
| `status` | `String` | Status flag (0 = inactive, 1 = active). |
| `channelId` | `String` | Associated channel ID. |
| `createdAt` | `DateTime!` | Customization creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `translation` | `ThemeCustomizationTranslation!` | Default locale translation. |
| `translation.id` | `ID!` | Translation identifier. |
| `translation._id` | `Int!` | Numeric translation ID. |
| `translation.themeCustomizationId` | `String!` | Associated customization ID. |
| `translation.locale` | `String!` | Language locale code (e.g., 'en', 'ar', 'fr'). |
| `translation.options` | `String!` | JSON-formatted options/configuration for this translation. |
| `translations` | `ThemeCustomizationTranslationCollection!` | All available translations. |
| `translations.edges` | `[Edge!]!` | Translation edges with cursors. |
| `translations.edges.node` | `ThemeCustomizationTranslation!` | Individual translation. |
| `translations.edges.cursor` | `String!` | Pagination cursor for this translation. |
| `translations.pageInfo` | `PageInfo!` | Pagination info for translations. |
| `translations.pageInfo.hasNextPage` | `Boolean!` | More translations available. |
| `translations.pageInfo.hasPreviousPage` | `Boolean!` | Previous translations available. |
| `translations.pageInfo.startCursor` | `String` | First translation cursor. |
| `translations.pageInfo.endCursor` | `String` | Last translation cursor. |
| `translations.totalCount` | `Int!` | Total translations for this customization. |

## Customisation Types

| Type | Description |
|------|-------------|
| `image_carousel` | Image slider/carousel on home page |
| `product_carousel` | Product carousel display |
| `category_carousel` | Category carousel display |
| `static_content` | HTML/CSS static sections |
| `footer_links` | Footer navigation links |
| `services_content` | Services information blocks |

## Use Cases

### 1. Display Specific Carousel
Use the "Basic" example to fetch and display a specific carousel configuration.

### 2. Multi-Language Support
Use the "Complete Details" example to get all translations for rendering in different languages.

### 3. Footer Links Display
Fetch footer links customisation and display them in the footer section.

### 4. Static Content Sections
Retrieve HTML/CSS static content sections for rendering on pages.

## Best Practices

1. **Use Correct ID Format** - Use either numeric ID or IRI format consistently
2. **Cache Results** - Theme customisations change infrequently, cache the response
3. **Parse JSON Options** - The `options` field contains JSON; parse it in your application
4. **Check Status** - Verify status is active before displaying
5. **Handle Multiple Translations** - Fetch all translations for multi-language support
6. **Validate Channel** - Ensure customisation is for the correct channel

## Related Resources

- [Theme Customisations](/api/graphql-api/shop/queries/theme-customisations) - Get all theme customisations with pagination
- [Get Category](/api/graphql-api/shop/queries/get-category) - Query individual category details
- [Get Products](/api/graphql-api/shop/queries/get-products) - Query products
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
