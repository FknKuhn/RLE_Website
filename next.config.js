/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    allowedDevOrigins: ["http://10.0.1.12:3000", "http://localhost:3000"],
  },
};

export default nextConfig;
