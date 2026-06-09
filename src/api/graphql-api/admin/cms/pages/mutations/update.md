---
outline: false
examples:
  - id: admin-cms-pages-update
    title: Update a CMS Page (locale-nested)
    description: Validation is LOCALE-NESTED. Top-level `locale` names which block is being updated.
    query: |
      mutation UpdateCmsPage($input: updateAdminCmsPageInput!) {
        updateAdminCmsPage(input: $input) {
          adminCmsPage {
            id
            _id
            urlKey
            pageTitle
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/cms_pages/7",
          "locale": "en",
          "channels": [1],
          "en": {
            "url_key": "about-us",
            "page_title": "About Us (Updated)",
            "html_content": "<h1>About Us</h1>"
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCmsPage": {
            "adminCmsPage": {
              "id": "/api/admin/cms_pages/7",
              "_id": 7,
              "urlKey": "about-us",
              "pageTitle": "About Us (Updated)"
            }
          }
        }
      }
---

# CMS Page — Update

Equivalent to [`PUT /api/admin/cms/pages/{id}`](/api/rest-api/admin/cms/pages-update).

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a CMS page that exists in your store — use the [`adminCmsPages`](/api/graphql-api/admin/cms/pages/queries/list) query to discover valid ids.
:::

## Operation

| Operation | Type |
|-----------|------|
| `updateAdminCmsPage` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | `ID!` | yes | Resource IRI. |
| `locale` | `String!` | yes | Which locale block is being updated. |
| `channels` | `[Int!]!` | yes | Non-empty. |
| `<locale>` | `Object` | yes | `{ url_key, page_title, html_content, meta_* }`. |
