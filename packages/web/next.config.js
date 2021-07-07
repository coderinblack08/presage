const withTM = require("next-transpile-modules")(["lowlight"]);

module.exports = withTM({
  reactStrictMode: true,
});
