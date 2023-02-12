/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["earthengine.googleapis.com"],
  },
};

module.exports = nextConfig;
