---
outline: false
apiType: rest
examples:
  - id: rest
    title: Get Theme
    query: |
      curl -X GET "https://your-domain.com/api/admin/appearance/themes/default" \
        -H "Authorization: Bearer <token>"
    response: |
      {
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
---

# Get Theme

One theme by its code. Same fields as the listing.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/appearance/themes/{code}` | Get a theme |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `code` | Theme code, e.g. `default`. |

## Response fields

Identical to [List themes](/api/rest-api/admin/appearance/themes/list).

## Errors

| Status | When |
|--------|------|
| `404` | The installation has no theme with this code. |

## Permissions

Requires `appearance.themes`.
