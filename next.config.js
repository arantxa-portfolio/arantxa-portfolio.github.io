const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // i18n: {
  //   locales: ['pt-BR', 'en', 'es'],
  //   defaultLocale: 'pt-BR'
  // }
};

module.exports = nextConfig;
