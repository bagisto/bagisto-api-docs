---
outline: false
examples:
  - id: admin-cms-pages-detail
    title: CMS Page Detail
    description: Returns a single CMS page with translations and channels inlined.
    query: |
      query CmsPage($id: ID!) {
        adminCmsPage(id: $id) {
          id _id urlKey pageTitle htmlContent metaTitle metaKeywords metaDescription locale createdAt updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/cms_pages/7"
      }
    response: |
      {
        "data": {
          "adminCmsPage": {
            "id": "/api/admin/cms_pages/7",
            "_id": 7,
            "urlKey": "about-us",
            "pageTitle": "About Us",
            "htmlContent": "<h1>About Us</h1>",
            "metaTitle": "About Us",
            "metaKeywords": "about,us",
            "metaDescription": "About us page.",
            "locale": "en",
            "createdAt": "2026-01-12T08:15:00+00:00",
            "updatedAt": "2026-04-30T14:20:09+00:00"
          }
        }
      }
---

# CMS Page — Detail

Equivalent to [`GET /api/admin/cms/pages/{id}`](/api/rest-api/admin/cms/pages-detail).

## Operation

| Operation | Type |
|-----------|------|
| `adminCmsPage(id: ID!)` | Query |

## Notes

- `translations` and `channels` are arrays of plain objects. Some scalar
  camelCase fields may surface as `null` in GraphQL — fall back to REST when
  the full payload is required (see the package CLAUDE.md "GraphQL `?array`
  nullability quirk" note).
