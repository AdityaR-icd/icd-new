const path = require('path')


module.exports = {
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
    maxAge: '1y',
    domains: ['digital.icdindia.com'],
    deviceSizes: [640, 750, 828, 1080, 1920],
  },
}