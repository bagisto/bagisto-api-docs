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

Replace the example `id` with a CMS page that exists in your store — [`adminCmsPages`](/api/graphql-api/admin/cms/pages/queries/list) lists valid ids.

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

### What Resolves on the Delete Payload

Scalars come from an in-memory snapshot taken before the row was removed, so `urlKey`, `pageTitle`, and the rest still resolve — and `message` carries the confirmation text, which it does not on a read.

The `translations` and `channels` connections are re-read from the database instead, and the rows are already gone by then, so both return **empty edges**. Capture per-locale content with the [detail query](/api/graphql-api/admin/cms/pages/queries/detail) before deleting if you need it.

Any **301 redirects** created earlier by renaming the page's `url_key` are left in place — deleting the page does not remove them, so an old slug keeps redirecting to a URL that no longer resolves. Remove them through [URL Rewrites](/api/graphql-api/admin/marketing/search-seo/url-rewrites-list) if that matters.

## Errors

| Condition | Result |
|-----------|--------|
| Page ID not found | not-found error |
| Admin role lacks `cms.delete` | permission error |
