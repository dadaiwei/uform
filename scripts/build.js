const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const pathEnv = require("./pathEnv");

module.exports = {
  mode: "production",
  entry: pathEnv.entry,
  output: pathEnv.output,
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.[le|c]ss/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "uform.css",
      chunkFilename: "[id].css"
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"), // //引入cssnano配置压缩选项
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              // 移除注释
              removeAll: true
            },
            normalizeUnicode: false
          }
        ]
      },
      canPrint: true
    })
  ]
};
