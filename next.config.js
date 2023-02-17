/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["earthengine.googleapis.com", "apod.nasa.gov"],
  },
  env: {
    NASA_API_KEY: "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb",
  },
};

module.exports = nextConfig;
