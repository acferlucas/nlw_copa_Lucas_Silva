/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  env: {
    OA_CLIENT_ID:
      '151621233052-f36spt47302t7mgqk46t738qjkrrmc3p.apps.googleusercontent.com',
  },
}

module.exports = nextConfig
