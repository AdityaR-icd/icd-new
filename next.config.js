const path = require('path')
const withOptimizedImages = require('next-optimized-images')
module.exports = withOptimizedImages({})

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
    domains: ['digital.icdindia.com'],
  },
}
