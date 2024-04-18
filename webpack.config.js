const path = require("path");

module.exports = {
  target: "node",
  entry: ["./src/js/main.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // Additional configuration goes here
};
