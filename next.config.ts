import type { NextConfig } from "next";
const { env } = process;

module.exports = {
  env: {
    DATABASE_URL: env.DATABASE_URL,
    // Autres variables d'environnement
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
