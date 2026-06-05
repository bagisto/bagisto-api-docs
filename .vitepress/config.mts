import { defineConfig } from 'vitepress'
import { redirects, makeRedirectHtml } from './_redirects'
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'
import { loadEnv } from 'vite'

// Helper: Escape HTML special characters
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// Helper: Get language class for syntax highlighting
function getLanguageClass(label: string): string {
  const langMap: { [key: string]: string } = {
    'gql': 'graphql',
    'graphql': 'graphql',
    'curl': 'bash',
    'node': 'javascript',
    'node.js': 'javascript',
    'nodejs': 'javascript',
    'react': 'jsx',
    'ruby': 'ruby',
    'php': 'php'
  }
  return langMap[label.toLowerCase()] || label.toLowerCase()
}

// Helper: Parse tabs content
function parseTabsContent(content: string): Array<{ label: string; code: string }> {
  const tabs: Array<{ label: string; code: string }> = []
  
  // Split by == to find each tab section
  const sections = content.split(/^== /m)
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i]
    // First line is the label
    const lines = section.split('\n')
    const label = lines[0].trim()
    
    // Find code block
    const codeMatch = section.match(/```[\w]*\n([\s\S]*?)```/)
    if (codeMatch && codeMatch[1]) {
      tabs.push({
        label: label,
        code: codeMatch[1].trim()
      })
    }
  }

  return tabs
}

export default defineConfig(({ command, mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '')

  return {
  ignoreDeadLinks: true,
  lang: 'en-US',
  title: "Bagisto",
  description: "Bagisto Developer Documentation",
  
  vite: {
    server: {
      host: '0.0.0.0'
    },
    define: {
      'import.meta.env.VITE_REST_API_URL': JSON.stringify(env.VITE_REST_API_URL),
      'import.meta.env.VITE_GRAPHQL_API_URL': JSON.stringify(env.VITE_GRAPHQL_API_URL)
    }
  },

  srcDir: './src',

  themeConfig: {
    siteTitle: false,

    logo: {
      light: '/logo.png',
      dark: '/logo-dark.png',
    },

    nav: [
      { text: 'Dev Docs', link: 'https://devdocs.bagisto.com/' },
      { text: 'User Guide', link: 'https://docs.bagisto.com/' },
      { text: 'Extensions', link: 'https://bagisto.com/en/extensions/' },
      { text: 'Community Forum', link: 'https://forums.bagisto.com/' },
      { text: 'Contact Us', link: 'https://bagisto.com/en/contacts/' }
    ],

    editLink: {
      pattern: 'https://github.com/bagisto/bagisto-api-docs/edit/master/src/:path',
      text: 'Help us improve this page on Github.'
    },

    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'full'
      }
    },

    sidebar: [
      {
        text: 'Bagisto APIs',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/api/introduction' },
          { text: 'Setup', link: '/api/setup' },
          { text: 'Authentication', link: '/api/authentication' },
          { text: 'Storefront Keys', link: '/api/storefront-api-key-management-guide' },
          {
            text: 'GraphQL API',
            collapsed: true,
            items: [
              { text: 'Introduction', link: '/api/graphql-api/introduction' },
              { text: 'Authentication', link: '/api/graphql-api/authentication' },
              {
                text: 'Shop API',
                collapsed: false,
                items: [
                      {
                        text: 'Locales',
                        collapsed: false,
                        items: [     
                           {
                            text: 'Queries',
                            collapsed: false,
                            items: [               
                              { text: 'Locales', link: '/api/graphql-api/shop/locales/queries/locales' },
                              { text: 'Single Locale', link: '/api/graphql-api/shop/locales/queries/single-locale' }
                            ]
                          }
                        ]
                      },                      
                      {
                        text: 'Category',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Tree Categories', link: '/api/graphql-api/shop/queries/tree-categories' },  
                              { text: 'Categories', link: '/api/graphql-api/shop/queries/categories' },
                              { text: 'Single Category', link: '/api/graphql-api/shop/queries/get-category' },
                            ]
                          } 
                        ]
                      },
                      {
                        text: 'Theme Customisations',
                        collapsed: false,
                        items: [                    
                          { text: 'Theme Customisations', link: '/api/graphql-api/shop/queries/theme-customisations' },
                          { text: 'Single Theme Customisation', link: '/api/graphql-api/shop/queries/single-theme-customisation' }
                        ]
                      },
                      {
                        text: 'CMS Pages',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Pages', link: '/api/graphql-api/shop/queries/get-pages' },
                              { text: 'Single Page', link: '/api/graphql-api/shop/queries/get-page' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Product',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Products', link: '/api/graphql-api/shop/queries/get-products' },
                              { text: 'Search Products', link: '/api/graphql-api/shop/queries/search-products' },
                              { text: 'Single Product', link: '/api/graphql-api/shop/queries/get-product' },
                              { text: 'Booking Slots', link: '/api/graphql-api/shop/queries/get-booking-slots' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Product Review',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Product Reviews', link: '/api/graphql-api/shop/queries/get-product-reviews' },
                            ]
                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Create Product Review', link: '/api/graphql-api/shop/mutations/create-product-review' },
                              { text: 'Update Product Review', link: '/api/graphql-api/shop/mutations/update-product-review' },
                              { text: 'Delete Product Review', link: '/api/graphql-api/shop/mutations/delete-product-review' },

                            ]
                          }
                        ]
                      },
                      {
                        text: 'Attribute',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Attributes', link: '/api/graphql-api/shop/queries/get-attributes' },
                              { text: 'Single Attribute', link: '/api/graphql-api/shop/queries/get-attribute' },
                              { text: 'Attribute Options', link: '/api/graphql-api/shop/queries/get-attribute-options' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Channel',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Channels', link: '/api/graphql-api/shop/queries/get-channels' },
                              { text: 'Single Channel', link: '/api/graphql-api/shop/queries/get-channel' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Currency',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Currencies', link: '/api/graphql-api/shop/queries/get-currencies' },
                              { text: 'Single Currency', link: '/api/graphql-api/shop/queries/get-currency' },
                            ]
                          }
                        ]
                      },
                      { 
                        text: 'Country',
                        collapsed: false,
                        items: [                    
                          { text: 'Single Country', link: '/api/graphql-api/shop/queries/get-country' },
                          { text: 'Countries', link: '/api/graphql-api/shop/queries/get-countries' },
                          { text: 'Country States', link: '/api/graphql-api/shop/queries/get-country-states' },
                          { text: 'Country State', link: '/api/graphql-api/shop/queries/get-country-state' }
                        ]
                      },  
                      {
                        text: 'Customer',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Get Customer Profile', link: '/api/graphql-api/shop/queries/get-customer-profile' },
                              { text: 'Get Customer Orders', link: '/api/graphql-api/shop/queries/get-customer-orders' },
                              { text: 'Get Customer Order', link: '/api/graphql-api/shop/queries/get-customer-order' },
                              { text: 'Get Customer Order Shipments', link: '/api/graphql-api/shop/queries/get-customer-order-shipments' },
                              { text: 'Get Customer Order Shipment', link: '/api/graphql-api/shop/queries/get-customer-order-shipment' },
                              { text: 'Get Customer Invoices', link: '/api/graphql-api/shop/queries/get-customer-invoices' },
                              { text: 'Get Customer Invoice', link: '/api/graphql-api/shop/queries/get-customer-invoice' },
                              { text: 'Download Invoice', link: '/api/graphql-api/shop/queries/download-invoice' },
                              { text: 'Get Downloadable Products', link: '/api/graphql-api/shop/queries/get-customer-downloadable-products' },
                              { text: 'Get Downloadable Product', link: '/api/graphql-api/shop/queries/get-customer-downloadable-product' },
                              { text: 'Download Downloadable Product', link: '/api/graphql-api/shop/queries/download-downloadable-product' },
                              { text: 'Get Customer Addresses', link: '/api/graphql-api/shop/queries/get-customer-addresses' },
                            ]   

                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Customer Registration', link: '/api/graphql-api/shop/mutations/customer-registration' },
                              { text: 'Customer Login', link: '/api/graphql-api/shop/mutations/customer-login' },
                              { text: 'Customer Verify Token', link: '/api/graphql-api/shop/mutations/customer-verify-token' },
                              { text: 'Customer Logout', link: '/api/graphql-api/shop/mutations/customer-logout' },
                              { text: 'Update Customer Profile', link: '/api/graphql-api/shop/mutations/update-customer-profile' },
                              { text: 'Delete Customer Profile', link: '/api/graphql-api/shop/mutations/delete-customer-profile' },
                              { text: 'Forgot Password', link: '/api/graphql-api/shop/mutations/forgot-password' },
                              { text: 'Create Customer Address', link: '/api/graphql-api/shop/mutations/create-customer-address' },
                              { text: 'Update Customer Address', link: '/api/graphql-api/shop/mutations/update-customer-address' },
                              { text: 'Delete Customer Address', link: '/api/graphql-api/shop/mutations/delete-customer-address' },
                              { text: 'Cancel Customer Order', link: '/api/graphql-api/shop/mutations/cancel-customer-order' },
                              { text: 'Reorder Customer Order', link: '/api/graphql-api/shop/mutations/reorder-customer-order' },
                              { text: 'Get Customer Reviews', link: '/api/graphql-api/shop/queries/get-customer-reviews' },
                              { text: 'Get Customer Review', link: '/api/graphql-api/shop/queries/get-customer-review' },
                            ]
                          }
                        ]
                      },    
                      {
                        text: 'Cart',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Get Cart', link: '/api/graphql-api/shop/queries/get-cart' },
                            ]   

                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'CreateCart', link: '/api/graphql-api/shop/mutations/create-cart' },
                              { text: 'AddToCart', link: '/api/graphql-api/shop/mutations/add-to-cart' },
                              { text: 'UpdateCartItem', link: '/api/graphql-api/shop/mutations/update-cart-item' },
                              { text: 'RemoveCartItem', link: '/api/graphql-api/shop/mutations/remove-cart-item' },
                              { text: 'Merge Cart', link: '/api/graphql-api/shop/mutations/merge-cart' },
                              { text: 'ApplyCoupon', link: '/api/graphql-api/shop/mutations/apply-coupon' },
                              { text: 'RemoveCoupon', link: '/api/graphql-api/shop/mutations/remove-coupon' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Checkout',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Get Addresses', link: '/api/graphql-api/shop/queries/get-addresses' },
                              { text: 'Get Shipping Methods', link: '/api/graphql-api/shop/queries/get-shipping-methods' },
                              { text: 'Get Payment Methods', link: '/api/graphql-api/shop/queries/get-payment-methods' },
                            ]
                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Set Checkout Address', link: '/api/graphql-api/shop/mutations/set-billing-address' },
                              { text: 'Set Shipping Method', link: '/api/graphql-api/shop/mutations/set-shipping-method' },
                              { text: 'Set Payment Method', link: '/api/graphql-api/shop/mutations/set-payment-method' },
                              { text: 'Place Order', link: '/api/graphql-api/shop/mutations/place-order' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Wishlist',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Get Wishlists', link: '/api/graphql-api/shop/queries/get-wishlists' },
                              { text: 'Get Wishlist Item', link: '/api/graphql-api/shop/queries/get-wishlist' },
                            ]
                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Create Wishlist', link: '/api/graphql-api/shop/mutations/create-wishlist' },
                              { text: 'Toggle Wishlist', link: '/api/graphql-api/shop/mutations/toggle-wishlist' },
                              { text: 'Delete Wishlist', link: '/api/graphql-api/shop/mutations/delete-wishlist' },
                              { text: 'Move to Cart', link: '/api/graphql-api/shop/mutations/move-wishlist-to-cart' },
                              { text: 'Delete All Wishlists', link: '/api/graphql-api/shop/mutations/delete-all-wishlists' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Compare',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Get Compare Items', link: '/api/graphql-api/shop/queries/get-compare-items' },
                              { text: 'Get Compare Item', link: '/api/graphql-api/shop/queries/get-compare-item' },
                            ]
                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Create Compare Item', link: '/api/graphql-api/shop/mutations/create-compare-item' },
                              { text: 'Delete Compare Item', link: '/api/graphql-api/shop/mutations/delete-compare-item' },
                              { text: 'Delete All Compare Items', link: '/api/graphql-api/shop/mutations/delete-all-compare-items' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Contact Us',
                        collapsed: true,
                        items: [
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Create Contact Us', link: '/api/graphql-api/shop/mutations/create-contact-us' },
                            ]
                          }
                        ]
                      },
                ]
              },
              {
                text: 'Admin API',
                collapsed: false,
                items: [
                  { text: 'Authentication', link: '/api/graphql-api/admin/authentication' },
                  {
                    text: 'Admin Profile',
                    collapsed: true,
                    items: [
                      { text: 'Get Profile', link: '/api/graphql-api/admin/profile/get-profile' },
                    ]
                  },
                  {
                    text: 'Catalog',
                    collapsed: true,
                    items: [
                      {
                        text: 'Products',
                        collapsed: true,
                        items: [
                          { text: 'List Products (Picker)', link: '/api/graphql-api/admin/catalog/products/list' },
                          { text: 'Catalog Products (Datagrid)', link: '/api/graphql-api/admin/catalog/products' },
                          { text: 'Catalog Product Detail', link: '/api/graphql-api/admin/catalog/products/products-detail' },
                          { text: 'Create Product', link: '/api/graphql-api/admin/catalog/products/create' },
                          { text: 'Update Product', link: '/api/graphql-api/admin/catalog/products/update' },
                          { text: 'Delete Product', link: '/api/graphql-api/admin/catalog/products/delete' },
                          { text: 'Copy Product', link: '/api/graphql-api/admin/catalog/products/copy' },
                          { text: 'Mass Delete Products', link: '/api/graphql-api/admin/catalog/products/mass-delete' },
                          { text: 'Mass Update Status', link: '/api/graphql-api/admin/catalog/products/mass-update-status' },
                          { text: 'Upload Image (REST only)', link: '/api/graphql-api/admin/catalog/products/images-upload' },
                          { text: 'Reorder Images', link: '/api/graphql-api/admin/catalog/products/images-reorder' },
                          { text: 'Delete Image', link: '/api/graphql-api/admin/catalog/products/images-delete' },
                          { text: 'List Inventories', link: '/api/graphql-api/admin/catalog/products/inventories-list' },
                          { text: 'Update Inventories', link: '/api/graphql-api/admin/catalog/products/inventories-update' },
                          { text: 'List Customer-Group Prices', link: '/api/graphql-api/admin/catalog/products/customer-group-prices-list' },
                          { text: 'Add Customer-Group Price', link: '/api/graphql-api/admin/catalog/products/customer-group-prices-create' },
                          { text: 'Update Customer-Group Price', link: '/api/graphql-api/admin/catalog/products/customer-group-prices-update' },
                          { text: 'Delete Customer-Group Price', link: '/api/graphql-api/admin/catalog/products/customer-group-prices-delete' },
                        ]
                      },
                      {
                        text: 'Categories',
                        collapsed: true,
                        items: [
                          { text: 'Categories Listing (Datagrid)', link: '/api/graphql-api/admin/catalog/categories/categories-listing' },
                          { text: 'Categories Tree (Nested)', link: '/api/graphql-api/admin/catalog/categories/categories-tree' },
                          { text: 'Category Detail', link: '/api/graphql-api/admin/catalog/categories/categories-detail' },
                          { text: 'Create Category', link: '/api/graphql-api/admin/catalog/categories/categories-create' },
                          { text: 'Update / Move Category', link: '/api/graphql-api/admin/catalog/categories/categories-update' },
                          { text: 'Delete Category', link: '/api/graphql-api/admin/catalog/categories/categories-delete' },
                          { text: 'Mass Delete Categories', link: '/api/graphql-api/admin/catalog/categories/categories-mass-delete' },
                          { text: 'Mass Update Status', link: '/api/graphql-api/admin/catalog/categories/categories-mass-update-status' },
                        ]
                      },
                      {
                        text: 'Attributes',
                        collapsed: true,
                        items: [
                          { text: 'Attributes Listing (Datagrid)', link: '/api/graphql-api/admin/catalog/attributes/attributes-listing' },
                          { text: 'Attribute Detail', link: '/api/graphql-api/admin/catalog/attributes/attributes-detail' },
                          { text: 'Create Attribute', link: '/api/graphql-api/admin/catalog/attributes/attributes-create' },
                          { text: 'Update Attribute', link: '/api/graphql-api/admin/catalog/attributes/attributes-update' },
                          { text: 'Delete Attribute', link: '/api/graphql-api/admin/catalog/attributes/attributes-delete' },
                          { text: 'Mass Delete Attributes', link: '/api/graphql-api/admin/catalog/attributes/attributes-mass-delete' },
                          { text: 'Attribute Options (CRUD)', link: '/api/graphql-api/admin/catalog/attributes/attribute-options' },
                        ]
                      },
                      {
                        text: 'Attribute Families',
                        collapsed: true,
                        items: [
                          { text: 'Families Listing (Datagrid)', link: '/api/graphql-api/admin/catalog/families/families-listing' },
                          { text: 'Family Detail', link: '/api/graphql-api/admin/catalog/families/families-detail' },
                          { text: 'Create Family', link: '/api/graphql-api/admin/catalog/families/families-create' },
                          { text: 'Update Family', link: '/api/graphql-api/admin/catalog/families/families-update' },
                          { text: 'Delete Family', link: '/api/graphql-api/admin/catalog/families/families-delete' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'CMS',
                    collapsed: true,
                    items: [
                      {
                        text: 'Pages',
                        collapsed: true,
                        items: [
                          { text: 'List Pages', link: '/api/graphql-api/admin/cms/pages-list' },
                          { text: 'Page Detail', link: '/api/graphql-api/admin/cms/pages-detail' },
                          { text: 'Create Page', link: '/api/graphql-api/admin/cms/pages-create' },
                          { text: 'Update Page', link: '/api/graphql-api/admin/cms/pages-update' },
                          { text: 'Delete Page', link: '/api/graphql-api/admin/cms/pages-delete' },
                          { text: 'Mass Delete Pages', link: '/api/graphql-api/admin/cms/pages-mass-delete' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'Sales',
                    link: '/api/graphql-api/admin/sales/',
                    collapsed: true,
                    items: [
                      {
                        text: 'Orders',
                        link: '/api/graphql-api/admin/sales/orders/',
                        collapsed: true,
                        items: [
                          { text: 'List Orders', link: '/api/graphql-api/admin/sales/orders/list-orders' },
                          { text: 'Order Detail', link: '/api/graphql-api/admin/sales/orders/order-detail' },
                          { text: 'Reorder', link: '/api/graphql-api/admin/sales/orders/reorder' },
                          { text: 'Place Order', link: '/api/graphql-api/admin/sales/orders/place-order' },
                          { text: 'Cancel Order', link: '/api/graphql-api/admin/sales/orders/cancel' },
                          { text: 'Add Comment', link: '/api/graphql-api/admin/sales/orders/add-comment' },
                          { text: 'List Comments', link: '/api/graphql-api/admin/sales/orders/list-comments' },
                          { text: 'Create Invoice', link: '/api/graphql-api/admin/sales/orders/create-invoice' },
                          { text: 'Get Invoice', link: '/api/graphql-api/admin/sales/orders/get-invoice' },
                          { text: 'Print Invoice (PDF)', link: '/api/graphql-api/admin/sales/orders/print-invoice' },
                          { text: 'Send Duplicate Invoice', link: '/api/graphql-api/admin/sales/orders/send-duplicate-invoice' },
                          { text: 'Create Shipment', link: '/api/graphql-api/admin/sales/orders/create-shipment' },
                          { text: 'Get Shipment', link: '/api/graphql-api/admin/sales/orders/get-shipment' },
                          { text: 'Create Refund', link: '/api/graphql-api/admin/sales/orders/create-refund' },
                          { text: 'Refund Preview', link: '/api/graphql-api/admin/sales/orders/refund-preview' },
                          { text: 'Get Refund', link: '/api/graphql-api/admin/sales/orders/get-refund' },
                        ]
                      },
                      {
                        text: 'Carts',
                        link: '/api/graphql-api/admin/sales/carts/',
                        collapsed: true,
                        items: [
                          { text: 'Get Cart', link: '/api/graphql-api/admin/sales/carts/get-cart' },
                          { text: 'Add Item', link: '/api/graphql-api/admin/sales/carts/add-item' },
                          { text: 'Update Items', link: '/api/graphql-api/admin/sales/carts/update-items' },
                          { text: 'Remove Item', link: '/api/graphql-api/admin/sales/carts/remove-item' },
                          { text: 'Save Address', link: '/api/graphql-api/admin/sales/carts/save-address' },
                          { text: 'Apply Coupon', link: '/api/graphql-api/admin/sales/carts/apply-coupon' },
                          { text: 'Remove Coupon', link: '/api/graphql-api/admin/sales/carts/remove-coupon' },
                          { text: 'List Shipping Methods', link: '/api/graphql-api/admin/sales/carts/list-shipping-methods' },
                          { text: 'Set Shipping Method', link: '/api/graphql-api/admin/sales/carts/set-shipping-method' },
                          { text: 'List Payment Methods', link: '/api/graphql-api/admin/sales/carts/list-payment-methods' },
                          { text: 'Set Payment Method', link: '/api/graphql-api/admin/sales/carts/set-payment-method' },
                        ]
                      },
                      {
                        text: 'Invoices (Datagrid)',
                        link: '/api/graphql-api/admin/sales/invoices/',
                        collapsed: true,
                        items: [
                          { text: 'List Invoices', link: '/api/graphql-api/admin/sales/invoices/list' },
                          { text: 'Get Invoice', link: '/api/graphql-api/admin/sales/orders/get-invoice' },
                          { text: 'Print Invoice (PDF)', link: '/api/graphql-api/admin/sales/orders/print-invoice' },
                          { text: 'Send Duplicate Invoice', link: '/api/graphql-api/admin/sales/orders/send-duplicate-invoice' },
                          { text: 'Mass Update Status', link: '/api/graphql-api/admin/sales/invoices/mass-update-status' },
                        ]
                      },
                      {
                        text: 'Shipments (Datagrid)',
                        link: '/api/graphql-api/admin/sales/shipments/',
                        collapsed: true,
                        items: [
                          { text: 'List Shipments', link: '/api/graphql-api/admin/sales/shipments/list' },
                          { text: 'Get Shipment', link: '/api/graphql-api/admin/sales/orders/get-shipment' },
                        ]
                      },
                      {
                        text: 'Refunds (Datagrid)',
                        link: '/api/graphql-api/admin/sales/refunds/',
                        collapsed: true,
                        items: [
                          { text: 'List Refunds', link: '/api/graphql-api/admin/sales/refunds/list' },
                          { text: 'Get Refund', link: '/api/graphql-api/admin/sales/orders/get-refund' },
                        ]
                      },
                      {
                        text: 'Transactions',
                        link: '/api/graphql-api/admin/sales/transactions/',
                        collapsed: true,
                        items: [
                          { text: 'List Transactions', link: '/api/graphql-api/admin/sales/transactions/list' },
                          { text: 'Transaction Detail', link: '/api/graphql-api/admin/sales/transactions/detail' },
                        ]
                      },
                      {
                        text: 'Bookings',
                        link: '/api/graphql-api/admin/sales/bookings/',
                        collapsed: true,
                        items: [
                          { text: 'List Bookings', link: '/api/graphql-api/admin/sales/bookings/list' },
                          { text: 'Booking Detail', link: '/api/graphql-api/admin/sales/bookings/detail' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'Customers',
                    collapsed: true,
                    items: [
                      { text: 'List Customers', link: '/api/graphql-api/admin/customers/main/list' },
                      { text: 'Customer Detail', link: '/api/graphql-api/admin/customers/main/detail' },
                      { text: 'Create Customer', link: '/api/graphql-api/admin/customers/main/create' },
                      { text: 'Update Customer', link: '/api/graphql-api/admin/customers/main/update' },
                      { text: 'Delete Customer', link: '/api/graphql-api/admin/customers/main/delete' },
                      { text: 'Mass Delete', link: '/api/graphql-api/admin/customers/main/mass-delete' },
                      { text: 'Mass Update Status', link: '/api/graphql-api/admin/customers/main/mass-update-status' },
                      {
                        text: 'Addresses',
                        collapsed: true,
                        items: [
                          { text: 'List Addresses', link: '/api/graphql-api/admin/customers/addresses' },
                          { text: 'Address Detail', link: '/api/graphql-api/admin/customers/addresses/detail' },
                          { text: 'Create Address', link: '/api/graphql-api/admin/customers/addresses/create' },
                          { text: 'Update Address', link: '/api/graphql-api/admin/customers/addresses/update' },
                          { text: 'Delete Address', link: '/api/graphql-api/admin/customers/addresses/delete' },
                        ]
                      },
                      {
                        text: 'Notes',
                        collapsed: true,
                        items: [
                          { text: 'Add Note', link: '/api/graphql-api/admin/customers/notes/create' },
                        ]
                      },
                      {
                        text: 'Impersonate',
                        collapsed: true,
                        items: [
                          { text: 'Issue Impersonation Token', link: '/api/graphql-api/admin/customers/impersonate/create' },
                        ]
                      },
                      {
                        text: 'Customer Groups',
                        collapsed: true,
                        items: [
                          { text: 'List Groups', link: '/api/graphql-api/admin/customers/groups/list' },
                          { text: 'Group Detail', link: '/api/graphql-api/admin/customers/groups/detail' },
                          { text: 'Create Group', link: '/api/graphql-api/admin/customers/groups/create' },
                          { text: 'Update Group', link: '/api/graphql-api/admin/customers/groups/update' },
                          { text: 'Delete Group', link: '/api/graphql-api/admin/customers/groups/delete' },
                          { text: 'Mass Delete', link: '/api/graphql-api/admin/customers/groups/mass-delete' },
                        ]
                      },
                      {
                        text: 'Reviews',
                        collapsed: true,
                        items: [
                          { text: 'List Reviews', link: '/api/graphql-api/admin/customers/reviews/list' },
                          { text: 'Review Detail', link: '/api/graphql-api/admin/customers/reviews/detail' },
                          { text: 'Update Status', link: '/api/graphql-api/admin/customers/reviews/update' },
                          { text: 'Delete Review', link: '/api/graphql-api/admin/customers/reviews/delete' },
                          { text: 'Mass Delete', link: '/api/graphql-api/admin/customers/reviews/mass-delete' },
                          { text: 'Mass Update Status', link: '/api/graphql-api/admin/customers/reviews/mass-update-status' },
                        ]
                      },
                      {
                        text: 'GDPR Requests',
                        collapsed: true,
                        items: [
                          { text: 'List Requests', link: '/api/graphql-api/admin/customers/gdpr/list' },
                          { text: 'Request Detail', link: '/api/graphql-api/admin/customers/gdpr/detail' },
                          { text: 'Update Request', link: '/api/graphql-api/admin/customers/gdpr/update' },
                          { text: 'Delete Request', link: '/api/graphql-api/admin/customers/gdpr/delete' },
                          { text: 'Process (Approve + Execute)', link: '/api/graphql-api/admin/customers/gdpr/process' },
                          { text: 'Download Data Export', link: '/api/graphql-api/admin/customers/gdpr/download-data' },
                        ]
                      },
                      {
                        text: 'Create-Order Helpers',
                        collapsed: true,
                        items: [
                          { text: 'Active Cart Items', link: '/api/graphql-api/admin/customers/active-cart-items' },
                          { text: 'Wishlist Items', link: '/api/graphql-api/admin/customers/wishlist-items' },
                          { text: 'Recent Order Items', link: '/api/graphql-api/admin/customers/recent-order-items' },
                          { text: 'Create Draft Cart', link: '/api/graphql-api/admin/customers/create-draft-cart' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'Settings',
                    collapsed: true,
                    items: [
                      {
                        text: 'Locales',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/locales/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/locales/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/locales/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/locales/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/locales/delete' },
                          { text: 'Mass Delete', link: '/api/graphql-api/admin/settings/locales/mass-delete' },
                        ]
                      },
                      {
                        text: 'Currencies',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/currencies/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/currencies/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/currencies/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/currencies/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/currencies/delete' },
                          { text: 'Mass Delete', link: '/api/graphql-api/admin/settings/currencies/mass-delete' },
                        ]
                      },
                      {
                        text: 'Exchange Rates',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/exchange-rates/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/exchange-rates/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/exchange-rates/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/exchange-rates/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/exchange-rates/delete' },
                          { text: 'Mass Delete', link: '/api/graphql-api/admin/settings/exchange-rates/mass-delete' },
                        ]
                      },
                      {
                        text: 'Inventory Sources',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/inventory-sources/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/inventory-sources/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/inventory-sources/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/inventory-sources/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/inventory-sources/delete' },
                          { text: 'Mass Delete', link: '/api/graphql-api/admin/settings/inventory-sources/mass-delete' },
                        ]
                      },
                      {
                        text: 'Channels',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/channels/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/channels/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/channels/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/channels/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/channels/delete' },
                        ]
                      },
                      {
                        text: 'Admin Users',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/users/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/users/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/users/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/users/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/users/delete' },
                        ]
                      },
                      {
                        text: 'Roles',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/roles/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/roles/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/roles/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/roles/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/roles/delete' },
                        ]
                      },
                      {
                        text: 'Themes',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/themes/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/themes/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/themes/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/themes/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/themes/delete' },
                          { text: 'Mass Delete', link: '/api/graphql-api/admin/settings/themes/mass-delete' },
                          { text: 'Mass Update Status', link: '/api/graphql-api/admin/settings/themes/mass-update-status' },
                        ]
                      },
                      {
                        text: 'Tax Categories',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/tax-categories/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/tax-categories/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/tax-categories/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/tax-categories/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/tax-categories/delete' },
                        ]
                      },
                      {
                        text: 'Tax Rates',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/tax-rates/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/tax-rates/detail' },
                          { text: 'Create', link: '/api/graphql-api/admin/settings/tax-rates/create' },
                          { text: 'Update', link: '/api/graphql-api/admin/settings/tax-rates/update' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/tax-rates/delete' },
                        ]
                      },
                      {
                        text: 'Data Transfer Imports',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/graphql-api/admin/settings/data-transfer-imports/list' },
                          { text: 'Detail', link: '/api/graphql-api/admin/settings/data-transfer-imports/detail' },
                          { text: 'Delete', link: '/api/graphql-api/admin/settings/data-transfer-imports/delete' },
                          { text: 'Cancel', link: '/api/graphql-api/admin/settings/data-transfer-imports/cancel' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'Dashboard',
                    collapsed: true,
                    items: [
                      { text: 'Statistics', link: '/api/graphql-api/admin/dashboard/stats' },
                    ]
                  },
                  {
                    text: 'Reporting',
                    collapsed: true,
                    items: [
                      { text: 'Overview', link: '/api/graphql-api/admin/reporting/overview' },
                      { text: 'Sales', link: '/api/graphql-api/admin/reporting/sales' },
                      { text: 'Customers', link: '/api/graphql-api/admin/reporting/customers' },
                      { text: 'Products', link: '/api/graphql-api/admin/reporting/products' },
                    ]
                  },
                  {
                    text: 'Marketing',
                    collapsed: true,
                    items: [
                      {
                        text: 'Promotions',
                        collapsed: true,
                        items: [
                          {
                            text: 'Catalog Rules',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/promotions/catalog-rules-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/promotions/catalog-rules-detail' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/promotions/catalog-rules-create' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/promotions/catalog-rules-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/promotions/catalog-rules-delete' },
                              { text: 'Mass Delete', link: '/api/graphql-api/admin/marketing/promotions/catalog-rules-mass-delete' },
                            ]
                          },
                          {
                            text: 'Cart Rules',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/promotions/cart-rules-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/promotions/cart-rules-detail' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/promotions/cart-rules-create' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/promotions/cart-rules-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/promotions/cart-rules-delete' },
                              { text: 'Mass Delete', link: '/api/graphql-api/admin/marketing/promotions/cart-rules-mass-delete' },
                            ]
                          },
                          {
                            text: 'Cart Rule Coupons',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-list' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-create' },
                              { text: 'Bulk Generate', link: '/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-generate' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-delete' },
                              { text: 'Mass Delete', link: '/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-mass-delete' },
                            ]
                          },
                        ]
                      },
                      {
                        text: 'Communications',
                        collapsed: true,
                        items: [
                          {
                            text: 'Email Templates',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/communications/templates-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/communications/templates-detail' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/communications/templates-create' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/communications/templates-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/communications/templates-delete' },
                            ]
                          },
                          {
                            text: 'Events',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/communications/events-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/communications/events-detail' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/communications/events-create' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/communications/events-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/communications/events-delete' },
                            ]
                          },
                          {
                            text: 'Campaigns',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/communications/campaigns-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/communications/campaigns-detail' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/communications/campaigns-create' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/communications/campaigns-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/communications/campaigns-delete' },
                              { text: 'Send', link: '/api/graphql-api/admin/marketing/communications/campaigns-send' },
                            ]
                          },
                          {
                            text: 'Newsletter Subscribers',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/communications/subscribers-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/communications/subscribers-detail' },
                              { text: 'Toggle Subscription', link: '/api/graphql-api/admin/marketing/communications/subscribers-toggle' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/communications/subscribers-delete' },
                            ]
                          },
                        ]
                      },
                      {
                        text: 'Search SEO',
                        collapsed: true,
                        items: [
                          {
                            text: 'URL Rewrites',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/search-seo/url-rewrites-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/search-seo/url-rewrites-detail' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/search-seo/url-rewrites-create' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/search-seo/url-rewrites-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/search-seo/url-rewrites-delete' },
                              { text: 'Mass Delete', link: '/api/graphql-api/admin/marketing/search-seo/url-rewrites-mass-delete' },
                            ]
                          },
                          {
                            text: 'Search Terms',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/search-seo/search-terms-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/search-seo/search-terms-detail' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/search-seo/search-terms-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/search-seo/search-terms-delete' },
                              { text: 'Mass Delete', link: '/api/graphql-api/admin/marketing/search-seo/search-terms-mass-delete' },
                            ]
                          },
                          {
                            text: 'Search Synonyms',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/search-seo/search-synonyms-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/search-seo/search-synonyms-detail' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/search-seo/search-synonyms-create' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/search-seo/search-synonyms-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/search-seo/search-synonyms-delete' },
                              { text: 'Mass Delete', link: '/api/graphql-api/admin/marketing/search-seo/search-synonyms-mass-delete' },
                            ]
                          },
                          {
                            text: 'Sitemaps',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/graphql-api/admin/marketing/search-seo/sitemaps-list' },
                              { text: 'Detail', link: '/api/graphql-api/admin/marketing/search-seo/sitemaps-detail' },
                              { text: 'Create', link: '/api/graphql-api/admin/marketing/search-seo/sitemaps-create' },
                              { text: 'Update', link: '/api/graphql-api/admin/marketing/search-seo/sitemaps-update' },
                              { text: 'Delete', link: '/api/graphql-api/admin/marketing/search-seo/sitemaps-delete' },
                              { text: 'Regenerate', link: '/api/graphql-api/admin/marketing/search-seo/sitemaps-generate' },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                  {
                    text: 'Configuration',
                    collapsed: true,
                    items: [
                      { text: 'Menu', link: '/api/graphql-api/admin/configuration/menu' },
                      { text: 'Values', link: '/api/graphql-api/admin/configuration/values' },
                      { text: 'Update', link: '/api/graphql-api/admin/configuration/update' },
                    ]
                  }
                ]
              },
              { text: 'Playground Guide', link: '/api/graphql-api/playground' },
              { text: 'Best Practices', link: '/api/graphql-api/best-practices' },
              { text: 'Integration Guides', link: '/api/graphql-api/integrations' },
            ]
          },
          { 
            text: 'Rest API',
            collapsed: true,
            items: [
              { text: 'Introduction', link: '/api/rest-api/introduction' },
              
              {
                text: 'Shop API',
                collapsed: false,
                items: [
                  {
                    text: 'Locales',
                    collapsed: false,
                    items: [ 
                      { text: 'Get All Locales', link: '/api/rest-api/shop/locales/get-locales' },
                      { text: 'Get Single Locale', link: '/api/rest-api/shop/locales/get-single-locale' }
                    ]
                  },
                  {
                    text: 'Categories',
                    collapsed: false,
                    items: [
                          { text: 'Categories', link: '/api/rest-api/shop/categories/get-categories' },
                          { text: 'Category Tree', link: '/api/rest-api/shop/categories/get-category-tree' },
                    ]
                  },
                  {
                    text: 'Theme Customizations',
                    collapsed: false,
                    items: [
                          { text: 'Theme Customizations', link: '/api/rest-api/shop/theme-customizations/get-theme-customizations' },
                    ]
                  },
                  {
                    text: 'Products',
                    collapsed: false,
                    items: [
                          { text: 'Products', link: '/api/rest-api/shop/products/get-products' },
                          { text: 'Search Products', link: '/api/rest-api/shop/products/search-product' },
                          { text: 'Single Product', link: '/api/rest-api/shop/products/get-product' },
                          { text: 'Booking Slots', link: '/api/rest-api/shop/products/get-booking-slots' },
                          { text: 'Product Sub-Resources', link: '/api/rest-api/shop/products/product-subresources' },
                          { text: 'Product Type Sub-Resources', link: '/api/rest-api/shop/products/product-type-subresources' },
                    ]
                  },
                  {
                    text: 'Product Review',
                    collapsed: false,
                    items: [
                          { text: 'Get Product Reviews', link: '/api/rest-api/shop/product-reviews/get-product-reviews' },
                          { text: 'Get Product Review', link: '/api/rest-api/shop/product-reviews/get-product-review' },
                          { text: 'Create Product Review', link: '/api/rest-api/shop/product-reviews/create-product-review' },
                          { text: 'Update Product Review', link: '/api/rest-api/shop/product-reviews/update-product-review' },
                          { text: 'Delete Product Review', link: '/api/rest-api/shop/product-reviews/delete-product-review' },
                    ]
                  },
                  {
                    text: 'Attribute',
                    collapsed: false,
                    items: [
                          { text: 'Attributes', link: '/api/rest-api/shop/attributes/get-attributes' },
                          { text: 'Attribute Options', link: '/api/rest-api/shop/attributes/get-attribute-options' },
                          { text: 'Attribute Translations', link: '/api/rest-api/shop/attributes/get-attribute-translations' },
                    ]
                  },
                  {
                    text: 'Channel',
                    collapsed: false,
                    items: [
                          { text: 'Channels', link: '/api/rest-api/shop/channels/get-channels' },
                          { text: 'Channel Translations', link: '/api/rest-api/shop/channels/get-channel-translations' },
                    ]
                  },
                  {
                    text: 'Country and State',
                    collapsed: false,
                    items: [
                          { text: 'Countries', link: '/api/rest-api/shop/countries/get-countries' },
                          { text: 'Country States', link: '/api/rest-api/shop/countries/get-country-states' },
                    ]
                  },
                  {
                    text: 'Customer',
                    collapsed: false,
                    items: [
                          { text: 'Registration', link: '/api/rest-api/shop/customers/customer-registration' },
                          { text: 'Login', link: '/api/rest-api/shop/customers/customer-login' },
                          { text: 'Verify Token', link: '/api/rest-api/shop/customers/customer-verify-token' },
                          { text: 'Customer Logout', link: '/api/rest-api/shop/customers/customer-logout' },
                          { text: 'Forgot Password', link: '/api/rest-api/shop/customers/forgot-password' },
                          { text: 'Reset Password', link: '/api/rest-api/shop/customers/reset-password' },
                          { text: 'Get Addresses', link: '/api/rest-api/shop/customers/get-customer-addresses'},                               
                          { text: 'Create Address', link: '/api/rest-api/shop/customers/create-customer-address' },
                          { text: 'Update Address', link: '/api/rest-api/shop/customers/update-customer-address' },
                          { text: 'Delete Address', link: '/api/rest-api/shop/customers/delete-customer-address' },
                          { text: 'Get Profile', link: '/api/rest-api/shop/customers/get-customer-profile' },
                          { text: 'Update Profile', link: '/api/rest-api/shop/customers/update-customer-profile' },
                          { text: 'Delete Profile', link: '/api/rest-api/shop/customers/delete-customer-profile' },
                          { text: 'Get Orders', link: '/api/rest-api/shop/customer-orders/get-customer-orders' },
                          { text: 'Get Order', link: '/api/rest-api/shop/customer-orders/get-customer-order' },
                          { text: 'Get Invoices', link: '/api/rest-api/shop/customer-invoices/get-customer-invoices' },
                          { text: 'Get Invoice', link: '/api/rest-api/shop/customer-invoices/get-customer-invoice' },
                          { text: 'Download Invoice PDF', link: '/api/rest-api/shop/customer-invoices/download-customer-invoice-pdf' },
                          { text: 'Get Downloadable Products', link: '/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-products' },
                          { text: 'Get Downloadable Product', link: '/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-product' },
                          { text: 'Get Customer Reviews', link: '/api/rest-api/shop/customer-reviews/get-customer-reviews' },
                          { text: 'Get Customer Review', link: '/api/rest-api/shop/customer-reviews/get-customer-review' },
                    ]
                  },
                  {
                    text: 'Cart',
                    collapsed: false,
                    items: [
                          { text: 'Get Cart', link: '/api/rest-api/shop/cart/get-cart' },
                          { text: 'Create Cart', link: '/api/rest-api/shop/cart/create-cart' },
                          { text: 'Add to Cart', link: '/api/rest-api/shop/cart/add-to-cart' },
                          { text: 'Update Cart Item', link: '/api/rest-api/shop/cart/update-cart-item' },
                          { text: 'Remove Cart Item', link: '/api/rest-api/shop/cart/remove-cart-item' },
                          { text: 'Apply Coupon', link: '/api/rest-api/shop/cart/apply-coupon' },
                          { text: 'Remove Coupon', link: '/api/rest-api/shop/cart/remove-coupon' },
                    ]
                  },
                  {
                    text: 'Checkout',
                    collapsed: false,
                    items: [
                          { text: 'Get Addresses', link: '/api/rest-api/shop/checkout/get-addresses' },
                          { text: 'Get Shipping Methods', link: '/api/rest-api/shop/checkout/get-shipping-methods' },
                          { text: 'Get Payment Methods', link: '/api/rest-api/shop/checkout/get-payment-methods' },
                          { text: 'Set Shipping Address', link: '/api/rest-api/shop/checkout/set-shipping-address' },
                          { text: 'Set Billing Address', link: '/api/rest-api/shop/checkout/set-billing-address' },
                          { text: 'Set Shipping Method', link: '/api/rest-api/shop/checkout/set-shipping-method' },
                          { text: 'Set Payment Method', link: '/api/rest-api/shop/checkout/set-payment-method'},                               
                          { text: 'Place Order', link: '/api/rest-api/shop/checkout/place-order' },
                    ]
                  },
                ]
              },
              {
                text: 'Admin API',
                collapsed: false,
                items: [
                  { text: 'Authentication', link: '/api/rest-api/admin/authentication' },
                  {
                    text: 'Admin Profile',
                    collapsed: true,
                    items: [
                      { text: 'Get Profile', link: '/api/rest-api/admin/profile/get-profile' },
                    ]
                  },
                  {
                    text: 'Catalog',
                    collapsed: true,
                    items: [
                      {
                        text: 'Products',
                        collapsed: true,
                        items: [
                          { text: 'List Products (Picker)', link: '/api/rest-api/admin/catalog/products/list' },
                          { text: 'Catalog Products (Datagrid)', link: '/api/rest-api/admin/catalog/products' },
                          { text: 'Catalog Product Detail', link: '/api/rest-api/admin/catalog/products/products-detail' },
                          { text: 'Create Product', link: '/api/rest-api/admin/catalog/products/create' },
                          { text: 'Update Product', link: '/api/rest-api/admin/catalog/products/update' },
                          { text: 'Delete Product', link: '/api/rest-api/admin/catalog/products/delete' },
                          { text: 'Copy Product', link: '/api/rest-api/admin/catalog/products/copy' },
                          { text: 'Mass Delete Products', link: '/api/rest-api/admin/catalog/products/mass-delete' },
                          { text: 'Mass Update Status', link: '/api/rest-api/admin/catalog/products/mass-update-status' },
                          { text: 'Upload Image', link: '/api/rest-api/admin/catalog/products/images-upload' },
                          { text: 'Reorder Images', link: '/api/rest-api/admin/catalog/products/images-reorder' },
                          { text: 'Delete Image', link: '/api/rest-api/admin/catalog/products/images-delete' },
                          { text: 'List Inventories', link: '/api/rest-api/admin/catalog/products/inventories-list' },
                          { text: 'Update Inventories', link: '/api/rest-api/admin/catalog/products/inventories-update' },
                          { text: 'List Customer-Group Prices', link: '/api/rest-api/admin/catalog/products/customer-group-prices-list' },
                          { text: 'Add Customer-Group Price', link: '/api/rest-api/admin/catalog/products/customer-group-prices-create' },
                          { text: 'Update Customer-Group Price', link: '/api/rest-api/admin/catalog/products/customer-group-prices-update' },
                          { text: 'Delete Customer-Group Price', link: '/api/rest-api/admin/catalog/products/customer-group-prices-delete' },
                        ]
                      },
                      {
                        text: 'Categories',
                        collapsed: true,
                        items: [
                          { text: 'Categories Listing (Datagrid)', link: '/api/rest-api/admin/catalog/categories/categories-listing' },
                          { text: 'Categories Tree (Nested)', link: '/api/rest-api/admin/catalog/categories/categories-tree' },
                          { text: 'Category Detail', link: '/api/rest-api/admin/catalog/categories/categories-detail' },
                          { text: 'Create Category', link: '/api/rest-api/admin/catalog/categories/categories-create' },
                          { text: 'Update / Move Category', link: '/api/rest-api/admin/catalog/categories/categories-update' },
                          { text: 'Delete Category', link: '/api/rest-api/admin/catalog/categories/categories-delete' },
                          { text: 'Mass Delete Categories', link: '/api/rest-api/admin/catalog/categories/categories-mass-delete' },
                          { text: 'Mass Update Status', link: '/api/rest-api/admin/catalog/categories/categories-mass-update-status' },
                        ]
                      },
                      {
                        text: 'Attributes',
                        collapsed: true,
                        items: [
                          { text: 'Attributes Listing (Datagrid)', link: '/api/rest-api/admin/catalog/attributes/attributes-listing' },
                          { text: 'Attribute Detail', link: '/api/rest-api/admin/catalog/attributes/attributes-detail' },
                          { text: 'Create Attribute', link: '/api/rest-api/admin/catalog/attributes/attributes-create' },
                          { text: 'Update Attribute', link: '/api/rest-api/admin/catalog/attributes/attributes-update' },
                          { text: 'Delete Attribute', link: '/api/rest-api/admin/catalog/attributes/attributes-delete' },
                          { text: 'Mass Delete Attributes', link: '/api/rest-api/admin/catalog/attributes/attributes-mass-delete' },
                          { text: 'Attribute Options (CRUD)', link: '/api/rest-api/admin/catalog/attributes/attribute-options' },
                        ]
                      },
                      {
                        text: 'Attribute Families',
                        collapsed: true,
                        items: [
                          { text: 'Families Listing (Datagrid)', link: '/api/rest-api/admin/catalog/families/families-listing' },
                          { text: 'Family Detail', link: '/api/rest-api/admin/catalog/families/families-detail' },
                          { text: 'Create Family', link: '/api/rest-api/admin/catalog/families/families-create' },
                          { text: 'Update Family', link: '/api/rest-api/admin/catalog/families/families-update' },
                          { text: 'Delete Family', link: '/api/rest-api/admin/catalog/families/families-delete' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'CMS',
                    collapsed: true,
                    items: [
                      {
                        text: 'Pages',
                        collapsed: true,
                        items: [
                          { text: 'List Pages', link: '/api/rest-api/admin/cms/pages-list' },
                          { text: 'Page Detail', link: '/api/rest-api/admin/cms/pages-detail' },
                          { text: 'Create Page', link: '/api/rest-api/admin/cms/pages-create' },
                          { text: 'Update Page', link: '/api/rest-api/admin/cms/pages-update' },
                          { text: 'Delete Page', link: '/api/rest-api/admin/cms/pages-delete' },
                          { text: 'Mass Delete Pages', link: '/api/rest-api/admin/cms/pages-mass-delete' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'Sales',
                    link: '/api/rest-api/admin/sales/',
                    collapsed: true,
                    items: [
                      {
                        text: 'Orders',
                        link: '/api/rest-api/admin/sales/orders/',
                        collapsed: true,
                        items: [
                          { text: 'List Orders', link: '/api/rest-api/admin/sales/orders/list-orders' },
                          { text: 'Order Detail', link: '/api/rest-api/admin/sales/orders/order-detail' },
                          { text: 'Reorder', link: '/api/rest-api/admin/sales/orders/reorder' },
                          { text: 'Place Order', link: '/api/rest-api/admin/sales/orders/place-order' },
                          { text: 'Cancel Order', link: '/api/rest-api/admin/sales/orders/cancel' },
                          { text: 'Add Comment', link: '/api/rest-api/admin/sales/orders/add-comment' },
                          { text: 'List Comments', link: '/api/rest-api/admin/sales/orders/list-comments' },
                          { text: 'Create Invoice', link: '/api/rest-api/admin/sales/orders/create-invoice' },
                          { text: 'Get Invoice', link: '/api/rest-api/admin/sales/orders/get-invoice' },
                          { text: 'Print Invoice (PDF)', link: '/api/rest-api/admin/sales/orders/print-invoice' },
                          { text: 'Send Duplicate Invoice', link: '/api/rest-api/admin/sales/orders/send-duplicate-invoice' },
                          { text: 'Create Shipment', link: '/api/rest-api/admin/sales/orders/create-shipment' },
                          { text: 'Get Shipment', link: '/api/rest-api/admin/sales/orders/get-shipment' },
                          { text: 'Create Refund', link: '/api/rest-api/admin/sales/orders/create-refund' },
                          { text: 'Refund Preview', link: '/api/rest-api/admin/sales/orders/refund-preview' },
                          { text: 'Get Refund', link: '/api/rest-api/admin/sales/orders/get-refund' },
                        ]
                      },
                      {
                        text: 'Carts',
                        link: '/api/rest-api/admin/sales/carts/',
                        collapsed: true,
                        items: [
                          { text: 'Get Cart', link: '/api/rest-api/admin/sales/carts/get-cart' },
                          { text: 'Add Item', link: '/api/rest-api/admin/sales/carts/add-item' },
                          { text: 'Update Items', link: '/api/rest-api/admin/sales/carts/update-items' },
                          { text: 'Remove Item', link: '/api/rest-api/admin/sales/carts/remove-item' },
                          { text: 'Save Address', link: '/api/rest-api/admin/sales/carts/save-address' },
                          { text: 'Apply Coupon', link: '/api/rest-api/admin/sales/carts/apply-coupon' },
                          { text: 'Remove Coupon', link: '/api/rest-api/admin/sales/carts/remove-coupon' },
                          { text: 'List Shipping Methods', link: '/api/rest-api/admin/sales/carts/list-shipping-methods' },
                          { text: 'Set Shipping Method', link: '/api/rest-api/admin/sales/carts/set-shipping-method' },
                          { text: 'List Payment Methods', link: '/api/rest-api/admin/sales/carts/list-payment-methods' },
                          { text: 'Set Payment Method', link: '/api/rest-api/admin/sales/carts/set-payment-method' },
                        ]
                      },
                      {
                        text: 'Invoices (Datagrid)',
                        link: '/api/rest-api/admin/sales/invoices/',
                        collapsed: true,
                        items: [
                          { text: 'List Invoices', link: '/api/rest-api/admin/sales/invoices/list' },
                          { text: 'Get Invoice', link: '/api/rest-api/admin/sales/orders/get-invoice' },
                          { text: 'Print Invoice (PDF)', link: '/api/rest-api/admin/sales/orders/print-invoice' },
                          { text: 'Send Duplicate Invoice', link: '/api/rest-api/admin/sales/orders/send-duplicate-invoice' },
                          { text: 'Mass Update Status', link: '/api/rest-api/admin/sales/invoices/mass-update-status' },
                        ]
                      },
                      {
                        text: 'Shipments (Datagrid)',
                        link: '/api/rest-api/admin/sales/shipments/',
                        collapsed: true,
                        items: [
                          { text: 'List Shipments', link: '/api/rest-api/admin/sales/shipments/list' },
                          { text: 'Get Shipment', link: '/api/rest-api/admin/sales/orders/get-shipment' },
                        ]
                      },
                      {
                        text: 'Refunds (Datagrid)',
                        link: '/api/rest-api/admin/sales/refunds/',
                        collapsed: true,
                        items: [
                          { text: 'List Refunds', link: '/api/rest-api/admin/sales/refunds/list' },
                          { text: 'Get Refund', link: '/api/rest-api/admin/sales/orders/get-refund' },
                        ]
                      },
                      {
                        text: 'Transactions',
                        link: '/api/rest-api/admin/sales/transactions/',
                        collapsed: true,
                        items: [
                          { text: 'List Transactions', link: '/api/rest-api/admin/sales/transactions/list' },
                          { text: 'Transaction Detail', link: '/api/rest-api/admin/sales/transactions/detail' },
                        ]
                      },
                      {
                        text: 'Bookings',
                        link: '/api/rest-api/admin/sales/bookings/',
                        collapsed: true,
                        items: [
                          { text: 'List Bookings', link: '/api/rest-api/admin/sales/bookings/list' },
                          { text: 'Booking Detail', link: '/api/rest-api/admin/sales/bookings/detail' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'Customers',
                    collapsed: true,
                    items: [
                      { text: 'List Customers', link: '/api/rest-api/admin/customers/main/list' },
                      { text: 'Customer Detail', link: '/api/rest-api/admin/customers/main/detail' },
                      { text: 'Create Customer', link: '/api/rest-api/admin/customers/main/create' },
                      { text: 'Update Customer', link: '/api/rest-api/admin/customers/main/update' },
                      { text: 'Delete Customer', link: '/api/rest-api/admin/customers/main/delete' },
                      { text: 'Mass Delete', link: '/api/rest-api/admin/customers/main/mass-delete' },
                      { text: 'Mass Update Status', link: '/api/rest-api/admin/customers/main/mass-update-status' },
                      {
                        text: 'Addresses',
                        collapsed: true,
                        items: [
                          { text: 'List Addresses', link: '/api/rest-api/admin/customers/addresses' },
                          { text: 'Address Detail', link: '/api/rest-api/admin/customers/addresses/detail' },
                          { text: 'Create Address', link: '/api/rest-api/admin/customers/addresses/create' },
                          { text: 'Update Address', link: '/api/rest-api/admin/customers/addresses/update' },
                          { text: 'Delete Address', link: '/api/rest-api/admin/customers/addresses/delete' },
                        ]
                      },
                      {
                        text: 'Notes',
                        collapsed: true,
                        items: [
                          { text: 'Add Note', link: '/api/rest-api/admin/customers/notes/create' },
                        ]
                      },
                      {
                        text: 'Impersonate',
                        collapsed: true,
                        items: [
                          { text: 'Issue Impersonation Token', link: '/api/rest-api/admin/customers/impersonate/create' },
                        ]
                      },
                      {
                        text: 'Customer Groups',
                        collapsed: true,
                        items: [
                          { text: 'List Groups', link: '/api/rest-api/admin/customers/groups/list' },
                          { text: 'Group Detail', link: '/api/rest-api/admin/customers/groups/detail' },
                          { text: 'Create Group', link: '/api/rest-api/admin/customers/groups/create' },
                          { text: 'Update Group', link: '/api/rest-api/admin/customers/groups/update' },
                          { text: 'Delete Group', link: '/api/rest-api/admin/customers/groups/delete' },
                          { text: 'Mass Delete', link: '/api/rest-api/admin/customers/groups/mass-delete' },
                        ]
                      },
                      {
                        text: 'Reviews',
                        collapsed: true,
                        items: [
                          { text: 'List Reviews', link: '/api/rest-api/admin/customers/reviews/list' },
                          { text: 'Review Detail', link: '/api/rest-api/admin/customers/reviews/detail' },
                          { text: 'Update Status', link: '/api/rest-api/admin/customers/reviews/update' },
                          { text: 'Delete Review', link: '/api/rest-api/admin/customers/reviews/delete' },
                          { text: 'Mass Delete', link: '/api/rest-api/admin/customers/reviews/mass-delete' },
                          { text: 'Mass Update Status', link: '/api/rest-api/admin/customers/reviews/mass-update-status' },
                        ]
                      },
                      {
                        text: 'GDPR Requests',
                        collapsed: true,
                        items: [
                          { text: 'List Requests', link: '/api/rest-api/admin/customers/gdpr/list' },
                          { text: 'Request Detail', link: '/api/rest-api/admin/customers/gdpr/detail' },
                          { text: 'Update Request', link: '/api/rest-api/admin/customers/gdpr/update' },
                          { text: 'Delete Request', link: '/api/rest-api/admin/customers/gdpr/delete' },
                          { text: 'Process (Approve + Execute)', link: '/api/rest-api/admin/customers/gdpr/process' },
                          { text: 'Download Data Export', link: '/api/rest-api/admin/customers/gdpr/download-data' },
                        ]
                      },
                      {
                        text: 'Create-Order Helpers',
                        collapsed: true,
                        items: [
                          { text: 'Active Cart Items', link: '/api/rest-api/admin/customers/active-cart-items' },
                          { text: 'Wishlist Items', link: '/api/rest-api/admin/customers/wishlist-items' },
                          { text: 'Recent Order Items', link: '/api/rest-api/admin/customers/recent-order-items' },
                          { text: 'Create Draft Cart', link: '/api/rest-api/admin/customers/create-draft-cart' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'Settings',
                    collapsed: true,
                    items: [
                      {
                        text: 'Locales',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/locales/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/locales/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/locales/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/locales/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/locales/delete' },
                          { text: 'Mass Delete', link: '/api/rest-api/admin/settings/locales/mass-delete' },
                        ]
                      },
                      {
                        text: 'Currencies',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/currencies/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/currencies/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/currencies/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/currencies/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/currencies/delete' },
                          { text: 'Mass Delete', link: '/api/rest-api/admin/settings/currencies/mass-delete' },
                        ]
                      },
                      {
                        text: 'Exchange Rates',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/exchange-rates/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/exchange-rates/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/exchange-rates/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/exchange-rates/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/exchange-rates/delete' },
                          { text: 'Mass Delete', link: '/api/rest-api/admin/settings/exchange-rates/mass-delete' },
                        ]
                      },
                      {
                        text: 'Inventory Sources',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/inventory-sources/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/inventory-sources/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/inventory-sources/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/inventory-sources/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/inventory-sources/delete' },
                          { text: 'Mass Delete', link: '/api/rest-api/admin/settings/inventory-sources/mass-delete' },
                        ]
                      },
                      {
                        text: 'Channels',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/channels/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/channels/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/channels/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/channels/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/channels/delete' },
                        ]
                      },
                      {
                        text: 'Admin Users',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/users/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/users/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/users/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/users/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/users/delete' },
                        ]
                      },
                      {
                        text: 'Roles',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/roles/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/roles/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/roles/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/roles/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/roles/delete' },
                        ]
                      },
                      {
                        text: 'Themes',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/themes/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/themes/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/themes/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/themes/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/themes/delete' },
                          { text: 'Mass Delete', link: '/api/rest-api/admin/settings/themes/mass-delete' },
                          { text: 'Mass Update Status', link: '/api/rest-api/admin/settings/themes/mass-update-status' },
                        ]
                      },
                      {
                        text: 'Tax Categories',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/tax-categories/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/tax-categories/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/tax-categories/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/tax-categories/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/tax-categories/delete' },
                        ]
                      },
                      {
                        text: 'Tax Rates',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/tax-rates/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/tax-rates/detail' },
                          { text: 'Create', link: '/api/rest-api/admin/settings/tax-rates/create' },
                          { text: 'Update', link: '/api/rest-api/admin/settings/tax-rates/update' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/tax-rates/delete' },
                        ]
                      },
                      {
                        text: 'Data Transfer Imports',
                        collapsed: true,
                        items: [
                          { text: 'List', link: '/api/rest-api/admin/settings/data-transfer-imports/list' },
                          { text: 'Detail', link: '/api/rest-api/admin/settings/data-transfer-imports/detail' },
                          { text: 'Create (deferred)', link: '/api/rest-api/admin/settings/data-transfer-imports/create' },
                          { text: 'Delete', link: '/api/rest-api/admin/settings/data-transfer-imports/delete' },
                          { text: 'Cancel', link: '/api/rest-api/admin/settings/data-transfer-imports/cancel' },
                        ]
                      }
                    ]
                  },
                  {
                    text: 'Dashboard',
                    collapsed: true,
                    items: [
                      { text: 'Statistics', link: '/api/rest-api/admin/dashboard/stats' },
                    ]
                  },
                  {
                    text: 'Reporting',
                    collapsed: true,
                    items: [
                      { text: 'Overview', link: '/api/rest-api/admin/reporting/overview' },
                      { text: 'Sales', link: '/api/rest-api/admin/reporting/sales' },
                      { text: 'Customers', link: '/api/rest-api/admin/reporting/customers' },
                      { text: 'Products', link: '/api/rest-api/admin/reporting/products' },
                    ]
                  },
                  {
                    text: 'Marketing',
                    collapsed: true,
                    items: [
                      {
                        text: 'Promotions',
                        collapsed: true,
                        items: [
                          {
                            text: 'Catalog Rules',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/promotions/catalog-rules-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/promotions/catalog-rules-detail' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/promotions/catalog-rules-create' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/promotions/catalog-rules-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/promotions/catalog-rules-delete' },
                              { text: 'Mass Delete', link: '/api/rest-api/admin/marketing/promotions/catalog-rules-mass-delete' },
                            ]
                          },
                          {
                            text: 'Cart Rules',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/promotions/cart-rules-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/promotions/cart-rules-detail' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/promotions/cart-rules-create' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/promotions/cart-rules-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/promotions/cart-rules-delete' },
                              { text: 'Mass Delete', link: '/api/rest-api/admin/marketing/promotions/cart-rules-mass-delete' },
                            ]
                          },
                          {
                            text: 'Cart Rule Coupons',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/promotions/cart-rule-coupons-list' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/promotions/cart-rule-coupons-create' },
                              { text: 'Bulk Generate', link: '/api/rest-api/admin/marketing/promotions/cart-rule-coupons-generate' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/promotions/cart-rule-coupons-delete' },
                              { text: 'Mass Delete', link: '/api/rest-api/admin/marketing/promotions/cart-rule-coupons-mass-delete' },
                            ]
                          },
                        ]
                      },
                      {
                        text: 'Communications',
                        collapsed: true,
                        items: [
                          {
                            text: 'Email Templates',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/communications/templates-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/communications/templates-detail' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/communications/templates-create' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/communications/templates-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/communications/templates-delete' },
                            ]
                          },
                          {
                            text: 'Events',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/communications/events-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/communications/events-detail' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/communications/events-create' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/communications/events-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/communications/events-delete' },
                            ]
                          },
                          {
                            text: 'Campaigns',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/communications/campaigns-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/communications/campaigns-detail' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/communications/campaigns-create' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/communications/campaigns-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/communications/campaigns-delete' },
                              { text: 'Send', link: '/api/rest-api/admin/marketing/communications/campaigns-send' },
                            ]
                          },
                          {
                            text: 'Newsletter Subscribers',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/communications/subscribers-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/communications/subscribers-detail' },
                              { text: 'Toggle Subscription', link: '/api/rest-api/admin/marketing/communications/subscribers-toggle' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/communications/subscribers-delete' },
                            ]
                          },
                        ]
                      },
                      {
                        text: 'Search SEO',
                        collapsed: true,
                        items: [
                          {
                            text: 'URL Rewrites',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/search-seo/url-rewrites-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/search-seo/url-rewrites-detail' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/search-seo/url-rewrites-create' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/search-seo/url-rewrites-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/search-seo/url-rewrites-delete' },
                              { text: 'Mass Delete', link: '/api/rest-api/admin/marketing/search-seo/url-rewrites-mass-delete' },
                            ]
                          },
                          {
                            text: 'Search Terms',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/search-seo/search-terms-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/search-seo/search-terms-detail' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/search-seo/search-terms-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/search-seo/search-terms-delete' },
                              { text: 'Mass Delete', link: '/api/rest-api/admin/marketing/search-seo/search-terms-mass-delete' },
                            ]
                          },
                          {
                            text: 'Search Synonyms',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/search-seo/search-synonyms-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/search-seo/search-synonyms-detail' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/search-seo/search-synonyms-create' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/search-seo/search-synonyms-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/search-seo/search-synonyms-delete' },
                              { text: 'Mass Delete', link: '/api/rest-api/admin/marketing/search-seo/search-synonyms-mass-delete' },
                            ]
                          },
                          {
                            text: 'Sitemaps',
                            collapsed: true,
                            items: [
                              { text: 'List', link: '/api/rest-api/admin/marketing/search-seo/sitemaps-list' },
                              { text: 'Detail', link: '/api/rest-api/admin/marketing/search-seo/sitemaps-detail' },
                              { text: 'Create', link: '/api/rest-api/admin/marketing/search-seo/sitemaps-create' },
                              { text: 'Update', link: '/api/rest-api/admin/marketing/search-seo/sitemaps-update' },
                              { text: 'Delete', link: '/api/rest-api/admin/marketing/search-seo/sitemaps-delete' },
                              { text: 'Regenerate', link: '/api/rest-api/admin/marketing/search-seo/sitemaps-generate' },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                  {
                    text: 'Configuration',
                    collapsed: true,
                    items: [
                      { text: 'Menu', link: '/api/rest-api/admin/configuration/menu' },
                      { text: 'Values', link: '/api/rest-api/admin/configuration/values' },
                      { text: 'Update', link: '/api/rest-api/admin/configuration/update' },
                    ]
                  }
                ]
              },
              { text: 'Testing & Debugging', link: '/api/rest-api/testing-debugging' },
              { text: 'Best Practices', link: '/api/rest-api/best-practices' },
            ]
          },
        ]
      }
    ],

    outline: {
      level: 'deep'
    },

    footer: {
      message: 'Released under the <a href="https://opensource.org/licenses/mit" target="_blank" class="mit-license">MIT License</a>.',
      copyright: `Copyright © ${new Date().getFullYear()} Webkul`
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bagisto/bagisto-api' }
    ],

    search: {
      provider: 'local'
    }
  },

  buildEnd(siteConfig: any) {
    const outDir = siteConfig.outDir

    Object.entries(redirects).forEach(([from, to]) => {
      if (from.includes('*')) {
        console.warn(`⚠️ Skipping wildcard redirect: ${from} -> ${to}`)
        return
      }

      let filePath

      if (from.endsWith('.html')) {
        filePath = path.join(outDir, from)
      } else {
        filePath = path.join(outDir, from, 'index.html')
      }

      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, makeRedirectHtml(to), 'utf-8')
      console.log(`✅ Redirect created: ${from} -> ${to}`)
    })
  }
  }
})
