/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (config.cache) {
      config.cache = false; // Desliga o cache do webpack
    }
    return config;
  },

};

module.exports = nextConfig;
