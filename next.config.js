const path = require('path')
const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: false,
    sw: 'service-worker.js',
    swSrc: 'service-worker.js',
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  optimizeFonts: true,
  reactStrictMode: true,

  images: {
    domains: ['digital.icdindia.com'],
    deviceSizes: [640, 750, 828, 1080 , 1920],
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