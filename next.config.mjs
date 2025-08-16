/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs/introduction',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
