import { test } from 'node:test'
import assert from 'node:assert'
import { buildIndex, buildFull } from './generate-llms.mjs'

const pages = [
  {
    url: '/api/rest-api/admin/sales/orders/list',
    title: 'List Orders',
    group: 'REST API › Admin › Sales › Orders',
    summary: 'List orders with filters.',
    body: '# List Orders\nGET /api/admin/orders',
  },
  {
    url: '/api/graphql-api/shop/queries/products',
    title: 'Products',
    group: 'GraphQL API › Shop › Queries',
    summary: 'Query products.',
    body: '# Products\nquery { products }',
  },
]

test('buildIndex starts with the title + groups pages under headings with links', () => {
  const out = buildIndex(pages)
  assert.match(out, /^# Bagisto API/m)
  assert.match(out, /## REST API › Admin › Sales › Orders/)
  assert.match(out, /- \[List Orders\]\(\/api\/rest-api\/admin\/sales\/orders\/list\): List orders with filters\./)
  assert.match(out, /## GraphQL API › Shop › Queries/)
})

test('buildFull concatenates page bodies with title + URL markers', () => {
  const out = buildFull(pages)
  assert.match(out, /# List Orders/)
  assert.match(out, /URL: \/api\/rest-api\/admin\/sales\/orders\/list/)
  assert.match(out, /GET \/api\/admin\/orders/)
  assert.match(out, /query \{ products \}/)
})
