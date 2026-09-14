---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Get Theme
    query: |
      query getTheme($code: String!) {
        adminAppearanceTheme(code: $code) {
          code
          name
          author
          version
          url
          demoUrl
          screenshot
          rating
          tags
          description
          isInstalled
          status
          activeOn
        }
      }
    variables: |
      {
        "code": "default"
      }
    response: |
      {
        "data": {
          "adminAppearanceTheme": {
            "code": "default",
            "name": "Default",
            "author": "Bagisto",
            "version": "2.4.10",
            "url": null,
            "demoUrl": null,
            "screenshot": "https://your-domain.com/themes/admin/default/images/default.png",
            "rating": null,
            "tags": [],
            "description": "The theme Bagisto ships with.",
            "isInstalled": true,
            "status": "active",
            "activeOn": [{ "id": 1, "name": "Default" }]
          }
        }
      }
---

# adminAppearanceTheme

One theme by its code.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `code` | `String!` | Theme code, e.g. `default`. |

## Fields

Identical to [adminAppearanceThemes](/api/graphql-api/admin/appearance/themes/list).

## Best practices

- **The argument is the theme code, not an IRI.** Pass `"default"`, not `/api/admin/appearance/themes/default`.
- **An unknown code resolves to an error**, not to `null` with data alongside it.

## Permissions

Requires `appearance.themes`.
