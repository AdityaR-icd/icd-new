const path = require('path')
const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa')({
  dest: "public",
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/]
})



module.exports = withPWA({

  
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  env: {
    pass: process.env.pass,
    domain: process.env.domain
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

  images: {
    domains: ['digital.icdindia.com'],
    deviceSizes: [640, 750, 828, 1080, 1920],
  },

  env: {
    REVALIDATION_TOKEN: 'randomsecrettoken'
  },

  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=365d, must-revalidate',
            
          },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Headers", "value": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" }
        ],
      },
    ]
  },
});



