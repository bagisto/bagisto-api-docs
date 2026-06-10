/**
 * API Configuration
 * 
 * Update these URLs to match your Bagisto instance.
 * This single file is used across all components and examples.
 */

// REST API Base URL
export const REST_API_URL = import.meta.env.VITE_REST_API_URL || 'https://api-doc.bagisto.com'

// GraphQL API Base URL
export const GRAPHQL_API_URL = import.meta.env.VITE_GRAPHQL_API_URL || 'https://api-doc.bagisto.com'

// GraphQL Endpoint (Shop — requires X-STOREFRONT-KEY)
export const GRAPHQL_ENDPOINT = `${GRAPHQL_API_URL}/api/graphql`

// GraphQL Admin Endpoint (requires Authorization: Bearer only — no storefront key)
export const GRAPHQL_ADMIN_ENDPOINT = `${GRAPHQL_API_URL}/api/admin/graphql`

// REST API Docs (Swagger)
export const REST_API_DOCS = `${REST_API_URL}/api/docs`

// GraphQL Playground (Shop)
export const GRAPHQL_PLAYGROUND = `${GRAPHQL_API_URL}/api/graphiql`

// GraphQL Admin Playground
export const GRAPHQL_ADMIN_PLAYGROUND = `${GRAPHQL_API_URL}/api/admin/graphiql`

// Exported configuration object for convenience
export const API_CONFIG = {
  rest: {
    baseUrl: REST_API_URL,
    docs: REST_API_DOCS,
  },
  graphql: {
    baseUrl: GRAPHQL_API_URL,
    endpoint: GRAPHQL_ENDPOINT,
    playground: GRAPHQL_PLAYGROUND,
    adminEndpoint: GRAPHQL_ADMIN_ENDPOINT,
    adminPlayground: GRAPHQL_ADMIN_PLAYGROUND,
  },
} as const

export default API_CONFIG
