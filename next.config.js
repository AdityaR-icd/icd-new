const path = require('path')
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = ({
  // withPWA: {
  //   dest: "public",
  //   runtimeCaching,
  //   buildExcludes: [/middleware-manifest\.json$/]
  // },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    pass: process.env.pass,
  },

  reactStrictMode: true,
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
          }
        ],
      },
    ]
  },
});

