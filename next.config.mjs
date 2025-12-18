import config from './next-i18next.config.js';
const {
  i18n
} = config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  devIndicators: false,
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: '**.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/static/**'
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'sbqtqbfkhryqtetytzfi.supabase.co',
        pathname: '/storage/v1/object/public/medusa-db/**'
      },
      {
        protocol: 'https',
        hostname: 'blogger-production-0439.up.railway.app',
        pathname: '/uploads/**', // cho phép tất cả file trong /uploads
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;