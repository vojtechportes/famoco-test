const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const common = require("./webpack.common");

module.exports = {
  mode: "production",
  entry: common.entry,
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    publicPath: "/client",
    filename: "[name].[hash].js"
  },
  resolve: common.resolve,
  module: {
    rules: [common.loaderCss, common.loaderMjs, common.loaderTs, common.loaderJson]
  },  
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        commons: {
          test: /\/node_modules\//,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: path.resolve(__dirname, "../src"),
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
      tslint: path.resolve(__dirname, "../tslint.json")
    })
  ]
};
