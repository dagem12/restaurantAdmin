// const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      // new ESLintWebpackPlugin({
      //   lintDirtyModulesOnly: true,
      //   cache: true,
      //   cacheLocation: 'node_modules/.cache/eslint/',
      //   threads: true,
      //   exclude: ['node_modules', 'dist'],
      // }),
    ],
  },
};
