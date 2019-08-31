const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitWebpackPlugin = require("css-split-webpack-plugin").default;
const { appIndexJs, appBuild, appHtml } = require("./pathConfig");

module.exports = {
  entry: {
    app: appIndexJs
  },
  output: {
    filename: "[name].[hash:7].js",
    path: appBuild
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/, // jsx、js处理
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/, // scss、css处理
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/, // 图片处理
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]_[hash].[ext]",
              outputPath: "images/",
              limit: 204800 // 小于200kb采用base64转码
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|ttf)/, // 字体处理
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000, // 5kb限制
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  optimization: {
    splitChunks: {
      // 提取公共代码
      chunks: "all", //  async(动态加载模块)，initital（入口模块），all（全部模块入口和动态的）
      minSize: 3000, // 抽取出来的文件压缩前最小大小
      maxSize: 0, // 抽取出来的文件压缩前的最大大小
      minChunks: 1, // 被引用次数,默认为1
      maxAsyncRequests: 5, // 最大的按需(异步)加载次数，默认为 5；
      maxInitialRequests: 3, // 最大的初始化加载次数，默认为 3；
      automaticNameDelimiter: "~", // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
      name: "vendor/vendor", // 抽取出的文件名，默认为true，表示自动生成文件名
      cacheGroups: {
        // 缓存组
        common: {
          // 将node_modules模块被不同的chunk引入超过1次的抽取为common
          test: /[\\/]node_modules[\\/]/,
          name: "common",
          chunks: "initial",
          priority: 2,
          minChunks: 2
        },
        default: {
          reuseExistingChunk: true, // 避免被重复打包分割
          filename: "common.js", // 其他公共函数打包成common.js
          priority: -20
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:7].css",
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
    }),
    new CSSSplitWebpackPlugin({
      size: 4000, // 超过4kb进行拆分
      filename: "[name]-[part].[ext]"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html", // 模板文件名
      template: appHtml, // 模板文件源
      minify: {
        collapseWhitespace: true, // 压缩空格
        minifyCSS: true, // 压缩css
        minifyJS: true, // 压缩js
        removeComments: true, // 移除注释
        caseSensitive: true, // 去除大小写
        removeScriptTypeAttributes: true, // 移除script的type属性
        removeStyleLinkTypeAttributes: true // 移除link的type属性
      }
    })
  ]
};
