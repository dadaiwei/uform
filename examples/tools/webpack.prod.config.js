const merge = require("webpack-merge");
const baseConfig = require("./webpack.com.config");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "source-map"
});
