const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = () => ({
  entry: [
    'docs/src/index.js',
    'docs/src/index.scss',
  ],
  output: {
    filename: 'assets/app.js',
  },
  resolve: {
    alias: {
      root: __dirname,
      source: 'root/src/',
      docs: 'root/docs/',
    },
  },
  module: {
    rules: [
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[folder]/[name].[ext]',
              emitFile: false,
            },
          },
        ],
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                ],
              },
            },
          }, {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      }, {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
    new StylelintPlugin({
      cache: true,
      fix: true,
      files: '**/*.scss',
    }),
    new ESLintPlugin({
      cache: true,
      fix: true,
    }),
  ],
});
