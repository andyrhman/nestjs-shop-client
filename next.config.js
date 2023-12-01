/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        siteDescription: "A e-commerce website that has the best feature on the internet",
        siteKeywords: "Shopping",
        siteUrl: "http://localhost:4000",
        siteTitle: "Shopyfy"
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            }
        ]
    }
};

module.exports = nextConfig