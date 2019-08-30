const path = require("path");

const pathEnv = {
  entry: "./lib/index",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
    library: "UForm",
    libraryTarget: "umd"
  }
};

module.exports = pathEnv;
