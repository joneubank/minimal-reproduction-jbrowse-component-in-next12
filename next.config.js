const withPlugins = require("next-compose-plugins");

const withTranspileModules = require("next-transpile-modules")([
  "@jbrowse/react-circular-genome-view",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins([withTranspileModules], nextConfig);
