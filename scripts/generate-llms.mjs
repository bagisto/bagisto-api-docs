// Generates src/public/llms.txt (curated API index) and src/public/llms-full.txt
// (full page content) from the VitePress src/api/**/*.md pages, so AI agents can
// discover and ingest the API surface. Run: `npm run llms:generate`.
//
// Exports buildIndex/buildFull as pure functions (covered by generate-llms.test.mjs);
// main() does the filesystem IO + page parsing.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://api-docs.bagisto.com'

// Prepended to the index so an agent can tell the two API surfaces apart.
const SURFACES_PRIMER = `## Two API surfaces — Shop vs Admin

This API has two separate surfaces. Pick one and do not mix them:

- **Shop API** (customer-facing: catalog, cart, checkout, customer account). REST base \`/api/shop/*\`; GraphQL endpoint \`POST /api/graphql\`. Auth: \`X-STOREFRONT-KEY\` header on every request, plus a customer or guest-cart \`Authorization: Bearer <token>\` for authenticated/cart calls. Index entries are grouped under \`Shop\` section headers (e.g. \`## GraphQL API › Shop\`, \`## REST API › Shop\`) and their page URLs contain \`/shop/\`.
- **Admin API** (back-office: manage orders, catalog, customers, marketing, CMS, settings). REST base \`/api/admin/*\`; GraphQL endpoint \`POST /api/admin/graphql\`. Auth: an admin Integration \`Authorization: Bearer <id>|<token>\` — **no** \`X-STOREFRONT-KEY\`. Index entries are grouped under \`Admin\` section headers (e.g. \`## GraphQL API › Admin\`, \`## REST API › Admin\`) and their page URLs contain \`/admin/\`.

**How to tell an entry apart:** look at the section breadcrumb (\`› Shop\` vs \`› Admin\`) and the URL path segment (\`/shop/\` vs \`/admin/\`). GraphQL field names differ too — shop uses e.g. \`products\` / \`categories\`, admin uses e.g. \`adminCatalogProducts\` / \`adminCatalogCategories\`.

`

export function buildIndex(pages) {
  const groups = new Map()
  for (const p of pages) {
    if (!groups.has(p.group)) groups.set(p.group, [])
    groups.get(p.group).push(p)
  }

  let out = '# Bagisto API\n\n'
  out += '> REST + GraphQL API reference for Bagisto, the Laravel open-source e-commerce platform. '
  out += 'This index lists every documented endpoint; open a page URL for its exact request and response.\n\n'
  out += `- Site: ${SITE}\n`
  out += `- Full documentation (single file): ${SITE}/llms-full.txt\n`
  out += `- Agent skills: \`npx skills add bagisto/agent-skills\`\n\n`

  out += SURFACES_PRIMER

  for (const group of [...groups.keys()].sort()) {
    out += `## ${group}\n\n`
    for (const p of groups.get(group)) {
      const summary = p.summary ? `: ${p.summary}` : ''
      out += `- [${p.title}](${p.url})${summary}\n`
    }
    out += '\n'
  }
  return out
}

export function buildFull(pages) {
  let out = '# Bagisto API — Full Documentation\n\n'
  out += `Generated from ${SITE}. Each section below is one documentation page.\n\n`
  out += SURFACES_PRIMER
  for (const p of pages) {
    out += `\n\n---\n\n# ${p.title}\nURL: ${p.url}\n\n${p.body}\n`
  }
  return out
}

// ---- parsing / IO (not unit-tested; exercised by `npm run llms:generate`) ----

function titleCase(seg) {
  return seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function transportLabel(seg) {
  if (seg === 'rest-api') return 'REST API'
  if (seg === 'graphql-api') return 'GraphQL API'
  return titleCase(seg)
}

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(abs))
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(abs)
  }
  return out
}

function parsePage(abs, srcDir) {
  const raw = fs.readFileSync(abs, 'utf8')

  const url =
    '/' +
    path
      .relative(srcDir, abs)
      .split(path.sep)
      .join('/')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')

  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const fm = fmMatch ? fmMatch[1] : ''
  const afterFm = fmMatch ? raw.slice(fmMatch[0].length) : raw

  const h1 = afterFm.match(/^#\s+(.+)$/m)
  const fmTitle = fm.match(/^\s*title:\s*(.+)$/m)
  const title =
    (h1 && h1[1].trim()) ||
    (fmTitle && fmTitle[1].trim().replace(/^["']|["']$/g, '')) ||
    titleCase(path.basename(url))

  const fmDesc = fm.match(/^\s*description:\s*(.+)$/m)
  let summary = fmDesc ? fmDesc[1].trim().replace(/^["']|["']$/g, '') : ''
  if (!summary) {
    summary =
      afterFm
        .split('\n')
        .map((l) => l.trim())
        .find(
          (l) =>
            l &&
            !l.startsWith('#') &&
            !l.startsWith('```') &&
            !l.startsWith('|') &&
            !l.startsWith(':::') &&
            !l.startsWith('<')
        ) || ''
  }
  // Keep the index tidy: one line, bounded length, no mid-word cut.
  summary = summary.replace(/\s+/g, ' ').trim()
  if (summary.length > 160) {
    summary = summary.slice(0, 160).replace(/\s+\S*$/, '') + '…'
  }

  const relDir = path.relative(srcDir, path.dirname(abs)).split(path.sep)
  // relDir[0] === 'api' — drop it, then label the transport segment.
  const segs = relDir.slice(1)
  const group = segs.length
    ? segs.map((s, i) => (i === 0 ? transportLabel(s) : titleCase(s))).join(' › ')
    : 'Overview'

  return { url, title, group, summary, body: raw }
}

function main() {
  const here = path.dirname(fileURLToPath(import.meta.url))
  const root = path.resolve(here, '..')
  const srcDir = path.join(root, 'src')
  const apiDir = path.join(srcDir, 'api')
  const publicDir = path.join(srcDir, 'public')

  const pages = walk(apiDir)
    .map((f) => parsePage(f, srcDir))
    .sort((a, b) => a.url.localeCompare(b.url))

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), buildIndex(pages))
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), buildFull(pages))

  console.log(
    `Generated llms.txt + llms-full.txt from ${pages.length} API pages.`
  )
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
}
