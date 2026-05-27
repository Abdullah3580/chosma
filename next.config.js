/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dukpion.com.bd' },
    ],
  },
}

module.exports = nextConfig
