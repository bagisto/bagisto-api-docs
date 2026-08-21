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
            htmlContent
            metaTitle
            metaKeywords
            metaDescription
            locale
            previewUrl
            createdAt
            updatedAt
            translations {
              edges {
                node {
                  locale
                  urlKey
                  pageTitle
                  htmlContent
                  metaTitle
                  metaKeywords
                  metaDescription
                }
              }
            }
            channels {
              edges {
                node {
                  _id
                  code
                  name
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/cms/pages/7",
          "locale": "en",
          "channels": [1],
          "en": {
            "url_key": "about-us",
            "page_title": "About Us (Updated)",
            "html_content": "<h1>About Us</h1>",
            "meta_title": "About Us",
            "meta_keywords": "about,us,company",
            "meta_description": "Learn more about our company."
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCmsPage": {
            "adminCmsPage": {
              "id": "/api/admin/cms/pages/7",
              "_id": 7,
              "urlKey": "about-us",
              "pageTitle": "About Us (Updated)",
              "htmlContent": "<h1>About Us</h1>",
              "metaTitle": "About Us",
              "metaKeywords": "about,us,company",
              "metaDescription": "Learn more about our company.",
              "locale": "en",
              "previewUrl": "https://store.example.com/page/about-us",
              "createdAt": "2026-01-12T08:15:00+00:00",
              "updatedAt": "2026-06-23T11:49:19+00:00",
              "translations": {
                "edges": [
                  {
                    "node": {
                      "locale": "en",
                      "urlKey": "about-us",
                      "pageTitle": "About Us (Updated)",
                      "htmlContent": "<h1>About Us</h1>",
                      "metaTitle": "About Us",
                      "metaKeywords": "about,us,company",
                      "metaDescription": "Learn more about our company."
                    }
                  }
                ]
              },
              "channels": {
                "edges": [
                  { "node": { "_id": 1, "code": "default", "name": "Default" } }
                ]
              }
            }
          }
        }
      }
---

# CMS Page — Update

Edits **one locale** of an existing CMS page. Equivalent to [`PUT /api/admin/cms/pages/{id}`](/api/rest-api/admin/cms/pages-update).

The example uses an illustrative id. Replace it with a CMS page that exists in your store — [`adminCmsPages`](/api/graphql-api/admin/cms/pages/queries/list) lists valid ids.

## Operation

| Operation | Type |
|-----------|------|
| `updateAdminCmsPage` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | `ID!` | yes | Resource IRI — `/api/admin/cms/pages/{id}`. |
| `locale` | `String!` | yes | Which locale block is being written. Only this locale's content changes; other locales are left untouched. |
| `channels` | `[Int!]!` | yes | Non-empty list of channel IDs. **Replaces** the page's current channel assignment. |
| `<locale>` | `Object` | yes | A block keyed by the `locale` value above — `{ url_key, page_title, html_content, meta_title, meta_keywords, meta_description }`. `url_key`, `page_title`, and `html_content` are required inside it. |

## Locale-nested payload

Update is **per-locale**, mirroring the admin edit form. The top-level `locale` names which language you are editing, and the matching block (e.g. `en: { … }`) carries that locale's content. To update a second language, send another request with `locale: "fr"` and an `fr: { … }` block. The block name **must** equal the `locale` value — `locale: "en"` requires an `en` block.

This differs from [Create](/api/graphql-api/admin/cms/pages/mutations/create), which takes flat top-level fields broadcast to every locale.

## Changing `url_key` creates a redirect

When you change a locale's `url_key`, the store records a **301 redirect** from the old slug to the new one, so existing links and bookmarks keep working. That redirect is permanent: it is **not** removed when the page is later deleted, so the old slug keeps redirecting to a URL that no longer resolves. Clean it up through [URL Rewrites](/api/graphql-api/admin/marketing/search-seo/url-rewrites-list) if that matters.

## Response

The mutation returns the **updated page**. Every scalar resolves — `urlKey`, `pageTitle`, `htmlContent`, `metaTitle`, `metaKeywords`, `metaDescription`, `locale`, `previewUrl`, `createdAt`, `updatedAt` — and `translations` / `channels` are **field-selectable connections** (`{ edges { node { … } } }`) reflecting the post-update state. Select only what you need.

## Errors

| Condition | Result |
|-----------|--------|
| `url_key`, `page_title`, or `html_content` missing in the locale block | validation error |
| `url_key` already used by another page | validation error |
| `channels` empty or contains an unknown ID | validation error |
| Page ID not found | not-found error |
| Admin role lacks `cms.edit` | permission error |
