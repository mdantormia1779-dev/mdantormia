/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/projects",
        destination: "/api/projects",
      },
      {
        source: "/projects/:id",
        destination: "/api/projects/:id",
      },
      {
        source: "/downloads",
        destination: "/api/downloads",
      },
    ];
  },
};

export default nextConfig;
