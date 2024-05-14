const path = require('path')
const runtimeCaching = require("next-pwa/cache");
const RemoveServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
  dest: "public",
  runtimeCaching,
  skipWaiting: false,
  buildExcludes: [/middleware-manifest\.json$/],
  sw: 'service-worker.js',
  disable: process.env.NODE_ENV === 'development'
})



module.exports = withBundleAnalyzer(withPWA({

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },


  // reactStrictMode: true,
  // experimental:{appDir: true},
  // swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  staticPageGenerationTimeout: 1000,

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  optimizeFonts: true,
  reactStrictMode: true,
  experimental: {
      images: {
          unoptimized: true
      }
  },
  images: {
    domains: ['res.cloudinary.com' , 'digital.icdindia.com']
  },

  env: {
    REVALIDATION_TOKEN: 'randomsecrettoken'
  },
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=365d, stale-while-revalidate=180',
            
          },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Headers", "value": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" }
        ],
      },
      {
        source: '/pages/(.*)',
        headers: [
          { key: "Access-Control-Allow-Credentials", "value": "true" },
          { key: "Access-Control-Allow-Origin", "value": "*" },
          { key: "Access-Control-Allow-Headers", "value": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" }
        ]
      },
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      },
    ]
  },
}));



