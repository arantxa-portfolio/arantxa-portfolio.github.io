const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/arantia-portfolio",
  // assetPrefix: "/arantia-portfolio",
  reactStrictMode: true,
  output: "export",
  distDir: "docs",
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "styles/variables.scss";`
  },
};

module.exports = nextConfig;
