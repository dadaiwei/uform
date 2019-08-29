const path = require("path");

const pathEnv = {
  entry: "./src/index",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
    library: "UForm",
    libraryTarget: "umd"
  }
};

module.exports = pathEnv;
