---
outline: false
examples:
  - id: admin-cms-pages-delete
    title: Delete a CMS Page
    description: Deletes a CMS page by IRI and returns a snapshot of the removed record.
    query: |
      mutation DeleteCmsPage($input: deleteAdminCmsPageInput!) {
        deleteAdminCmsPage(input: $input) {
          adminCmsPage {
            id
            _id
            urlKey
            pageTitle
            metaTitle
            locale
            message
          }
        }
      }
    variables: |
      {
        "input": { "id": "/api/admin/cms/pages/7" }
      }
    response: |
      {
        "data": {
          "deleteAdminCmsPage": {
            "adminCmsPage": {
              "id": "/api/admin/cms/pages/7",
              "_id": 7,
              "urlKey": "about-us",
              "pageTitle": "About Us",
              "metaTitle": "About Us",
              "locale": "en",
              "message": "CMS page deleted successfully."
            }
          }
        }
      }
---

# CMS Page — Delete

Deletes a CMS page. Equivalent to [`DELETE /api/admin/cms/pages/{id}`](/api/rest-api/admin/cms/pages-delete).

::: tip Prerequisites
Replace the example `id` with a CMS page id that exists in your store — use the [`adminCmsPages`](/api/graphql-api/admin/cms/pages/queries/list) query to find one.
:::

## Operation

| Operation | Type |
|-----------|------|
| `deleteAdminCmsPage` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | `ID!` | yes | Resource IRI — `/api/admin/cms/pages/{id}`. |

## What it returns

The mutation returns a **snapshot of the deleted page**, captured just before removal, so you can confirm what was deleted in the same round trip. The **scalar** fields all resolve — `id`, `_id`, `urlKey`, `pageTitle`, `htmlContent`, `metaTitle`, `metaKeywords`, `metaDescription`, `locale`. Select the fields you want to log or display.

## Confirming success vs. failure

Select the **`message`** field to get the human-readable success confirmation (`"CMS page deleted successfully."`). The contract:

- **Success** → `data.deleteAdminCmsPage.adminCmsPage` is non-null, `message` carries the confirmation, and `errors` is absent.
- **Failure** → `data.deleteAdminCmsPage` is `null` and the reason is in the top-level **`errors`** array (page not found, no permission, or a deletion failure). `message` is only populated on success.

(`message` is `null` on read / list / detail queries — it is an action result, meaningful only on the delete mutation.)

::: warning `translations` and `channels` come back empty
The `translations` and `channels` connections are re-read from the database when resolved, but the row (and its translation / channel rows) are already gone at that point — so those connections return **empty edges** on a delete result. To capture per-locale content before deleting, query the [detail](/api/graphql-api/admin/cms/pages/queries/detail) first. Scalar fields like `urlKey` / `pageTitle` are taken from the in-memory snapshot and do resolve.
:::

Deleting a page also removes any storefront **redirects** (url rewrites) that pointed at its slugs.

## Errors

| Condition | Result |
|-----------|--------|
| Page ID not found | not-found error |
| Admin role lacks `cms.delete` | permission error |
