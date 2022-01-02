/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    /* config options here */
    swcMinify: true,
    reactStrictMode: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Important: return the modified config
        return config
      },

  }

  module.exports = nextConfig