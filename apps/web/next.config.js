const withTM = require("next-transpile-modules")(["ui"]);
const { env } = require("./server/env");

module.exports = withTM(
  /**
   * @type {import('next').NextConfig}
   */
  {
    reactStrictMode: true,
    publicRuntimeConfig: {
      NODE_ENV: env.NODE_ENV,
    },
    experimental: { images: { allowFutureImage: true, esmExternals: true } },
  }
);
