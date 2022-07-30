const withTM = require("next-transpile-modules")(["ui"]);
const { env } = require("./server/env");

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
  experimental: {
    images: { allowFutureImage: true },
  },
};

module.exports = withTM(config);
