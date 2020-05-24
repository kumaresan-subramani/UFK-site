var webpack = require("webpack");

module.exports = {
  context: __dirname + "/",
  devtool:"none",
  entry: { "src/index.min": ["./src/index"] },
  output: {
    path: __dirname + "/",
    filename: "[name].js",
    libraryTarget: "this"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      output: {
        comments: false // remove comments
      },
      compress: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
