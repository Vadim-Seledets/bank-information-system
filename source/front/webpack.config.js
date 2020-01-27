const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: {
    vendors: ['react', 'react-dom'],
    app: [path.resolve(__dirname, 'src', 'index.tsx')],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js',
  },
  watchOptions: {
    ignored: /node_modules/,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },

  module: {
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      loader: 'source-map-loader',
    }, {
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        emitErrors: true,
      },
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel-loader'],
    }, {
      test: /\.tsx?$/,
      loaders: ["babel-loader", "awesome-typescript-loader"],
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }],
    }, {
      test: /\.(jpg|png|woff|eot|ttf|svg|gif)$/,
      loader: "file-loader?name=[name].[ext]",
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
}
