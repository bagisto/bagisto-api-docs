---
outline: false
examples:
  - id: admin-cms-pages-create
    title: Create a CMS Page
    description: Top-level translated fields are broadcast to every locale by the core PageRepository.
    query: |
      mutation CreateCmsPage($input: createAdminCmsPageInput!) {
        createAdminCmsPage(input: $input) {
          adminCmsPage { id _id urlKey pageTitle }
        }
      }
    variables: |
      {
        "input": {
          "urlKey": "about-us",
          "pageTitle": "About Us",
          "htmlContent": "<h1>About Us</h1>",
          "channels": [1]
        }
      }
    response: |
      {
        "data": {
          "createAdminCmsPage": {
            "adminCmsPage": { "id": "/api/admin/cms_pages/7", "_id": 7, "urlKey": "about-us", "pageTitle": "About Us" }
          }
        }
      }
---

# CMS Page — Create

Equivalent to [`POST /api/admin/cms/pages`](/api/rest-api/admin/cms/pages-create).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCmsPage` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `url_key` | `String!` | yes | Unique slug. |
| `page_title` | `String!` | yes | |
| `html_content` | `String!` | yes | |
| `channels` | `[Int!]!` | yes | |
| `meta_title`, `meta_keywords`, `meta_description` | `String` | no | |

::: warning Create vs Update payload shape
**Create** takes flat top-level fields (broadcast to all locales).
**Update** requires a [locale-nested payload](/api/graphql-api/admin/cms/pages-update).
:::
