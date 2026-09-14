---
outline: false
apiType: rest
---

# Themes

The theme gallery: every theme the installation knows about, and which channels run each of them.

A theme is either **installed** (its files are on the server and it can be activated), **active** (installed and running on at least one channel), or **available** (listed in the catalog but not installed yet). Installing a theme is a server-side act — the API activates and reports, it does not install.

Each channel runs exactly one theme. Sections belong to a theme and a channel together, so a channel that switches theme stops drawing the sections built for the old one without losing them.

| Endpoint | Purpose |
|----------|---------|
| [List themes](/api/rest-api/admin/appearance/themes/list) | Every theme with its status and channels |
| [Get theme](/api/rest-api/admin/appearance/themes/detail) | One theme by code |
| [Theme impact](/api/rest-api/admin/appearance/themes/impact) | Sections a switch would leave behind |
| [Activate theme](/api/rest-api/admin/appearance/themes/activate) | Point channels at a theme |

See the [Appearance overview](/api/rest-api/admin/appearance/) for how themes and sections fit together.
