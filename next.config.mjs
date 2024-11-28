// next.config.js
const nextConfig = {
  // Other configurations...
  images: {
    domains: ['localhost', 'yeshwanth-ecommerce.s3.amazonaws.com', "yeshwanth-ecommerce.s3.eu-north-1.amazonaws.com"],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wteevsttakocypgyobcb.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
  webpack(config) {
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;
