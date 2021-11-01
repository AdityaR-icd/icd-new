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
    async headers() {
      return [
        {
          source: 'image/:all*(svg|jpg|png|webp)',
          locale: false,
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=9999999999, must-revalidate',
            }
          ],
        },
      ]
    },  
  },
}

