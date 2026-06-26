---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Theme Customizations
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/themes" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "Homepage Banner", "type": "image_carousel", "sortOrder": 1, "channelId": 1, "themeCode": "default", "status": 1 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
  - id: rest-filtered
    title: Filtered + Sorted
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/themes?type=product_carousel&channel_id=1&status=1&sort=name&order=asc&per_page=10&page=1" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 15, "name": "All Products", "type": "product_carousel", "sortOrder": 9, "channelId": 1, "themeCode": "default", "status": 1 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Theme Customizations

List the theme customization blocks configured for the store. Returns the standard `{ data, meta }` admin envelope. The per-locale `options` content is returned only by the detail endpoint.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/settings/themes` | List theme customization blocks |

## Query parameters

All parameters are optional and combine in a single request — filter, sort and paginate together.

### Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number (1-based). |
| `per_page` | Items per page (default `10`, max `50`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Themes datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `name` | Partial (contains). | `Banner` |
| `type` | Exact. | `product_carousel` |
| `theme_code` | Exact. | `default` |
| `channel_id` | Exact. | `1` |
| `status` | Exact — `0` or `1`. | `1` |

### Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `name`, `type`, `sort_order`, `theme_code`, `channel_id`, `status` |
| `order` | `asc`, `desc` |

All operations require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
