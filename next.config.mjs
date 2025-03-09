/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Disable TypeScript checks and tsconfig.json generation
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['img.clerk.com'], // Thêm domain ảnh ở đây
  },
};

export default nextConfig;
