const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  staticPageGenerationTimeout: 300,

  eslint: {
    // ignoreDuringBuilds: true,
  },

  compress: true,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "digital.icdindia.com",
      },
    ],
  },

  env: {
    REVALIDATION_TOKEN: process.env.REVALIDATION_TOKEN || "randomsecrettoken",
  },

  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=15552000",
          },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          },
        ],
      },
      {
        source: "/(.*).jpg",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
    ];
  },
});
