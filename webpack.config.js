const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')

module.exports = (env, argv) => {

  const isProd = argv.mode === 'production'
  const isDev = !isProd

  console.log('isProd', isProd)
  console.log('isDev', isDev)

  const filename = extension => isProd
    ? `[name].[contenthash].bundle.${extension}`
    : `[name].bundle.${extension}`

  return {
    target: 'web',
    context: path.resolve(__dirname, 'src'),

    entry: {
      main: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        './index.js'
      ]
    },

    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js')
    },

    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      }
    },
    devServer: {
      port: 9000,
      open: true,
      hot: true,
      watchFiles: './',
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [

      new HtmlWebpackPlugin({
        template: './index.html'
      }),

      // new FaviconsWebpackPlugin(path.resolve(__dirname, 'src', 'excel.png')),

      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'favicon.ico'),
            to: path.resolve(__dirname, 'dist')
          },
        ],
      }),

      new MiniCssExtractPlugin({
        filename: filename('css')
      }),

    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },

  }
}