/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@promptrepo/ui", "@promptrepo/shared"],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

module.exports = nextConfig;
