module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
  ],
  webpackFinal: async (config, { configType }) => {
    const cssRule = config.module.rules.find((rule) =>
      "test.css".match(rule.test)
    );
    const loaderIndex = cssRule.use.findIndex((loader) => {
      const loaderString = typeof loader === "string" ? loader : loader.loader;
      return loaderString.includes("postcss-loader");
    });
    cssRule.use[loaderIndex] = "postcss-loader";

    const indexOfRuleToRemove = config.module.rules.findIndex(
      (rule) => rule.test && rule.test.toString().includes("svg")
    );

    config.module.rules.splice(indexOfRuleToRemove, 1, {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      loader: require.resolve("file-loader"),
      options: {
        name: "static/media/[name].[hash:8].[ext]",
        esModule: false,
      },
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });

    return config;
  },
};
