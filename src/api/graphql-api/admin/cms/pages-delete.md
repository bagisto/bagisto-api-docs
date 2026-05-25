---
outline: false
examples:
  - id: admin-cms-pages-delete
    title: Delete a CMS Page
    description: Deletes a CMS page by IRI.
    query: |
      mutation DeleteCmsPage($input: deleteAdminCmsPageInput!) {
        deleteAdminCmsPage(input: $input) {
          adminCmsPage { id }
        }
      }
    variables: |
      {
        "input": { "id": "/api/admin/cms_pages/7" }
      }
    response: |
      {
        "data": {
          "deleteAdminCmsPage": {
            "adminCmsPage": { "id": "/api/admin/cms_pages/7" }
          }
        }
      }
---

# CMS Page — Delete

Equivalent to [`DELETE /api/admin/cms/pages/{id}`](/api/rest-api/admin/cms/pages-delete).

## Operation

| Operation | Type |
|-----------|------|
| `deleteAdminCmsPage` | Mutation |
