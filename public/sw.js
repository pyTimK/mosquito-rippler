if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const o=e=>a(e,n),r={module:{uri:n},exports:t,require:o};s[n]=Promise.all(c.map((e=>r[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"5311a5baa7f30d082c7ee85a5cb85af0"},{url:"/_next/static/5vMPdfAlEMORocy8Og4hE/_buildManifest.js",revision:"02b926c0e0d93f81521380ea4167e5c8"},{url:"/_next/static/5vMPdfAlEMORocy8Og4hE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/30550f7b-90f8a4e3fa8ae4e7.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/329adb58-43a14d797bbd871a.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/698-1d45dcd82a839e3d.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/735-471a28e410514b04.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/app/layout-01a4575bc81bff9d.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/app/page-402a8bc5d50b968e.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/bce60fc1-677f91468b92332d.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/cacdea1d-c4abecca09146297.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/main-a2d04b6e86b669c7.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/main-app-73204c5b613914f9.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/pages/_app-b75b9482ff6ea491.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/pages/_error-7fafba9435aeb6bc.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-b2517b281a968a49.js",revision:"5vMPdfAlEMORocy8Og4hE"},{url:"/_next/static/css/8fe82a2179f1eea7.css",revision:"8fe82a2179f1eea7"},{url:"/_next/static/css/911a08bf36aebb86.css",revision:"911a08bf36aebb86"},{url:"/_next/static/media/2aaf0723e720e8b9-s.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/574b8eee21d0c580-s.p.woff2",revision:"4fb2ac836ce86d4d7ba530c1a81ac118"},{url:"/_next/static/media/9c4f34569c9b36ca-s.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/ae9ae6716d4f8bf8-s.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a-s.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb-s.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0b262710c68177e-s.woff2",revision:"4c9f1da35dc7cbc949e408ecfd1fb0da"},{url:"/_next/static/media/c0f5ec5bbf5913b7-s.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127-s.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/images/favicon.ico",revision:"3ae2dce9947971e9fae41a05cc65ae10"},{url:"/images/icons/apple-touch-icon.png",revision:"0215b8174ecf1a30636106cc187f708f"},{url:"/images/icons/icon.png",revision:"b41a72a2217c2ed754f9fb488b3b4cb7"},{url:"/images/icons/icon_square.png",revision:"b4138b8b42aee3cedeb0ab9291557b96"},{url:"/images/icons/maskable_icon_x128.png",revision:"d35219ba73dc0e431913c50b3cd0d614"},{url:"/images/icons/maskable_icon_x192.png",revision:"59d4f3b68b4663772162844025866972"},{url:"/images/icons/maskable_icon_x384.png",revision:"76f7f3da144d28c1564673b9e259647b"},{url:"/images/icons/maskable_icon_x48.png",revision:"79bcf3b346302cb5420c8984f0270f1e"},{url:"/images/icons/maskable_icon_x512.png",revision:"a9c2e3e1b652d256deea687b89d649eb"},{url:"/images/icons/maskable_icon_x72.png",revision:"cb4d6bc67c4fc04ecc8355a2db72dfcd"},{url:"/images/icons/maskable_icon_x96.png",revision:"9e0946de5cb256bbde50fe0dbd82faf3"},{url:"/images/qr.png",revision:"a58cce892faf88b1b7fd1e05b0e2d427"},{url:"/images/screenshot.png",revision:"3dd70649ab6492178298e9b0b051ab54"},{url:"/manifest.json",revision:"b4cf7dd62247b22abf0a824363b03a4d"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));