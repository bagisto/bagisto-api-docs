import{_ as i,a,o as n,ai as p}from"./chunks/framework.BbOtTPsL.js";const g=JSON.parse('{"title":"Shop API - Orders","description":"","frontmatter":{},"headers":[],"relativePath":"api/graphql-api/shop/orders.md","filePath":"api/graphql-api/shop/orders.md","lastUpdated":1770104947000}'),l={name:"api/graphql-api/shop/orders.md"};function h(t,s,e,k,r,E){return n(),a("div",null,s[0]||(s[0]=[p(`<h1 id="shop-api-orders" tabindex="-1">Shop API - Orders <a class="header-anchor" href="#shop-api-orders" aria-label="Permalink to &quot;Shop API - Orders&quot;">​</a></h1><p>Retrieve and manage customer orders.</p><h2 id="get-customer-orders" tabindex="-1">Get Customer Orders <a class="header-anchor" href="#get-customer-orders" aria-label="Permalink to &quot;Get Customer Orders&quot;">​</a></h2><p>Retrieve a list of orders for the authenticated customer.</p><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">query</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GetCustomerOrders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$first</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Int</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  customerOrders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">first</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$first</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    pageInfo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      hasNextPage</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      endCursor</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    edges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        id</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        incrementId</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        status</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        grandTotal</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        itemsCount</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        createdAt</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>Variables:</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;first&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="get-order-details" tabindex="-1">Get Order Details <a class="header-anchor" href="#get-order-details" aria-label="Permalink to &quot;Get Order Details&quot;">​</a></h2><p>Retrieve complete details for a specific order.</p><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">query</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GetOrder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">String</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  order</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    id</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    incrementId</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    status</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    grandTotal</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    subtotal</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    taxTotal</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    shippingTotal</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    discountAmount</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    createdAt</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    billingAddress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      firstName</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      lastName</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      address</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      city</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      state</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      country</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    shippingAddress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      firstName</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      lastName</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      address</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      city</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      state</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      country</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      edges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          id</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          productId</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          productName</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          quantity</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          price</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    shipments</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      edges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          id</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          status</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          trackNumber</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>Variables:</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="track-order" tabindex="-1">Track Order <a class="header-anchor" href="#track-order" aria-label="Permalink to &quot;Track Order&quot;">​</a></h2><p>Get shipping and tracking information.</p><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">query</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TrackOrder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$incrementId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">String</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  order</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">incrementId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$incrementId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    incrementId</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    status</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    shipments</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">      edges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          id</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          status</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          carrierTitle</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          trackNumber</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          createdAt</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">            edges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">              node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">                quantity</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="related-resources" tabindex="-1">Related Resources <a class="header-anchor" href="#related-resources" aria-label="Permalink to &quot;Related Resources&quot;">​</a></h2><ul><li><a href="/api/graphql/shop/customers.html">Customers</a></li><li><a href="/api/graphql/shop/cart.html">Cart</a></li><li><a href="/api/graphql/shop/checkout.html">Checkout</a></li></ul>`,17)]))}const c=i(l,[["render",h]]);export{g as __pageData,c as default};
