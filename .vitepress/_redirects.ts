export const redirects = {
    '/api/rest-api/shop/customers/reset-password': '/api/rest-api/shop/customers/change-password',
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