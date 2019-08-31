const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.com.config");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    host: "localhost",
    port: 3000,
    open: true, // 自动打开浏览器
    compress: true, // 启用gzip压缩
    inline: true // 启用内联模式
  }
});
