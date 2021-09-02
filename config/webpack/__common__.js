const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(styl|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                paths: [path.resolve(__dirname, '../../src')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, '../../src'),
      '@assets': path.resolve(__dirname, '../../assets'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BACK': JSON.stringify(process.env.API_BACK || ''),
    }),
  ],
};
