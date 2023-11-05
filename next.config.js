/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      siteDescription: "A e-commerce website that has the best feature on the internet",
      siteKeywords: "Shopping",
      siteUrl: "http://localhost:4000",
      siteTitle: "Shopyfy"
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: '**.tailwindui.com'
          },
          {
              protocol: 'https',
              hostname: '**.placeholder.com'
          },
          {
              protocol: 'https',
              hostname: '**.gstatic.com'
          },
          {
              protocol: 'https',
              hostname: '**.loremflickr.com'
          },
      ]
  }
};

module.exports = nextConfig