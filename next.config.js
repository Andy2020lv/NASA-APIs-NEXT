/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["earthengine.googleapis.com", "apod.nasa.gov"],
  },
};

module.exports = nextConfig;
