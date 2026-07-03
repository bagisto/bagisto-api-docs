export const redirects = {
    '/api/rest-api/shop/customers/reset-password': '/api/rest-api/shop/customers/change-password',
    '/api/recipes/': '/api/workflows/',
    '/api/recipes/build-a-storefront': '/api/workflows/shop/build-a-storefront',
    '/api/recipes/build-an-admin-dashboard': '/api/workflows/admin/build-an-admin-dashboard',
    '/api/recipes/admin-create-order-flow': '/api/workflows/admin/create-order-flow',
}

export function makeRedirectHtml(to: string) {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=${to}" />
    <link rel="canonical" href="${to}" />
    <script>window.location.replace("${to}");</script>
  </head>
  <body>
    <p>Redirecting to <a href="${to}">${to}</a>…</p>
  </body>
</html>`
}