---
outline: false
---

# Search & SEO

Search & SEO controls **how the store is searched and how search engines index it**. It mirrors the admin **Marketing → Search & SEO** menu.

## Resources

| Resource | What it's for |
|----------|----------------|
| [URL Rewrites](/api/graphql-api/admin/marketing/search-seo/url-rewrites/) | 301 / 302 redirects from an old or custom path to a target — keeps links alive when slugs change. |
| [Search Terms](/api/graphql-api/admin/marketing/search-seo/search-terms/) | What shoppers typed into storefront search, auto-recorded with result counts and use counts. |
| [Search Synonyms](/api/graphql-api/admin/marketing/search-seo/search-synonyms/) | Word groups that widen search matches (a query for one term also matches the others). |
| [Sitemaps](/api/graphql-api/admin/marketing/search-seo/sitemaps/) | XML sitemap definitions and the generated files crawlers consume. |

## How they fit together

The four resources cover the two halves of discoverability. **Search Terms** and **Search Synonyms** shape *on-site* search: search terms reveal what shoppers actually look for (and where results are thin), and synonyms widen recall so those queries return more products. **URL Rewrites** and **Sitemaps** shape *off-site* discovery: rewrites preserve inbound links across slug changes, and sitemaps hand the crawler the full list of product, category, and page URLs to index.

All Search & SEO operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
