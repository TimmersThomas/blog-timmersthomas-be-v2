/**
 * @type {import('next').NextConfig}
 */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


const nextConfig = {
  /* config options here */
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },

}


// @ts-ignore
module.exports = withPlugins([
  [withBundleAnalyzer]
], nextConfig);