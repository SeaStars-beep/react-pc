const commonConfig = require('./__common__');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(commonConfig, {
  entry: './src/main.ts',
  mode: 'production',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, '../../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      templateParameters: {
        title: '小象商家端',
      },
    }),
  ],
});
